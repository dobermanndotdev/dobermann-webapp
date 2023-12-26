import { PropsWithChildren } from "react";

export function PageSubTitle({ children }: PropsWithChildren) {
  return <h2 className="font-bold text-2xl">{children}</h2>;
}
