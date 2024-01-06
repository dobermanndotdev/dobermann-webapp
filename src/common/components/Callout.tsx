import { Callout as RadixCallout } from "@radix-ui/themes";
import { RadixColors } from "../styles/radix";

interface Props {
  content: string;
  color?: RadixColors;
}

export function Callout({ content, color = "green" }: Props) {
  return (
    <RadixCallout.Root color={color}>
      <RadixCallout.Icon></RadixCallout.Icon>
      <RadixCallout.Text>{content}</RadixCallout.Text>
    </RadixCallout.Root>
  );
}
