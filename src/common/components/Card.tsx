import { ComponentPropsWithoutRef } from "react";

interface Props extends ComponentPropsWithoutRef<"div"> {
  title: string;
}

export function Card({ children, title, className, ...props }: Props) {
  return (
    <div className={`border px-5 py-4 ${className}`} {...props}>
      <h2 className="font-bold">{title}</h2>
      <div>{children}</div>
    </div>
  );
}
