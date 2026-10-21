import { describe, expect, it } from "vitest";
import { getActivityBySlug, getActivityPath, getPublishedActivities } from "./activities";
import { getGuideBySlug, getGuidePath, getPublishedGuides, parseRichText } from "./guides";

const guides = getPublishedGuides();
const staticPaths = new Set(["/", "/activities", "/about-us", "/travel-guide", "/book-now", "/gallery", "/contact"]);
const knownPaths = new Set([
  ...staticPaths,
  ...getPublishedActivities().map(getActivityPath),
  ...guides.map(getGuidePath),
]);

function guideStrings(guide: (typeof guides)[number]): string[] {
  return [
    guide.intro,
    ...guide.sections.flatMap((section) => [...(section.paragraphs ?? []), ...(section.list ?? [])]),
    ...(guide.faqs ?? []).flatMap((faq) => [faq.question, faq.answer]),
  ];
}

describe("travel guides", () => {
  it("publishes around twenty guides with unique slugs and titles", () => {
    expect(guides.length).toBeGreaterThanOrEqual(20);
    expect(new Set(guides.map((guide) => guide.slug)).size).toBe(guides.length);
    expect(new Set(guides.map((guide) => guide.title)).size).toBe(guides.length);
    expect(new Set(guides.map((guide) => guide.metaDescription)).size).toBe(guides.length);
  });

  it.each(guides.map((guide) => [guide.slug, guide] as const))("%s has valid SEO metadata and media", (_, guide) => {
    // The layout appends " | TimlalinTrip" (15 characters); keep the full title near 60.
    expect(guide.metaTitle.length).toBeLessThanOrEqual(47);
    expect(guide.metaDescription.length).toBeGreaterThanOrEqual(110);
    expect(guide.metaDescription.length).toBeLessThanOrEqual(170);
    expect(guide.heroImage.src).toBeTruthy();
    for (const section of guide.sections) {
      if (section.image) expect(section.image.src).toBeTruthy();
      expect(section.image?.id).not.toBe(guide.heroImage.id);
    }
    expect(guide.publishedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it.each(guides.map((guide) => [guide.slug, guide] as const))("%s only links to existing pages", (_, guide) => {
    const links = guideStrings(guide)
      .flatMap(parseRichText)
      .flatMap((part) => (part.href ? [part.href] : []));
    for (const href of links) expect(knownPaths, `${guide.slug} → ${href}`).toContain(href);
    for (const slug of guide.relatedActivitySlugs) expect(getActivityBySlug(slug), slug).toBeDefined();
    for (const slug of guide.relatedGuideSlugs ?? []) {
      expect(getGuideBySlug(slug), slug).toBeDefined();
      expect(slug).not.toBe(guide.slug);
    }
  });

  it("is linked from every activity page", () => {
    for (const activity of getPublishedActivities()) {
      expect(activity.relatedGuideSlugs?.length, activity.slug).toBeGreaterThan(0);
      for (const slug of activity.relatedGuideSlugs ?? []) expect(getGuideBySlug(slug), slug).toBeDefined();
    }
  });

  it("activity copy only links to existing pages", () => {
    for (const activity of getPublishedActivities()) {
      const strings = [
        ...activity.overview,
        ...(activity.faqs ?? []).flatMap((faq) => [faq.question, faq.answer]),
      ];
      const links = strings.flatMap(parseRichText).flatMap((part) => (part.href ? [part.href] : []));
      for (const href of links) expect(knownPaths, `${activity.slug} → ${href}`).toContain(href);
    }
  });
});

describe("parseRichText", () => {
  it("splits inline links from plain text", () => {
    expect(parseRichText("Try [quad biking](/activities/quad) today.")).toEqual([
      { text: "Try " },
      { text: "quad biking", href: "/activities/quad" },
      { text: " today." },
    ]);
  });
});
