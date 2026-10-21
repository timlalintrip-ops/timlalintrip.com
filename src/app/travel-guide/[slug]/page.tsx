import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ActivityCard } from "@/components/activities/ActivityCard";
import { BookingCta } from "@/components/booking/BookingCta";
import { GuideCard } from "@/components/guides/GuideCard";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { RichText } from "@/components/ui/RichText";
import { SiteImage } from "@/components/ui/SiteImage";
import { getActivityBySlug, type Activity } from "@/content/activities";
import {
  getGuideBySlug,
  getGuidePath,
  getPublishedGuides,
  getReadingMinutes,
  getRelatedGuides,
  guideCategories,
  slugifyHeading,
} from "@/content/guides";
import { formatDate } from "@/lib/format";
import { buildMetadata, missingPageMetadata } from "@/lib/seo";
import { articleSchema, breadcrumbSchema, faqSchema, jsonLdGraph, organizationSchema } from "@/lib/structured-data";

// Fully static, and unknown slugs render notFound() before streaming (real 404 status).
export const ensureStatic = "navigation";

export function generateStaticParams() {
  return getPublishedGuides().map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: PageProps<"/travel-guide/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) return missingPageMetadata("Guide not found");

  return buildMetadata({
    title: guide.metaTitle,
    description: guide.metaDescription,
    path: getGuidePath(guide),
    openGraphType: "article",
    publishedTime: guide.publishedAt,
    modifiedTime: guide.updatedAt ?? guide.publishedAt,
    image: guide.heroImage.src
      ? { src: guide.heroImage.src, width: guide.heroImage.width, height: guide.heroImage.height, alt: guide.heroImage.alt }
      : undefined,
  });
}

