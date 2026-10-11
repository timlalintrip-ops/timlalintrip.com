import type { MetadataRoute } from "next";
import { getActivityPath, getPublishedActivities } from "@/content/activities";
import { getGuidePath, getPublishedGuides } from "@/content/guides";
import { legalReview } from "@/content/legal";
import { isGalleryIndexable } from "@/content/media";
import { absoluteUrl, hasContactDetails, siteConfig } from "@/lib/site-config";

/** Lists only canonical, indexable public URLs. */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ["/", "/activities", "/about-us", "/travel-guide", "/book-now"];
  if (hasContactDetails(siteConfig.contact)) staticPaths.push("/contact");
  if (isGalleryIndexable()) staticPaths.push("/gallery");
  if (legalReview.privacyPolicy.reviewed) staticPaths.push("/privacy-policy");
  if (legalReview.terms.reviewed) staticPaths.push("/terms-and-conditions");

  return [
    ...staticPaths.map((path) => ({ url: absoluteUrl(path) })),
    ...getPublishedActivities().map((activity) => ({ url: absoluteUrl(getActivityPath(activity)) })),
    ...getPublishedGuides().map((guide) => ({
      url: absoluteUrl(getGuidePath(guide)),
      lastModified: guide.updatedAt ?? guide.publishedAt,
    })),
  ];
}
