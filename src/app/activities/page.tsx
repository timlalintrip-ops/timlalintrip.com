import type { Metadata } from "next";
import Link from "next/link";
import { ActivityCard } from "@/components/activities/ActivityCard";
import { BookingCta } from "@/components/booking/BookingCta";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { getPublishedActivities } from "@/content/activities";
import { getGuidePath, getPublishedGuides } from "@/content/guides";
import { media } from "@/content/media";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, jsonLdGraph } from "@/lib/structured-data";

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "Activities", path: "/activities" },
];

export const metadata: Metadata = buildMetadata({
  title: "Activities in the Timlalin Dunes",
  description:
    "Timlalin Dunes activities near Agadir: quad biking, sandboarding, camel rides, buggy, canyon tour, sunset tea and Moroccan dinner. From €10, pay on arrival.",
  path: "/activities",
});

export default function ActivitiesPage() {
  const activities = getPublishedActivities();
  const comparisonGuide = getPublishedGuides().find((guide) => guide.slug === "choosing-a-desert-activity");

  return (
    <>
      <JsonLd data={jsonLdGraph(breadcrumbSchema(breadcrumbs))} />
      <PageHero
        eyebrow="Activities"
        title="Experiences in the Timlalin Dunes"
        intro="Ride, glide, walk or simply sit and watch the light change. Each experience shows a different side of the coastal dunes north of Agadir, and they combine easily into a longer day."
        breadcrumbs={breadcrumbs}
        image={media.activitiesHero}
      />

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
                by pace, energy and who they suit.
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

      <BookingCta />
    </>
  );
}
