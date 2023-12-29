import { Alert } from "@@/common/components/Alert";
import { PageTitle } from "@@/common/components/PageTitle";
import { DashboardLayout } from "@@/common/layouts/DashboardLayout/DashboardLayout";
import { GetServerSideProps } from "next";

interface Props {}

export default function IncidentsPage({}: Props) {
  return (
    <DashboardLayout title="Incidents">
      <PageTitle title="Incidents" />
      <Alert className="alert-warning">To be developed</Alert>
    </DashboardLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  return {
    props: {},
  };
};
