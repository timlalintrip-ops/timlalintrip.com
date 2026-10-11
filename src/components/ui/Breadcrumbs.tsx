import Link from "next/link";
import type { BreadcrumbItem } from "@/lib/structured-data";

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
  tone?: "light" | "dark";
};

/** Visible breadcrumb trail. The last item is the current page. */
export function Breadcrumbs({ items, tone = "light" }: BreadcrumbsProps) {
  const linkColor = tone === "light" ? "text-white/70 hover:text-white" : "text-muted hover:text-charcoal";
  const currentColor = tone === "light" ? "text-white" : "text-charcoal";

  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium tracking-wide">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.path} className="flex items-center gap-2">
              {isLast ? (
                <span aria-current="page" className={currentColor}>
                  {item.name}
                </span>
              ) : (
                <>
                  <Link href={item.path} className={`transition-colors ${linkColor}`}>
                    {item.name}
                  </Link>
                  <span aria-hidden="true" className="text-orange">
                    /
                  </span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
