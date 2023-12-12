import { appConfig } from "@@/app/config";
import { Configuration, Monitor, MonitorsApiFactory } from "@@/common/libs/apiClient";
import { COOKIE_AUTH_TOKEN } from "@@/common/libs/contants";
import { Dates } from "@@/common/libs/dates";
import { cookies } from "next/headers";
import { MonitorItemDetails } from "../../(components)/MonitorItem";
import { ViewHeader } from "../../(components)/ViewHeader";

interface Props {
  params: Record<string, string>;
}

export default async function MonitorPage({ params }: Props) {
  const monitor = await getMonitor(params.monitorId);

  return (
    <>
      <ViewHeader title={monitor.endpoint_url}>
        <MonitorItemDetails
          className="mt-1"
          isUp={monitor.is_endpoint_up}
          checkIntervalInSeconds={monitor.check_interval_in_seconds}
        />
      </ViewHeader>

      <div className="grid grid-cols-2 gap-4">
        {monitor.last_checked_at && (
          <div className="stat border">
            <div className="stat-title">Last checked at</div>
            <div className="stat-value">{Dates.fromNow(monitor.last_checked_at)}</div>
          </div>
        )}

        <div className="stat border">
          <div className="stat-title">Incidents</div>
          <div className="stat-value">{monitor.incidents ? monitor.incidents.length : 0}</div>
        </div>
      </div>
    </>
  );
}

async function getMonitor(monitorId: string): Promise<Monitor> {
  const token = cookies().get(COOKIE_AUTH_TOKEN);

  const resp = await MonitorsApiFactory(
    new Configuration({ accessToken: token?.value }),
    appConfig.apiUrl
  ).getMonitorByID(monitorId);

  return resp.data.data;
}
