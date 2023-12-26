import { ComponentPropsWithoutRef, PropsWithChildren } from "react";

interface Props extends ComponentPropsWithoutRef<"table"> {}
interface PropsTRow extends ComponentPropsWithoutRef<"tr"> {}

export function Table({ children, ...props }: Props) {
  return (
    <table className="table table-zebra" {...props}>
      {children}
    </table>
  );
}

export function TableRow({ children, ...props }: PropsTRow) {
  return <tr {...props}>{children}</tr>;
}

export function TableHead({ children, ...props }: PropsWithChildren) {
  return <thead {...props}>{children}</thead>;
}

export function TableCol({ children, ...props }: PropsWithChildren) {
  return <th {...props}>{children}</th>;
}

export function TableBody({ children, ...props }: PropsWithChildren) {
  return <tbody {...props}>{children}</tbody>;
}

export function TableCell({ children, ...props }: PropsWithChildren) {
  return <td {...props}>{children}</td>;
}
