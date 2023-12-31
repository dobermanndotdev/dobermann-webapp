import styled from "@emotion/styled";
import { ComponentPropsWithoutRef } from "react";
import { InputContainer } from "./InputContainer";
import { InputErrorMessage } from "./InputErrorMessage";
import { Label } from "./Label";

interface Props extends ComponentPropsWithoutRef<"select"> {
  label?: string;
  error?: string;
}

export function Select({ label, error, className, children, ...props }: Props) {
  return (
    <InputContainer>
      {!!label && <Label>{label}</Label>}
      <SelectField {...props} className={`select select-bordered w-full ${className}`}>
        {children}
      </SelectField>
      {error && <InputErrorMessage>{error}</InputErrorMessage>}
    </InputContainer>
  );
}

interface SelectOptionProps extends ComponentPropsWithoutRef<"option"> {}

export function SelectOption({ children, ...props }: SelectOptionProps) {
  return <option {...props}>{children}</option>;
}

const SelectField = styled.select`
  appearance: none;
  -webkit-appearance: none;
  cursor: pointer;
  border-radius: 3px;
  transition: outline 0.05s;
  font-size: ${(p) => p.theme.text.sm};
  color: ${(p) => p.theme.colors.white};
  padding: 10px ${(p) => p.theme.space.sm};
  background-color: ${(p) => p.theme.colors.zinc800};
  border: 1px solid ${(p) => p.theme.colors.zinc500};

  &:focus {
    border-color: transparent;
    outline: 2px solid ${(p) => p.theme.colors.primary800};
  }
`;
