import { css } from "@emotion/css";
import styled from "@emotion/styled";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import { Table as RdTable } from "@radix-ui/themes";
import { ComponentPropsWithoutRef } from "react";

export const Table = RdTable.Root;

export const TableBody = RdTable.Body;
export const TableCell = RdTable.Cell;
export const TableHeader = RdTable.Header;
export const TableCol = RdTable.ColumnHeaderCell;

export function TableRow({ children, onClick }: ComponentPropsWithoutRef<"tr">) {
  return <BaseTableRow onClick={onClick}>{children}</BaseTableRow>;
}

const BaseTableRow = styled(RdTable.Row)`
  cursor: ${(p) => (p.onClick ? "pointer" : "initial")};

  td {
    transition: background-color 0.25s;
  }

  &:hover {
    td {
      background-color: ${(p) => (p.onClick ? "var(--gray-a2)" : "initial")};
    }
  }
`;

export function TableCellLinkIcon() {
  return (
    <TableCell style={{ textAlign: "right" }}>
      <div
        className={css({
          display: "flex",
          height: "100%",
          alignItems: "center",
          justifyContent: "flex-end",
        })}
      >
        <ChevronRightIcon />
      </div>
    </TableCell>
  );
}
