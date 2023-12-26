import { scaleTime } from "d3-scale";
import { timeDay, timeHour, timeMinute, timeMonth, timeSecond, timeWeek, timeYear } from "d3-time";
import { timeFormat } from "d3-time-format";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Dates } from "../libs/dates";
import { Alert } from "./Alert";

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
  tickFormatter(val: string, index: number): string;
}

const formatMillisecond = timeFormat(".%L"),
  formatSecond = timeFormat(":%S"),
  formatMinute = timeFormat("%I:%M"),
  formatHour = timeFormat("%I %p"),
  formatDay = timeFormat("%a %d"),
  formatWeek = timeFormat("%b %d"),
  formatMonth = timeFormat("%B"),
  formatYear = timeFormat("%Y");

function multiFormat(date: Date) {
  return (
    timeSecond(date) < date
      ? formatMillisecond
      : timeMinute(date) < date
      ? formatSecond
      : timeHour(date) < date
      ? formatMinute
      : timeDay(date) < date
      ? formatHour
      : timeMonth(date) < date
      ? timeWeek(date) < date
        ? formatDay
        : formatWeek
      : timeYear(date) < date
      ? formatMonth
      : formatYear
  )(date);
}

export function TimeseriesChart({ series, tickFormatter }: Props) {
  const hasData = !!series.length;

  if (!hasData) {
    return (
      <div className="h-[300px]">
        <Alert>No data available just yet.</Alert>
      </div>
    );
  }

  const domainMin = series[0].data[0].timestamp;
  const domainMax = series[0].data[series[0].data.length - 1].timestamp;
  const timeScale = scaleTime().domain([domainMin, domainMax]);

  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart width={500} height={300}>
          <CartesianGrid strokeDasharray="0 0" vertical={false} />
          <XAxis
            type="number"
            fontSize={12}
            scale={timeScale}
            dataKey="timestamp"
            tickFormatter={tickFormatter}
            ticks={timeScale.ticks(7).map((date) => date.valueOf())}
            domain={timeScale.domain().map((date) => date.valueOf())}
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
            formatter={(val, name) => `${val} ms`}
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

function genDailyTicks() {
  let start = Dates.new().subtract(12, "hours").set("m", 0).set("s", 0);
  const ticks = [start.toDate().getTime()];

  for (let i = 0; i < 7; i++) {
    start = start.add(3, "hours");
    ticks.push(start.toDate().getTime());
    console.log(start.toDate());
  }

  return ticks;
}
