import { Alert } from "@@/common/components/Alert";
import { Badge } from "@@/common/components/Badge";
import { Button } from "@@/common/components/Button";
import { PageTitle } from "@@/common/components/PageTitle";
import { Table, TableBody, TableCell, TableCol, TableHead, TableRow } from "@@/common/components/Table";
import { DashboardLayout } from "@@/common/layouts/DashboardLayout/DashboardLayout";
import { ssrApiClients } from "@@/common/libs/api";
import { Monitor } from "@@/common/libs/apiClient";
import { paths } from "@@/common/libs/contants";
import { ChevronRightIcon } from "@radix-ui/react-icons";
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
      <PageTitle title="Monitors" CallToAction={<Button href={paths.addMonitor}>Add Monitor</Button>} />

      {!hasMonitors && <Alert>You {"haven't"} created a monitor yet.</Alert>}

      <Table>
        <TableHead>
          <TableRow>
            <TableCol>Endpoint URL</TableCol>
            <TableCol>Status</TableCol>
            <TableCol>Check Interval</TableCol>
            <TableCol></TableCol>
          </TableRow>
        </TableHead>

        <TableBody>
          {monitors.map((monitor) => (
            <TableRow onClick={() => router.push(paths.toMonitor(monitor.id))} key={monitor.id}>
              <TableCell>{monitor.endpoint_url}</TableCell>
              <TableCell>
                {!monitor.is_paused && (
                  <Badge color="success">{!monitor.is_paused && monitor.is_endpoint_up ? "Up" : "Down"}</Badge>
                )}

                {monitor.is_paused && <Badge color="warning">Paused</Badge>}
              </TableCell>
              <TableCell>{formatCheckIntervalToMinutes(monitor.check_interval_in_seconds)} </TableCell>
              <TableCell style={{ textAlign: "right" }}>
                <ChevronRightIcon />
              </TableCell>
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
