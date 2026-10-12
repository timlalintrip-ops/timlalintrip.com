import Link from "next/link";
import { getActivityPath, type Activity } from "@/content/activities";
import { BookActivityButton } from "@/components/booking/BookActivityButton";
import { ArrowIcon } from "@/components/ui/icons";
import { SiteImage } from "@/components/ui/SiteImage";

type ActivityCardProps = {
  activity: Activity;
  index?: number;
  headingLevel?: "h2" | "h3";
  sizes?: string;
};

export function ActivityCard({
  activity,
  index,
  headingLevel: Heading = "h3",
  sizes = "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw",
}: ActivityCardProps) {
  const facts = [activity.practical?.duration, activity.practical?.price].filter(Boolean);
  return (
    <article className="group relative flex flex-col has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-4 has-[a:focus-visible]:outline-orange has-[a:focus-visible]:outline-solid">
      <div className="relative aspect-[4/5] overflow-hidden bg-sand-deep">
        <div className="absolute inset-0 transition-transform duration-700 ease-out-soft group-hover:scale-[1.03]">
          <SiteImage image={activity.heroImage} sizes={sizes} meaningful={false} />
        </div>
      </div>
      <div className="flex flex-1 flex-col border-b border-sand-line pt-5 pb-6">
        {index !== undefined && (
          <span className="mb-2 font-display text-sm font-semibold text-orange-deep">
            {String(index + 1).padStart(2, "0")}
          </span>
        )}
        <Heading className="text-title font-semibold">
          <Link
            href={getActivityPath(activity)}
            className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
          >
            {activity.shortName}
          </Link>
        </Heading>
        <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-muted">{activity.summary}</p>
        {facts.length > 0 && <p className="mt-4 text-sm font-semibold text-charcoal">{facts.join(" · ")}</p>}
        <div className="mt-5 flex items-center justify-between gap-4">
          <span
            aria-hidden="true"
            className="inline-flex items-center gap-2 text-sm font-semibold text-orange-deep transition-colors group-hover:text-charcoal"
          >
            Discover
            <ArrowIcon className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
          <BookActivityButton
            label="Book now"
            activitySlug={activity.slug}
            activityName={activity.shortName}
            className="relative z-10 min-h-11 px-5"
          />
        </div>
      </div>
    </article>
  );
}
