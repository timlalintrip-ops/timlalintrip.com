import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ActivityCard } from "@/components/activities/ActivityCard";
import { PracticalDetails } from "@/components/activities/PracticalDetails";
import { BookActivityButton } from "@/components/booking/BookActivityButton";
import { BookingCta } from "@/components/booking/BookingCta";
import { ReviewsSection } from "@/components/reviews/ReviewsSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { PageHero } from "@/components/ui/PageHero";
import { SiteImage } from "@/components/ui/SiteImage";
import {
  getActivityBySlug,
  getActivityPath,
  getPublishedActivities,
  getRelatedActivities,
} from "@/content/activities";
import { getGuidePath, getGuidesBySlugs } from "@/content/guides";
import { getReviewsForActivity } from "@/content/reviews";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, faqSchema, jsonLdGraph } from "@/lib/structured-data";

// Fully static, and unknown slugs render notFound() before streaming (real 404 status).
export const ensureStatic = "navigation";

export function generateStaticParams() {
  return getPublishedActivities().map((activity) => ({ slug: activity.slug }));
}

export async function generateMetadata({ params }: PageProps<"/activities/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const activity = getActivityBySlug(slug);
  if (!activity) return {};

  return buildMetadata({
    title: activity.metaTitle,
    description: activity.metaDescription,
    path: getActivityPath(activity),
    image: activity.heroImage.src
      ? {
          src: activity.heroImage.src,
          width: activity.heroImage.width,
          height: activity.heroImage.height,
          alt: activity.heroImage.alt,
        }
      : undefined,
  });
}

