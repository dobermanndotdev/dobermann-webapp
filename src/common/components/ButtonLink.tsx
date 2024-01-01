import styled from "@emotion/styled";
import { ComponentPropsWithoutRef } from "react";
import { BaseButton } from "./Button";

interface Props extends ComponentPropsWithoutRef<"a"> {
  isLoading?: boolean;
}

export function ButtonLink({ className, children, isLoading, ...props }: Props) {
  return (
    <BaseButton href="" as="a">
      {isLoading && <span className="loading loading-spinner loading-xs absolute"></span>}
      <span className={`${isLoading ? "opacity-0" : ""}`}>{children}</span>
    </BaseButton>
  );
}

const Container = styled(BaseButton)``;
