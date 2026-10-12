import type { Faq } from "./activities";
import { activityGuides } from "./guide-articles/activities";
import { experienceGuides } from "./guide-articles/experiences";
import { planningGuides } from "./guide-articles/planning";
import type { MediaAsset } from "./media";

/**
 * Paragraph and list strings may contain inline links written as
 * `[link text](/path)`; they are rendered as real links.
 */
export type GuideSection = {
  heading: string;
  paragraphs?: string[];
  list?: string[];
  /** Optional photo shown after the section text. */
  image?: MediaAsset;
};

export type GuideCategory = "planning" | "activities" | "experiences";

export const guideCategories: Record<GuideCategory, { label: string; description: string }> = {
  planning: {
    label: "Plan your visit",
    description: "Getting there, when to go and how to shape your day on the Timlalin coast.",
  },
  activities: {
    label: "Dune activities",
    description: "In-depth guides to each experience, from first sandboarding runs to a quiet camel ride.",
  },
  experiences: {
    label: "Tips & experiences",
    description: "Advice for families, couples and photographers, and for staying comfortable on the sand.",
  },
};

export type Guide = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  category: GuideCategory;
  /** Card and listing summary. */
  excerpt: string;
  intro: string;
  sections: GuideSection[];
  /** Rendered on the page and as FAQPage structured data. */
  faqs?: Faq[];
  heroImage: MediaAsset;
  /** Only set when a genuine, named author wrote the article. */
  author?: { name: string; url?: string };
  /** ISO dates (YYYY-MM-DD). Must reflect real publication and update dates. */
  publishedAt: string;
  updatedAt?: string;
  relatedActivitySlugs: string[];
  relatedGuideSlugs?: string[];
  published: boolean;
};

const guides: Guide[] = [...planningGuides, ...activityGuides, ...experienceGuides];

export function getPublishedGuides(): Guide[] {
  return guides.filter((guide) => guide.published);
}

export function getGuidesByCategory(category: GuideCategory): Guide[] {
  return getPublishedGuides().filter((guide) => guide.category === category);
}

export function getGuideBySlug(slug: string): Guide | undefined {
  return getPublishedGuides().find((guide) => guide.slug === slug);
}

export function getGuidePath(guide: Pick<Guide, "slug">): string {
  return `/travel-guide/${guide.slug}`;
}

export function getGuidesBySlugs(slugs: string[] = []): Guide[] {
  return slugs
    .map((slug) => getGuideBySlug(slug))
    .filter((guide): guide is Guide => guide !== undefined);
}

/** Explicit related guides first, then other guides from the same category. */
export function getRelatedGuides(guide: Guide, limit = 3): Guide[] {
  const explicit = getGuidesBySlugs(guide.relatedGuideSlugs);
  const sameCategory = getGuidesByCategory(guide.category).filter(
    (candidate) => candidate.slug !== guide.slug && !explicit.includes(candidate),
  );
  return [...explicit, ...sameCategory].slice(0, limit);
}

const LINK_PATTERN = /\[([^\]]+)\]\(([^)]+)\)/g;

function plainText(text: string): string {
  return text.replace(LINK_PATTERN, "$1");
}

export function getReadingMinutes(guide: Guide): number {
  const text = [
    guide.intro,
    ...guide.sections.flatMap((section) => [section.heading, ...(section.paragraphs ?? []), ...(section.list ?? [])]),
    ...(guide.faqs ?? []).flatMap((faq) => [faq.question, faq.answer]),
  ]
    .map(plainText)
    .join(" ");
  return Math.max(1, Math.round(text.split(/\s+/).length / 200));
}

export function slugifyHeading(heading: string): string {
  return heading
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export type RichTextPart = { text: string; href?: string };

export function parseRichText(text: string): RichTextPart[] {
  const parts: RichTextPart[] = [];
  let lastIndex = 0;
  for (const match of text.matchAll(LINK_PATTERN)) {
    if (match.index > lastIndex) parts.push({ text: text.slice(lastIndex, match.index) });
    parts.push({ text: match[1], href: match[2] });
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) parts.push({ text: text.slice(lastIndex) });
  return parts;
}

export { plainText as stripRichText };
