import { paths } from "@@/common/libs/contants";
import { ExclamationTriangleIcon, HomeIcon, LaptopIcon, PersonIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {}

export function Drawer({ children }: Props) {
  const pathname = usePathname();

  return (
    <aside className="min-h-full border-r border-zinc-800 bg-zinc-900 relative">
      <div className="text-white px-4 py-5">
        <Link href={paths.home}>
          <h1 className="text-lg">Dobermann</h1>
        </Link>
      </div>

      <ul className="text-white">
        {links.map((link) => (
          <li key={link.path} className="text-sm">
            <Link
              href={link.path}
              className="h-full w-full flex gap-2 items-center px-4 py-2 hover:bg-zinc-800 transition-colors"
            >
              {link.icon}
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      <div></div>
    </aside>
  );
}

const links = [
  { label: "Home", icon: <HomeIcon />, path: paths.home },
  { label: "Monitors", icon: <LaptopIcon />, path: paths.monitors },
  { label: "Incidents", icon: <ExclamationTriangleIcon />, path: paths.incidents },
  { label: "Users", icon: <PersonIcon />, path: "/dashboard/users" },
];
