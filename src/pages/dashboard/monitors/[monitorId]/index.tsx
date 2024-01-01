import { Card } from "@@/common/components/Card";
import { PageTitle } from "@@/common/components/PageTitle";
import { Stat } from "@@/common/components/Stat";
import { DashboardLayout } from "@@/common/layouts/DashboardLayout/DashboardLayout";
import { apiClients, ssrApiClients } from "@@/common/libs/api";
import { Monitor, ResponseTimeStat } from "@@/common/libs/apiClient";
import { paths } from "@@/common/libs/contants";
import { notify, notifyGenericError } from "@@/common/libs/errors";
import { IncidentTable } from "@@/modules/Monitor/IncidentTable";
import { LiveLastCheckedAt } from "@@/modules/Monitor/LiveLastCheckedAt";
import { MonitorItemDetails } from "@@/modules/Monitor/MonitorItem";
import { ResponseTimeStatsChart } from "@@/modules/Monitor/ResponseTimeStatsChart";
import { useLiveMonitor } from "@@/modules/Monitor/hooks";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";

interface Props {
  monitor: Monitor;
  responseTimeStats: ResponseTimeStat[];
}

export default function MonitorPage({ monitor: initialData, responseTimeStats }: Props) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const { monitor, isLoading, setMonitor } = useLiveMonitor(initialData);

  const refreshMonitor = useCallback(async () => {
    try {
      const { data } = await apiClients().MonitorsApiFactory.getMonitorByID(monitor.id);
      setMonitor(data.data);
    } catch (error) {
      notify("Unable to refresh monitor. Please reload the page", { type: "error" });
    }
  }, [monitor.id, setMonitor]);

  const onDeleteMonitorHandler = useCallback(async () => {
    try {
      setIsDeleting(true);
      await apiClients().MonitorsApiFactory.deleteMonitor(monitor.id);
      router.push(paths.monitors);
    } catch (error) {
      notifyGenericError();
      setIsDeleting(false);
    }
  }, [router, monitor.id]);

  return (
    <DashboardLayout
      title={`Monitor ${monitor.endpoint_url}`}
      breadcrumbReplacer={{ key: "[monitorId]", pathname: monitor.id, label: monitor.endpoint_url }}
    >
      <PageTitle title={`Monitor ${monitor.endpoint_url}`}></PageTitle>
      <div>
        <div>
          <h1>{monitor.endpoint_url}</h1>
          <MonitorItemDetails
            className="mt-1"
            isLoading={isLoading}
            isPaused={monitor.is_paused}
            isUp={monitor.is_endpoint_up}
            checkIntervalInSeconds={monitor.check_interval_in_seconds}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Stat label="Last checked at" value={<LiveLastCheckedAt value={monitor.last_checked_at || ""} />} />
        <Stat label="Incidents" value={monitor.incidents.length || 0} />
      </div>

      {!!responseTimeStats.length && (
        <Card title="Response times" className="mt-4">
          <ResponseTimeStatsChart monitorId={monitor.id} responseTimeStats={responseTimeStats} className="mt-4" />
        </Card>
      )}

      <Card className="mt-4" title="Incidents">
        <IncidentTable incidents={monitor.incidents} />
      </Card>
    </DashboardLayout>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async ({ req, params }) => {
  const client = ssrApiClients(req);
  const monitorId = params?.monitorId as string;

  try {
    const { data } = await client.MonitorsApiFactory.getMonitorByID(monitorId);
    const { data: responseTimeStats } = await client.MonitorsApiFactory.getMonitorResponseTimeStats(monitorId, 1);

    return {
      props: {
        monitor: data.data,
        responseTimeStats: responseTimeStats.data,
      },
    };
  } catch (error) {
    return {
      props: {
        monitor: {} as any,
        responseTimeStats: [],
      },
    };
  }
};
