import { DashboardLayout } from "@@/common/layouts/DashboardLayout/DashboardLayout";
import { ssrApiClients } from "@@/common/libs/api";
import { Incident } from "@@/common/libs/apiClient";
import { GetServerSideProps } from "next";

interface Props {
  incident: Incident;
}

export default function IncidentPage({ incident }: Props) {
  return (
    <DashboardLayout
      breadcrumbReplacer={{ key: "[incidentId]", pathname: incident.id, label: incident.checked_url }}
      title={`Incident ${incident.checked_url}`}
    ></DashboardLayout>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async ({ req, params }) => {
  const client = ssrApiClients(req);
  const incidentId = params?.incidentId as string;

  try {
    const { data } = await client.IncidentsApiFactory.getIncidentByID(incidentId);

    return {
      props: {
        incident: data.data,
      },
    };
  } catch (error) {
    return {
      props: {
        incident: {} as any,
      },
    };
  }
};