export default async function ActivityPage({ params }: PageProps<"/activities/[slug]">) {
  const { slug } = await params;
  const activity = getActivityBySlug(slug);
  if (!activity) notFound();

  const path = getActivityPath(activity);
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Activities", path: "/activities" },
    { name: activity.shortName, path },
  ];
  const related = getRelatedActivities(activity);
  const guides = getGuidesBySlugs(activity.relatedGuideSlugs);
  const extraPhotos = activity.galleryImages.filter(
    (image) => image.src && image.id !== activity.heroImage.id,
  );
  const photoLayout =
    extraPhotos.length === 1
      ? { grid: "max-w-md", item: "aspect-[4/5]", sizes: "(min-width: 640px) 448px, 100vw" }
      : extraPhotos.length === 2
        ? { grid: "max-w-3xl sm:grid-cols-2", item: "aspect-[4/5]", sizes: "(min-width: 640px) 384px, 100vw" }
        : extraPhotos.length === 3
        ? { grid: "sm:grid-cols-3", item: "aspect-[4/5]", sizes: "(min-width: 640px) 33vw, 100vw" }
        : extraPhotos.length === 4
          ? {
              grid: "sm:grid-cols-2 lg:grid-cols-4",
              item: "aspect-[4/5]",
              sizes: "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw",
            }
          : {
              grid: "sm:grid-cols-2 lg:grid-cols-3",
              item: "aspect-[4/5]",
              sizes: "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
            };
  const faqs = activity.faqs ?? [];
  const reviews = getReviewsForActivity(activity.slug);

  return (
    <>
      <JsonLd
        data={jsonLdGraph(breadcrumbSchema(breadcrumbs), ...(faqs.length > 0 ? [faqSchema(faqs)] : []))}
      />
      <PageHero
        eyebrow="Activity"
        title={activity.name}
        intro={activity.intro}
        breadcrumbs={breadcrumbs}
        image={activity.heroImage}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <BookActivityButton
            label="Book this activity"
            activitySlug={activity.slug}
            activityName={activity.shortName}
            withArrow
          />
          <ButtonLink href="/activities" variant="outline-light">
            All activities
          </ButtonLink>
        </div>
      </PageHero>

      <section aria-labelledby="overview-title" className="py-20 sm:py-28">
        <div className="container-site grid gap-14 lg:grid-cols-[1.5fr_1fr] lg:gap-20">
          <div>
            <p className="eyebrow mb-4 text-orange-deep">Overview</p>
            <h2 id="overview-title" className="text-headline font-semibold">
              About the experience
            </h2>
            <div className="mt-8 space-y-5 text-lg leading-relaxed text-charcoal/80">
              {activity.overview.map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>{paragraph}</p>
              ))}
            </div>
          </div>
          <PracticalDetails
            practical={activity.practical}
            action={
              <BookActivityButton
                label="Book now"
                activitySlug={activity.slug}
                activityName={activity.shortName}
                variant="dark"
                className="w-full"
              />
            }
          />
        </div>
      </section>

      <section aria-labelledby="expect-title" className="bg-sand-deep py-20 sm:py-28">
        <div className="container-site">
          <p className="eyebrow mb-4 text-orange-deep">What to expect</p>
          <h2 id="expect-title" className="text-headline max-w-2xl font-semibold">
            What the experience feels like
          </h2>
          <ul className="mt-14 grid gap-10 md:grid-cols-3">
            {activity.expectations.map((item, index) => (
              <li key={item.title} className="border-t border-charcoal/20 pt-6">
                <span aria-hidden="true" className="font-display text-sm font-semibold text-orange-deep">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-title font-semibold">{item.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {extraPhotos.length > 0 && (
        <section aria-labelledby="photos-title" className="py-20 sm:py-28">
          <div className="container-site">
            <h2 id="photos-title" className="text-headline mb-12 font-semibold">
              Photos
            </h2>
            <ul className={`grid gap-4 ${photoLayout.grid}`}>
              {extraPhotos.map((image) => (
                <li key={image.id} className={`relative overflow-hidden bg-sand-deep ${photoLayout.item}`}>
                  <SiteImage image={image} sizes={photoLayout.sizes} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <ReviewsSection
        reviews={reviews}
        title={`What guests say about ${activity.shortName.toLowerCase()}`}
        className="border-t border-sand-line"
      />

      {faqs.length > 0 && (
        <section aria-labelledby="faq-title" className="py-20 sm:py-28">
          <div className="container-site max-w-4xl">
            <h2 id="faq-title" className="text-headline mb-10 font-semibold">
              Frequently asked questions
            </h2>
            <div className="border-t border-sand-line">
              {faqs.map((faq) => (
                <details key={faq.question} className="group border-b border-sand-line py-6">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-semibold">
                    {faq.question}
                    <span aria-hidden="true" className="text-2xl text-orange-deep transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-4 leading-relaxed text-muted">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {guides.length > 0 && (
        <section aria-labelledby="guides-title" className="border-t border-sand-line py-16">
          <div className="container-site flex flex-col gap-6 md:flex-row md:items-baseline md:gap-16">
            <h2 id="guides-title" className="shrink-0 font-sans text-xs font-semibold tracking-[0.2em] text-orange-deep uppercase">
              Plan your visit
            </h2>
            <ul className="flex flex-col gap-4">
              {guides.map((guide) => (
                <li key={guide.slug}>
                  <Link
                    href={getGuidePath(guide)}
                    className="font-display text-xl font-semibold underline decoration-sand-line decoration-1 underline-offset-8 transition-colors hover:decoration-orange"
                  >
                    {guide.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section aria-labelledby="related-title" className="bg-sand-deep py-20 sm:py-28">
          <div className="container-site">
            <div className="mb-12 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
              <h2 id="related-title" className="text-headline font-semibold">
                Combine it with
              </h2>
              <ButtonLink href="/activities" variant="text" withArrow>
                All activities
              </ButtonLink>
            </div>
            <div className="grid gap-x-6 gap-y-14 sm:grid-cols-3 lg:gap-x-8">
              {related.map((item) => (
                <ActivityCard
                  key={item.slug}
                  activity={item}
                  sizes="(min-width: 1344px) 400px, (min-width: 640px) 33vw, 100vw"
                />
              ))}
            </div>
          </div>
        </section>
      )}

      <BookingCta
        title={`Ready for ${activity.shortName.toLowerCase()} at Timlalin?`}
        activitySlug={activity.slug}
        activityName={activity.shortName}
      />
    </>
  );
}
