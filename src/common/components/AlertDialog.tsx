import { AlertDialog as RdAlertDialog } from "@radix-ui/themes";
import { ReactNode } from "react";
import { Button } from "./Button";
import { Flex } from "./Flex";

interface Props {
  title: string;
  open?: boolean;
  description?: string;
  defaultOpen?: boolean;
  confirmHandler(): void;
  isConfirmInProgress: boolean;
  onOpenChange?(open: boolean): void;

  Trigger?: ReactNode;
}

export default function AlertDialog({
  Trigger,
  title,
  description,
  isConfirmInProgress,
  confirmHandler,
  ...props
}: Props) {
  return (
    <RdAlertDialog.Root {...props}>
      {Trigger && <RdAlertDialog.Trigger>{Trigger}</RdAlertDialog.Trigger>}
      <RdAlertDialog.Content style={{ maxWidth: 450 }}>
        <RdAlertDialog.Title>{title}</RdAlertDialog.Title>
        {description && <RdAlertDialog.Description size="2">{description}</RdAlertDialog.Description>}

        <Flex gap="3" mt="4" justify="end">
          <RdAlertDialog.Cancel>
            <Button disabled={isConfirmInProgress} color="gray" variant="soft">
              Cancel
            </Button>
          </RdAlertDialog.Cancel>
          <Button color="red" disabled={isConfirmInProgress} isLoading={isConfirmInProgress} onClick={confirmHandler}>
            Confirm
          </Button>
        </Flex>
      </RdAlertDialog.Content>
    </RdAlertDialog.Root>
  );
}
