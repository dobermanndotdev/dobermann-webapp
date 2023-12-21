import { PropsWithChildren } from "react";
import { Meta } from "../components/Meta";

interface Props extends PropsWithChildren {
  title: string;
}

export function AuthLayout({ children, title }: Props) {
  return (
    <>
      <Meta title={title} />
      <div className="w-full flex justify-center items-center h-screen">
        <div className="w-11/12 md:w-2/4 lg:w-2/6 border px-8 py-10">{children}</div>
      </div>
    </>
  );
}
