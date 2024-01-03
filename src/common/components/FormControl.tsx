import styled from "@emotion/styled";
import { ComponentPropsWithoutRef } from "react";
import { Label } from "./Label";

interface Props extends ComponentPropsWithoutRef<"div"> {
  label?: string;
  error?: string | undefined;
}

export function FormControl({ label, error, children, ...props }: Props) {
  return (
    <Container>
      {!!label && <Label>{label}</Label>}
      {children}
      {error && <ErrorMsg>{error}</ErrorMsg>}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(p) => p.theme.space.xs};
`;

const ErrorMsg = styled.span`
  font-size: ${(p) => p.theme.text.sm};
  color: ${(p) => p.theme.colors.danger};
`;
