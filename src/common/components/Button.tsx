import { ComponentPropsWithoutRef } from "react";

interface Props extends ComponentPropsWithoutRef<"button"> {
  isLoading?: boolean;
}

export function Button({ children, isLoading }: Props) {
  return <button>{children}</button>;
}
