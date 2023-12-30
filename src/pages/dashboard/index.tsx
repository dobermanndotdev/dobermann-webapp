import { Typography } from "@@/common/components/Typography";
import { DashboardLayout } from "@@/common/layouts/DashboardLayout/DashboardLayout";

export default function DashboardHomePage() {
  return (
    <DashboardLayout title="Dashboard" breadcrumbs={false}>
      <Typography as="h1" variant="heading-3">
        Welcome to Dobermann
      </Typography>
    </DashboardLayout>
  );
}
