import { useRouter } from "next/router";

export default function NotFoundPage({}) {
  const router = useRouter();

  if (router.asPath.includes("/dashboard")) {
    router.push("/dashboard/404");
  }

  return <>Not found</>;
}
