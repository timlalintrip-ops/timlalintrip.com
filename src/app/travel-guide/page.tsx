import type { Metadata } from "next";
import Link from "next/link";
import { BookingCta } from "@/components/booking/BookingCta";
import { GuideCard } from "@/components/guides/GuideCard";
import { JsonLd } from "@/components/seo/JsonLd";
import { ArrowIcon } from "@/components/ui/icons";
import { PageHero } from "@/components/ui/PageHero";
import { SiteImage } from "@/components/ui/SiteImage";
import {
  getGuideBySlug,
  getGuidePath,
  getGuidesByCategory,
  getPublishedGuides,
  getReadingMinutes,
  guideCategories,
  type GuideCategory,
} from "@/content/guides";
import { staticPageSeo } from "@/content/static-pages";
import { buildMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site-config";
import { breadcrumbSchema, jsonLdGraph } from "@/lib/structured-data";

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "Travel Guide", path: "/travel-guide" },
];

const FEATURED_SLUG = "things-to-do-near-agadir";

export const metadata: Metadata = buildMetadata(staticPageSeo.travelGuide);

export default function TravelGuidePage() {
  const guides = getPublishedGuides();
  const featured = getGuideBySlug(FEATURED_SLUG) ?? guides[0];
  const categories = (Object.keys(guideCategories) as GuideCategory[])
    .map((category) => ({
      category,
      ...guideCategories[category],
      guides: getGuidesByCategory(category).filter((guide) => guide.slug !== featured?.slug),
    }))
    .filter((group) => group.guides.length > 0);

  return (
    <>
      <JsonLd
        data={jsonLdGraph(breadcrumbSchema(breadcrumbs), {
          "@type": "ItemList",
          name: "Timlalin Dunes travel guides",
          itemListElement: guides.map((guide, index) => ({
            "@type": "ListItem",
            position: index + 1,
            url: absoluteUrl(getGuidePath(guide)),
            name: guide.title,
          })),
        })}
      />
      <PageHero
        eyebrow="Travel guide"
        title="Plan your time in the Timlalin Dunes"
        intro={`${guides.length} practical guides to help you prepare for a day on the coastal dunes north of Agadir — written to answer the questions visitors actually ask.`}
        breadcrumbs={breadcrumbs}
      />

      <nav aria-label="Guide categories" className="border-b border-sand-line">
        <ul className="container-site flex flex-wrap gap-x-8 gap-y-3 py-5 text-sm font-semibold">
          {categories.map((group) => (
            <li key={group.category}>
              <a href={`#${group.category}`} className="link-underline text-charcoal hover:text-orange-deep">
                {group.label}
                <span className="ml-1.5 text-muted">({getGuidesByCategory(group.category).length})</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {featured && (
        <section aria-labelledby="featured-title" className="pt-16 sm:pt-20">
          <div className="container-site">
            <h2 id="featured-title" className="sr-only">
              Featured guide
            </h2>
            <article className="group relative grid items-center gap-8 lg:grid-cols-[1.4fr_1fr] lg:gap-14">
              <div className="relative aspect-[3/2] overflow-hidden bg-sand-deep">
                <div className="absolute inset-0 transition-transform duration-700 ease-out-soft group-hover:scale-[1.03]">
                  <SiteImage image={featured.heroImage} sizes="(min-width: 1024px) 58vw, 100vw" preload />
                </div>
              </div>
              <div>
                <p className="eyebrow mb-4 text-orange-deep">
                  Featured · {getReadingMinutes(featured)} min read
                </p>
                <h3 className="text-headline font-semibold">
                  <Link
                    href={getGuidePath(featured)}
                    className="after:absolute after:inset-0 after:content-[''] group-hover:text-orange-deep"
                  >
                    {featured.title}
                  </Link>
                </h3>
                <p className="mt-5 text-lg leading-relaxed text-muted">{featured.excerpt}</p>
                <span
                  aria-hidden="true"
                  className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-orange-deep group-hover:text-charcoal"
                >
                  Read the guide
                  <ArrowIcon className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </div>
            </article>
          </div>
        </section>
      )}

      {categories.map((group) => (
        <section
          key={group.category}
          id={group.category}
          aria-labelledby={`${group.category}-title`}
          className="scroll-mt-20 py-16 sm:py-20"
        >
          <div className="container-site">
            <div className="mb-12 max-w-2xl border-t border-sand-line pt-10">
              <h2 id={`${group.category}-title`} className="text-headline font-semibold">
                {group.label}
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-muted">{group.description}</p>
            </div>
            <ul className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {group.guides.map((guide) => (
                <li key={guide.slug}>
                  <GuideCard guide={guide} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}

      <BookingCta />
    </>
  );
}
