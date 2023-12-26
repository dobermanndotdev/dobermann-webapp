import { Loading } from "@@/common/components/Loading";
import { Monitor } from "@@/common/libs/apiClient";
import Link from "next/link";
import { ComponentPropsWithoutRef } from "react";

interface Props {
  monitor: Monitor;
}

export function MonitorItem({ monitor }: Props) {
  return (
    <article key={monitor.id} className="border mb-4 px-4 py-4 flex flex-col text-sm">
      <Link href={`/dashboard/monitors/${monitor.id}`} className="mb-1">
        <h1 className="font-bold text-base">{monitor.endpoint_url}</h1>
        <MonitorItemDetails
          className="mt-1"
          isLoading={false}
          isPaused={monitor.is_paused}
          isUp={monitor.is_endpoint_up}
          checkIntervalInSeconds={monitor.check_interval_in_seconds}
        />
      </Link>
    </article>
  );
}

interface MonitorItemDetailsProps extends ComponentPropsWithoutRef<"div"> {
  isUp: boolean;
  isPaused: boolean;
  isLoading: boolean;
  checkIntervalInSeconds: number;
}

export function MonitorItemDetails({
  isUp,
  isPaused,
  className,
  isLoading,
  checkIntervalInSeconds,
  ...props
}: MonitorItemDetailsProps) {
  return (
    <div {...props} className={`flex gap-2 items-center ${className}`}>
      {!isPaused && (
        <div className={`badge ${isUp ? "badge-success" : "badge-error"}  gap-2`}>{isUp ? "Up" : "Down"}</div>
      )}
      {isPaused && <div className="badge badge-warning gap-2">Paused</div>}
      <div className="badge badge-ghost">Checked every {formatCheckIntervalToMinutes(checkIntervalInSeconds)}</div>
      {isLoading && (
        <div className="badge badge-warning">
          <Loading size="xs" />
        </div>
      )}
    </div>
  );
}

function formatCheckIntervalToMinutes(intervalInSeconds: number) {
  if (intervalInSeconds === 30) {
    return `${intervalInSeconds} seconds`;
  }

  return `${intervalInSeconds / 60} minutes`;
}
