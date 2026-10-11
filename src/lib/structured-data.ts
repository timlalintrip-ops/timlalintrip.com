import type { Guide } from "@/content/guides";
import { absoluteUrl, siteConfig } from "./site-config";

/**
 * JSON-LD builders. Only properties backed by verified, visible information are
 * emitted. Business fields that are not configured in `siteConfig` are omitted.
 */

type JsonLdObject = { [key: string]: unknown };

export type BreadcrumbItem = {
  name: string;
  path: string;
};

const organizationId = `${siteConfig.url}/#organization`;
const websiteId = `${siteConfig.url}/#website`;

export function organizationSchema(): JsonLdObject {
  const { contact, logo, socialProfiles } = siteConfig;
  return {
    "@type": "Organization",
    "@id": organizationId,
    name: siteConfig.name,
    url: siteConfig.url,
    ...(siteConfig.legalName ? { legalName: siteConfig.legalName } : {}),
    ...(logo ? { logo: absoluteUrl(logo.src) } : {}),
    ...(contact.email ? { email: contact.email } : {}),
    ...(contact.phone ? { telephone: contact.phone } : {}),
    ...(socialProfiles.length > 0 ? { sameAs: socialProfiles.map((profile) => profile.url) } : {}),
  };
}

export function websiteSchema(): JsonLdObject {
  return {
    "@type": "WebSite",
    "@id": websiteId,
    name: siteConfig.name,
    url: siteConfig.url,
    inLanguage: siteConfig.language,
    publisher: { "@id": organizationId },
  };
}

export function breadcrumbSchema(items: BreadcrumbItem[]): JsonLdObject {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function articleSchema(guide: Guide, path: string): JsonLdObject {
  return {
    "@type": "Article",
    headline: guide.title,
    description: guide.metaDescription,
    mainEntityOfPage: absoluteUrl(path),
    inLanguage: siteConfig.language,
    datePublished: guide.publishedAt,
    dateModified: guide.updatedAt ?? guide.publishedAt,
    ...(guide.heroImage.src ? { image: [absoluteUrl(guide.heroImage.src)] } : {}),
    author: guide.author
      ? { "@type": "Person", name: guide.author.name, ...(guide.author.url ? { url: guide.author.url } : {}) }
      : { "@id": organizationId },
    publisher: { "@id": organizationId },
  };
}

/** Wraps one or more nodes in a single JSON-LD document. */
export function jsonLdGraph(...nodes: JsonLdObject[]): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@graph": nodes,
  };
}
