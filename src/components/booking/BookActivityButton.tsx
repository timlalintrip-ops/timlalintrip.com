import type { Variant } from "@/components/ui/ButtonLink";
import { getPublishedActivities } from "@/content/activities";
import { siteConfig } from "@/lib/site-config";
import { bookingLimits, GENERAL_ENQUIRY } from "@/lib/validation";
import type { ActivityOption } from "./BookingForm";
import { BookingDialog } from "./BookingDialog";

export function getBookingActivityOptions(): ActivityOption[] {
  return [
    ...getPublishedActivities().map((activity) => ({ value: activity.slug, label: activity.shortName })),
    { value: GENERAL_ENQUIRY, label: "Not sure yet — help me choose" },
  ];
}

type BookActivityButtonProps = {
  label: string;
  activitySlug?: string;
  activityName?: string;
  variant?: Variant;
  className?: string;
  withArrow?: boolean;
};

/** Opens the booking form in a popup, with the activity preselected. */
export function BookActivityButton({ activitySlug, ...props }: BookActivityButtonProps) {
  return (
    <BookingDialog
      {...props}
      activityOptions={getBookingActivityOptions()}
      defaultActivity={activitySlug}
      limits={bookingLimits}
      whatsappNumber={siteConfig.contact.whatsapp}
    />
  );
}
