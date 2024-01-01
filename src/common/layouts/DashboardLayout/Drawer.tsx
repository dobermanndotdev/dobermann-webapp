import { paths } from "@@/common/libs/contants";
import styled from "@emotion/styled";
import { ExclamationTriangleIcon, HomeIcon, LaptopIcon, PersonIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Drawer() {
  const pathname = usePathname();

  return (
    <Base>
      <LogoLink href={paths.home}>
        <h1>Dobermann</h1>
      </LogoLink>

      <Menu>
        {links.map((link) => (
          <li key={link.path}>
            <Link href={link.path} className={`${pathname.startsWith(link.path) ? "drawer-menu-item--active" : ""}`}>
              {link.icon}
              {link.label}
            </Link>
          </li>
        ))}
      </Menu>
    </Base>
  );
}

const links = [
  { label: "Home", icon: <HomeIcon />, path: paths.home },
  { label: "Monitors", icon: <LaptopIcon />, path: paths.monitors },
  { label: "Incidents", icon: <ExclamationTriangleIcon />, path: paths.incidents },
  { label: "Users", icon: <PersonIcon />, path: "/dashboard/users" },
];

const LogoLink = styled(Link)`
  text-decoration: none;
  font-size: ${(p) => p.theme.text.xs};
  color: ${(p) => p.theme.colors.white};
`;

const Base = styled.aside`
  top: 0;
  left: 0;
  width: 240px;
  height: 100%;
  position: fixed;
  padding: ${(props) => props.theme.space.md};
  color: ${(props) => props.theme.colors.light};
  background-color: ${(props) => props.theme.colors.zinc800};
  border-right: 1px solid ${(props) => props.theme.colors.zinc700};
`;

const Menu = styled.ul`
  margin-top: ${(p) => p.theme.space.md};

  li {
    list-style: none;
    margin-bottom: ${(p) => p.theme.space.xs};
  }

  a {
    display: flex;
    font-size: 14px;
    align-items: center;
    border-radius: 5px;
    text-decoration: none;
    transition: background-color 0.25s;
    gap: ${(props) => props.theme.space.xs};
    padding: ${(props) => props.theme.space.xs};
    color: ${(props) => props.theme.colors.white};

    &:hover {
      background-color: ${(props) => props.theme.colors.zinc700};
    }
  }

  .drawer-menu-item--active {
    background-color: ${(props) => props.theme.colors.zinc700};
  }
`;
