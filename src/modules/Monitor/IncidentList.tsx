import { Table, TableBody, TableCell, TableCol, TableHead, TableRow } from "@@/common/components/Table";
import { Incident } from "@@/common/libs/apiClient";
import { paths } from "@@/common/libs/contants";
import { Dates } from "@@/common/libs/dates";
import { useRouter } from "next/router";

interface Props {
  incidents: Incident[];
}

export function IncidentList({ incidents }: Props) {
  const router = useRouter();

  return (
    <Table>
      <TableHead>
        <TableRow>
          {<TableCol>Status</TableCol>}
          {<TableCol>Started at</TableCol>}
          {<TableCol>Duration</TableCol>}
        </TableRow>
      </TableHead>
      <TableBody>
        {incidents.map((incident) => (
          <TableRow
            key={incident.id}
            onClick={() => router.push(paths.toIncident(incident.id))}
            className="cursor-pointer"
          >
            <TableCell>-</TableCell>
            <TableCell>{Dates.format(incident.created_at, "DD")}</TableCell>
            <TableCell>-</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
