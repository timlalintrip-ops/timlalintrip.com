# TimlalinTrip.com — Version 1

Tourism website for desert activities in the Timlalin Dunes (coastal dunes north of Agadir, near Tamri, Morocco).

**Stack:** Next.js 16.4 (App Router, Cache Components, Partial Prefetching, Turbopack) · React 19.3 · TypeScript (strict) · Tailwind CSS 4 · Nodemailer (booking emails via Gmail SMTP). No database, CMS, UI kit or animation library. Hosted on Vercel.

## Commands

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint
npm test         # booking tests (Vitest, SMTP is mocked — no email is sent)
npx tsc --noEmit # run `npx next typegen` first after adding routes
npm run build && npm start
```

## Project structure

```
src/
  app/                 Routes, metadata, sitemap.ts, robots.ts
    book-now/actions.ts  Server action for booking enquiries
  components/
    layout/            Header, mobile navigation, footer, logo
    home/              Homepage sections
    activities/        Activity card, practical-details panel
    booking/           Booking form (client) and booking CTA
    seo/               JSON-LD serializer
    ui/                Buttons, breadcrumbs, page hero, images, placeholders, legal layout
  content/             All editable content (typed data)
    activities.ts  guides.ts  media.ts  home.ts  legal.ts
  lib/
    site-config.ts     Brand, domain, navigation, contact details
    seo.ts             Per-page metadata builder
    structured-data.ts JSON-LD builders
    validation.ts      Server-side enquiry validation
    booking/delivery.ts  Enquiry delivery (server-only, Nodemailer + Gmail SMTP)
    booking/rate-limit.ts  Best-effort in-memory rate limit
  proxy.ts             Returns 404 for unknown activity/guide slugs before rendering
