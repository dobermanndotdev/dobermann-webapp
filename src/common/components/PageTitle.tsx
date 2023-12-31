import styled from "@emotion/styled";
import { PropsWithChildren, ReactNode } from "react";
import { Typography } from "./Typography";

interface Props extends PropsWithChildren {
  title: string;
  CallToAction?: ReactNode;
}

export function PageTitle({ children, title, CallToAction }: Props) {
  return (
    <Container>
      <TitleAndAction>
        <Typography variant="heading-3" as="h2">
          {title}
        </Typography>
        {CallToAction}
      </TitleAndAction>
      <div>{children}</div>
    </Container>
  );
}

const Container = styled.section`
  margin-bottom: ${(p) => p.theme.space.md};
`;

const TitleAndAction = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
