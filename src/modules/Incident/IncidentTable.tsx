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
import { Incident } from "@@/common/libs/apiClient";
import { FULL_DATE_FORMAT, paths } from "@@/common/libs/contants";
import { Dates } from "@@/common/libs/dates";
import { useRouter } from "next/router";
import { getDuration } from "./lib";

interface Props {
  incidents: Incident[];
}

export function IncidentTable({ incidents }: Props) {
  const router = useRouter();

  return (
    <Table variant="surface">
      <TableHeader>
        <TableRow>
          <TableCol>Status</TableCol>
          <TableCol>Cause</TableCol>
          <TableCol>Started at</TableCol>
          <TableCol>Duration</TableCol>
          <TableCol></TableCol>
        </TableRow>
      </TableHeader>

      <TableBody>
        {incidents.map((incident) => (
          <TableRow onClick={() => router.push(paths.toIncident(incident.id))} key={incident.id}>
            <TableCell>
              <Badge color={incident.resolved_at ? "green" : "red"}>
                {incident.resolved_at ? "Resolved" : "Ongoing"}
              </Badge>
            </TableCell>
            <TableCell>{incident.cause}</TableCell>
            <TableCell>{Dates.format(incident.created_at, FULL_DATE_FORMAT)}</TableCell>
            <TableCell>{getDuration(incident.created_at, incident.resolved_at || "")}</TableCell>
            <TableCellLinkIcon />
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
