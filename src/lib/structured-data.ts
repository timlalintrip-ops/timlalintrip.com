import type { Activity } from "@/content/activities";
import { stripRichText, type Guide } from "@/content/guides";
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
const attractionId = `${siteConfig.url}/#timlalin-dunes`;

const servedAreas = ["Agadir", "Taghazout", "Imsouane", "Tamri"];

export function organizationSchema(): JsonLdObject {
  const { contact, logo, socialProfiles } = siteConfig;
  return {
    "@type": "Organization",
    "@id": organizationId,
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    areaServed: servedAreas.map((name) => ({ "@type": "Place", name })),
    ...(siteConfig.legalName ? { legalName: siteConfig.legalName } : {}),
    ...(logo ? { logo: absoluteUrl(logo.src) } : {}),
    ...(contact.email ? { email: contact.email } : {}),
    ...(contact.phone ? { telephone: contact.phone } : {}),
    ...(socialProfiles.length > 0 ? { sameAs: socialProfiles.map((profile) => profile.url) } : {}),
  };
}

/**
 * The Timlalin Dunes as a place. No coordinates, ratings or opening hours —
 * those have not been published as verified business facts.
 */
export function touristAttractionSchema(imageUrl?: string): JsonLdObject {
  return {
    "@type": "TouristAttraction",
    "@id": attractionId,
    name: "Timlalin Dunes",
    alternateName: ["Timlaline", "Timlalin"],
    description:
      "Coastal dunes near Tamri on Morocco's Atlantic shore, north of Agadir. Also written Timlaline.",
    url: siteConfig.url,
    ...(imageUrl ? { image: [imageUrl] } : {}),
    address: {
      "@type": "PostalAddress",
      addressLocality: "Tamri",
      addressCountry: "MA",
    },
  };
}

/** Bookable activity. Prices stay in visible copy; Offer markup is omitted for "from" prices. */
export function touristTripSchema(activity: Activity, path: string): JsonLdObject {
  return {
    "@type": "TouristTrip",
    name: activity.name,
    description: activity.metaDescription,
    url: absoluteUrl(path),
    ...(activity.heroImage.src ? { image: [absoluteUrl(activity.heroImage.src)] } : {}),
    provider: { "@id": organizationId },
    itinerary: { "@id": attractionId },
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

/** Only for questions and answers that are visible on the same page. */
export function faqSchema(faqs: { question: string; answer: string }[]): JsonLdObject {
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: stripRichText(faq.answer) },
    })),
  };
}

/** Wraps one or more nodes in a single JSON-LD document. */
export function jsonLdGraph(...nodes: JsonLdObject[]): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@graph": nodes,
  };
}
