import { appConfig } from "@@/app/config";
import { Alert } from "@@/common/components/Alert";
import { Configuration, Monitor, MonitorsApiFactory } from "@@/common/libs/apiClient";
import { COOKIE_AUTH_TOKEN, paths } from "@@/common/libs/contants";
import { cookies } from "next/headers";
import Link from "next/link";
import { MonitorItem } from "../(components)/MonitorItem";
import { PageTitle } from "../(components)/PageTitle";

export default async function MonitorsPage() {
  const monitors = await getMonitors();
  const hasMonitors = !!monitors.length;

  return (
    <>
      <PageTitle
        title="Monitors"
        CallToAction={
          <Link className="btn btn-sm btn-primary" href={paths.addMonitor}>
            Add Monitor
          </Link>
        }
      />

      {!hasMonitors && <Alert className="alert-base mt-4">You {"haven't"} created a monitor yet.</Alert>}

      {monitors.map((monitor) => (
        <MonitorItem key={monitor.id} monitor={monitor} />
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
