import { AccountMenu } from "@@/modules/Account/AccountMenu";
import styled from "@emotion/styled";

export function Header() {
  return (
    <Container>
      <div>
        <AccountMenu />
      </div>
    </Container>
  );
}

const Container = styled.header`
  display: flex;
  // border: 1px solid red;
  justify-content: flex-end;
  padding: ${(p) => p.theme.space.sm} ${(p) => p.theme.space.md};
`;
