import Link from "next/link";
import type { ComponentProps } from "react";
import { ArrowIcon } from "./icons";

export type Variant = "primary" | "dark" | "outline-light" | "outline-dark" | "text";

const variantClasses: Record<Variant, string> = {
  primary: "bg-orange text-charcoal hover:bg-orange-bright",
  dark: "bg-charcoal text-white hover:bg-orange hover:text-charcoal",
  "outline-light": "border border-white/40 text-white hover:border-white hover:bg-white hover:text-charcoal",
  "outline-dark": "border border-charcoal/30 text-charcoal hover:border-charcoal hover:bg-charcoal hover:text-sand",
  text: "px-0! text-orange-deep hover:text-charcoal",
};

type ButtonLinkProps = ComponentProps<typeof Link> & {
  variant?: Variant;
  withArrow?: boolean;
};

export function buttonClassName(variant: Variant = "primary", className = ""): string {
  return `group inline-flex min-h-12 cursor-pointer items-center justify-center gap-3 px-6 text-sm font-semibold tracking-wide transition-colors duration-300 ${variantClasses[variant]} ${className}`;
}

export function ButtonLink({
  variant = "primary",
  withArrow = false,
  className = "",
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <Link className={buttonClassName(variant, className)} {...props}>
      <span>{children}</span>
      {withArrow && (
        <ArrowIcon className="size-4 transition-transform duration-300 ease-out-soft group-hover:translate-x-1" />
      )}
    </Link>
  );
}