export default async function GuidePage({ params }: PageProps<"/travel-guide/[slug]">) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) notFound();

  const path = getGuidePath(guide);
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Travel Guide", path: "/travel-guide" },
    { name: guide.title, path },
  ];
  const relatedActivities = guide.relatedActivitySlugs
    .map((activitySlug) => getActivityBySlug(activitySlug))
    .filter((activity): activity is Activity => activity !== undefined);
  const relatedGuides = getRelatedGuides(guide);
  const faqs = guide.faqs ?? [];
  const toc = guide.sections.map((section) => ({ id: slugifyHeading(section.heading), heading: section.heading }));
  if (faqs.length > 0) toc.push({ id: "faq", heading: "Frequently asked questions" });

  return (
    <>
      <JsonLd
        data={jsonLdGraph(
          organizationSchema(),
          articleSchema(guide, path),
          breadcrumbSchema(breadcrumbs),
          ...(faqs.length > 0 ? [faqSchema(faqs)] : []),
        )}
      />
      <article>
        <header className="grain bg-charcoal text-white">
          <div className="container-site pt-10 pb-14 sm:pt-14 sm:pb-20">
            <div className="mb-10">
              <Breadcrumbs items={breadcrumbs} />
            </div>
            <div className="max-w-4xl">
              <p className="eyebrow mb-5 text-orange">
                <Link href={`/travel-guide#${guide.category}`} className="hover:text-white">
                  {guideCategories[guide.category].label}
                </Link>
              </p>
              <h1 className="text-headline font-semibold">{guide.title}</h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">{guide.excerpt}</p>
              <p className="mt-6 text-sm text-muted-inverse">
                {guide.author ? <>By {guide.author.name} · </> : null}
                Published <time dateTime={guide.publishedAt}>{formatDate(guide.publishedAt)}</time>
                {guide.updatedAt && guide.updatedAt !== guide.publishedAt ? (
                  <>
                    {" "}
                    · Updated <time dateTime={guide.updatedAt}>{formatDate(guide.updatedAt)}</time>
                  </>
                ) : null}
                {" · "}
                {getReadingMinutes(guide)} min read
              </p>
            </div>
          </div>
        </header>

        <div className="container-site">
          <div className="relative -mt-px aspect-[21/9] overflow-hidden bg-sand-deep max-sm:aspect-[3/2]">
            <SiteImage image={guide.heroImage} sizes="(min-width: 1344px) 1248px, 100vw" preload showPlaceholderBrief />
          </div>

          <div className="grid gap-12 py-16 sm:py-20 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-16">
            <aside className="hidden lg:block">
              <nav aria-label="In this guide" className="sticky top-[calc(var(--spacing-header)+2rem)]">
                <p className="eyebrow mb-5 text-orange-deep">In this guide</p>
                <ol className="space-y-3 border-l border-sand-line text-sm">
                  {toc.map((item) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        className="-ml-px block border-l border-transparent pl-4 leading-snug text-muted transition-colors hover:border-orange hover:text-charcoal"
                      >
                        {item.heading}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </aside>

            <div className="prose-site">
              <p className="text-xl leading-relaxed text-charcoal">{guide.intro}</p>
              {guide.sections.map((section) => (
                <section key={section.heading} aria-labelledby={slugifyHeading(section.heading)}>
                  <h2 id={slugifyHeading(section.heading)} className="scroll-mt-28">
                    {section.heading}
                  </h2>
                  {section.paragraphs?.map((paragraph) => (
                    <p key={paragraph.slice(0, 32)}>
                      <RichText text={paragraph} />
                    </p>
                  ))}
                  {section.list && (
                    <ul>
                      {section.list.map((item) => (
                        <li key={item}>
                          <RichText text={item} />
                        </li>
                      ))}
                    </ul>
                  )}
                  {section.image?.src && (
                    <figure className="relative my-10 aspect-[3/2] overflow-hidden bg-sand-deep">
                      <SiteImage image={section.image} sizes="(min-width: 1024px) 680px, 100vw" />
                    </figure>
                  )}
                </section>
              ))}

              {faqs.length > 0 && (
                <section aria-labelledby="faq">
                  <h2 id="faq" className="scroll-mt-28">
                    Frequently asked questions
                  </h2>
                  <div className="border-t border-sand-line">
                    {faqs.map((faq) => (
                      <details key={faq.question} className="group border-b border-sand-line py-5">
                        <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-semibold text-charcoal">
                          {faq.question}
                          <span
                            aria-hidden="true"
                            className="text-2xl text-orange-deep transition-transform group-open:rotate-45"
                          >
                            +
                          </span>
                        </summary>
                        <p className="mt-4 mb-0 leading-relaxed text-muted [&_a]:font-semibold [&_a]:text-orange-deep [&_a]:underline [&_a]:underline-offset-4">
                          <RichText text={faq.answer} />
                        </p>
                      </details>
                    ))}
                  </div>
                </section>
              )}
            </div>
          </div>
        </div>
      </article>

      {relatedActivities.length > 0 && (
        <section aria-labelledby="related-activities-title" className="bg-sand-deep py-20 sm:py-28">
          <div className="container-site">
            <h2 id="related-activities-title" className="text-headline mb-12 font-semibold">
              Activities mentioned in this guide
            </h2>
            <div
              className={`grid gap-x-6 gap-y-14 lg:gap-x-8 ${relatedActivities.length % 3 === 0 ? "sm:grid-cols-3" : "sm:grid-cols-2 lg:grid-cols-4"}`}
            >
              {relatedActivities.map((activity) => (
                <ActivityCard
                  key={activity.slug}
                  activity={activity}
                  sizes={
                    relatedActivities.length % 3 === 0
                      ? "(min-width: 640px) 33vw, 100vw"
                      : "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  }
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {relatedGuides.length > 0 && (
        <section aria-labelledby="related-guides-title" className="py-20 sm:py-28">
          <div className="container-site">
            <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <h2 id="related-guides-title" className="text-headline font-semibold">
                Keep planning
              </h2>
              <Link href="/travel-guide" className="link-underline text-sm font-semibold text-orange-deep hover:text-charcoal">
                All travel guides
              </Link>
            </div>
            <ul className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {relatedGuides.map((related) => (
                <li key={related.slug}>
                  <GuideCard guide={related} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <BookingCta />
    </>
  );
}
