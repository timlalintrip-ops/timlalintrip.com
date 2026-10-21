/**
 * Primary landing page for each target search intent.
 * Similar queries share a URL; activity pages keep activity-specific intent.
 */
export const keywordLandingPages = [
  { query: "Timlalin trip", path: "/", intent: "commercial" },
  { query: "Timlaline Agadir", path: "/", intent: "navigational" },
  { query: "Timlalin Dunes", path: "/", intent: "informational" },
  { query: "Timlalin trip price", path: "/activities", intent: "commercial" },
  { query: "Timlalin activities", path: "/activities", intent: "commercial" },
  { query: "Timlalin trip itinerary", path: "/travel-guide/timlalin-dunes-day-itinerary", intent: "informational" },
  { query: "Timlalin trip from Agadir", path: "/travel-guide/how-to-get-to-timlalin-dunes-from-agadir", intent: "informational" },
  { query: "Timlalin Tamri", path: "/travel-guide/tamri-and-the-northern-bald-ibis", intent: "informational" },
  { query: "Timlalin desert", path: "/travel-guide/timlalin-dunes-vs-sahara-desert", intent: "informational" },
  { query: "Timlalin Canyon", path: "/activities/canyon-tour", intent: "commercial" },
  { query: "Timlalin dunes photos", path: "/gallery", intent: "informational" },
  { query: "Timlalin dunes sandboarding", path: "/activities/sandboarding-timlalin", intent: "commercial" },
  { query: "Timlalin dunes quad", path: "/activities/quad-biking-timlalin", intent: "commercial" },
  { query: "Timlalin quad price", path: "/activities/quad-biking-timlalin", intent: "commercial" },
  { query: "Timlalin buggy sandboarding", path: "/travel-guide/choosing-a-desert-activity", intent: "informational" },
  { query: "Timlalin camel ride", path: "/activities/camel-ride", intent: "commercial" },
  { query: "Timlalin sunset tea", path: "/activities/sunset-tea", intent: "commercial" },
  { query: "Moroccan dinner Timlalin dunes", path: "/activities/moroccan-dinner", intent: "commercial" },
  { query: "dune buggy Timlalin", path: "/activities/buggy-adventure", intent: "commercial" },
  { query: "best time to visit Timlalin Dunes", path: "/travel-guide/best-time-to-visit-timlalin-dunes", intent: "informational" },
  { query: "quad vs buggy Timlalin", path: "/travel-guide/quad-or-buggy-timlalin", intent: "informational" },
  { query: "Timlalin dunes from Taghazout", path: "/travel-guide/timlalin-dunes-from-taghazout-and-imsouane", intent: "informational" },
] as const;
