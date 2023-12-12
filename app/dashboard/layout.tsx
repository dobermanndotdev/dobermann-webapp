import { PropsWithChildren } from "react";

import { COOKIE_AUTH_TOKEN } from "@@/common/libs/contants";
import { cookies } from "next/headers";
import { ClientSideTokenSetter } from "./(components)/ClientSideTokenSetter";
import { Drawer } from "./(components)/Drawer";
import { Header } from "./(components)/Header";

export default async function Layout({ children }: PropsWithChildren) {
  const token = getAuthenticationToken();

  return (
    <>
      <ClientSideTokenSetter token={token} />
      <Header />
      <Drawer>{children}</Drawer>
    </>
  );
}

function getAuthenticationToken() {
  const token = cookies().get(COOKIE_AUTH_TOKEN);
  return token?.value as string;
}
