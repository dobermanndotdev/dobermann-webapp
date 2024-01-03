import { PageTitle } from "@@/common/components/PageTitle";
import { DashboardLayout } from "@@/common/layouts/DashboardLayout/DashboardLayout";

interface Props {}

export default function NotFoundPage({}: Props) {
  return (
    <DashboardLayout title={"Page not found"}>
      <PageTitle title="Page not found" />
    </DashboardLayout>
  );
}
