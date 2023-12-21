import Head from "next/head";
import { ReactNode } from "react";

interface Props {
  title?: string;
  cover?: string;
  isHome?: boolean;
  description?: string;
  path?: string;
  children?: ReactNode | ReactNode[];
}

const BASE_TITLE = "Dobermann";

export function Meta({ isHome = false, title, path, description, cover, children }: Props) {
  const _title = isHome ? `${BASE_TITLE} — Endpoint monitoring` : `${title} — ${BASE_TITLE}`;
  const _path = path ? `https://dobermann.dev/${path}` : "https://dobermann.dev";
  const _cover = `https://dobermann.dev/${cover ? cover : "assets/img/dobermann.dev.png"}`;

  return (
    <Head>
      <title>{_title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={_title} />
      {!!description && <meta property="og:description" content={description} />}
      <meta property="og:url" content={_path} />
      <meta property="og:image" content={_cover} />
      <link rel="canonical" href={_path} />
      {children}
    </Head>
  );
}
