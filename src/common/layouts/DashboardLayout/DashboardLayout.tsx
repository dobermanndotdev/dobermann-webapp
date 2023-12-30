import { Breadcrumbs, Replacer } from "@@/common/components/Breadcrumbs";
import { Meta } from "@@/common/components/Meta";
import { PropsWithChildren } from "react";
import { Drawer } from "./Drawer";
import { Header } from "./Header";

interface Props extends PropsWithChildren {
  title: string;
  breadcrumbs?: boolean;
  breadcrumbReplacer?: Replacer;
}

export function DashboardLayout({ children, title, breadcrumbs = true, breadcrumbReplacer }: Props) {
  const old = false;

  if (old) {
    return (
      <main>
        <Meta title={title} />
        <Drawer>
          {breadcrumbs && <Breadcrumbs className="mb-0" replacer={breadcrumbReplacer} />}
          {children}
        </Drawer>
      </main>
    );
  }

  return (
    <main className="min-h-screen borde grid grid-cols-[240px_auto] bg-zinc-950">
      <Meta title={title} />
      <Drawer />
      <section>
        <Header />
        <div className="px-4 py-6">{children}</div>
      </section>
    </main>
  );
}
