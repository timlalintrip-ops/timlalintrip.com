import type { Metadata } from "next";
import Link from "next/link";
import { BookingCta } from "@/components/booking/BookingCta";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { SiteImage } from "@/components/ui/SiteImage";
import { getGuidePath, getPublishedGuides } from "@/content/guides";
import { formatDate } from "@/lib/format";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, jsonLdGraph } from "@/lib/structured-data";

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "Travel Guide", path: "/travel-guide" },
];

export const metadata: Metadata = buildMetadata({
  title: "Timlalin Dunes Travel Guide",
  description:
    "Practical advice for visiting the Timlalin Dunes north of Agadir: what to pack, how to choose a dune activity and how to plan your day on the Atlantic coast.",
  path: "/travel-guide",
});

export default function TravelGuidePage() {
  const guides = getPublishedGuides();

  return (
    <>
      <JsonLd data={jsonLdGraph(breadcrumbSchema(breadcrumbs))} />
      <PageHero
        eyebrow="Travel guide"
        title="Plan your time in the Timlalin Dunes"
        intro="Practical, honest advice to help you prepare for a day on the coastal dunes north of Agadir — written to answer the questions visitors actually ask."
        breadcrumbs={breadcrumbs}
      />

      <section aria-labelledby="articles-title" className="py-20 sm:py-28">
        <div className="container-site">
          <h2 id="articles-title" className="sr-only">
            Articles
          </h2>
          <ul className="grid gap-x-10 gap-y-16 md:grid-cols-2">
            {guides.map((guide) => (
              <li key={guide.slug}>
                <article className="group relative">
                  <div className="relative aspect-[3/2] overflow-hidden bg-sand-deep">
                    <SiteImage image={guide.heroImage} sizes="(min-width: 768px) 50vw, 100vw" meaningful={false} />
                  </div>
                  <p className="mt-6 text-xs font-semibold tracking-[0.16em] text-muted uppercase">
                    <time dateTime={guide.publishedAt}>{formatDate(guide.publishedAt)}</time>
                  </p>
                  <h3 className="mt-3 text-title font-semibold">
                    <Link
                      href={getGuidePath(guide)}
                      className="after:absolute after:inset-0 after:content-[''] group-hover:text-orange-deep"
                    >
                      {guide.title}
                    </Link>
                  </h3>
                  <p className="mt-3 leading-relaxed text-muted">{guide.excerpt}</p>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <BookingCta />
    </>
  );
}
