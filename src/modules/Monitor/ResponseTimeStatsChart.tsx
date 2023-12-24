import { Serie, SerieDataPoint, TimeseriesChart } from "@@/common/components/TimeseriesChart";
import { ResponseTimeStat } from "@@/common/libs/apiClient";
import { Dates } from "@@/common/libs/dates";
import { faker } from "@faker-js/faker";
import { Dayjs } from "dayjs";
import { useMemo, useState } from "react";

interface Props {
  className?: string;
  responseTimeStats: ResponseTimeStat[];
}

export function ResponseTimeStatsChart({ responseTimeStats, className }: Props) {
  const [viewType, setViewType] = useState("monthly");
  const series: Serie[] = useMemo(() => {
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
  }, [responseTimeStats]);

  return (
    <div className={`border p-3 ${className}`}>
      <header className="flex justify-between mb-2">
        <div>Response times</div>
        <div className="flex gap-2 border">
          {viewTypes.map((vt) => (
            <button
              key={vt.id}
              onClick={() => setViewType(vt.id)}
              className={`btn btn-xs ${viewType === vt.id ? "btn-active" : "btn-ghost"}`}
            >
              {vt.label}
            </button>
          ))}
        </div>
      </header>
      <TimeseriesChart series={series} />
    </div>
  );
}

function generateDataPoint(date: Dayjs) {
  return {
    timestamp: date.toDate().getTime(),
    value: faker.number.int({ min: 150, max: 250 }),
  };
}

function generateSeriesDataPoints(numOfDays: number, pointsPerDay: number): SerieDataPoint[] {
  let startDate = Dates.new().subtract(1, "month");
  const result: SerieDataPoint[] = [];

  for (let i = 0; i < numOfDays; i++) {
    startDate = startDate.add(1, "day");
    for (let j = 0; j < pointsPerDay; j++) {
      startDate = startDate.add(1, "hour");
      const val = generateDataPoint(startDate);
      console.log(startDate.toDate(), "-", val.timestamp);
      result.push(val);
    }
  }

  return result;
}

const _series: Serie[] = [
  {
    name: "Europe",
    data: [...generateSeriesDataPoints(1, 8)],
  },
];

const viewTypes = [
  {
    id: "daily",
    label: "Daily",
  },
  {
    id: "weekly",
    label: "Weekly",
  },
  {
    id: "monthly",
    label: "Monthly",
  },
];
