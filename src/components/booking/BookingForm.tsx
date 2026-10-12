"use client";

import Link from "next/link";
import { useActionState, useEffect, useRef, useState, type FormEvent, type ReactNode, type Ref } from "react";
import { submitBookingEnquiry, type BookingFormState, type BookingFormValues } from "@/app/book-now/actions";
import { MailIcon, WhatsAppIcon } from "@/components/ui/icons";
import type { BookingField, FieldErrors } from "@/lib/validation";

export type ActivityOption = { value: string; label: string };

type BookingFormProps = {
  activityOptions: ActivityOption[];
  defaultActivity?: string;
  /** Undefined while the server has not yet reported whether delivery is configured. */
  deliveryConfigured?: boolean;
  /** Digits only, international format. When set, visitors can also send the enquiry on WhatsApp. */
  whatsappNumber?: string;
  limits: {
    nameMax: number;
    emailMax: number;
    messageMax: number;
    participantsMin: number;
    participantsMax: number;
  };
};

const initialState: BookingFormState = { status: "idle" };

const fieldOrder: BookingField[] = ["fullName", "email", "activity", "preferredDate", "participants", "message"];
const fieldLabels: Record<BookingField, string> = {
  fullName: "Full name",
  email: "Email",
  activity: "Activity",
  preferredDate: "Preferred date",
  participants: "Number of participants",
  message: "Message",
};

const whatsappRequiredFields: BookingField[] = ["fullName", "activity", "preferredDate", "participants"];

function buildWhatsAppMessage(form: HTMLFormElement, activityOptions: ActivityOption[]): string {
  const read = (name: BookingField) => {
    const field = form.elements.namedItem(name);
    return field instanceof HTMLInputElement || field instanceof HTMLSelectElement || field instanceof HTMLTextAreaElement
      ? field.value.trim()
      : "";
  };
  const activity = read("activity");
  const lines = [
    "Hello TimlalinTrip, I would like to book:",
    "",
    `Activity: ${activityOptions.find((option) => option.value === activity)?.label ?? activity}`,
    `Date: ${read("preferredDate")}`,
    `Participants: ${read("participants")}`,
    `Name: ${read("fullName")}`,
  ];
  const email = read("email");
  if (email) lines.push(`Email: ${email}`);
  const message = read("message");
  if (message) lines.push("", message);
  return lines.join("\n");
}

function todayIso(): string {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${month}-${day}`;
}

const inputClasses =
  "block w-full border border-charcoal/25 bg-white px-4 py-3.5 text-base text-charcoal transition-colors placeholder:text-muted/70 hover:border-charcoal/50 focus:border-charcoal focus:outline-2 focus:outline-offset-0 focus:outline-orange aria-[invalid=true]:border-red-700";

type FieldProps = {
  id: BookingField;
  label: string;
  hint?: string;
  optional?: boolean;
  error?: string;
  children: (describedBy: string | undefined) => ReactNode;
};

function Field({ id, label, hint, optional, error, children }: FieldProps) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div>
      <label htmlFor={id} className="mb-2 flex items-baseline justify-between gap-4 text-sm font-semibold">
        {label}
        {optional && <span className="text-xs font-normal text-muted">Optional</span>}
      </label>
      {hint && (
        <p id={hintId} className="mb-2 text-sm text-muted">
          {hint}
        </p>
      )}
      {children(describedBy)}
      {error && (
        <p id={errorId} className="mt-2 text-sm font-medium text-red-800">
          {error}
        </p>
      )}
    </div>
  );
}

function StatusPanel({
  tone,
  title,
  children,
  panelRef,
}: {
  tone: "error" | "warning";
  title: string;
  children: ReactNode;
  panelRef?: Ref<HTMLDivElement>;
}) {
  const colors = tone === "error" ? "border-red-800 bg-red-50" : "border-orange-deep bg-sand-deep";
  // Panels with a ref are responses to a submission and are announced; the initial notice is not.
  return (
    <div
      ref={panelRef}
      tabIndex={panelRef ? -1 : undefined}
      role={panelRef ? "alert" : undefined}
      className={`mb-8 border-l-4 p-5 focus:outline-none ${colors}`}
    >
      <p className="font-semibold">{title}</p>
      <div className="mt-2 text-sm leading-relaxed">{children}</div>
    </div>
  );
}

function ErrorSummary({ errors }: { errors: FieldErrors }) {
  const entries = fieldOrder.filter((field) => errors[field]);
  return (
    <ul className="mt-2 list-disc space-y-1 pl-5">
      {entries.map((field) => (
        <li key={field}>
          <a href={`#${field}`} className="underline underline-offset-2">
            {fieldLabels[field]}: {errors[field]}
          </a>
        </li>
      ))}
    </ul>
  );
}

