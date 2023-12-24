import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Dates } from "../libs/dates";

export interface Serie {
  name: string;
  data: SerieDataPoint[];
}

export interface SerieDataPoint {
  value: number;
  timestamp: number;
}

interface Props {
  series: Serie[];
}

export function TimeseriesChart({ series }: Props) {
  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart width={500} height={300}>
          <CartesianGrid strokeDasharray="0 0" vertical={false} />
          <XAxis
            scale="time"
            type="number"
            fontSize={12}
            dataKey="timestamp"
            tickFormatter={(val, index) => Dates.format(val, "MMM, DD")}
            domain={[series[0].data[0].timestamp, series[0].data[series[0].data.length - 1].timestamp]}
          />
          <YAxis
            fontSize={12}
            dataKey="value"
            label={{
              angle: -90,
              offset: 0,
              fontSize: 12,
              position: "left",
              value: "Milliseconds",
              style: { textAnchor: "middle" },
            }}
          />
          <Tooltip
            formatter={(val, name) => {
              return `${val} ms`;
            }}
            labelFormatter={(timestamp) => Dates.format(timestamp, "lll")}
          />
          <Legend iconType="plainline" wrapperStyle={{ fontSize: 12 }} />
          {series.map((s) => (
            <Line dataKey="value" type="monotone" data={s.data} name={s.name} key={s.name} dot={false} />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export function YaxisLabel() {
  return (
    <text>
      <tspan>Milliseconds</tspan>
    </text>
  );
}
