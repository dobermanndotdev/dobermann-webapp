import { PropsWithChildren } from "react";

type TextVariant = "body" | "caption" | "label" | "heading-1" | "heading-2" | "heading-3";

interface Props extends PropsWithChildren {
  as?: HTMLTextElement;
  variant?: TextVariant;
}

const variants: Record<string, string> = {
  body: "",
  label: "",
  caption: "",
  "heading-1": "text-3xl",
  "heading-2": "text-2xl",
  "heading-3": "text-xl",
};

export function Typography({ children, variant = "body", as: BaseComponent = "span" }: Props) {
  return <BaseComponent className={`text-white ${variants[variant]}`}>{children}</BaseComponent>;
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
