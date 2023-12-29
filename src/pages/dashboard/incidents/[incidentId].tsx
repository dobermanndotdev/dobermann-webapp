import { ButtonLink } from "@@/common/components/ButtonLink";
import { Card } from "@@/common/components/Card";
import { Code } from "@@/common/components/Code";
import { Stat } from "@@/common/components/Stat";
import { DashboardLayout } from "@@/common/layouts/DashboardLayout/DashboardLayout";
import { ssrApiClients } from "@@/common/libs/api";
import { FullIncident, Monitor } from "@@/common/libs/apiClient";
import { FULL_DATE_FORMAT, paths } from "@@/common/libs/contants";
import { Dates } from "@@/common/libs/dates";
import { getDuration } from "@@/modules/Incident/lib";
import { GetServerSideProps } from "next";

interface Props {
  monitor: Monitor;
  incident: FullIncident;
}

export default function IncidentPage({ incident, monitor }: Props) {
  return (
    <DashboardLayout
      title={`Incident ${incident.checked_url}`}
      breadcrumbReplacer={{ key: "[incidentId]", pathname: incident.id, label: incident.checked_url }}
    >
      <header className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="font-bold text-lg">Incident of {monitor.endpoint_url}</h1>
          <span className={`badge ${!!incident.resolved_at ? "badge-success" : "badge-warning"}`}>
            {!!incident.resolved_at ? "Resolved" : "Ongoing"}
          </span>
        </div>

        <div>
          <ButtonLink href={paths.toMonitor(monitor.id)} className="btn-sm btn-outline">
            Go to monitor
          </ButtonLink>
        </div>
      </header>
      <section className="flex flex-col gap-4">
        <Card title="Cause">
          <Code content={incident.cause} />
        </Card>
        <div className="grid grid-cols-2 gap-4">
          <Stat label="Started at" value={Dates.format(incident.created_at, FULL_DATE_FORMAT)} />
          <Stat label="Duration" value={getDuration(incident.created_at, incident.resolved_at || "")} />
        </div>

        <Card title="Checked URL">
          <Code content={incident.checked_url} />
        </Card>
        <Card title="Request headers">
          <Code content={incident.request_headers} />
        </Card>
        <Card title="Response headers">
          <Code content={incident.response_headers} />
        </Card>
        <Card title="Response">
          <Code collapsable={true} content={incident.response_body} />
        </Card>
      </section>
    </DashboardLayout>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async ({ req, params }) => {
  const client = ssrApiClients(req);
  const incidentId = params?.incidentId as string;

  try {
    const { data } = await client.IncidentsApiFactory.getIncidentByID(incidentId);
    const { data: monitor } = await client.MonitorsApiFactory.getMonitorByID(data.data.monitor_id);

    return {
      props: {
        incident: data.data,
        monitor: monitor.data,
      },
    };
  } catch (error) {
    return {
      props: {
        incident: {} as any,
        monitor: {} as any,
      },
    };
  }
};
