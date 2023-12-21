import { Meta } from "@@/common/components/Meta";
import { PropsWithChildren } from "react";
import { Drawer } from "./Drawer";
import { Header } from "./Header";

interface Props extends PropsWithChildren {
  title: string;
}

export function DashboardLayout({ children, title }: Props) {
  return (
    <>
      <Meta title={title} />
      <Header />
      <Drawer>{children}</Drawer>
    </>
  );
}
