import { getPublishedActivities } from "@/content/activities";

export const GENERAL_ENQUIRY = "not-sure";

export const bookingLimits = {
  nameMax: 100,
  emailMax: 254,
  messageMax: 2000,
  participantsMin: 1,
  participantsMax: 50,
  /** How far ahead a preferred date may be requested. */
  maxDaysAhead: 730,
} as const;

export type BookingField = "fullName" | "email" | "activity" | "preferredDate" | "participants" | "message";

export type BookingEnquiry = {
  fullName: string;
  email: string;
  /** An activity slug, or GENERAL_ENQUIRY. */
  activity: string;
  /** YYYY-MM-DD */
  preferredDate: string;
  participants: number;
  message?: string;
};

export type FieldErrors = Partial<Record<BookingField, string>>;

export type ValidationResult =
  | { success: true; data: BookingEnquiry }
  | { success: false; errors: FieldErrors };

const EMAIL_PATTERN = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[^\s@<>()[\]\\,;:"]{2,}$/;
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

function stripControlCharacters(value: string): string {
  let result = "";
  for (const char of value) {
    const code = char.codePointAt(0) ?? 0;
    const isAllowedWhitespace = code === 9 || code === 10 || code === 13;
    if ((code < 32 && !isAllowedWhitespace) || code === 127) continue;
    result += char;
  }
  return result;
}

export function isValidEmail(value: string): boolean {
  return value.length <= bookingLimits.emailMax && EMAIL_PATTERN.test(value);
}

export function isValidActivityOption(value: string): boolean {
  return value === GENERAL_ENQUIRY || getPublishedActivities().some((activity) => activity.slug === value);
}

function readString(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

/** Normalises whitespace and strips control characters. */
export function sanitizeText(value: string, { multiline = false } = {}): string {
  const cleaned = stripControlCharacters(value);
  if (multiline) {
    return cleaned
      .replace(/\r\n?/g, "\n")
      .replace(/[ \t]+/g, " ")
      .replace(/\n{3,}/g, "\n\n")
      .trim();
  }
  return cleaned.replace(/\s+/g, " ").trim();
}

function isRealCalendarDate(value: string): boolean {
  if (!DATE_PATTERN.test(value)) return false;
  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day;
}

function daysFromToday(value: string, now: Date): number {
  const [year, month, day] = value.split("-").map(Number);
  const target = Date.UTC(year, month - 1, day);
  const today = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  return Math.round((target - today) / 86_400_000);
}

export function validateBookingEnquiry(formData: FormData, now: Date = new Date()): ValidationResult {
  const errors: FieldErrors = {};

  const fullName = sanitizeText(readString(formData, "fullName"));
  if (!fullName) {
    errors.fullName = "Please enter your full name.";
  } else if (fullName.length < 2) {
    errors.fullName = "Your name looks too short.";
  } else if (fullName.length > bookingLimits.nameMax) {
    errors.fullName = `Please keep your name under ${bookingLimits.nameMax} characters.`;
  }

  const email = sanitizeText(readString(formData, "email")).toLowerCase();
  if (!email) {
    errors.email = "Please enter your email address.";
  } else if (!isValidEmail(email)) {
    errors.email = "Please enter a valid email address, for example name@example.com.";
  }

  const activity = sanitizeText(readString(formData, "activity"));
  if (!activity) {
    errors.activity = "Please choose an activity, or select “Not sure yet”.";
  } else if (!isValidActivityOption(activity)) {
    errors.activity = "Please choose an activity from the list.";
  }

  const preferredDate = sanitizeText(readString(formData, "preferredDate"));
  if (!preferredDate) {
    errors.preferredDate = "Please choose a preferred date.";
  } else if (!isRealCalendarDate(preferredDate)) {
    errors.preferredDate = "Please enter a valid date.";
  } else {
    // Allow one day of leeway for visitors in time zones ahead of UTC.
    const offset = daysFromToday(preferredDate, now);
    if (offset < -1) {
      errors.preferredDate = "Please choose a date in the future.";
    } else if (offset > bookingLimits.maxDaysAhead) {
      errors.preferredDate = "Please choose a date within the next two years.";
    }
  }

  const participantsRaw = sanitizeText(readString(formData, "participants"));
  const participants = Number(participantsRaw);
  if (!participantsRaw) {
    errors.participants = "Please enter the number of participants.";
  } else if (
    !Number.isInteger(participants) ||
    participants < bookingLimits.participantsMin ||
    participants > bookingLimits.participantsMax
  ) {
    errors.participants = `Please enter a whole number between ${bookingLimits.participantsMin} and ${bookingLimits.participantsMax}.`;
  }

  const message = sanitizeText(readString(formData, "message"), { multiline: true });
  if (message.length > bookingLimits.messageMax) {
    errors.message = `Please keep your message under ${bookingLimits.messageMax} characters.`;
  }

  if (Object.keys(errors).length > 0) {
    return { success: false, errors };
  }

  return {
    success: true,
    data: {
      fullName,
      email,
      activity,
      preferredDate,
      participants,
      ...(message ? { message } : {}),
    },
  };
}
