type JsonLdProps = {
  data: Record<string, unknown>;
};

/** Serialises structured data safely (escapes `<` to prevent script injection). */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
