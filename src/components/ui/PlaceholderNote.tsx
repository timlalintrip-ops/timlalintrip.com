import type { ReactNode } from "react";

const isDevelopment = process.env.NODE_ENV === "development";

type PlaceholderNoteProps = {
  title: string;
  /** Visitor-facing text. Omit for notes that should only appear during development. */
  children?: ReactNode;
  /** Editing instructions (file paths etc.), shown only in `next dev`, never in production. */
  devHint?: ReactNode;
  label?: string;
  tone?: "light" | "dark";
};

/**
 * Marks content that must be supplied by the business before launch.
 * Search the codebase for `PlaceholderNote` to find every outstanding item.
 */
export function PlaceholderNote({ title, children, devHint, label = "Coming soon", tone = "light" }: PlaceholderNoteProps) {
  const showDevHint = isDevelopment && devHint;
  if (!children && !showDevHint) return null;

  const colors =
    tone === "light"
      ? "border-charcoal/25 bg-sand-deep/60 text-charcoal"
      : "border-white/25 bg-white/5 text-white";

  return (
    <aside className={`border border-dashed p-5 sm:p-6 ${colors}`}>
      <p className="mb-2 text-[0.6875rem] font-semibold tracking-[0.18em] uppercase opacity-70">{label}</p>
      <p className="mb-1 font-semibold">{title}</p>
      {children && <div className="text-sm leading-relaxed opacity-80">{children}</div>}
      {showDevHint && (
        <div className="mt-3 border-t border-current/20 pt-3 text-sm leading-relaxed opacity-80">
          <span className="font-semibold">Development only: </span>
          {devHint}
        </div>
      )}
    </aside>
  );
}
