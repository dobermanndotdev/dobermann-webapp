import { Badge } from "@@/common/components/Badge";
import { Text } from "@@/common/components/Text";
import { paths } from "@@/common/libs/contants";
import styled from "@emotion/styled";
import { ExclamationTriangleIcon, HomeIcon, LaptopIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Drawer() {
  const pathname = usePathname();

  return (
    <Base>
      <LogoLink href={paths.home}>
        <Text size="4">Dobermann</Text>
        <BetaBadge color="orange">
          <Text size="1"> Beta</Text>
        </BetaBadge>
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
  // { label: "Users", icon: <PersonIcon />, path: "/dashboard/users" },
];

const BetaBadge = styled(Badge)`
  height: 20px;
`;

const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  gap: ${(p) => p.theme.space.xs};
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
