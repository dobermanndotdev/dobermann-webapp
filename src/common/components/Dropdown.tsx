import styled from "@emotion/styled";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { PropsWithChildren, ReactNode } from "react";

interface Props extends PropsWithChildren {
  Trigger: ReactNode;
  onOpenChange?(open: boolean): void;
}

export function Dropdown({ Trigger, children, onOpenChange }: Props) {
  return (
    <DropdownMenu.Root onOpenChange={onOpenChange}>
      <DropdownTrigger>{Trigger}</DropdownTrigger>

      <DropdownMenu.Portal>
        <Content align="end">{children}</Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

const Content = styled(DropdownMenu.Content)`
  border-radius: 5px;
  padding: var(--space-xs);
  border: 1px solid var(--color-zinc-800);
  background-color: var(--color-zinc-900);
`;

export const DropdownLabel = styled(DropdownMenu.Label)`
  font-size: var(--text-sm);
  color: var(--color-white);
  padding: 4px var(--space-xs);
`;

export const DropdownItem = styled(DropdownMenu.Item)`
  cursor: pointer;
  border-radius: 3px;
  font-size: var(--text-sm);
  color: var(--color-white);
  padding: 4px var(--space-xs);

  &:not(:last-child) {
    margin-bottom: var(--space-xs);
  }

  &:hover {
    outline: none;
    background-color: var(--color-zinc-700);
  }
`;

export const DropdownSeparator = styled(DropdownMenu.Separator)`
  width: 100%;
  height: 2px;
  margin: var(--space-sm) 0;
  background-color: var(--color-zinc-800);
`;

const DropdownTrigger = styled(DropdownMenu.Trigger)`
  border: none;
  cursor: pointer;
  background-color: transparent;
`;
