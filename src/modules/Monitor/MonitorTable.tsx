import { Badge } from "@@/common/components/Badge";
import {
  Table,
  TableBody,
  TableCell,
  TableCellLinkIcon,
  TableCol,
  TableHeader,
  TableRow,
} from "@@/common/components/Table";
import { Monitor } from "@@/common/libs/apiClient";
import { paths } from "@@/common/libs/contants";
import { useRouter } from "next/router";

interface Props {
  monitors: Monitor[];
}

export function MonitorTable({ monitors }: Props) {
  const router = useRouter();

  return (
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
  );
}

function formatCheckIntervalToMinutes(intervalInSeconds: number) {
  if (intervalInSeconds === 30) {
    return `${intervalInSeconds} seconds`;
  }

  return `${intervalInSeconds / 60} minutes`;
}
