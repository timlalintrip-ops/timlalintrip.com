import type { ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  id?: string;
  children?: ReactNode;
  tone?: "light" | "dark";
  className?: string;
};

export function SectionHeading({ eyebrow, title, id, children, tone = "light", className = "" }: SectionHeadingProps) {
  const eyebrowColor = tone === "light" ? "text-orange-deep" : "text-orange";
  const textColor = tone === "light" ? "text-muted" : "text-muted-inverse";

  return (
    <div className={`max-w-2xl ${className}`}>
      {eyebrow && <p className={`eyebrow mb-4 ${eyebrowColor}`}>{eyebrow}</p>}
      <h2 id={id} className="text-headline font-semibold">
        {title}
      </h2>
      {children && <div className={`mt-5 text-lg leading-relaxed ${textColor}`}>{children}</div>}
    </div>
  );
}
