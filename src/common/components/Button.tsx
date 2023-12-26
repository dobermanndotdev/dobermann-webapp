import { ComponentPropsWithoutRef } from "react";

interface Props extends ComponentPropsWithoutRef<"button"> {
  isLoading?: boolean;
}

export function Button({ className, children, isLoading, ...props }: Props) {
  return (
    <button className={`btn ${className}`} {...props}>
      {isLoading && <span className="loading loading-spinner loading-xs absolute"></span>}
      <span className={`${isLoading ? "opacity-0" : ""}`}>{children}</span>
    </button>
  );
}
