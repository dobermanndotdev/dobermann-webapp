import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import RelativeTime from "dayjs/plugin/relativeTime";
import UpdateLocale from "dayjs/plugin/updateLocale";

dayjs.extend(UpdateLocale);
dayjs.extend(RelativeTime);
dayjs.extend(LocalizedFormat);

dayjs.updateLocale("en", {
  relativeTime: {
    future: "in %s",
    past: "%s ago",
    s: "%d seconds",
    m: "a minute",
    mm: "%d minutes",
    h: "an hour",
    hh: "%d hours",
    d: "a day",
    dd: "%d days",
    M: "a month",
    MM: "%d months",
    y: "a year",
    yy: "%d years",
  },
});

export const Dates = {
  new: (date?: string) => dayjs(date),
  fromNow: (date: string | Date) => dayjs(date).fromNow(),
  format: (date: string | Date, format: string) => dayjs(date).format(format),
};
