import { ButtonLink } from "@@/common/components/ButtonLink";
import { Callout } from "@@/common/components/Callout";
import { PageTitle } from "@@/common/components/PageTitle";

import { DashboardLayout } from "@@/common/layouts/DashboardLayout/DashboardLayout";
import { ssrApiClients } from "@@/common/libs/api";
import { Monitor } from "@@/common/libs/apiClient";
import { paths } from "@@/common/libs/contants";
import { MonitorTable } from "@@/modules/Monitor/MonitorTable";
import { PlusIcon } from "@radix-ui/react-icons";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

interface Props {
  monitors: Monitor[];
}

export default function MonitorsPage({ monitors }: Props) {
  const hasMonitors = !!monitors.length;
  const router = useRouter();

  return (
    <DashboardLayout title="Monitors">
      <PageTitle
        title="Monitors"
        CallToAction={
          <ButtonLink href={paths.addMonitor}>
            <PlusIcon />
            Add Monitor
          </ButtonLink>
        }
      />
      {hasMonitors ? (
        <MonitorTable monitors={monitors} />
      ) : (
        <Callout content="You haven't added a monitor yet." color="orange" />
      )}
    </DashboardLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { data } = await ssrApiClients(req).MonitorsApiFactory.getAllMonitors();

  return {
    props: {
      monitors: data.data,
    },
  };
};
