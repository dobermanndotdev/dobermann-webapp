import { appConfig } from "@@/app/config";
import { Alert } from "@@/common/components/Alert";
import { Configuration, Monitor, MonitorsApiFactory } from "@@/common/libs/apiClient";
import { COOKIE_AUTH_TOKEN, paths } from "@@/common/libs/contants";
import { cookies } from "next/headers";
import Link from "next/link";
import { ViewHeader } from "../(components)/ViewHeader";

export default async function MonitorsPage() {
  const monitors = await getMonitors();
  const hasMonitors = !!monitors.length;

  return (
    <>
      <ViewHeader
        title="Monitors"
        CallToAction={
          <Link className="btn btn-sm btn-primary" href={paths.addMonitor}>
            Add Monitor
          </Link>
        }
      />

      {!hasMonitors && <Alert className="alert-base mt-4">You {"haven't"} created a monitor yet.</Alert>}

      {monitors.map((monitor) => (
        <article key={monitor.id} className="border mb-4 px-4 py-4 flex flex-col text-sm">
          <Link href={`/dashboard/monitors/${monitor.id}`}>{monitor.endpoint_url}</Link>
          <div className={`badge ${monitor.is_endpoint_up ? "badge-success" : "badge-error"}  gap-2 mt-1`}>
            {monitor.is_endpoint_up ? "Up" : "Down"}
          </div>
        </article>
      ))}
    </>
  );
}

async function getMonitors(): Promise<Monitor[]> {
  const token = cookies().get(COOKIE_AUTH_TOKEN);
  const response = await MonitorsApiFactory(
    new Configuration({ accessToken: token?.value }),
    appConfig.apiUrl
  ).getAllMonitors();
  return response.data.data;
}
