import { Select, SelectOption } from "@@/common/components/Select";
import { Serie, SerieDataPoint, TimeseriesChart } from "@@/common/components/TimeseriesChart";
import { apiClients } from "@@/common/libs/api";
import { ResponseTimeStat } from "@@/common/libs/apiClient";
import { Dates } from "@@/common/libs/dates";
import { Flex } from "@radix-ui/themes";
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
  monitorId,
  responseTimeStats: initialData,
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
    <div>
      <Flex mb="4" justify="between">
        <div></div>
        <Select defaultValue={viewType} onValueChange={handleViewTypeChange}>
          {viewTypes.map((vt) => (
            <SelectOption key={vt.id} value={vt.id}>
              {vt.label}
            </SelectOption>
          ))}
        </Select>
      </Flex>

      <TimeseriesChart series={series} tickFormatter={tickFormatter(viewType)} />
    </div>
  );
}

const tickFormatter = (viewType: ViewType) => (val: string, index: number) => {
  switch (viewType) {
    case VIEW_TYPES.DAILY:
      return Dates.format(val, "hh:mma");
    default:
      return Dates.format(val, "MM/DD hh:mma");
  }
};

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
