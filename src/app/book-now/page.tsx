import type { Metadata } from "next";
import Link from "next/link";
import { connection } from "next/server";
import { Suspense } from "react";
import { BookingForm, type ActivityOption } from "@/components/booking/BookingForm";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { getPublishedActivities } from "@/content/activities";
import { isBookingDeliveryConfigured } from "@/lib/booking/delivery";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, jsonLdGraph } from "@/lib/structured-data";
import { bookingLimits, GENERAL_ENQUIRY, isValidActivityOption } from "@/lib/validation";

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "Book Now", path: "/book-now" },
];

export const metadata: Metadata = buildMetadata({
  title: "Book Your Timlalin Dunes Adventure",
  description:
    "Send TimlalinTrip a booking enquiry for sandboarding, quad biking, buggy or camel rides, sunset tea or dinner in the Timlalin Dunes. We reply to confirm details.",
  path: "/book-now",
});

const steps = [
  {
    title: "Send your enquiry",
    text: "Tell us which experience interests you, your preferred date and how many people are in your group.",
  },
  {
    title: "Receive the details",
    text: "We reply by email with availability, timing, pricing and what is included for your date.",
  },
  {
    title: "Confirm together",
    text: "Your booking is only confirmed once you have all the information and have agreed to go ahead.",
  },
];

type FormProps = {
  activityOptions: ActivityOption[];
};

async function BookingFormWithSelection({
  searchParams,
  ...props
}: FormProps & { searchParams: PageProps<"/book-now">["searchParams"] }) {
  const { activity } = await searchParams;
  await connection();
  const requested = typeof activity === "string" ? activity : undefined;
  const defaultActivity = requested && isValidActivityOption(requested) ? requested : undefined;

  return (
    <BookingForm
      {...props}
      defaultActivity={defaultActivity}
      deliveryConfigured={isBookingDeliveryConfigured()}
      limits={bookingLimits}
    />
  );
}

export default function BookNowPage({ searchParams }: PageProps<"/book-now">) {
  const formProps: FormProps = {
    activityOptions: [
      ...getPublishedActivities().map((activity) => ({ value: activity.slug, label: activity.shortName })),
      { value: GENERAL_ENQUIRY, label: "Not sure yet — help me choose" },
    ],
  };

  return (
    <>
      <JsonLd data={jsonLdGraph(breadcrumbSchema(breadcrumbs))} />
      <PageHero
        eyebrow="Booking enquiry"
        title="Plan your adventure"
        intro="Tell us what you would like to do and when. We will come back to you with availability and all the practical details before anything is confirmed."
        breadcrumbs={breadcrumbs}
      />

      <section aria-labelledby="enquiry-form-title" className="py-16 sm:py-24">
        <div className="container-site grid gap-14 lg:grid-cols-[1.6fr_1fr] lg:gap-20">
          <div>
            <h2 id="enquiry-form-title" className="text-title mb-8 font-semibold">
              Your enquiry
            </h2>
            <Suspense fallback={<BookingForm {...formProps} limits={bookingLimits} />}>
              <BookingFormWithSelection {...formProps} searchParams={searchParams} />
            </Suspense>
          </div>

          <aside aria-labelledby="how-it-works" className="lg:pt-16">
            <h2 id="how-it-works" className="font-sans text-xs font-semibold tracking-[0.2em] text-orange-deep uppercase">
              How it works
            </h2>
            <ol className="mt-6 border-t border-sand-line">
              {steps.map((step, index) => (
                <li key={step.title} className="grid grid-cols-[3rem_1fr] border-b border-sand-line py-6">
                  <span aria-hidden="true" className="font-display text-2xl font-semibold text-orange-deep">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="font-semibold">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="mt-8 text-sm leading-relaxed text-muted">
              Still deciding? Browse the{" "}
              <Link href="/activities" className="font-semibold text-orange-deep underline underline-offset-4">
                activities
              </Link>{" "}
              or read our{" "}
              <Link
                href="/travel-guide/choosing-a-desert-activity"
                className="font-semibold text-orange-deep underline underline-offset-4"
              >
                guide to choosing a dune activity
              </Link>
              .
            </p>
          </aside>
        </div>
      </section>
    </>
  );
}
