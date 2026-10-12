# TimlalinTrip.com — pre-launch checklist

Nothing in this list may be filled in with estimated or invented values. Every item needs a confirmed answer from the business. All content is edited in `src/content/` and `src/lib/site-config.ts`; no page component needs to change.

Legend — **Owner**: information the business must supply · **Dev**: code/config change once the information exists · **Deployed**: can only be checked on the live site · **Account**: needs access to an external service.

## 1. Owner content checklist (in priority order)

### 1.1 Blocking — the site cannot launch without these

| # | Item | Where it goes | Notes |
| --- | --- | --- | --- |
| 1 | Sending Gmail account and recipient inbox (`timlalintrip@gmail.com`) | Vercel env `GMAIL_USER`, `BOOKING_TO_EMAIL` | See README → "Booking enquiries". Form stays disabled until all three Gmail variables are set and the project is redeployed. |
| 2 | Google App Password for the sending account, created by the owner | Vercel env `GMAIL_APP_PASSWORD` (Sensitive) | Enter it directly in Vercel. Never commit it, paste it into chat or send it by email. |
| 3 | Contact details: email, phone and/or WhatsApp; business address if published | `siteConfig.contact` in `src/lib/site-config.ts` | Appear on `/contact`, in the footer and in `Organization` JSON-LD; `/contact` becomes indexable automatically. |
| 4 | Legal entity name and registration details | `siteConfig.legalName`, legal pages | Required by the privacy policy and terms. |
| 5 | Privacy policy and terms: completed sections and professional review | `src/app/privacy-policy/page.tsx`, `src/app/terms-and-conditions/page.tsx`, then `reviewed: true` in `src/content/legal.ts` | Pages stay `noindex` with a draft notice until marked reviewed. Must name the hosting provider and the enquiry-receiving service. |
| 6 | Homepage hero photo and the 7 activity photos | `src/content/media.ts` | See section 2. |

### 1.2 Per-activity details (`src/content/activities.ts`)

All seven activities currently have **no** `practical` details, **no** FAQs and **no** real photos. Each field below is optional and only appears when filled in; leaving it empty is honest, filling it with a guess is not.

Fields to supply for every activity (`practical`):

- `duration` — e.g. "About 1 hour"
- `price` — amount **with currency** and what it covers, e.g. "From 350 MAD per person"
- `meetingPoint` — exact place, or "Hotel pickup in Agadir and Taghazout" if true
- `transport` — whether transfers are included and from where
- `inclusions` — list (equipment, guide, tea, helmets…)
- `whatToBring` — list
- `minimumAge`
- `safety` — confirmed restrictions (licence, weight, pregnancy, health conditions, helmet rules)
- `bookingNotes` — real booking rules (notice period, deposit, cancellation summary)
- `faqs` — only questions answered from confirmed facts

Plus, for every activity: **approve or correct the description** (`summary`, `intro`, `overview`, `expectations`). The current text is general and non-committal, but the owner must confirm it matches what is actually offered.

Activity-specific questions:

| Activity | Must be confirmed in particular |
| --- | --- |
| Sandboarding | Board types (standing/sitting), whether instruction is included, group size |
| Quad Biking | Driving age/licence rules, single or double quads, guided route, helmets and protective gear |
| Buggy Adventure | Who may drive, licence requirement, seats per buggy, route |
| Camel Ride | Ride length, weight or health limits, whether it can be combined with sunset tea |
| Canyon Tour | **The actual canyon and route**, walking level, transport, duration — the page currently says these are confirmed on enquiry |
| Sunset Tea | Seasonal timing, location on the dunes, whether it is standalone or an add-on |
| Moroccan Dinner | Setting (on the dunes / at a venue), menu, dietary options, whether transport is included |

If an activity is not actually offered, set `published: false` — it disappears from pages, navigation, the booking form and the sitemap.

### 1.3 Important — before or shortly after launch

