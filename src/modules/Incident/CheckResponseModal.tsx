import { Button } from "@@/common/components/Button";
import { Code } from "@@/common/components/Code";
import { Dialog } from "@@/common/components/Dialog";

interface Props {
  content: string;
}

export function CheckResponseModal({ content }: Props) {
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button>View response</Button>
      </Dialog.Trigger>

      <Dialog.Content>
        <Dialog.Title>Response</Dialog.Title>

        <Dialog.Description mb="4">
          <Code color="gray">{content ? content : "No response captured"}</Code>
        </Dialog.Description>

        <Dialog.Close>
          <Button color="gray" variant="soft">
            Close
          </Button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Root>
  );
}
