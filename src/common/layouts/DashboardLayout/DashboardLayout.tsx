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
  return (
    <>
      <Meta title={title} />
      <Header />
      <Drawer>
        {breadcrumbs && <Breadcrumbs className="mb-0" replacer={breadcrumbReplacer} />}
        {children}
      </Drawer>
    </>
  );
}
