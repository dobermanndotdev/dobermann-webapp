import { Callout as RadixCallout } from "@radix-ui/themes";

interface Props {
  content: string;
}

export function Callout({content}: Props) {
  return (
    <RadixCallout.Root>
      <RadixCallout.Icon></RadixCallout.Icon>
      <RadixCallout.Text>{content}</RadixCallout.Text>
    </RadixCallout.Root>
  );
}
