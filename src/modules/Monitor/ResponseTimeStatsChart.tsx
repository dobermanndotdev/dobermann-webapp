import { Button } from "@@/common/components/Button";
import { Serie, SerieDataPoint, TimeseriesChart } from "@@/common/components/TimeseriesChart";
import { apiClients } from "@@/common/libs/api";
import { ResponseTimeStat } from "@@/common/libs/apiClient";
import { Dates } from "@@/common/libs/dates";
import { useMemo, useState } from "react";

interface Props {
  monitorId: string;
  className?: string;
  defaultViewType?: ViewType;
  responseTimeStats: ResponseTimeStat[];
}

enum VIEW_TYPES {
  DAILY = "daily",
  WEEKLY = "weekly",
  MONTHLY = "monthly",
}

type ViewType = VIEW_TYPES.DAILY | VIEW_TYPES.WEEKLY | VIEW_TYPES.MONTHLY;

interface ViewTypeConfig {
  id: ViewType;
  label: string;
}

export function ResponseTimeStatsChart({
  responseTimeStats: initialData,
  className,
  monitorId,
  defaultViewType = VIEW_TYPES.DAILY,
}: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [viewType, setViewType] = useState(defaultViewType);
  const [responseTimeStats, setResponseTimeStats] = useState(initialData);
  const series: Serie[] = useMemo(() => mapResponseTimesToSeries(responseTimeStats), [responseTimeStats]);

  const handleViewTypeChange = async (viewTypeChangedTo: ViewType) => {
    setIsLoading(true);
    setViewType(viewTypeChangedTo);

    const rangeInDays = mapViewTypeToRangeInDays(viewTypeChangedTo);
    const { data } = await apiClients().MonitorsApiFactory.getMonitorResponseTimeStats(monitorId, rangeInDays);
    setResponseTimeStats(data.data);
    setIsLoading(false);
  };

  return (
    <div className={className}>
      <header className="flex justify-between mb-2">
        <div></div>
        <div className="flex gap-1 border p-[2px]">
          {viewTypes.map((vt) => (
            <Button
              key={vt.id}
              disabled={isLoading}
              isLoading={vt.id === viewType && isLoading}
              onClick={() => handleViewTypeChange(vt.id)}
              className={`btn btn-xs ${viewType === vt.id ? "btn-active" : "btn-ghost"}`}
            >
              {vt.label}
            </Button>
          ))}
        </div>
      </header>
      <TimeseriesChart
        series={series}
        tickFormatter={(val, index) => {
          switch (viewType) {
            case VIEW_TYPES.DAILY:
              return Dates.format(val, "hh:mma");
            default:
              return Dates.format(val, "MM/DD hh:mma");
          }
        }}
      />
    </div>
  );
}

function mapResponseTimesToSeries(responseTimeStats: ResponseTimeStat[]) {
  const mapper: Record<string, Serie> = {};

  responseTimeStats.forEach((stat) => {
    const item: SerieDataPoint = {
      timestamp: Dates.new(stat.date).toDate().getTime(),
      value: stat.value,
    };
    if (mapper[stat.region]) {
      mapper[stat.region].data.push(item);
    } else {
      mapper[stat.region] = {
        name: stat.region,
        data: [item],
      };
    }
  });

  return Object.values(mapper);
}

const viewTypes: ViewTypeConfig[] = [
  {
    id: VIEW_TYPES.DAILY,
    label: "Daily",
  },
  {
    id: VIEW_TYPES.WEEKLY,
    label: "Weekly",
  },
  {
    id: VIEW_TYPES.MONTHLY,
    label: "Monthly",
  },
];

function mapViewTypeToRangeInDays(viewType: ViewType): number {
  switch (viewType) {
    case VIEW_TYPES.DAILY:
      return 1;
    case VIEW_TYPES.WEEKLY:
      return 7;
    default:
      return 30;
  }
}
