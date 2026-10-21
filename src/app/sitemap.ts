import type { MetadataRoute } from "next";
import { getActivityPath, getPublishedActivities } from "@/content/activities";
import { getGuidePath, getPublishedGuides } from "@/content/guides";
import { legalReview } from "@/content/legal";
import { galleryImages, hasRealPhoto, isGalleryIndexable } from "@/content/media";
import { absoluteUrl, hasContactDetails, siteConfig } from "@/lib/site-config";

type Entry = MetadataRoute.Sitemap[number];
type Frequency = NonNullable<Entry["changeFrequency"]>;

/** Last content change for pages without their own date. Update it when those pages change. */
const SITE_UPDATED_AT = "2026-10-21";

/** Lists only canonical, indexable public URLs. */
export default function sitemap(): MetadataRoute.Sitemap {
  const page = (
    path: string,
    changeFrequency: Frequency,
    priority: number,
    lastModified = SITE_UPDATED_AT,
    images?: string[],
  ): Entry => ({
    url: absoluteUrl(path),
    lastModified,
    changeFrequency,
    priority,
    ...(images && images.length > 0 ? { images } : {}),
  });

  const staticPages: Entry[] = [
    page("/", "weekly", 1),
    page("/activities", "weekly", 0.9),
    page("/travel-guide", "weekly", 0.8),
    page("/book-now", "monthly", 0.8),
    page("/about-us", "monthly", 0.6),
  ];
  if (hasContactDetails(siteConfig.contact)) staticPages.push(page("/contact", "monthly", 0.6));
  if (isGalleryIndexable()) {
    staticPages.push(
      page(
        "/gallery",
        "monthly",
        0.6,
        SITE_UPDATED_AT,
        galleryImages.filter(hasRealPhoto).flatMap((image) => (image.src ? [absoluteUrl(image.src)] : [])),
      ),
    );
  }
  if (legalReview.privacyPolicy.reviewed) staticPages.push(page("/privacy-policy", "yearly", 0.3));
  if (legalReview.terms.reviewed) staticPages.push(page("/terms-and-conditions", "yearly", 0.3));

  return [
    ...staticPages,
    ...getPublishedActivities().map((activity) =>
      page(
        getActivityPath(activity),
        "monthly",
        0.9,
        SITE_UPDATED_AT,
        activity.heroImage.src ? [absoluteUrl(activity.heroImage.src)] : undefined,
      ),
    ),
    ...getPublishedGuides().map((guide) =>
      page(getGuidePath(guide), "monthly", 0.7, guide.updatedAt ?? guide.publishedAt),
    ),
  ];
}
