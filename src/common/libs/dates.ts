import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import RelativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(RelativeTime);
dayjs.extend(LocalizedFormat);

export const Dates = {
  format: (date: string | Date, format: string) => dayjs(date).format(format),
  fromNow: (date: string | Date) => dayjs(date).fromNow(),
  new: (date?: string) => dayjs(date),
};
