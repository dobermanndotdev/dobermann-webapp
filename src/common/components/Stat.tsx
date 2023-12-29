import { ReactNode } from "react";

interface Props {
  label: string;
  value: string | ReactNode;
}

export function Stat({ label, value }: Props) {
  return (
    <div className="stat border">
      <div className="text-zinc-500 text-sm">{label}</div>
      <div className="font-bold text-xl">{value}</div>
    </div>
  );
}
