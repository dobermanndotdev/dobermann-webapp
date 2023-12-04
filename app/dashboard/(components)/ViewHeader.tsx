import { PropsWithChildren, ReactNode } from "react";

interface Props extends PropsWithChildren {
  title: string;
  CallToAction?: ReactNode;
}

export function ViewHeader({ children, title, CallToAction }: Props) {
  return (
    <section>
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-bold text-2xl">{title}</h2>
        {CallToAction}
      </div>
      <div className="text-sm">{children}</div>
    </section>
  );
}
