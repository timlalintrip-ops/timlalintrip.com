import { describe, expect, it } from "vitest";
import { getPublishedActivities } from "./activities";
import { guestReviews } from "./reviews";

describe("guest reviews", () => {
  const activitySlugs = new Set(getPublishedActivities().map((activity) => activity.slug));

  it("only reference published activities", () => {
    for (const review of guestReviews) {
      for (const slug of review.activitySlugs) expect(activitySlugs, `${review.author}: ${slug}`).toContain(slug);
    }
  });

  it("have unique authors and non-empty text", () => {
    expect(new Set(guestReviews.map((review) => review.author)).size).toBe(guestReviews.length);
    for (const review of guestReviews) expect(review.text.trim().length).toBeGreaterThan(20);
  });
});
