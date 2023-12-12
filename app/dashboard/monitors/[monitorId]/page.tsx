import { appConfig } from "@@/app/config";
import { MonitorDetails } from "@@/app/dashboard/(components)/Monitor/MonitorDetails";
import { Configuration, Monitor, MonitorsApiFactory } from "@@/common/libs/apiClient";
import { COOKIE_AUTH_TOKEN } from "@@/common/libs/contants";
import { cookies } from "next/headers";

interface Props {
  params: Record<string, string>;
}

export default async function MonitorPage({ params }: Props) {
  const monitor = await getMonitor(params.monitorId);

  return <MonitorDetails monitor={monitor} />;
}

async function getMonitor(monitorId: string): Promise<Monitor> {
  const token = cookies().get(COOKIE_AUTH_TOKEN);
  const client = MonitorsApiFactory(new Configuration({ accessToken: token?.value }), appConfig.apiUrl);
  const resp = await client.getMonitorByID(monitorId);
  return resp.data.data;
}
