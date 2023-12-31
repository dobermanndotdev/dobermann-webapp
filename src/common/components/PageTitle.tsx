import { PropsWithChildren, ReactNode } from "react";
import { Typography } from "./Typography";

interface Props extends PropsWithChildren {
  title: string;
  CallToAction?: ReactNode;
}

export function PageTitle({ children, title, CallToAction }: Props) {
  return (
    <section className="mb-6">
      <div className="flex justify-between items-center">
        <Typography variant="heading-3" as="h2">
          {title}
        </Typography>
        {CallToAction}
      </div>
      <div className="text-sm">{children}</div>
    </section>
  );
}
