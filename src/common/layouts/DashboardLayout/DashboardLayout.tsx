import { PropsWithChildren } from "react";
import { Drawer } from "./Drawer";
import { Header } from "./Header";

export function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Header />
      <Drawer>{children}</Drawer>
    </>
  );
}
