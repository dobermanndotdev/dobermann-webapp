import styled from "@emotion/styled";
import { ComponentPropsWithoutRef } from "react";
import { Label } from "./Label";

interface Props extends ComponentPropsWithoutRef<"input"> {
  label?: string;
  error?: string | undefined;
}

export function InputField({ label, error, ...props }: Props) {
  return (
    <Container>
      {!!label && <Label>{label}</Label>}
      <Input {...props} />
      {error && <ErrorMsg>{error}</ErrorMsg>}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(p) => p.theme.space.xs};
`;

const Input = styled.input`
  border-radius: 3px;
  transition: outline 0.05s;
  font-size: ${(p) => p.theme.text.sm};
  color: ${(p) => p.theme.colors.white};
  padding: 10px ${(p) => p.theme.space.sm};
  background-color: ${(p) => p.theme.colors.zinc800};
  border: 1px solid ${(p) => p.theme.colors.zinc500};
  -webkit-appearance: none;
  appearance: none;

  &:focus {
    border-color: transparent;
    outline: 2px solid ${(p) => p.theme.colors.primary800};
  }
`;

const ErrorMsg = styled.span`
  font-size: ${(p) => p.theme.text.sm};
  color: ${(p) => p.theme.colors.danger};
`;
