/**
 * Best-effort, in-memory rate limit for booking enquiries.
 *
 * Counters live in the memory of a single server process. They reset on every
 * restart or deploy and are not shared between instances, so on serverless or
 * multi-instance hosting this only slows down a single client hitting one
 * instance. Production should also enforce a limit at the edge (hosting
 * firewall / WAF rule on POST /book-now) or in a shared store — see README.
 */

const WINDOW_MS = 15 * 60 * 1000;
const MAX_ENQUIRIES_PER_WINDOW = 5;
const MAX_TRACKED_CLIENTS = 5_000;

const attempts = new Map<string, { count: number; windowStart: number }>();

function pruneExpired(now: number) {
  for (const [key, entry] of attempts) {
    if (now - entry.windowStart >= WINDOW_MS) attempts.delete(key);
  }
}

/**
 * Records an enquiry attempt for `clientKey` and reports whether it is within
 * the limit.
 */
export function consumeEnquiryAllowance(clientKey: string, now: number = Date.now()): boolean {
  if (attempts.size >= MAX_TRACKED_CLIENTS) pruneExpired(now);

  const entry = attempts.get(clientKey);
  if (!entry || now - entry.windowStart >= WINDOW_MS) {
    if (attempts.size >= MAX_TRACKED_CLIENTS) return false;
    attempts.set(clientKey, { count: 1, windowStart: now });
    return true;
  }

  entry.count += 1;
  return entry.count <= MAX_ENQUIRIES_PER_WINDOW;
}

/**
 * Derives the client key from proxy headers. `x-forwarded-for` is only
 * trustworthy when the hosting platform overwrites it (as Vercel, Netlify and
 * most managed hosts do); behind an untrusted proxy it can be spoofed.
 */
export function getClientKey(requestHeaders: Headers): string {
  const forwarded = requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || requestHeaders.get("x-real-ip")?.trim() || "unknown";
}
