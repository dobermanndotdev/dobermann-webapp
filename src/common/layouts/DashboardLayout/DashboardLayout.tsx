import { Replacer } from "@@/common/components/Breadcrumbs";
import { Meta } from "@@/common/components/Meta";
import styled from "@emotion/styled";
import { PropsWithChildren } from "react";
import { Drawer } from "./Drawer";
import { Header } from "./Header";

interface Props extends PropsWithChildren {
  title: string;
  breadcrumbs?: boolean;
  breadcrumbReplacer?: Replacer;
}

const Main = styled.main`
  display: flex;
  min-height: 100vh;
  justify-content: space-between;
  background-color: ${(props) => props.theme.colors.zinc900};
`;

const Content = styled.section`
  width: calc(100% - 240px);
`;

const View = styled.section`
  padding: ${(p) => p.theme.space.md};

  // 1024 + 264 (view width + sidebar width)
  @media screen and (min-width: 1264px) {
    width: 1024px;
    margin: 0 auto;
  }
`;

export function DashboardLayout({ children, title, breadcrumbs = true, breadcrumbReplacer }: Props) {
  return (
    <Main>
      <Meta title={title} />
      <Drawer />
      <div></div>
      <Content>
        <Header />
        <View>{children}</View>
      </Content>
    </Main>
  );
}
