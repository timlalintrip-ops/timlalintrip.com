import "server-only";
import { randomUUID } from "node:crypto";
import nodemailer from "nodemailer";
import { isValidEmail, type BookingEnquiry } from "@/lib/validation";

/**
 * Server-side delivery boundary for booking enquiries.
 *
 * Each enquiry is emailed to the business inbox through Gmail SMTP with
 * Nodemailer. Configuration is read at request time from server-only
 * environment variables (never prefix them with NEXT_PUBLIC_):
 *
 *   GMAIL_USER          Gmail address that sends the notification (sender)
 *   GMAIL_APP_PASSWORD  Google App Password for that account
 *   BOOKING_TO_EMAIL    inbox that receives enquiries
 *
 * An enquiry counts as delivered only when Gmail's SMTP server accepts the
 * message. That confirms hand-off to the mail server, not arrival in the inbox.
 */

export type DeliveryResult =
  | { ok: true }
  | { ok: false; reason: "not-configured" | "delivery-failed" };

export type EnquiryPayload = BookingEnquiry & {
  activityName: string;
  submittedAt: string;
  source: string;
};

type MailConfig = { user: string; appPassword: string; to: string };

const SMTP_HOST = "smtp.gmail.com";
// STARTTLS on 587: some antivirus software intercepts implicit TLS on 465.
const SMTP_PORT = 587;
const BUSINESS_TIME_ZONE = "Africa/Casablanca";

function readMailConfig(): MailConfig | null {
  const user = process.env.GMAIL_USER?.trim().toLowerCase();
  // Google displays App Passwords in groups separated by spaces.
  const appPassword = process.env.GMAIL_APP_PASSWORD?.replace(/\s+/g, "");
  const to = process.env.BOOKING_TO_EMAIL?.trim().toLowerCase();
  if (!user || !appPassword || !to) return null;

  if (!isValidEmail(user)) {
    console.error("[booking] GMAIL_USER is not a valid email address.");
    return null;
  }
  if (!isValidEmail(to)) {
    console.error("[booking] BOOKING_TO_EMAIL is not a valid email address.");
    return null;
  }
  return { user, appPassword, to };
}

export function isBookingDeliveryConfigured(): boolean {
  return readMailConfig() !== null;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatSubmittedAt(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  const local = new Intl.DateTimeFormat("en-GB", {
    timeZone: BUSINESS_TIME_ZONE,
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
  return `${local} (Morocco time) — ${date.toISOString()}`;
}

function composeEmail(id: string, payload: EnquiryPayload) {
  const rows: [label: string, value: string][] = [
    ["Enquiry ID", id],
    ["Activity", payload.activityName],
    ["Name", payload.fullName],
    ["Email", payload.email],
    ["Preferred date", payload.preferredDate],
    ["Participants", String(payload.participants)],
    ["Submitted", formatSubmittedAt(payload.submittedAt)],
  ];
  const message = payload.message ?? "";

  const subject = `New booking enquiry — TimlalinTrip · ${payload.activityName} · ref ${id.slice(0, 8)}`;

  const text = [
    "New booking enquiry from the TimlalinTrip website",
    "",
    ...rows.map(([label, value]) => `${label}: ${value}`),
    "",
    "Message:",
    message || "(no message)",
    "",
    "---",
    "Reply to this email to answer the visitor directly.",
    "This is an enquiry, not a confirmed booking.",
    `Sent from ${payload.source}`,
  ].join("\n");

  const cell = "padding:8px 12px;border-bottom:1px solid #e8dfd2;vertical-align:top;text-align:left";
  const htmlRows = rows
    .map(
      ([label, value]) =>
        `<tr><th scope="row" style="${cell};width:160px;color:#6b5f52;font-weight:600">${escapeHtml(label)}</th><td style="${cell}">${escapeHtml(value)}</td></tr>`,
    )
    .join("");
  const htmlMessage = message ? escapeHtml(message).replace(/\n/g, "<br>") : "<em>(no message)</em>";

  const html = `<!doctype html>
<html lang="en">
<body style="margin:0;padding:24px;background:#faf6f0;font-family:Arial,Helvetica,sans-serif;color:#2b2622;font-size:15px;line-height:1.5">
<div style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #e8dfd2;padding:24px">
<h1 style="margin:0 0 16px;font-size:20px">New booking enquiry</h1>
<table role="presentation" style="width:100%;border-collapse:collapse">${htmlRows}</table>
<h2 style="margin:24px 0 8px;font-size:16px">Message</h2>
<p style="margin:0">${htmlMessage}</p>
<hr style="margin:24px 0 12px;border:0;border-top:1px solid #e8dfd2">
<p style="margin:0;font-size:13px;color:#6b5f52">Reply to this email to answer the visitor directly. This is an enquiry, not a confirmed booking. Sent from ${escapeHtml(payload.source)}</p>
</div>
</body>
</html>`;

  return { subject, text, html };
}

/** Safe, non-identifying description of an SMTP failure for server logs. */
function describeFailure(error: unknown): string {
  const { code, responseCode } = (error ?? {}) as { code?: unknown; responseCode?: unknown };
  const safeCode = typeof code === "string" && /^[A-Z_]{2,24}$/.test(code) ? code : undefined;

  let category = "delivery failed";
  if (safeCode === "EAUTH" || safeCode === "ENOAUTH") category = "authentication rejected";
  else if (safeCode && ["ETIMEDOUT", "ECONNECTION", "ESOCKET", "EDNS", "ECONNRESET"].includes(safeCode)) {
    category = "connection problem";
  } else if (safeCode === "EENVELOPE") category = "sender or recipient rejected";

  const details = [safeCode, typeof responseCode === "number" ? `SMTP ${responseCode}` : undefined].filter(Boolean);
  return details.length > 0 ? `${category} (${details.join(", ")})` : category;
}

export async function deliverBookingEnquiry(payload: EnquiryPayload): Promise<DeliveryResult> {
  const config = readMailConfig();
  if (!config) return { ok: false, reason: "not-configured" };

  const id = randomUUID();
  const { subject, text, html } = composeEmail(id, payload);

  const transport = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: false,
    requireTLS: true,
    auth: { user: config.user, pass: config.appPassword },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 15_000,
    disableFileAccess: true,
    disableUrlAccess: true,
  });

  try {
    const info = await transport.sendMail({
      from: { name: "TimlalinTrip website", address: config.user },
      to: config.to,
      replyTo: { name: payload.fullName, address: payload.email },
      subject,
      text,
      html,
      headers: { "X-TimlalinTrip-Enquiry-ID": id },
    });

    if (info.accepted.length === 0) {
      console.error(`[booking] Enquiry ${id} not delivered: recipient not accepted by the SMTP server.`);
      return { ok: false, reason: "delivery-failed" };
    }
    console.info(`[booking] Enquiry ${id} accepted by the SMTP server.`);
    return { ok: true };
  } catch (error) {
    console.error(`[booking] Enquiry ${id} not delivered: ${describeFailure(error)}.`);
    return { ok: false, reason: "delivery-failed" };
  } finally {
    transport.close();
  }
}