export function BookingForm({
  activityOptions,
  defaultActivity,
  deliveryConfigured,
  whatsappNumber,
  limits,
}: BookingFormProps) {
  const [state, formAction, pending] = useActionState(submitBookingEnquiry, initialState);
  const [formKey, setFormKey] = useState(0);
  const [lastState, setLastState] = useState(state);
  const statusRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const startedAtRef = useRef(0);

  function sendViaWhatsApp() {
    const form = formRef.current;
    if (!form || !whatsappNumber) return;
    for (const name of whatsappRequiredFields) {
      const field = form.elements.namedItem(name);
      if ((field instanceof HTMLInputElement || field instanceof HTMLSelectElement) && !field.reportValidity()) return;
    }
    const text = encodeURIComponent(buildWhatsAppMessage(form, activityOptions));
    window.open(`https://wa.me/${whatsappNumber}?text=${text}`, "_blank", "noopener,noreferrer");
  }

  // Remount the form with the submitted values after each server response, so
  // React's automatic form reset never discards what the visitor typed.
  if (state !== lastState) {
    setLastState(state);
    setFormKey((key) => key + 1);
  }

  useEffect(() => {
    startedAtRef.current = Date.now();
  }, []);

  useEffect(() => {
    if (state.status !== "idle") statusRef.current?.focus();
  }, [state]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    const startedAt = event.currentTarget.elements.namedItem("startedAt");
    if (startedAt instanceof HTMLInputElement) startedAt.value = String(startedAtRef.current);
  }

  if (state.status === "sent") {
    return (
      <div ref={statusRef} tabIndex={-1} role="status" className="border border-sand-line bg-white p-8 focus:outline-none sm:p-10">
        <p className="eyebrow mb-4 text-orange-deep">Enquiry received</p>
        <h2 className="text-title font-semibold">Thank you — your enquiry has been sent</h2>
        <p className="mt-4 leading-relaxed text-charcoal/80">
          This is an enquiry, not a confirmed booking. We will reply to <strong>{state.email}</strong> with
          availability and practical details for your request. Your booking is only confirmed once we have agreed the
          details with you.
        </p>
        <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm font-semibold">
          <Link href="/activities" className="text-orange-deep underline underline-offset-4 hover:text-charcoal">
            Back to activities
          </Link>
          <Link href="/travel-guide" className="text-orange-deep underline underline-offset-4 hover:text-charcoal">
            Read the travel guide
          </Link>
        </div>
      </div>
    );
  }

  const values: Partial<BookingFormValues> = "values" in state ? state.values : {};
  const errors: FieldErrors = state.status === "invalid" ? state.errors : {};
  const selectedActivity = values.activity ?? defaultActivity ?? "";

  return (
    <div>
      {deliveryConfigured === false && state.status === "idle" && (
        <StatusPanel
          tone="warning"
          title={whatsappNumber ? "Email enquiries are not active yet" : "Online enquiries are not active yet"}
        >
          {whatsappNumber
            ? "Please send your request on WhatsApp using the button below — your details are filled in for you."
            : "The enquiry form is not yet connected to our inbox, so submissions cannot be received at the moment. Please check back soon."}
        </StatusPanel>
      )}
      {state.status === "invalid" && (
        <StatusPanel tone="error" title="Please check the following details" panelRef={statusRef}>
          <ErrorSummary errors={errors} />
        </StatusPanel>
      )}
      {state.status === "unavailable" && (
        <StatusPanel tone="warning" title="Your enquiry has not been sent" panelRef={statusRef}>
          Email enquiries are not active yet, so we could not receive your details. Nothing has been stored. Your
          answers are still in the form below{whatsappNumber ? " — you can send them on WhatsApp instead." : "."}
        </StatusPanel>
      )}
      {state.status === "error" && (
        <StatusPanel tone="error" title="Your enquiry has not been sent" panelRef={statusRef}>
          {state.message}
        </StatusPanel>
      )}

      <form ref={formRef} key={formKey} action={formAction} onSubmit={handleSubmit} className="space-y-7" aria-describedby="form-note">
        <div className="grid gap-7 sm:grid-cols-2">
          <Field id="fullName" label="Full name" error={errors.fullName}>
            {(describedBy) => (
              <input
                id="fullName"
                name="fullName"
                type="text"
                autoComplete="name"
                required
                minLength={2}
                maxLength={limits.nameMax}
                defaultValue={values.fullName}
                aria-invalid={errors.fullName ? true : undefined}
                aria-describedby={describedBy}
                className={inputClasses}
              />
            )}
          </Field>
          <Field id="email" label="Email" error={errors.email}>
            {(describedBy) => (
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                inputMode="email"
                required
                maxLength={limits.emailMax}
                defaultValue={values.email}
                aria-invalid={errors.email ? true : undefined}
                aria-describedby={describedBy}
                className={inputClasses}
              />
            )}
          </Field>
        </div>

        <Field id="activity" label="Activity" error={errors.activity}>
          {(describedBy) => (
            <select
              id="activity"
              name="activity"
              required
              defaultValue={selectedActivity}
              aria-invalid={errors.activity ? true : undefined}
              aria-describedby={describedBy}
              className={`${inputClasses} appearance-none bg-[url("data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2020%2020'%3E%3Cpath%20d='m5%208%205%205%205-5'%20fill='none'%20stroke='%23111719'%20stroke-width='1.6'/%3E%3C/svg%3E")] bg-[length:1.25rem] bg-[position:right_1rem_center] bg-no-repeat pr-12`}
            >
              <option value="" disabled>
                Choose an activity
              </option>
              {activityOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          )}
        </Field>

        <div className="grid gap-7 sm:grid-cols-2">
          <Field id="preferredDate" label="Preferred date" error={errors.preferredDate}>
            {(describedBy) => (
              <input
                id="preferredDate"
                name="preferredDate"
                type="date"
                required
                ref={(input) => {
                  if (input) input.min = todayIso();
                }}
                defaultValue={values.preferredDate}
                aria-invalid={errors.preferredDate ? true : undefined}
                aria-describedby={describedBy}
                className={inputClasses}
              />
            )}
          </Field>
          <Field id="participants" label="Number of participants" error={errors.participants}>
            {(describedBy) => (
              <input
                id="participants"
                name="participants"
                type="number"
                inputMode="numeric"
                required
                min={limits.participantsMin}
                max={limits.participantsMax}
                step={1}
                defaultValue={values.participants}
                aria-invalid={errors.participants ? true : undefined}
                aria-describedby={describedBy}
                className={inputClasses}
              />
            )}
          </Field>
        </div>

        <Field
          id="message"
          label="Message"
          optional
          hint="Tell us about your group, any questions, or dietary and accessibility needs."
          error={errors.message}
        >
          {(describedBy) => (
            <textarea
              id="message"
              name="message"
              rows={5}
              maxLength={limits.messageMax}
              defaultValue={values.message}
              aria-invalid={errors.message ? true : undefined}
              aria-describedby={describedBy}
              className={`${inputClasses} resize-y`}
            />
          )}
        </Field>

        {/* Spam protection: hidden from people, often filled in by bots. */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label htmlFor="website">Leave this field empty</label>
          <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
        </div>
        <input type="hidden" name="startedAt" defaultValue="" />

        <div className="space-y-5 border-t border-sand-line pt-7">
          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="submit"
              disabled={pending || deliveryConfigured !== true}
              className="inline-flex min-h-14 flex-1 items-center justify-center gap-3 bg-orange px-8 font-semibold text-charcoal transition-colors hover:bg-orange-bright disabled:cursor-not-allowed disabled:opacity-60"
            >
              <MailIcon className="size-5" />
              {pending ? "Sending…" : "Send by email"}
            </button>
            {whatsappNumber && (
              <button
                type="button"
                onClick={sendViaWhatsApp}
                className="inline-flex min-h-14 flex-1 items-center justify-center gap-3 bg-[#1f7a4d] px-8 font-semibold text-white transition-colors hover:bg-[#17603c]"
              >
                <WhatsAppIcon className="size-5" />
                Send on WhatsApp
              </button>
            )}
          </div>
          <p id="form-note" className="text-sm text-muted">
            Sending this form is an enquiry, not a confirmed booking.
            {whatsappNumber && " WhatsApp opens with your details ready to send; email is optional for WhatsApp."} See
            our{" "}
            <Link href="/privacy-policy" className="underline underline-offset-2 hover:text-charcoal">
              privacy policy
            </Link>
            .
          </p>
        </div>
      </form>
    </div>
  );
}
