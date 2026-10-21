import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "./site-config";

export type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  /** Set false for pages that should not appear in search results. */
  index?: boolean;
  /** Use the title as-is instead of appending the brand name. */
  absoluteTitle?: boolean;
  openGraphType?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  /** Path inside /public for a page-specific sharing image. */
  image?: { src: string; width: number; height: number; alt: string };
};

const notFoundDescription =
  "This page does not exist or has moved. Browse Timlalin Dunes activities or return to the homepage.";

/** Metadata for unknown dynamic slugs that still resolve a document. */
export function missingPageMetadata(title: string): Metadata {
  return {
    title,
    description: notFoundDescription,
    robots: { index: false, follow: true },
  };
}

export const defaultSocialImage = {
  url: siteConfig.socialImage.src,
  width: siteConfig.socialImage.width,
  height: siteConfig.socialImage.height,
  alt: siteConfig.socialImage.alt,
};

/**
 * Builds consistent per-page metadata. The root layout provides
 * `metadataBase`, the title template and the default social image.
 */
export function buildMetadata({
  title,
  description,
  path,
  index = true,
  absoluteTitle = false,
  openGraphType = "website",
  publishedTime,
  modifiedTime,
  image,
}: PageMetadataInput): Metadata {
  const canonical = absoluteUrl(path);
  const fullTitle = absoluteTitle ? title : `${title} | ${siteConfig.name}`;
  const images = image
    ? [{ url: image.src, width: image.width, height: image.height, alt: image.alt }]
    : [defaultSocialImage];

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical },
    robots: index
      ? {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        }
      : { index: false, follow: true },
    openGraph: {
      type: openGraphType,
      url: canonical,
      title: fullTitle,
      description,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      images,
      ...(openGraphType === "article" ? { publishedTime, modifiedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: images.map((img) => img.url),
    },
  };
}
