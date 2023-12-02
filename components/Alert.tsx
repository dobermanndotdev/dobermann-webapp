import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  className?: string;
}

export function Alert({ children, className }: Props) {
  return (
    <div role="alert" className={`alert text-sm ${className}`}>
      <span>{children}</span>
    </div>
  );
}
