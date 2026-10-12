import Link from "next/link";
import { parseRichText } from "@/content/guides";

/** Renders `[text](/path)` markers as links; everything else as plain text. */
export function RichText({ text }: { text: string }) {
  return parseRichText(text).map((part, index) => {
    if (!part.href) return part.text;
    return part.href.startsWith("/") ? (
      <Link key={index} href={part.href}>
        {part.text}
      </Link>
    ) : (
      <a key={index} href={part.href} target="_blank" rel="noopener noreferrer">
        {part.text}
      </a>
    );
  });
}
