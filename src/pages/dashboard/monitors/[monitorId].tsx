import { Button } from "@@/common/components/Button";
import { DashboardLayout } from "@@/common/layouts/DashboardLayout/DashboardLayout";
import { apiClients, ssrApiClients } from "@@/common/libs/api";
import { Monitor } from "@@/common/libs/apiClient";
import { paths } from "@@/common/libs/contants";
import { Dates } from "@@/common/libs/dates";
import { notify, notifyGenericError } from "@@/common/libs/errors";
import { MonitorItemDetails } from "@@/modules/Monitor/MonitorItem";
import { PauseToggler } from "@@/modules/Monitor/PauseToggler";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";

interface Props {
  monitor: Monitor;
}

export default function MonitorPage({ monitor: initialData }: Props) {
  const [monitor, setMonitor] = useState(initialData);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const refreshMonitor = useCallback(async () => {
    try {
      const { data } = await apiClients.MonitorsApiFactory.getMonitorByID(monitor.id);
      setMonitor(data.data);
    } catch (error) {
      notify("Unable to refresh monitor. Please reload the page", { type: "error" });
    }
  }, [monitor.id]);

  const onDeleteMonitorHandler = useCallback(async () => {
    try {
      setIsDeleting(true);
      await apiClients.MonitorsApiFactory.deleteMonitor(monitor.id);
      notify("Monitor removed successfully");
      router.push(paths.monitors);
    } catch (error) {
      notifyGenericError();
      setIsDeleting(false);
    }
  }, [router, monitor.id]);

  return (
    <DashboardLayout>
      <div className="flex justify-between mb-6">
        <div>
          <h1 className="font-bold text-lg">{monitor.endpoint_url}</h1>
          <MonitorItemDetails
            className="mt-1"
            isPaused={monitor.is_paused}
            isUp={monitor.is_endpoint_up}
            checkIntervalInSeconds={monitor.check_interval_in_seconds}
          />
        </div>

        <div className="flex gap-2">
          <PauseToggler onSuccess={refreshMonitor} isPaused={monitor.is_paused} monitorId={monitor.id} />
          <Button
            disabled={isDeleting}
            isLoading={isDeleting}
            onClick={onDeleteMonitorHandler}
            className="btn-sm btn-warning"
          >
            Delete
          </Button>
        </div>
      </div>

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
    </DashboardLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
  const { data } = await ssrApiClients(req).MonitorsApiFactory.getMonitorByID(params?.monitorId as string);

  return {
    props: {
      monitor: data.data,
    },
  };
};
