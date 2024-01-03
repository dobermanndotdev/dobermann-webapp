import { Alert } from "@@/common/components/Alert";
import { Badge } from "@@/common/components/Badge";
import { ButtonLink } from "@@/common/components/ButtonLink";
import { PageTitle } from "@@/common/components/PageTitle";
import {
  Table,
  TableBody,
  TableCell,
  TableCellLinkIcon,
  TableCol,
  TableHeader,
  TableRow,
} from "@@/common/components/Table";
import { DashboardLayout } from "@@/common/layouts/DashboardLayout/DashboardLayout";
import { ssrApiClients } from "@@/common/libs/api";
import { Monitor } from "@@/common/libs/apiClient";
import { paths } from "@@/common/libs/contants";
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

      {!hasMonitors && <Alert>You {"haven't"} created a monitor yet.</Alert>}

      <Table variant="surface">
        <TableHeader>
          <TableRow>
            <TableCol>Endpoint URL</TableCol>
            <TableCol>Status</TableCol>
            <TableCol>Check Interval</TableCol>
            <TableCol></TableCol>
          </TableRow>
        </TableHeader>

        <TableBody>
          {monitors.map((monitor) => (
            <TableRow onClick={() => router.push(paths.toMonitor(monitor.id))} key={monitor.id}>
              <TableCell>{monitor.endpoint_url}</TableCell>
              <TableCell>
                {!monitor.is_paused && (
                  <Badge color={monitor.is_endpoint_up ? "green" : "red"}>
                    {!monitor.is_paused && monitor.is_endpoint_up ? "Up" : "Down"}
                  </Badge>
                )}

                {monitor.is_paused && <Badge color="orange">Paused</Badge>}
              </TableCell>
              <TableCell>{formatCheckIntervalToMinutes(monitor.check_interval_in_seconds)} </TableCell>
              <TableCellLinkIcon />
            </TableRow>
          ))}
        </TableBody>
      </Table>
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

function formatCheckIntervalToMinutes(intervalInSeconds: number) {
  if (intervalInSeconds === 30) {
    return `${intervalInSeconds} seconds`;
  }

  return `${intervalInSeconds / 60} minutes`;
}
