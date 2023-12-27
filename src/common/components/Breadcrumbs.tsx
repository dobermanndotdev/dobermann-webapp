import Link from "next/link";
import { useRouter } from "next/router";
import { useMemo } from "react";

export interface Replacer {
  key: string;
  pathname: string;
  label: string;
}

interface Props {
  replacer?: Replacer;
  className?: string;
}

export function Breadcrumbs({ className, replacer }: Props) {
  const router = useRouter();
  const paths = useMemo(() => {
    const parts = router.pathname.split("/").filter((item) => item);
    const values: { path: string; label: string }[] = [];

    parts.forEach((value, index) => {
      if (index === 0) {
        values.push({ path: `/${value}`, label: value });
      } else if (replacer) {
        const label = value.replace(replacer.key, replacer.label || replacer.pathname);
        const pathname = value.replace(replacer.key, replacer.pathname);
        values.push({ path: `${values[index - 1].path}/${pathname}`, label });
      } else {
        values.push({ path: `${values[index - 1].path}/${value}`, label: value });
      }
    });

    return values;
  }, [router.pathname, replacer]);

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
