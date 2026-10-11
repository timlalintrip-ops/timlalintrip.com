import Link from "next/link";
import { getActivityPath, getPublishedActivities } from "@/content/activities";
import { heroContent } from "@/content/home";
import { media } from "@/content/media";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { SiteImage } from "@/components/ui/SiteImage";

export function Hero() {
  const activities = getPublishedActivities();

  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden bg-charcoal text-white">
      <div className="absolute inset-0 -z-10">
        <SiteImage image={media.homeHero} sizes="100vw" preload showPlaceholderBrief />
        {/* Contrast scrim behind the text only */}
        <div className="absolute inset-0 bg-linear-to-b from-charcoal/55 via-charcoal/65 to-charcoal/80 lg:bg-linear-to-r lg:from-charcoal/85 lg:via-charcoal/45 lg:to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-charcoal/80 to-transparent" />
      </div>

      <div className="container-site flex min-h-[calc(100svh-var(--spacing-header))] flex-col justify-end pt-24 pb-10 sm:min-h-[44rem] lg:min-h-[calc(100svh-var(--spacing-header))]">
        <div className="max-w-3xl pb-14 sm:pb-20">
          <p className="eyebrow mb-6 text-orange motion-safe:animate-rise">{heroContent.eyebrow}</p>
          {/* Heading and intro are not animated: they are the LCP candidates. */}
          <h1 id="hero-title" className="text-display font-semibold">
            {heroContent.title}
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-white/85 sm:text-xl">
            {heroContent.text}
          </p>
          <div className="mt-10 flex flex-col gap-3 motion-safe:animate-rise motion-safe:[animation-delay:120ms] sm:flex-row">
            <ButtonLink href="/activities" withArrow>
              Explore Activities
            </ButtonLink>
            <ButtonLink href="/book-now" variant="outline-light">
              Plan Your Adventure
            </ButtonLink>
          </div>
        </div>

        <nav aria-label="Activities" className="border-t border-white/20 pt-6">
          <ul className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/75">
            {activities.map((activity) => (
              <li key={activity.slug}>
                <Link href={getActivityPath(activity)} className="link-underline transition-colors hover:text-white">
                  {activity.shortName}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