| Item | Where it goes |
| --- | --- |
| Company story (who runs TimlalinTrip, local roots, years operating) | `aboutContent.story` in `src/content/about.ts` |
| Verifiable credentials (licences, insurance, guide training, safety practices) | `aboutContent.credentials` |
| Team members (name, role, short bio, real photo) — optional | `aboutContent.team` (section hidden while empty) |
| Social media profile URLs | `siteConfig.socialProfiles` |
| Review the homepage value statements, which describe intentions, not credentials | `src/content/home.ts` |
| Author name for travel guides (optional; otherwise attributed to TimlalinTrip) | `author` in `src/content/guides.ts` |

## 2. Image asset checklist

How images work: each slot in `src/content/media.ts` renders a labelled illustration until `src` is set. To add a photo, place the file in `public/images/…`, then set `src`, `alt` (describe what the photo really shows), and `width`/`height` to the file's real pixel size. Layout boxes have fixed aspect ratios, so photos are cropped with `object-cover` and never shift the layout; `next/image` generates AVIF/WebP at responsive sizes. Use only photos taken at Timlalin or of TimlalinTrip activities, with usage rights.

**Supply landscape originals at 3:2, at least 2400×1600 px, subject roughly centred** unless stated otherwise — most slots are shown in several crops.

| Slot (`media.*`) | Subject | Shown as (crop) | Minimum size | Appears on | Priority |
| --- | --- | --- | --- | --- | --- |
| `homeHero` | Wide view of the Timlalin dunes with the ocean | Full-screen: wide on desktop, tall on mobile; also 3:2 | 2560×1440 (16:9 or 3:2); keep the left third calm for the headline | Homepage hero (largest element on the page), gallery, sandboarding and sunset-tea photo sections | **Critical – homepage** |
| `sandboarding` | Sandboarder descending a dune | 4:3 hero, 4:5 card, 3:2 | 2400×1600 | Activity page, activity cards (home, /activities, related), gallery | **Critical – conversion** |
| `quadBiking` | Quads in motion on the sand | same | 2400×1600 | same | **Critical – conversion** |
| `buggy` | Buggy on a dune crest | same | 2400×1600 | same | **Critical – conversion** |
| `camelRide` | Camel ride on the dunes, coast visible if possible | same | 2400×1600 | same | **Critical – conversion** |
| `canyonTour` | **The actual canyon visited** | same | 2400×1600 | same | **Critical – conversion** |
| `sunsetTea` | Tea service on the sand in evening light | same | 2400×1600 | same | **Critical – conversion** |
| `moroccanDinner` | The dinner setting as actually offered | same | 2400×1600 | same | **Critical – conversion** |
| `destination` | Dunes and sea together | 4:5 portrait | 1200×1500 (portrait original) | Homepage "Where the dunes meet the Atlantic" | High – homepage |
| `activitiesHero` | Group activity on the dunes, wide | 4:3 hero, 3:2 | 2400×1600 | `/activities` header, quad and buggy photo sections | High |
| `aboutHero` | Genuine photo of the team or guides (current alt text says so — change `alt` if the photo shows something else) | 4:3 | 1600×1200 | `/about-us` header | Medium |
| `packingGuide` | Practical gear on the dunes | 21:9 on desktop, 3:2 on mobile and in the guide list | 2400×1600, subject in the middle band | Packing guide article | Medium |
| `choosingGuide` | Several activities in one frame | same | 2400×1600 | "Choosing an activity" guide | Medium |
| `public/og-image.jpg` | Brand image or best landscape with logo | 1.91:1 | **1200×630** (current file is 500×300) | Link previews on social/messaging apps | High |
| Icons | Logo mark | square | 180×180 Apple touch icon, 512×512 (current favicon is 40×40) | Home-screen/bookmark icons | Medium |

The gallery (`/gallery`, homepage gallery preview) reuses the slots above and becomes indexable as soon as one of them has a real photo. The extra "photos" section on each activity page appears only when that activity's `galleryImages` contain real photos.

