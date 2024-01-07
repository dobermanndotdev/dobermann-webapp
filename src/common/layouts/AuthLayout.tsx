import { PropsWithChildren } from "react";
import { Card } from "../components/Card";
import { Meta } from "../components/Meta";
import { styled } from "../styles/emotion";

interface Props extends PropsWithChildren {
  title: string;
}

export function AuthLayout({ children, title }: Props) {
  return (
    <Container>
      <Meta title={title} />
      <AuthContainer size="5">{children}</AuthContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  align-items: center;
  justify-content: center;
`;

const AuthContainer = styled(Card)`
  width: 420px;
`;
