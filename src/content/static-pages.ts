import type { PageMetadataInput } from "@/lib/seo";

/**
 * Title, description and canonical path for indexable static routes.
 * Activity and guide metadata live on those content records.
 */
export const staticPageSeo = {
  home: {
    title: "TimlalinTrip | Timlalin Dunes Adventures near Agadir",
    absoluteTitle: true,
    description:
      "Sandboarding, quad biking, buggy and camel rides, sunset tea and dinner in the Timlalin Dunes near Tamri, north of Agadir. Also written Timlaline.",
    path: "/",
  },
  activities: {
    title: "Timlalin Activities & Prices near Agadir",
    description:
      "Timlalin Dunes activities near Agadir: quad biking, sandboarding, camel rides, buggy, canyon tour, sunset tea and Moroccan dinner. From €10, pay on arrival.",
    path: "/activities",
  },
  travelGuide: {
    title: "Timlalin Dunes & Agadir Travel Guide",
    description:
      "Free travel guides for the Timlalin Dunes near Agadir: how to get there, the best time to visit, quad biking, sandboarding and camel ride tips, itineraries and more.",
    path: "/travel-guide",
  },
  bookNow: {
    title: "Book Your Timlalin Dunes Adventure",
    description:
      "Send TimlalinTrip a booking enquiry for sandboarding, quad biking, buggy or camel rides, sunset tea or dinner in the Timlalin Dunes. We reply to confirm details.",
    path: "/book-now",
  },
  about: {
    title: "About Us",
    description:
      "Meet TimlalinTrip, a tourism brand dedicated to outdoor experiences in the Timlalin Dunes on Morocco's Atlantic coast north of Agadir, near Tamri.",
    path: "/about-us",
  },
  contact: {
    title: "Contact Us",
    description:
      "Get in touch with TimlalinTrip about a Timlalin trip from Agadir. Email, WhatsApp or send an enquiry with your preferred date and group size.",
    path: "/contact",
  },
  gallery: {
    title: "Timlalin Dunes Photos near Agadir",
    description:
      "Photos of the Timlalin Dunes near Tamri, north of Agadir: sandboarding, quad biking, camel rides, the canyon, buggy tours and Atlantic sunsets.",
    path: "/gallery",
  },
} satisfies Record<string, PageMetadataInput>;
