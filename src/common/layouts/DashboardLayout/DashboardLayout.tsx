import { Breadcrumbs } from "@@/common/components/Breadcrumbs";
import { Meta } from "@@/common/components/Meta";
import { PropsWithChildren } from "react";
import { Drawer } from "./Drawer";
import { Header } from "./Header";

interface Props extends PropsWithChildren {
  title: string;
  breadcrumbParam?: string;
  breadcrumbs?: boolean;
  breadcrumbTitle?: string;
}

export function DashboardLayout({ children, title, breadcrumbs = true, breadcrumbParam, breadcrumbTitle }: Props) {
  return (
    <>
      <Meta title={title} />
      <Header />
      <Drawer>
        {breadcrumbs && <Breadcrumbs className="mb-8" replacer={breadcrumbParam} replaceWith={breadcrumbTitle} />}
        {children}
      </Drawer>
    </>
  );
}
