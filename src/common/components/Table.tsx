import styled from "@emotion/styled";
import { ComponentPropsWithoutRef, PropsWithChildren } from "react";

interface Props extends ComponentPropsWithoutRef<"table"> {}

export function Table({ children, ...props }: Props) {
  return (
    <Container className="table table-zebra" {...props}>
      {children}
    </Container>
  );
}

const Container = styled.table`
  width: 100%;
  border-spacing: 0;
  border-radius: 5px;
  border-collapse: separate;
  overflow: hidden;
  border: 1px solid ${(p) => p.theme.colors.zinc500};

  thead tr {
    font-size: ${(p) => p.theme.text.sm};
    background-color: ${(p) => p.theme.colors.zinc800};
  }

  thead tr th {
    border-bottom: 1px solid ${(p) => p.theme.colors.zinc500};

    &:last-child {
      border-right: 1px solid ${(p) => p.theme.colors.zinc500};
    }
  }

  tbody tr {
  }

  th,
  td {
    text-align: left;
    padding: var(--space-sm);
    color: var(--color-white);
    font-size: var(--space-sm);
  }
`;

export const TableRow = styled.tr`
  transition: background-color 0.25s;
  background-color: ${(p) => p.theme.colors.zinc850};
  cursor: ${(p) => (p.onClick ? "pointer" : "initial")};

  &:hover {
    background-color: ${(p) => (p.onClick ? p.theme.colors.zinc800 : p.theme.colors.zinc850)};
  }
`;

export function TableHead({ children, ...props }: PropsWithChildren) {
  return <thead {...props}>{children}</thead>;
}

export function TableCol({ children, ...props }: PropsWithChildren) {
  return <th {...props}>{children}</th>;
}

export function TableBody({ children, ...props }: PropsWithChildren) {
  return <tbody {...props}>{children}</tbody>;
}

export const TableCell = styled.td``;
