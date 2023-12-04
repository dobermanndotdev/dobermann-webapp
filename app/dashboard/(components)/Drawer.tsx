"use client";

import { paths } from "@@/common/libs/contants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PropsWithChildren } from "react";
import { Icon } from "./Icon";

export function Drawer({ children }: PropsWithChildren) {
  const pathname = usePathname();

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <section className="drawer-content px-10 py-10">{children}</section>
      <div className="drawer-side min-h-full border-r">
        <ul className="menu text-base-content w-60">
          {links.map((link) => (
            <li key={link.path} className="text-sm">
              <Link href={link.path} className={pathname.includes(link.path) ? "active" : ""}>
                {link.icon}
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const links = [{ label: "Monitors", icon: <Icon name="ri-window-fill" />, path: paths.monitors }];
