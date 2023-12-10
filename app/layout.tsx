import "@@/common/styles/globals.css";
import type { Metadata } from "next";
import { PropsWithChildren } from "react";
import "remixicon/fonts/remixicon.css";

export const metadata: Metadata = {
  title: "Dobermann",
  description: "Endpoint monitoring at scale",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest"></link>
      <body>{children}</body>
    </html>
  );
}
