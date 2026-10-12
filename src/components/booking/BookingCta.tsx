import { ButtonLink } from "@/components/ui/ButtonLink";
import { BookActivityButton } from "./BookActivityButton";

type BookingCtaProps = {
  title?: string;
  text?: string;
  /** Pre-selects this activity on the booking form. */
  activitySlug?: string;
  activityName?: string;
};

export function BookingCta({
  title = "Tell us about the adventure you have in mind",
  text = "Share your preferred date, group size and the experiences that interest you. We will reply with availability and the practical details before anything is confirmed.",
  activitySlug,
  activityName,
}: BookingCtaProps) {
  return (
    <section aria-labelledby="booking-cta-title" className="grain relative overflow-hidden bg-charcoal text-white">
      <div aria-hidden="true" className="absolute top-0 left-0 h-1 w-full bg-orange" />
      <div className="container-site grid gap-10 py-20 sm:py-28 lg:grid-cols-[1.4fr_1fr] lg:items-end">
        <div>
          <p className="eyebrow mb-5 text-orange">Booking enquiry</p>
          <h2 id="booking-cta-title" className="text-headline max-w-3xl font-semibold">
            {title}
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-inverse">{text}</p>
        </div>
        <div className="flex flex-col gap-4 lg:items-end">
          {activitySlug ? (
            <BookActivityButton
              label={`Book ${activityName ?? "this activity"}`}
              activitySlug={activitySlug}
              activityName={activityName}
              withArrow
              className="min-h-14 px-8 text-base"
            />
          ) : (
            <ButtonLink href="/book-now" withArrow className="min-h-14 px-8 text-base">
              Start your enquiry
            </ButtonLink>
          )}
          <p className="text-sm text-muted-inverse">An enquiry is not a confirmed booking.</p>
        </div>
      </div>
    </section>
  );
}
