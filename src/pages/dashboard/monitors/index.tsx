import { Alert } from "@@/common/components/Alert";
import { PageTitle } from "@@/common/components/PageTitle";
import { DashboardLayout } from "@@/common/layouts/DashboardLayout/DashboardLayout";
import { ssrApiClients } from "@@/common/libs/api";
import { Monitor } from "@@/common/libs/apiClient";
import { paths } from "@@/common/libs/contants";
import { MonitorItem } from "@@/modules/Monitor/MonitorItem";
import { GetServerSideProps } from "next";
import Link from "next/link";

interface Props {
  monitors: Monitor[];
}

export default function MonitorsPage({ monitors }: Props) {
  const hasMonitors = !!monitors.length;

  return (
    <DashboardLayout>
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
    </DashboardLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const response = await ssrApiClients(req).MonitorsApiFactory.getAllMonitors();

  return {
    props: {
      monitors: response.data.data,
    },
  };
};
