import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ActivityCard } from "@/components/activities/ActivityCard";
import { BookingCta } from "@/components/booking/BookingCta";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SiteImage } from "@/components/ui/SiteImage";
import { getActivityBySlug, type Activity } from "@/content/activities";
import { getGuideBySlug, getGuidePath, getPublishedGuides } from "@/content/guides";
import { formatDate } from "@/lib/format";
import { buildMetadata } from "@/lib/seo";
import { articleSchema, breadcrumbSchema, jsonLdGraph, organizationSchema } from "@/lib/structured-data";

// Fully static, and unknown slugs render notFound() before streaming (real 404 status).
export const ensureStatic = "navigation";

export function generateStaticParams() {
  return getPublishedGuides().map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: PageProps<"/travel-guide/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) return {};

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

  return (
    <>
      <JsonLd data={jsonLdGraph(organizationSchema(), articleSchema(guide, path), breadcrumbSchema(breadcrumbs))} />
      <article>
        <header className="grain bg-charcoal text-white">
          <div className="container-site pt-10 pb-14 sm:pt-14 sm:pb-20">
            <div className="mb-10">
              <Breadcrumbs items={breadcrumbs} />
            </div>
            <div className="max-w-4xl">
              <p className="eyebrow mb-5 text-orange">Travel guide</p>
              <h1 className="text-headline font-semibold">{guide.title}</h1>
              <p className="mt-6 text-sm text-muted-inverse">
                {guide.author ? <>By {guide.author.name} · </> : null}
                Published <time dateTime={guide.publishedAt}>{formatDate(guide.publishedAt)}</time>
                {guide.updatedAt && guide.updatedAt !== guide.publishedAt ? (
                  <>
                    {" "}
                    · Updated <time dateTime={guide.updatedAt}>{formatDate(guide.updatedAt)}</time>
                  </>
                ) : null}
              </p>
            </div>
          </div>
        </header>

        <div className="container-site">
          <div className="relative -mt-px aspect-[21/9] overflow-hidden bg-sand-deep max-sm:aspect-[3/2]">
            <SiteImage image={guide.heroImage} sizes="(min-width: 1344px) 1248px, 100vw" preload showPlaceholderBrief />
          </div>

          <div className="py-16 sm:py-20">
            <div className="prose-site mx-auto">
              <p className="text-xl leading-relaxed text-charcoal">{guide.intro}</p>
              {guide.sections.map((section) => (
                <section key={section.heading}>
                  <h2>{section.heading}</h2>
                  {section.paragraphs?.map((paragraph) => <p key={paragraph.slice(0, 32)}>{paragraph}</p>)}
                  {section.list && (
                    <ul>
                      {section.list.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}
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

      <BookingCta />
    </>
  );
}
