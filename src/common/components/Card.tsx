import { ComponentPropsWithoutRef } from "react";

interface Props extends ComponentPropsWithoutRef<"div"> {
  title: string;
}

export function Card({ children, title, className = "", ...props }: Props) {
  return (
    <div className={`border px-5 py-4 ${className}`} {...props}>
      <h2 className="text-sm text-zinc-500">{title}</h2>
      <div className="mt-2">{children}</div>
    </div>
  );
}
