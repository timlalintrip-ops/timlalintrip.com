import type { Metadata } from "next";
import Link from "next/link";
import { ActivityCard } from "@/components/activities/ActivityCard";
import { BookingCta } from "@/components/booking/BookingCta";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { RichText } from "@/components/ui/RichText";
import {
  getActivitiesHubFaqs,
  getActivityPath,
  getPublishedActivities,
  joinEnglishList,
} from "@/content/activities";
import { getGuideBySlug, getGuidePath } from "@/content/guides";
import { media } from "@/content/media";
import { staticPageSeo } from "@/content/static-pages";
import { buildMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site-config";
import { breadcrumbSchema, faqSchema, jsonLdGraph } from "@/lib/structured-data";

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "Activities", path: "/activities" },
];

export const metadata: Metadata = buildMetadata(staticPageSeo.activities);

export default function ActivitiesPage() {
  const activities = getPublishedActivities();
  const faqs = getActivitiesHubFaqs();
  const comparisonGuide = getGuideBySlug("choosing-a-desert-activity");
  const fromAgadirGuide = getGuideBySlug("how-to-get-to-timlalin-dunes-from-agadir");
  const itineraryGuide = getGuideBySlug("timlalin-dunes-day-itinerary");
  const priced = activities.filter((activity) => activity.practical?.price);
  const unpriced = activities.filter((activity) => !activity.practical?.price);
  const timed = activities.filter((activity) => activity.practical?.duration);

  return (
    <>
      <JsonLd
        data={jsonLdGraph(
          breadcrumbSchema(breadcrumbs),
          {
            "@type": "ItemList",
            name: "Timlalin Dunes activities",
            itemListElement: activities.map((activity, index) => ({
              "@type": "ListItem",
              position: index + 1,
              url: absoluteUrl(getActivityPath(activity)),
              name: activity.name,
            })),
          },
          ...(faqs.length > 0 ? [faqSchema(faqs)] : []),
        )}
      />
      <PageHero
        eyebrow="Activities"
        title="Activities in the Timlalin Dunes"
        intro="Sandboarding, quad biking, buggy and camel rides, a canyon walk, sunset tea or a Moroccan dinner — each experience shows a different side of the coastal dunes near Tamri, about 60 km north of Agadir. Starting prices from €10; you pay on arrival."
        breadcrumbs={breadcrumbs}
        image={media.activitiesHero}
      />

      <section aria-labelledby="trip-overview" className="border-b border-sand-line py-16 sm:py-20">
        <div className="container-site">
          <h2 id="trip-overview" className="text-headline max-w-2xl font-semibold">
            Meeting point, prices and timing
          </h2>
          <ul className="mt-12 grid gap-10 md:grid-cols-3">
            <li className="border-t border-charcoal/20 pt-6">
              <h3 className="text-title font-semibold">Where you meet</h3>
              <p className="mt-3 leading-relaxed text-muted">
                The Timlalin Dunes near Tamri, about 60 km north of Agadir on the N1. Hotel pickup from Agadir,
                Taghazout or Imsouane can be added as an extra.
              </p>
              {fromAgadirGuide && (
                <p className="mt-4">
                  <Link
                    href={getGuidePath(fromAgadirGuide)}
                    className="font-semibold text-orange-deep underline underline-offset-4 hover:text-charcoal"
                  >
                    Directions from Agadir
                  </Link>
                </p>
              )}
            </li>
            <li className="border-t border-charcoal/20 pt-6">
              <h3 className="text-title font-semibold">Starting prices</h3>
              <p className="mt-3 leading-relaxed text-muted">
                Confirmed starting prices, paid on arrival.
                {unpriced.length > 0
                  ? ` ${joinEnglishList(unpriced.map((activity) => activity.shortName))} ${unpriced.length === 1 ? "is" : "are"} quoted when you enquire.`
                  : ""}
              </p>
              {priced.length > 0 && (
                <ul className="mt-4 space-y-1 text-sm font-medium text-charcoal">
                  {priced.map((activity) => (
                    <li key={activity.slug}>
                      {activity.shortName}: {activity.practical?.price}
                    </li>
                  ))}
                </ul>
              )}
            </li>
            <li className="border-t border-charcoal/20 pt-6">
              <h3 className="text-title font-semibold">Shape the day</h3>
              <p className="mt-3 leading-relaxed text-muted">
                {timed.length > 0
                  ? `${joinEnglishList(timed.map((activity) => `${activity.shortName} (${activity.practical?.duration})`))} combine easily into a half day or a full day.`
                  : "Activities can be combined into a half day or a full day."}
              </p>
              {itineraryGuide && (
                <p className="mt-4">
                  <Link
                    href={getGuidePath(itineraryGuide)}
                    className="font-semibold text-orange-deep underline underline-offset-4 hover:text-charcoal"
                  >
                    Sample itineraries
                  </Link>
                </p>
              )}
            </li>
          </ul>
        </div>
      </section>

      <section aria-labelledby="all-activities" className="py-20 sm:py-28">
        <div className="container-site">
          <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <h2 id="all-activities" className="text-headline max-w-xl font-semibold">
              Choose your experience
            </h2>
            {comparisonGuide && (
              <p className="max-w-md text-muted">
                Not sure where to start?{" "}
                <Link
                  href={getGuidePath(comparisonGuide)}
                  className="font-semibold text-orange-deep underline underline-offset-4 hover:text-charcoal"
                >
                  Compare the dune activities
                </Link>{" "}
                by pace, energy and who they suit, including quad, buggy and sandboarding.
              </p>
            )}
          </div>
          <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {activities.map((activity, index) => (
              <ActivityCard
                key={activity.slug}
                activity={activity}
                index={index}
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              />
            ))}
          </div>
        </div>
      </section>

      {faqs.length > 0 && (
        <section aria-labelledby="faq-title" className="border-t border-sand-line py-20 sm:py-28">
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
                  <p className="mt-4 leading-relaxed text-muted [&_a]:font-semibold [&_a]:text-orange-deep [&_a]:underline [&_a]:underline-offset-4">
                    <RichText text={faq.answer} />
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      <BookingCta />
    </>
  );
}
