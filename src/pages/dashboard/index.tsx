import { PageSubTitle } from "@@/common/components/PageSubTitle";
import { DashboardLayout } from "@@/common/layouts/DashboardLayout/DashboardLayout";

export default function DashboardHomePage() {
  return (
    <DashboardLayout title="Dashboard" breadcrumbs={false}>
      <PageSubTitle>Welcome to Dobermann</PageSubTitle>
    </DashboardLayout>
  );
}