```

## Editing content

| What | Where |
| --- | --- |
| Activities (text, practical info, FAQs, related links, publish flag) | `src/content/activities.ts` |
| Travel guide articles | `src/content/guides.ts` |
| Photos | `src/content/media.ts` + files in `public/images/` |
| Logo, favicon, social sharing image | `public/logo/logo.png`, `public/favicon.ico`, `public/og-image.jpg` — referenced from `src/lib/site-config.ts` |
| Contact details, social profiles, legal name | `src/lib/site-config.ts` |
| Homepage copy | `src/content/home.ts` |
| About page story, credentials, team | `src/content/about.ts` |
| Legal review status | `src/content/legal.ts` |

- **New activity or guide:** add an entry with `published: true`. Routes, sitemap, navigation lists, related links and static generation update automatically.
- **Optional fields render only when set.** Leave `practical`, `faqs`, `author`, contact fields etc. undefined until confirmed — nothing is invented or shown empty.
- **Photos:** every image currently renders a labelled illustration (“Placeholder image”). Set `src`, `width`, `height` and `alt` on a media entry to switch to a real optimised photo (`next/image`, AVIF/WebP, responsive sizes). Only use photos of Timlalin/TimlalinTrip that you have rights to.
- **Logo:** the official logo (`public/logo/logo.png`, 500×300, transparent) has dark lettering, so it is used on the light header and on a light plate in the dark footer. If a reversed (light) version or an SVG becomes available, update `siteConfig.logo`. The favicon is `public/favicon.ico` (40×40); larger icon sizes (e.g. 180×180 for Apple devices) would improve home-screen icons.
- **Social image:** `public/og-image.jpg` (500×300) is used for Open Graph/Twitter. A 1200×630 version is recommended for sharper link previews; update `siteConfig.socialImage` when replacing it.
- **Outstanding content** is marked with the `PlaceholderNote` and `ToComplete` components — search for them. Visitors see only a short, honest notice; the editing instructions (file paths) appear only when running `npm run dev`.

## Booking enquiries

The form posts to a server action (`src/app/book-now/actions.ts`) that, in this order: rejects automated submissions (honeypot field + 3-second minimum fill time), validates and sanitises every field server-side (length limits, control characters stripped, single-line fields cannot contain line breaks), checks that email delivery is configured, applies the rate limit, and only then calls `deliverBookingEnquiry()` in `src/lib/booking/delivery.ts`.

`delivery.ts` imports `server-only`, so importing it from a client component fails the build. It sends one email per enquiry with Nodemailer through Gmail SMTP (`smtp.gmail.com`, port 465, TLS; 10 s connection and greeting timeouts, 15 s socket timeout). No confirmation email is sent to the visitor.

Delivery is **not configured yet**. Until all three variables below are set, the page states that online enquiries are not active and the submit button is disabled — nothing is accepted or silently discarded, and no success state is shown.

| Variable | Required | Value |
| --- | --- | --- |
| `GMAIL_USER` | yes | Gmail address that sends the notification (the sender is never taken from the form) |
| `GMAIL_APP_PASSWORD` | yes | Google App Password for that account (spaces are ignored) |
| `BOOKING_TO_EMAIL` | yes | Inbox that receives enquiries — `timlalintrip@gmail.com` |

They are server-only: never prefix them with `NEXT_PUBLIC_`, never commit them (`.env*` files other than `.env.example` are git-ignored). The configuration is read **per request**, not at build time, so the same build switches the form on or off depending on the environment it runs in.

### What the email contains

- **From:** `TimlalinTrip website <GMAIL_USER>` · **To:** `BOOKING_TO_EMAIL` · **Reply-To:** the visitor's validated name and email, so pressing Reply answers the visitor directly.
- **Subject:** `New booking enquiry — TimlalinTrip · <activity> · ref <first 8 characters of the enquiry ID>` (unique per enquiry, so Gmail does not merge different enquiries into one conversation; no visitor-typed text is used in the subject).
- **Body** (plain text and simple HTML): enquiry ID, activity, name, email, preferred date, participants, message, submission time (Morocco time and UTC), and the page it came from. Every visitor-provided value is HTML-escaped. The enquiry ID is also sent as the `X-TimlalinTrip-Enquiry-ID` header.

**What "sent" means:** the visitor sees "Your enquiry has been sent" only after Gmail's SMTP server has **accepted** the message. That confirms hand-off to the mail server, not arrival in the inbox (spam filtering still happens afterwards). Any SMTP error, timeout or refused recipient shows "Your enquiry has not been sent" with a generic message, and the visitor keeps their answers. Raw SMTP errors are never shown to visitors.

**Duplicates:** the submit button is disabled while a submission is in progress. Every submission gets a new enquiry ID. If a connection drops after Gmail accepted a message, the visitor is told it failed and may resend — you would then see two emails with different IDs but the same details.

### Configuring Gmail delivery on Vercel

Owner steps (do not paste the Gmail password or the App Password into chat, email, tickets or source code — type it only into Vercel):

1. Sign in to the Gmail account that will **send** the notifications. The simplest setup is `timlalintrip@gmail.com` itself, sending to itself.
2. Turn on **2-Step Verification** for that account (Google Account → Security). App Passwords require it.
3. Open **Google Account → Security → App passwords** (or <https://myaccount.google.com/apppasswords>), create one named e.g. "TimlalinTrip website" and copy the 16-character password. Google shows it only once.
4. In Vercel, open the project → **Settings → Environment Variables** and add `GMAIL_APP_PASSWORD` with that value. Mark it **Sensitive**.
5. Add `GMAIL_USER` = the sending Gmail address from step 1.
6. Add `BOOKING_TO_EMAIL` = `timlalintrip@gmail.com`.
7. Choose the environments deliberately (see below) — for launch, tick **Production**.
8. **Redeploy** (Deployments → latest Production deployment → ⋯ → Redeploy). Vercel applies environment-variable changes only to new deployments; no code change or special build step is needed.
9. Submit one test enquiry on the live site with fictional details and your own reply address, then confirm it arrives in `timlalintrip@gmail.com` (check Spam), that the details are correct and that Reply goes to your test address. If `GMAIL_USER` and `BOOKING_TO_EMAIL` are the same account, confirm the message appears in the Inbox and not only under Sent / All Mail; if it does not, add a Gmail filter for the subject "New booking enquiry" ("Never send to Spam", apply a label), or send from a separate Gmail account.

**Environments:**

| Vercel environment | Recommendation |
| --- | --- |
| Production | All three variables set. |
| Preview | Leave unset by default: preview deployments then show the "not active" notice and accept nothing. To test on a preview, add Preview-scoped values with `BOOKING_TO_EMAIL` pointing to a test inbox you control, and keep Vercel Deployment Protection enabled so preview URLs are not public. |
| Development (local) | Put values in `.env.local` only if you need to test real sending locally; otherwise leave them unset. |

**If App Passwords are not available:** Google hides the option when 2-Step Verification is off, when the account uses only security keys for 2-Step Verification, when it is enrolled in Advanced Protection, or when a Google Workspace administrator has disabled it. Do not weaken the account's security to work around this ("less secure apps" access no longer exists). Supported alternatives:
- enable 2-Step Verification with an authenticator app or phone prompt, if the account policy allows it;
- use a transactional email service (for example Postmark, Amazon SES, Brevo or Resend) with a verified sending domain — most offer SMTP credentials, so only the host, port and credential variables in `delivery.ts` change;
- use Gmail with OAuth2 (Nodemailer supports XOAUTH2), which needs a Google Cloud project and consent screen.

**Operational notes:** if the Google password is changed or the App Password is revoked, sending fails and the logs show `authentication rejected (EAUTH …)` — create a new App Password and update Vercel. Personal Gmail accounts have a daily sending limit (roughly 500 messages), far above expected enquiry volume.

### Logging

Server logs (Vercel → project → Logs) contain only the enquiry ID and a sanitised error category — never names, email addresses, messages, credentials or email content:

- `[booking] Enquiry <id> accepted by the SMTP server.`
- `[booking] Enquiry <id> not delivered: authentication rejected (EAUTH, SMTP 535).` — other categories: `connection problem`, `sender or recipient rejected`, `delivery failed`
- `[booking] GMAIL_USER is not a valid email address.` / `BOOKING_TO_EMAIL …` — misconfiguration (the form stays disabled)
- `[booking] Enquiry rejected by spam checks.` / `… by rate limit.`

### Testing delivery safely

- `npm test` runs the booking tests with a **mocked** SMTP transport; it never connects to Gmail. It covers: missing or invalid configuration keeps booking unavailable; invalid, spam and rate-limited submissions never send; the sender and recipient come only from the environment; visitor input cannot change them or inject headers; HTML escaping; SMTP acceptance → "sent"; SMTP errors, timeouts and refused recipients → "not sent"; logs contain no secrets or personal data.
- For a real test, use fictional details ("Test Visitor", a message saying it is a test) and a reply address you control. Test on Production after launch setup, or on a Preview deployment whose `BOOKING_TO_EMAIL` points to a test inbox.
- Each test counts towards the 5-per-15-minutes limit for your IP on the instance that handles it.
- Delete test emails afterwards.

### Spam and rate limiting

- Honeypot field and a 3-second minimum fill time (treated as a failed submission and logged as `[booking] Enquiry rejected by spam checks.`).
- **Best-effort in-memory limit:** 5 attempted enquiries per client IP per 15 minutes (`src/lib/booking/rate-limit.ts`, logged as `[booking] Enquiry rejected by rate limit.`). It is checked before any email is sent. Counters live in one function instance, reset on every cold start or deploy and are not shared between instances. **On Vercel this is not sufficient as the only protection.**
- The client IP comes from `x-forwarded-for`, which Vercel sets itself.

Add a shared limit on Vercel (form submissions are `POST` requests to `/book-now` carrying a `Next-Action` header):

- **Preferred — Vercel Firewall:** project → Firewall → add a custom rule: *Request Path* equals `/book-now` **and** *Method* equals `POST` → action **Rate Limit**, about 10 requests per 10 minutes per IP, then deny (`429`). Avoid a challenge action here: the form submits via `fetch`, which cannot complete an interactive challenge. Check that rate-limit rules are available on the project's Vercel plan.
- **Alternative — shared store:** replace the `Map` in `rate-limit.ts` with a managed Redis (for example from the Vercel Marketplace) behind the same `consumeEnquiryAllowance()` function.

Keep the in-memory limit as a second layer in all cases.

## Security headers

Set in `next.config.ts` for every route: Content-Security-Policy, HSTS, `X-Content-Type-Options`, `X-Frame-Options: DENY`, `Referrer-Policy`, `Permissions-Policy`, `Cross-Origin-Opener-Policy`; `X-Powered-By` is removed.

The CSP allows only same-origin scripts, styles, images, fonts and connections, blocks plugins, framing, `<base>` hijacking and form posts to other origins. It is a **static** policy and keeps `'unsafe-inline'` for scripts because Next.js streams its page data in inline scripts; a nonce-based policy would force every page to render per request, which Next.js documents as incompatible with the prerendering used here. If you add analytics, maps or embeds, add their exact origins to the policy.

## SEO

- Unique titles, descriptions and absolute canonicals (`https://timlalintrip.com`) via `buildMetadata()`; Open Graph and Twitter cards using `public/og-image.jpg` unless a page has its own photo.
- `sitemap.xml` lists only published, indexable URLs; `robots.txt` allows everything and references it.
- JSON-LD: `Organization` + `WebSite` (home), `BreadcrumbList` (inner pages), `Article` (guides). No reviews, ratings, prices, offers, addresses or opening hours are emitted. Add verified details in `site-config.ts` and they flow into `Organization` automatically.
- Kept out of the index until ready: `/gallery` (until it has real photos), `/contact` (until contact details are set in `site-config.ts`), `/privacy-policy` and `/terms-and-conditions` (until marked reviewed in `src/content/legal.ts`).
- Unknown activity/guide slugs and other unknown URLs return HTTP 404.

## Before launch

See [`docs/pre-launch.md`](docs/pre-launch.md) for the owner content checklist, image asset checklist and the ordered deployment and search-launch checklist.
#   t i m l a l i n t r i p . c o m  
 