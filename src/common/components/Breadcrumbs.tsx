import Link from "next/link";
import { useRouter } from "next/router";
import { useMemo } from "react";

interface Props {
  replacer?: string;
  replaceWith?: string;
  className?: string;
}

export function Breadcrumbs({ className, replacer = "", replaceWith = "" }: Props) {
  const router = useRouter();
  const paths = useMemo(() => {
    const parts = router.pathname.split("/").filter((item) => item);
    const values: { path: string; label: string }[] = [];

    parts.forEach((value, index) => {
      if (index === 0) {
        values.push({ path: `/${value}`, label: value });
      } else {
        const valueReplaced = value.replace(replacer, replaceWith);
        values.push({ path: `${values[index - 1].path}/${valueReplaced}`, label: valueReplaced });
      }
    });

    return values;
  }, [router.pathname, replaceWith, replacer]);

  return (
    <div className={`text-sm breadcrumbs ${className}`}>
      <ul>
        {paths.map((item, index) => (
          <li key={item.path}>
            {index === paths.length - 1 ? (
              <span className="text-neutral-600">{item.label}</span>
            ) : (
              <Link className="text-neutral-300 hover:text-neutral-600" href={item.path}>
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
