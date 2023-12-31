import styled from "@emotion/styled";
import { PropsWithChildren } from "react";

type TextVariant = "body" | "caption" | "label" | "heading-1" | "heading-2" | "heading-3";

interface Props extends PropsWithChildren {
  as?: HTMLTextElement;
  variant?: TextVariant;
}

const Heading1 = styled.span`
  font-weight: 500;
  color: var(--color-white);
  font-size: var(--text-3xl);
`;

const Heading2 = styled.span`
  font-weight: 500;
  color: var(--color-white);
  font-size: var(--text-2xl);
`;

const Heading3 = styled.span`
  font-weight: 500;
  color: var(--color-white);
  font-size: var(--text-xl);
`;

export function Typography({ children, variant = "body", as: BaseComponent = "span" }: Props) {
  switch (variant) {
    case "body":
      return <></>;
    case "heading-1":
      return <Heading1 as={BaseComponent}>{children}</Heading1>;
    case "heading-2":
      return <Heading2 as={BaseComponent}>{children}</Heading2>;
    case "heading-3":
      return <Heading3 as={BaseComponent}>{children}</Heading3>;
    default:
      return <></>;
  }
}

type HTMLTextElement =
  | "a"
  | "abbr"
  | "address"
  | "b"
  | "bdi"
  | "bdo"
  | "blockquote"
  | "cite"
  | "code"
  | "data"
  | "dfn"
  | "em"
  | "i"
  | "kbd"
  | "mark"
  | "q"
  | "rp"
  | "rt"
  | "ruby"
  | "s"
  | "samp"
  | "small"
  | "span"
  | "strong"
  | "sub"
  | "sup"
  | "time"
  | "u"
  | "var"
  | "wbr"
  | "abbr"
  | "b"
  | "cite"
  | "code"
  | "del"
  | "dfn"
  | "em"
  | "i"
  | "ins"
  | "mark"
  | "q"
  | "s"
  | "small"
  | "span"
  | "strong"
  | "sub"
  | "sup"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6";
