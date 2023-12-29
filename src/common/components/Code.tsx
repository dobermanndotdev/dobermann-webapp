import { PropsWithChildren, useState } from "react";

interface Props extends PropsWithChildren {
  content: string;
  collapsable?: boolean;
}

export function Code({ content, collapsable = false }: Props) {
  const [show, setShow] = useState(false);

  if (`${content}`.length < 1000 || !collapsable) {
    return (
      <pre className="border bg-slate-50 p-4 overflow-x-auto">
        <code className="text-sm text-wrap">{content}</code>
      </pre>
    );
  }

  return (
    <details className="collapse p-0 m-0">
      <summary className="w-[200px] btn btn-sm btn-outline collapse-title p-0 mb-4 hover:border-0">
        <div className="flex border h-full items-center justify-center" onClick={() => setShow((v) => !v)}>
          {show ? "Hide" : "Show"}
        </div>
      </summary>
      <div className="collapse-content p-0 m-0">
        <pre className="border bg-slate-50 p-4 overflow-x-auto">
          <code className="text-sm text-wrap">{content}</code>
        </pre>
      </div>
    </details>
  );
}
