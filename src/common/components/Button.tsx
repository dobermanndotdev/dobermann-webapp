import styled from "@emotion/styled";
import { Button as RButton, Responsive } from "@radix-ui/themes";
import { ComponentPropsWithoutRef } from "react";
import { RadixColors } from "../styles/radix";
import { Spinner } from "./Spinner";

interface Props extends ComponentPropsWithoutRef<"button"> {
  href?: string;
  asChild?: false;
  color?: RadixColors;
  isLoading?: boolean;
  highContrast?: boolean;
  size?: Responsive<"1" | "2" | "3" | "4">;
  variant?: "classic" | "solid" | "soft" | "surface" | "outline" | "ghost";
}

export function Button({ size = "2", asChild = false, children, isLoading, href, ...props }: Props) {
  return (
    <Container {...props}>
      <Label data-is-loading={isLoading}>{children}</Label>
      {isLoading && (
        <SpinnerContainer>
          <Spinner />
        </SpinnerContainer>
      )}
    </Container>
  );
}

const Label = styled.span`
  &[data-is-loading="true"] {
    opacity: 0;
  }
`;

const SpinnerContainer = styled.div`
  top: 50%;
  left: 50%;
  display: flex;
  position: absolute;
  align-items: center;
  transform: translate(-50%, -50%);
`;

const Container = styled(RButton)`
  cursor: pointer;
  position: relative;
`;

export const BaseButton = Container;
