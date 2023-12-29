import { Dates } from "@@/common/libs/dates";

export function getDuration(startedAt: string, resolvedAt: string): string {
  if (!resolvedAt) {
    return Dates.fromNow(startedAt);
  }

  const diff = Dates.new(resolvedAt).diff(Dates.new(startedAt));

  return Dates.duration(diff).humanize();
}
