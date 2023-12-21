import { PropsWithChildren, ReactNode } from "react";

interface Props extends PropsWithChildren {
  title: string;
  CallToAction?: ReactNode;
}

export function PageTitle({ children, title, CallToAction }: Props) {
  return (
    <section className="mb-6">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-2xl">{title}</h2>
        {CallToAction}
      </div>
      <div className="text-sm">{children}</div>
    </section>
  );
}
