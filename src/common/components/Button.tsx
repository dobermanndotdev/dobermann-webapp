import styled from "@emotion/styled";
import { ComponentPropsWithoutRef } from "react";
import { theme } from "../styles/theme";
import { Spinner } from "./Spinner";

interface Props extends ComponentPropsWithoutRef<"button"> {
  isLoading?: boolean;
  size?: "sm" | "md" | "lg";
  color?: "primary" | "secondary";
  variant?: "text" | "contained" | "outlined";
  href?: string;
}

export function Button({ children, isLoading, href, ...props }: Props) {
  const { size = "sm", color = "primary", variant = "contained", ...rest } = props;

  return (
    <Container
      href={href}
      data-size={size}
      data-color={color}
      data-variant={variant}
      as={href ? "a" : "button"}
      {...rest}
    >
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
  position: absolute;
  transform: translate(-50%, -50%);
`;

const Container = styled.button<Props>`
  cursor: pointer;
  appearance: none;
  font-weight: bold;
  position: relative;
  border-radius: 3px;
  text-decoration: none;
  transition: all 0.25s;
  -webkit-appearance: none;
  border: 1px solid transparent;
  color: ${(p) => p.theme.colors.white};

  &[data-color="primary"] {
    background-color: ${(p) => p.theme.colors.primary900};

    &:hover {
      background-color: ${(p) => p.theme.colors.primary800};
    }
  }

  &[data-color="secondary"] {
    border-color: ${(p) => p.theme.colors.zinc500};
    background-color: ${(p) => p.theme.colors.zinc800};

    &:hover {
      border-color: ${(p) => p.theme.colors.zinc200};
    }
  }

  &[data-variant="outlined"] {
    border-color: ${(p) => p.theme.colors.zinc500};
    background-color: transparent;

    &:hover {
      border-color: ${(p) => p.theme.colors.zinc200};
      background-color: transparent;
    }
  }

  &[data-size="sm"] {
    padding: 8px ${theme.space.lg};
    font-size: ${(p) => p.theme.text.sm};
  }

  &[data-size="md"] {
    font-size: ${(p) => p.theme.text.sm};
    padding: ${theme.space.sm} ${theme.space["2xl"]};
  }

  &[data-size="lg"] {
    font-size: ${(p) => p.theme.text.sm};
    padding: ${theme.space.md} ${theme.space["3xl"]};
  }

  :focus {
    outline: none;
  }
`;

export const BaseButton = Container;
