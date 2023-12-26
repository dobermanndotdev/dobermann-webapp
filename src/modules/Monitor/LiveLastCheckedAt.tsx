import { NoSSR } from "@@/common/components/NoSSR";
import { Dates } from "@@/common/libs/dates";
import { useEffect, useState } from "react";

interface Props {
  value: string;
  interval?: number;
}

export function LiveLastCheckedAt({ value, interval = 1000 }: Props) {
  const [lastCheckedAt, setLastCheckedAt] = useState<string | null>(value ? Dates.fromNow(value) : null);

  useEffect(() => {
    const intervalObj = setInterval(() => {
      if (value) {
        setLastCheckedAt(Dates.fromNow(value));
      }
    }, interval);

    return () => {
      clearInterval(intervalObj);
    };
  }, [value, interval]);

  return (
    <NoSSR>
      <span>{lastCheckedAt}</span>
    </NoSSR>
  );
}
