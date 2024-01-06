import { Callout } from "@@/common/components/Callout";
import { PageTitle } from "@@/common/components/PageTitle";
import { DashboardLayout } from "@@/common/layouts/DashboardLayout/DashboardLayout";
import { ssrApiClients } from "@@/common/libs/api";
import { Incident } from "@@/common/libs/apiClient";
import { IncidentTable } from "@@/modules/Incident/IncidentTable";
import { GetServerSideProps } from "next";

interface Props {
  incidents: Incident[];
}

export default function IncidentsPage({ incidents }: Props) {
  return (
    <DashboardLayout title="Incidents">
      <PageTitle title="Incidents" />

      {!!incidents.length ? (
        <IncidentTable incidents={incidents} />
      ) : (
        <Callout content="So far we haven't' registered any incident." color="green" />
      )}
    </DashboardLayout>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async ({ req }) => {
  const client = ssrApiClients(req);

  try {
    const { data } = await client.IncidentsApiFactory.getAllIncidents();

    return {
      props: {
        incidents: data.data,
      },
    };
  } catch (error) {
    return {
      props: {
        incidents: [],
      },
    };
  }
};
