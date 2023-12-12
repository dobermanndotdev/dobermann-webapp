"use client";

import { LOCALSTORAGE_AUTH_TOKEN } from "@@/common/libs/contants";
import { useEffect } from "react";

interface Props {
  token: string;
}

export function ClientSideTokenSetter({ token }: Props) {
  useEffect(() => {
    localStorage.setItem(LOCALSTORAGE_AUTH_TOKEN, token);
  }, [token]);
  return <></>;
}