## 3. Deployment and search launch checklist (Vercel)

Hosting is Vercel (confirmed by the owner; there is no `vercel.json`, the default Next.js preset is used). Do these in order.

| # | Step | Type |
| --- | --- | --- |
| 1 | `npm ci`, `npx tsc --noEmit`, `npm run lint`, `npm test`, `npm run build` all pass | Local |
| 2 | Local smoke test of `npm start`: every route returns 200, unknown slugs return 404, `/sitemap.xml` and `/robots.txt` load, booking form shows "not active" without env vars | Local |
| 3 | Real content, contact details and photos added (section 1–2), rebuild, re-run steps 1–2 | Owner → Dev, Local |
| 4 | Legal pages completed, reviewed, `reviewed: true` set | Owner (adviser) → Dev |
| 5 | Import the repository into Vercel with the Next.js framework preset; Node.js version 20.x or later in Project Settings | Account |
| 6 | Create the Gmail App Password and add `GMAIL_USER`, `GMAIL_APP_PASSWORD`, `BOOKING_TO_EMAIL` in Vercel (README → "Configuring Gmail delivery on Vercel"); never `NEXT_PUBLIC_` | Owner, Account |
| 7 | Add a Vercel Firewall rate-limit rule for `POST /book-now` (README → "Spam and rate limiting") | Account |
| 8 | Optional: test on a Preview deployment with Preview-scoped variables pointing to a test inbox (README → "Testing delivery safely") | Deployed |
| 9 | Point `timlalintrip.com` and `www` to the host, with the apex redirecting to `www`; confirm HTTPS certificate, HTTP→HTTPS redirect and that `https://www.timlalintrip.com` (the value of `siteConfig.url`) is the only canonical host | Account, Deployed |
| 10 | Redeploy Production after setting the variables, send one fictional enquiry and confirm it arrives once in `timlalintrip@gmail.com` (check Spam too) and that Reply goes to the test address | Deployed |
| 11 | Check response headers on the live site (CSP, HSTS, `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`; no `X-Powered-By`) and that the browser console shows no CSP violations | Deployed |
| 12 | Live smoke test: all routes 200, `/activities/does-not-exist` 404, canonical tags and `og:image` use `https://www.timlalintrip.com`, sitemap lists only intended pages | Deployed |
| 13 | Google Search Console: verify the domain property (DNS TXT record), submit `https://www.timlalintrip.com/sitemap.xml`, inspect the homepage URL | Account |
| 14 | PageSpeed Insights on `/`, one activity page and `/book-now` (mobile and desktop); compare with the local Lighthouse results in the audit | Deployed |
| 15 | Monitoring in Vercel logs: watch for `[booking] Enquiry … not delivered: …` (for example `authentication rejected` means the App Password was revoked or changed), `… is not a valid email address`, and unusual volumes of `[booking] Enquiry rejected by …`. Logs contain no visitor data — keep it that way in any logging/analytics added later | Account, Deployed |
| 16 | If analytics, maps or embeds are added later: update the CSP in `next.config.ts` with their exact origins and update the privacy policy | Dev, Owner |

### What has and has not been verified

- **Verified locally:** TypeScript, lint, production build, route statuses and 404s, metadata/canonicals, sitemap and robots, security headers and CSP (no violations), mobile navigation, booking validation and the "not active" state, the form switching on at runtime when the Gmail variables are present (same build, no rebuild), and email composition, escaping, sender/recipient handling, SMTP failure handling, rate limiting and log hygiene with a mocked SMTP transport (`npm test`).
- **Not verifiable until deployed or supplied:** a real email sent through Gmail with the owner's App Password (never tested), outbound SMTP from Vercel functions, the production rate-limit rule, HTTPS/domain configuration, Search Console, field performance (PageSpeed Insights), and every item in section 1.
