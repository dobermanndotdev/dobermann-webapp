import styled from "@emotion/styled";
import { Select as RdSelect } from "@radix-ui/themes";
import { ComponentPropsWithoutRef } from "react";
import { InputContainer } from "./InputContainer";
import { InputErrorMessage } from "./InputErrorMessage";
import { Label } from "./Label";

interface Props extends ComponentPropsWithoutRef<"select"> {
  label?: string;
  error?: string;
  size?: number | undefined;
  defaultValue?: string | number;
  onValueChange(value: string): void;
}

export function Select({ label, error, children, onValueChange, defaultValue, disabled }: Props) {
  return (
    <InputContainer>
      {!!label && <Label>{label}</Label>}
      <SelectRoot disabled={disabled} onValueChange={onValueChange} defaultValue={defaultValue?.toString()}>
        <SelectTrigger className="select-trigger" />
        <RdSelect.Content align="end">{children}</RdSelect.Content>
      </SelectRoot>
      {error && <InputErrorMessage>{error}</InputErrorMessage>}
    </InputContainer>
  );
}

const SelectRoot = styled(RdSelect.Root)``;

const SelectTrigger = styled(RdSelect.Trigger)`
  cursor: pointer;
`;

export const SelectOption = RdSelect.Item;
