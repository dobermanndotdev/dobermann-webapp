import { SignedIn, UserButton } from "@clerk/nextjs";
import styled from "@emotion/styled";

export function Header() {
  return (
    <Container>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </Container>
  );
}

const Container = styled.header`
  display: flex;
  justify-content: flex-end;
  padding: ${(p) => p.theme.space.sm} ${(p) => p.theme.space.md};
`;
