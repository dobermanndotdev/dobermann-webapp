import { ComponentPropsWithoutRef } from "react";

interface Props extends ComponentPropsWithoutRef<"a"> {
  isLoading?: boolean;
}

export function ButtonLink({ className, children, isLoading, ...props }: Props) {
  return (
    <a role="button" className={`btn ${className}`} {...props}>
      {isLoading && <span className="loading loading-spinner loading-xs absolute"></span>}
      <span className={`${isLoading ? "opacity-0" : ""}`}>{children}</span>
    </a>
  );
}