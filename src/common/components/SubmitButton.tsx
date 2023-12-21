import { HTMLAttributes } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "./Button";

interface Props extends HTMLAttributes<HTMLButtonElement> {}

export function SubmitButton({ children, ...props }: Props) {
  const { pending } = useFormStatus();

  return (
    <Button isLoading={pending} {...props}>
      {children}
    </Button>
  );
}
