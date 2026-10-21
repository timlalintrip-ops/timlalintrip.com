import { describe, expect, it } from "vitest";
import sitemap from "@/app/sitemap";
import robots from "@/app/robots";
import { getActivitiesHubFaqs, getActivityPath, getPublishedActivities } from "@/content/activities";
import { getGuidePath, getPublishedGuides, parseRichText, stripRichText } from "@/content/guides";
import { destinationContent } from "@/content/home";
import { legalReview } from "@/content/legal";
import { staticPageSeo } from "@/content/static-pages";
import { keywordLandingPages } from "@/lib/keyword-map";
import { buildMetadata, missingPageMetadata } from "@/lib/seo";
import { absoluteUrl, planningNavigation, siteConfig } from "@/lib/site-config";
import {
  faqSchema,
  jsonLdGraph,
  organizationSchema,
  touristAttractionSchema,
  touristTripSchema,
} from "@/lib/structured-data";

const activities = getPublishedActivities();
const guides = getPublishedGuides();
const sitemapEntries = sitemap();
const sitemapUrls = sitemapEntries.map((entry) => entry.url);

function linksIn(text: string): string[] {
  return parseRichText(text).flatMap((part) => (part.href ? [part.href] : []));
}

describe("buildMetadata", () => {
  it("emits an absolute www canonical and index robots for public pages", () => {
    const metadata = buildMetadata({
      title: "Quad biking",
      description: "A guided quad ride in the Timlalin Dunes near Agadir, Morocco.",
      path: "/activities/quad-biking-timlalin",
    });

    expect(metadata.alternates?.canonical).toBe("https://www.timlalintrip.com/activities/quad-biking-timlalin");
    expect(metadata.robots).toMatchObject({ index: true, follow: true });
    expect(metadata.openGraph?.url).toBe(metadata.alternates?.canonical);
  });

  it("marks unknown dynamic slugs as noindex", () => {
    const metadata = missingPageMetadata("Activity not found");
    expect(metadata.robots).toEqual({ index: false, follow: true });
    expect(metadata.description).toMatch(/does not exist/);
  });

  it("does not append the brand twice on absolute titles", () => {
    const metadata = buildMetadata(staticPageSeo.home);
    expect(metadata.title).toEqual({ absolute: staticPageSeo.home.title });
    expect(staticPageSeo.home.title.startsWith(`${siteConfig.name} |`)).toBe(true);
  });
});

describe("static page SEO", () => {
  it("gives every static page a unique title, description and path", () => {
    const pages = Object.values(staticPageSeo);
    expect(new Set(pages.map((page) => page.title)).size).toBe(pages.length);
    expect(new Set(pages.map((page) => page.description)).size).toBe(pages.length);
    expect(new Set(pages.map((page) => page.path)).size).toBe(pages.length);
    for (const page of pages) {
      expect(page.description.length).toBeGreaterThanOrEqual(110);
      expect(page.description.length).toBeLessThanOrEqual(170);
      expect(page.title.includes(`${siteConfig.name} | ${siteConfig.name}`)).toBe(false);
    }
  });
});

describe("keyword mapping", () => {
  it("points every target query at a unique intent URL that exists in the sitemap", () => {
    for (const { query, path } of keywordLandingPages) {
      expect(sitemapUrls, query).toContain(absoluteUrl(path));
    }
  });
});

describe("sitemap and robots", () => {
  it("lists only unique canonical www URLs", () => {
    expect(absoluteUrl("/")).toBe(siteConfig.url);
    expect(sitemapUrls.every((url) => url.startsWith(siteConfig.url))).toBe(true);
    expect(new Set(sitemapUrls).size).toBe(sitemapUrls.length);
  });

  it("includes published activities and guides, and excludes unreviewed legal pages", () => {
    for (const activity of activities) {
      expect(sitemapUrls).toContain(absoluteUrl(getActivityPath(activity)));
    }
    for (const guide of guides) {
      expect(sitemapUrls).toContain(absoluteUrl(getGuidePath(guide)));
    }
    if (!legalReview.privacyPolicy.reviewed) {
      expect(sitemapUrls).not.toContain(absoluteUrl("/privacy-policy"));
    }
    if (!legalReview.terms.reviewed) {
      expect(sitemapUrls).not.toContain(absoluteUrl("/terms-and-conditions"));
    }
  });

  it("points robots.txt at the sitemap and does not disallow public pages", () => {
    const file = robots();
    expect(file.sitemap).toBe(absoluteUrl("/sitemap.xml"));
    expect(file.rules).toEqual([{ userAgent: "*", allow: "/" }]);
  });
});

describe("metadata inventory", () => {
  it("keeps activity, guide and static titles unique so they do not cannibalise each other", () => {
    const titles = [
      ...Object.values(staticPageSeo).map((page) => page.title),
      ...activities.map((activity) => activity.metaTitle),
      ...guides.map((guide) => guide.metaTitle),
    ];
    expect(new Set(titles).size).toBe(titles.length);
  });

  it("keeps activity meta titles and descriptions unique", () => {
    expect(new Set(activities.map((activity) => activity.metaTitle)).size).toBe(activities.length);
    expect(new Set(activities.map((activity) => activity.metaDescription)).size).toBe(activities.length);
  });
});

describe("internal links used for SEO hubs", () => {
  it("only points planning footer, destination copy and hub FAQs at real pages", () => {
    const known = new Set([
      "/",
      "/activities",
      "/about-us",
      "/travel-guide",
      "/book-now",
      "/gallery",
      "/contact",
      ...activities.map(getActivityPath),
      ...guides.map(getGuidePath),
    ]);

    for (const item of planningNavigation) {
      expect(known, item.href).toContain(item.href);
    }
    for (const paragraph of destinationContent.paragraphs) {
      for (const href of linksIn(paragraph)) expect(known, href).toContain(href);
    }
    for (const faq of getActivitiesHubFaqs()) {
      for (const href of linksIn(faq.answer)) expect(known, href).toContain(href);
    }
  });
});

describe("structured data", () => {
  it("serialises a valid JSON-LD graph without markdown in FAQ answers", () => {
    const graph = jsonLdGraph(
      organizationSchema(),
      touristAttractionSchema(),
      faqSchema([{ question: "How do I get there?", answer: "See the guide [from Agadir](/travel-guide/how-to-get-to-timlalin-dunes-from-agadir)." }]),
    );
    const json = JSON.stringify(graph);
    expect(() => JSON.parse(json)).not.toThrow();
    expect(json).not.toContain("[from Agadir]");
    expect(stripRichText("See [from Agadir](/path).")).toBe("See from Agadir.");
  });

  it("describes activities as trips without invented offers or ratings", () => {
    const activity = activities[0];
    const trip = touristTripSchema(activity, getActivityPath(activity));
    expect(trip["@type"]).toBe("TouristTrip");
    expect(trip.itinerary).toEqual({ "@id": `${siteConfig.url}/#timlalin-dunes` });
    expect(trip.about).toBeUndefined();
    expect(trip.offers).toBeUndefined();
    expect(trip.aggregateRating).toBeUndefined();
    expect(trip.review).toBeUndefined();
    expect(organizationSchema().address).toBeUndefined();
    expect(touristAttractionSchema().description).not.toBe(siteConfig.description);
  });
});
