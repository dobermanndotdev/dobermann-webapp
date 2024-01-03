import { Badge } from "@@/common/components/Badge";
import { ButtonLink } from "@@/common/components/ButtonLink";
import { Card } from "@@/common/components/Card";
import { Code } from "@@/common/components/Code";
import { Grid } from "@@/common/components/Grid";
import { Heading } from "@@/common/components/Heading";
import { PageTitle } from "@@/common/components/PageTitle";
import { Stat } from "@@/common/components/Stat";
import { DashboardLayout } from "@@/common/layouts/DashboardLayout/DashboardLayout";
import { ssrApiClients } from "@@/common/libs/api";
import { FullIncident, Monitor } from "@@/common/libs/apiClient";
import { FULL_DATE_FORMAT, paths } from "@@/common/libs/contants";
import { Dates } from "@@/common/libs/dates";
import { CheckResponseModal } from "@@/modules/Incident/CheckResponseModal";
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
      <PageTitle
        title={`Incident of ${monitor.endpoint_url}`}
        CallToAction={
          <ButtonLink href={paths.toMonitor(monitor.id)} color="gray" variant="soft">
            Go to monitor
          </ButtonLink>
        }
      >
        <Badge color={!!incident.resolved_at ? "green" : "red"}>
          {!!incident.resolved_at ? "Resolved" : "Ongoing"}
        </Badge>
      </PageTitle>

      <Grid columns="1" gap="5">
        <Card title="Cause">
          <Code color="gray">{incident.cause}</Code>
        </Card>

        <Grid gap="4" columns="2">
          <Stat label="Started at" value={Dates.format(incident.created_at, FULL_DATE_FORMAT)} />
          <Stat label="Duration" value={getDuration(incident.created_at, incident.resolved_at || "")} />
        </Grid>

        <div>
          <Heading size="4" mb="2">
            Checked URL
          </Heading>
          <Card>
            <Code color="gray">{incident.checked_url}</Code>
          </Card>
        </div>

        <div>
          <Heading size="4" mb="2">
            Request headers
          </Heading>
          <Card>
            <Code color="gray">{incident.request_headers}</Code>
          </Card>
        </div>

        <div>
          <Heading size="4" mb="2">
            Response headers
          </Heading>
          <Card title="Response headers">
            <Code color="gray">{incident.response_headers}</Code>
          </Card>
        </div>

        <div>
          <Heading size="4" mb="2">
            Response
          </Heading>
          <CheckResponseModal content={incident.response_body} />
        </div>
      </Grid>
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
