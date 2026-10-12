"use server";

import { headers } from "next/headers";
import { getActivityBySlug } from "@/content/activities";
import { deliverBookingEnquiry, isBookingDeliveryConfigured } from "@/lib/booking/delivery";
import { consumeEnquiryAllowance, getClientKey } from "@/lib/booking/rate-limit";
import { absoluteUrl } from "@/lib/site-config";
import { GENERAL_ENQUIRY, validateBookingEnquiry, type FieldErrors } from "@/lib/validation";

export type BookingFormValues = {
  fullName: string;
  email: string;
  activity: string;
  preferredDate: string;
  participants: string;
  message: string;
};

export type BookingFormState =
  | { status: "idle" }
  | { status: "invalid"; errors: FieldErrors; values: BookingFormValues }
  | { status: "unavailable"; values: BookingFormValues }
  | { status: "error"; message: string; values: BookingFormValues }
  | { status: "sent"; email: string };

/** Submissions faster than this are almost certainly automated. */
const MIN_FILL_TIME_MS = 3_000;
const MAX_FIELD_ECHO = 2_000;

function echoValues(formData: FormData): BookingFormValues {
  const read = (key: string) => {
    const value = formData.get(key);
    return typeof value === "string" ? value.slice(0, MAX_FIELD_ECHO) : "";
  };
  return {
    fullName: read("fullName"),
    email: read("email"),
    activity: read("activity"),
    preferredDate: read("preferredDate"),
    participants: read("participants"),
    message: read("message"),
  };
}

function looksAutomated(formData: FormData): boolean {
  const honeypot = formData.get("website");
  if (typeof honeypot === "string" && honeypot.trim() !== "") return true;

  const startedAt = Number(formData.get("startedAt"));
  if (Number.isFinite(startedAt) && startedAt > 0 && Date.now() - startedAt < MIN_FILL_TIME_MS) {
    return true;
  }
  return false;
}

/** Lets statically rendered pages ask at request time whether email enquiries are active. */
export async function getEmailBookingAvailability(): Promise<boolean> {
  return isBookingDeliveryConfigured();
}

export async function submitBookingEnquiry(
  _previousState: BookingFormState,
  formData: FormData,
): Promise<BookingFormState> {
  const values = echoValues(formData);

  if (looksAutomated(formData)) {
    console.warn("[booking] Enquiry rejected by spam checks.");
    return {
      status: "error",
      message: "We could not process this enquiry. Please review your details and try again.",
      values,
    };
  }

  const result = validateBookingEnquiry(formData);
  if (!result.success) {
    return { status: "invalid", errors: result.errors, values };
  }

  if (!isBookingDeliveryConfigured()) {
    return { status: "unavailable", values };
  }

  if (!consumeEnquiryAllowance(getClientKey(await headers()))) {
    console.warn("[booking] Enquiry rejected by rate limit.");
    return {
      status: "error",
      message:
        "We have received several enquiries from your connection in a short time. Please wait a few minutes before trying again.",
      values,
    };
  }

  const enquiry = result.data;
  const activityName =
    enquiry.activity === GENERAL_ENQUIRY
      ? "Not sure yet"
      : (getActivityBySlug(enquiry.activity)?.shortName ?? enquiry.activity);

  const delivery = await deliverBookingEnquiry({
    ...enquiry,
    activityName,
    submittedAt: new Date().toISOString(),
    source: absoluteUrl("/book-now"),
  });

  if (!delivery.ok) {
    if (delivery.reason === "not-configured") {
      return { status: "unavailable", values };
    }
    return {
      status: "error",
      message:
        "Something went wrong while sending your enquiry, and it has not been received. Please try again in a few minutes.",
      values,
    };
  }

  return { status: "sent", email: enquiry.email };
}
