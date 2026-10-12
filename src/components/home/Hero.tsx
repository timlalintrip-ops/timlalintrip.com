import { getActivityPath, getPublishedActivities } from "@/content/activities";
import { heroContent } from "@/content/home";
import { BookActivityButton } from "@/components/booking/BookActivityButton";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { HeroSlideshow, type HeroSlide } from "./HeroSlideshow";

export function Hero() {
  const slides: HeroSlide[] = getPublishedActivities().map((activity) => ({
    slug: activity.slug,
    name: activity.shortName,
    href: getActivityPath(activity),
    facts: [activity.practical?.duration, activity.practical?.price].filter((fact): fact is string => Boolean(fact)),
    image: activity.heroImage,
    action: (
      <BookActivityButton
        label="Book now"
        activitySlug={activity.slug}
        activityName={activity.shortName}
        className="min-h-11 px-5"
      />
    ),
  }));

  return (
    <HeroSlideshow slides={slides} labelledBy="hero-title">
      <div className="max-w-3xl pb-10">
        <p className="eyebrow mb-6 text-orange motion-safe:animate-rise">{heroContent.eyebrow}</p>
        {/* Heading and intro are not animated: they are the LCP candidates. */}
        <h1 id="hero-title" className="text-display font-semibold">
          {heroContent.title}
        </h1>
        <p className="mt-7 max-w-xl text-lg leading-relaxed text-white/85 sm:text-xl">{heroContent.text}</p>
        <div className="mt-8 flex flex-col gap-3 motion-safe:animate-rise motion-safe:[animation-delay:120ms] sm:flex-row">
          <ButtonLink href="/activities" withArrow>
            Explore Activities
          </ButtonLink>
          <ButtonLink href="/book-now" variant="outline-light">
            Plan Your Adventure
          </ButtonLink>
        </div>
      </div>
    </HeroSlideshow>
  );
}
