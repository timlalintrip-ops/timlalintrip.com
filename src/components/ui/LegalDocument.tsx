import type { ReactNode } from "react";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, jsonLdGraph, type BreadcrumbItem } from "@/lib/structured-data";
import { PageHero } from "./PageHero";
import { PlaceholderNote } from "./PlaceholderNote";

type LegalDocumentProps = {
  title: string;
  intro: string;
  breadcrumbs: BreadcrumbItem[];
  reviewed: boolean;
  children: ReactNode;
};

export function LegalDocument({ title, intro, breadcrumbs, reviewed, children }: LegalDocumentProps) {
  return (
    <>
      <JsonLd data={jsonLdGraph(breadcrumbSchema(breadcrumbs))} />
      <PageHero eyebrow="Legal" title={title} intro={intro} breadcrumbs={breadcrumbs} />
      <div className="container-site py-16 sm:py-24">
        <div className="prose-site mx-auto">
          {!reviewed && (
            <div className="mb-12">
              <PlaceholderNote
                label="Draft"
                title="This document has not been finalised"
                devHint={
                  <>
                    Complete the sections marked “to be completed”, have the full text reviewed by a qualified adviser,
                    then set <code>reviewed: true</code> in <code>src/content/legal.ts</code> to remove this notice and
                    allow indexing.
                  </>
                }
              >
                This is a draft. Sections marked “to be completed” are still being prepared, and the text may change
                before it is finalised.
              </PlaceholderNote>
            </div>
          )}
          {children}
        </div>
      </div>
    </>
  );
}

export function ToComplete({ children }: { children: ReactNode }) {
  return (
    <span className="border border-dashed border-charcoal/40 bg-sand-deep px-1.5 py-0.5 text-[0.9375rem]">
      To be completed: {children}
    </span>
  );
}
