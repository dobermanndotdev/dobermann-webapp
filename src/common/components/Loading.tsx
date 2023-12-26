interface Props {
  className?: string;
  size?: "xs" | "md";
}

export function Loading({ className, size = "md" }: Props) {
  return <span className={`loading loading-spinner loading-${size} ${className}`}></span>;
}
