import { ReactNode } from "react";
import { Card } from "./Card";
import { Heading } from "./Heading";
import { Text } from "./Text";

interface Props {
  label: string;
  value: string | ReactNode;
}

export function Stat({ label, value }: Props) {
  return (
    <Card size="2">
      <Text size="1">{label}</Text>
      <Heading>{value}</Heading>
    </Card>
  );
}
