import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { getActivityPath, getPublishedActivities } from "@/content/activities";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  const activities = getPublishedActivities().slice(0, 4);

  return (
    <section className="grain bg-charcoal text-white">
      <div className="container-site py-24 sm:py-36">
        <p className="eyebrow mb-6 text-orange">Error 404</p>
        <h1 className="text-display max-w-3xl font-semibold">This trail disappears into the sand</h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-inverse">
          The page you are looking for does not exist or has moved. Try one of these instead.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/" withArrow>
            Back to the homepage
          </ButtonLink>
          <ButtonLink href="/activities" variant="outline-light">
            Browse activities
          </ButtonLink>
        </div>
        <ul className="mt-16 flex flex-wrap gap-x-6 gap-y-3 border-t border-charcoal-line pt-8 text-sm text-white/75">
          {activities.map((activity) => (
            <li key={activity.slug}>
              <Link href={getActivityPath(activity)} className="link-underline hover:text-white">
                {activity.shortName}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
