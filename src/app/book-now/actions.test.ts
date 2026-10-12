import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { getPublishedActivities } from "@/content/activities";
import { isBookingDeliveryConfigured } from "@/lib/booking/delivery";
import { submitBookingEnquiry } from "./actions";

const mocks = vi.hoisted(() => ({
  sendMail: vi.fn(),
  close: vi.fn(),
  createTransport: vi.fn(),
  clientIp: "203.0.113.1",
}));

vi.mock("nodemailer", () => ({ default: { createTransport: mocks.createTransport } }));
vi.mock("next/headers", () => ({
  headers: async () => new Headers({ "x-forwarded-for": mocks.clientIp }),
}));

const SENDER = "sender.account@example.com";
const RECIPIENT = "bookings.inbox@example.com";
const APP_PASSWORD = "abcd efgh ijkl mnop";

const VISITOR = {
  fullName: "Test Visitor",
  email: "test.visitor@example.com",
  message: "We would like a sunset slot, please.",
};

const activity = getPublishedActivities()[0];
let ipCounter = 0;
let logged: string[] = [];

function futureDate(days = 30): string {
  const date = new Date();
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

function enquiryForm(overrides: Record<string, string> = {}): FormData {
  const fields: Record<string, string> = {
    fullName: VISITOR.fullName,
    email: VISITOR.email,
    activity: activity.slug,
    preferredDate: futureDate(),
    participants: "2",
    message: VISITOR.message,
    website: "",
    startedAt: String(Date.now() - 10_000),
    ...overrides,
  };
  const formData = new FormData();
  for (const [key, value] of Object.entries(fields)) formData.append(key, value);
  return formData;
}

function submit(formData: FormData) {
  return submitBookingEnquiry({ status: "idle" }, formData);
}

function configureMail() {
  vi.stubEnv("GMAIL_USER", SENDER);
  vi.stubEnv("GMAIL_APP_PASSWORD", APP_PASSWORD);
  vi.stubEnv("BOOKING_TO_EMAIL", RECIPIENT);
}

function sentMessage() {
  expect(mocks.sendMail).toHaveBeenCalledTimes(1);
  return mocks.sendMail.mock.calls[0][0];
}

beforeEach(() => {
  ipCounter += 1;
  mocks.clientIp = `203.0.113.${ipCounter}`;
  mocks.sendMail.mockReset().mockResolvedValue({ accepted: [RECIPIENT], rejected: [], messageId: "<test@local>" });
  mocks.close.mockReset();
  mocks.createTransport.mockReset().mockImplementation(() => ({ sendMail: mocks.sendMail, close: mocks.close }));

  logged = [];
  for (const method of ["log", "info", "warn", "error", "debug"] as const) {
    vi.spyOn(console, method).mockImplementation((...args: unknown[]) => {
      logged.push(args.map((arg) => (arg instanceof Error ? `${arg.name} ${arg.message}` : String(arg))).join(" "));
    });
  }
});

afterEach(() => {
  const output = logged.join("\n");
  for (const secretOrPersonal of [
    VISITOR.fullName,
    VISITOR.email,
    VISITOR.message,
    APP_PASSWORD,
    APP_PASSWORD.replace(/\s/g, ""),
    SENDER,
    RECIPIENT,
    "<script>",
  ]) {
    expect(output).not.toContain(secretOrPersonal);
  }
  vi.unstubAllEnvs();
  vi.restoreAllMocks();
});

describe("configuration", () => {
  it.each(["GMAIL_USER", "GMAIL_APP_PASSWORD", "BOOKING_TO_EMAIL"])(
    "keeps booking unavailable when %s is missing",
    async (missing) => {
      configureMail();
      vi.stubEnv(missing, "");

      expect(isBookingDeliveryConfigured()).toBe(false);
      const state = await submit(enquiryForm());

      expect(state.status).toBe("unavailable");
      expect(mocks.createTransport).not.toHaveBeenCalled();
      expect(mocks.sendMail).not.toHaveBeenCalled();
    },
  );

  it("treats an invalid sender or recipient address as not configured", async () => {
    configureMail();
    vi.stubEnv("BOOKING_TO_EMAIL", "not-an-address");

    expect(isBookingDeliveryConfigured()).toBe(false);
    expect((await submit(enquiryForm())).status).toBe("unavailable");
    expect(mocks.sendMail).not.toHaveBeenCalled();
  });

  it("reports configured when all variables are set", () => {
    configureMail();
    expect(isBookingDeliveryConfigured()).toBe(true);
  });
});

describe("rejected submissions never send email", () => {
  beforeEach(configureMail);

  it("rejects invalid fields", async () => {
    const state = await submit(enquiryForm({ email: "nope", participants: "0" }));

    expect(state.status).toBe("invalid");
    expect(mocks.sendMail).not.toHaveBeenCalled();
  });

  it("rejects over-long messages", async () => {
    const state = await submit(enquiryForm({ message: "x".repeat(2_001) }));

    expect(state.status).toBe("invalid");
    expect(mocks.sendMail).not.toHaveBeenCalled();
  });

  it("rejects a filled honeypot", async () => {
    const state = await submit(enquiryForm({ website: "https://spam.example" }));

    expect(state.status).toBe("error");
    expect(mocks.sendMail).not.toHaveBeenCalled();
  });

  it("rejects submissions completed faster than the minimum fill time", async () => {
    const state = await submit(enquiryForm({ startedAt: String(Date.now() - 500) }));

    expect(state.status).toBe("error");
    expect(mocks.sendMail).not.toHaveBeenCalled();
  });

  it("stops sending once the rate limit is reached", async () => {
    const results = [];
    for (let attempt = 0; attempt < 6; attempt += 1) results.push(await submit(enquiryForm()));

    expect(results.slice(0, 5).every((state) => state.status === "sent")).toBe(true);
    expect(results[5].status).toBe("error");
    expect(mocks.sendMail).toHaveBeenCalledTimes(5);
  });
});

describe("successful delivery", () => {
  beforeEach(configureMail);

  it("connects to Gmail SMTP over TLS with timeouts", async () => {
    await submit(enquiryForm());

    expect(mocks.createTransport).toHaveBeenCalledWith(
      expect.objectContaining({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        requireTLS: true,
        auth: { user: SENDER, pass: APP_PASSWORD.replace(/\s/g, "") },
        connectionTimeout: expect.any(Number),
        greetingTimeout: expect.any(Number),
        socketTimeout: expect.any(Number),
      }),
    );
    expect(mocks.close).toHaveBeenCalled();
  });

  it("uses the configured sender and recipient with the visitor as Reply-To", async () => {
    const state = await submit(enquiryForm());

    expect(state).toEqual({ status: "sent", email: VISITOR.email });
    const message = sentMessage();
    expect(message.from).toEqual({ name: "TimlalinTrip website", address: SENDER });
    expect(message.to).toBe(RECIPIENT);
    expect(message.replyTo).toEqual({ name: VISITOR.fullName, address: VISITOR.email });
    expect(message.subject).toMatch(/^New booking enquiry — TimlalinTrip/);
    expect(message.subject).not.toContain(VISITOR.fullName);
  });

  it("includes every enquiry detail in the text and HTML bodies", async () => {
    await submit(enquiryForm({ preferredDate: futureDate(10), participants: "4" }));

    const message = sentMessage();
    const id = message.headers["X-TimlalinTrip-Enquiry-ID"];
    expect(id).toMatch(/^[0-9a-f-]{36}$/);
    for (const body of [message.text, message.html]) {
      expect(body).toContain(id);
      expect(body).toContain(activity.shortName);
      expect(body).toContain(VISITOR.fullName);
      expect(body).toContain(VISITOR.email);
      expect(body).toContain(futureDate(10));
      expect(body).toContain("4");
      expect(body).toContain(VISITOR.message);
      expect(body).toContain("Morocco time");
    }
  });

  it("ignores visitor attempts to override the sender or recipient", async () => {
    const state = await submit(
      enquiryForm({
        fullName: "Mallory <attacker@evil.example>",
        from: "attacker@evil.example",
        to: "attacker@evil.example",
        replyTo: "attacker@evil.example",
        sender: "attacker@evil.example",
      }),
    );

    expect(state.status).toBe("sent");
    const message = sentMessage();
    expect(message.from).toEqual({ name: "TimlalinTrip website", address: SENDER });
    expect(message.to).toBe(RECIPIENT);
    expect(message.replyTo.address).toBe(VISITOR.email);
    expect(Object.keys(message).sort()).toEqual(["from", "headers", "html", "replyTo", "subject", "text", "to"]);
  });

  it("strips line breaks from single-line fields so headers cannot be injected", async () => {
    await submit(enquiryForm({ fullName: "Test\r\nBcc: attacker@evil.example" }));

    expect(sentMessage().replyTo.name).toBe("Test Bcc: attacker@evil.example");
  });

  it("escapes visitor input in the HTML body", async () => {
    await submit(
      enquiryForm({
        fullName: `<script>alert("x")</script>`,
        message: `<img src=x onerror=alert(1)> & "quoted" 'text'\nsecond line`,
      }),
    );

    const { html, text } = sentMessage();
    expect(html).not.toContain("<script>");
    expect(html).not.toContain("<img");
    expect(html).toContain("&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt;");
    expect(html).toContain("&lt;img src=x onerror=alert(1)&gt; &amp; &quot;quoted&quot; &#39;text&#39;<br>second line");
    expect(text).toContain(`<img src=x onerror=alert(1)>`);
  });
});

describe("failed delivery", () => {
  beforeEach(configureMail);

  it("never reports success when SMTP rejects the message", async () => {
    const error = Object.assign(
      new Error(`Invalid login: 535-5.7.8 Username and Password not accepted for ${SENDER} (${APP_PASSWORD})`),
      { code: "EAUTH", responseCode: 535 },
    );
    mocks.sendMail.mockRejectedValue(error);

    const state = await submit(enquiryForm());

    expect(state.status).toBe("error");
    if (state.status !== "error") return;
    expect(state.message).not.toMatch(/EAUTH|535|smtp|password/i);
    expect(state.values.email).toBe(VISITOR.email);
    expect(logged.join("\n")).toMatch(/not delivered: authentication rejected \(EAUTH, SMTP 535\)/);
    expect(mocks.close).toHaveBeenCalled();
  });

  it("never reports success on a connection timeout", async () => {
    mocks.sendMail.mockRejectedValue(Object.assign(new Error("Connection timeout"), { code: "ETIMEDOUT" }));

    expect((await submit(enquiryForm())).status).toBe("error");
    expect(logged.join("\n")).toMatch(/connection problem \(ETIMEDOUT\)/);
  });

  it("never reports success when no recipient was accepted", async () => {
    mocks.sendMail.mockResolvedValue({ accepted: [], rejected: [RECIPIENT], messageId: "<test@local>" });

    expect((await submit(enquiryForm())).status).toBe("error");
  });
});
