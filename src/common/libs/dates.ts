import dayjs from "dayjs";
import RelativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(RelativeTime);

export const Dates = {
  format: (date: string | Date, format: string) => dayjs(date).format(format),
  fromNow: (date: string | Date) => dayjs(date).fromNow(),
  new: (date?: string) => dayjs(date),
};
