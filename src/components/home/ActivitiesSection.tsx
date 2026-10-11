import { getPublishedActivities } from "@/content/activities";
import { ActivityCard } from "@/components/activities/ActivityCard";
import { ButtonLink } from "@/components/ui/ButtonLink";

export function ActivitiesSection() {
  const activities = getPublishedActivities();

  return (
    <section aria-labelledby="activities-title" className="py-24 sm:py-32">
      <div className="container-site">
        <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col justify-between gap-8 sm:col-span-2 lg:col-span-1 lg:pr-4">
            <div>
              <p className="eyebrow mb-4 text-orange-deep">Experiences</p>
              <h2 id="activities-title" className="text-headline font-semibold">
                Seven ways to explore the dunes
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-muted">
                From fast rides to slow evenings, choose one experience or combine several into a full day on the
                Timlalin coast.
              </p>
            </div>
            <ButtonLink href="/activities" variant="outline-dark" withArrow className="self-start">
              View all activities
            </ButtonLink>
          </div>
          {activities.map((activity, index) => (
            <ActivityCard key={activity.slug} activity={activity} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
