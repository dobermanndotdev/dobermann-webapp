import { Table, TableBody, TableCell, TableCol, TableHead, TableRow } from "@@/common/components/Table";
import { Incident } from "@@/common/libs/apiClient";
import { FULL_DATE_FORMAT, paths } from "@@/common/libs/contants";
import { Dates } from "@@/common/libs/dates";
import { useRouter } from "next/router";

interface Props {
  incidents: Incident[];
}

export function IncidentTable({ incidents }: Props) {
  const router = useRouter();

  return (
    <Table>
      <TableHead>
        <TableRow>
          {<TableCol>Status</TableCol>}
          {<TableCol>Cause</TableCol>}
          {<TableCol>Started at</TableCol>}
          {<TableCol>Duration</TableCol>}
        </TableRow>
      </TableHead>
      <TableBody>
        {incidents.map((incident) => (
          <TableRow
            key={incident.id}
            className="cursor-pointer"
            onClick={() => router.push(paths.toIncident(incident.id))}
          >
            <TableCell>
              {incident.resolved_at && <span className="badge badge-success">Resolved</span>}
              {!incident.resolved_at && <span className="badge badge-warning">Unresolved</span>}
            </TableCell>
            <TableCell>{incident.cause}</TableCell>
            <TableCell>{Dates.format(incident.created_at, FULL_DATE_FORMAT)}</TableCell>
            <TableCell>{getDuration(incident.created_at, incident.resolved_at || "")}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function getDuration(startedAt: string, resolvedAt: string): string {
  if (!resolvedAt) {
    return Dates.fromNow(startedAt);
  }

  const diff = Dates.new(resolvedAt).diff(Dates.new(startedAt));

  return Dates.duration(diff).humanize();
}
