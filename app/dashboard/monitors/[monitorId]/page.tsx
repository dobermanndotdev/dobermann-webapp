import { appConfig } from "@@/app/config";
import { Configuration, Monitor, MonitorsApiFactory } from "@@/common/libs/apiClient";
import { COOKIE_AUTH_TOKEN } from "@@/common/libs/contants";
import { Dates } from "@@/common/libs/dates";
import { cookies } from "next/headers";
import { ViewHeader } from "../../(components)/ViewHeader";

interface Props {
  params: Record<string, string>;
}

export default async function MonitorPage({ params }: Props) {
  const monitor = await getMonitor(params.monitorId);
  return (
    <>
      <ViewHeader title={monitor.endpoint_url}>
        <div className={`badge ${monitor.is_endpoint_up ? "badge-success" : "badge-error"}  gap-2 mt-1`}>
          {monitor.is_endpoint_up ? "Up" : "Down"}
        </div>
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
          <div className="stat-value">0</div>
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
