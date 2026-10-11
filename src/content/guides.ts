import { media, type MediaAsset } from "./media";

export type GuideSection = {
  heading: string;
  paragraphs?: string[];
  list?: string[];
};

export type Guide = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  /** Card and listing summary. */
  excerpt: string;
  intro: string;
  sections: GuideSection[];
  heroImage: MediaAsset;
  /** Only set when a genuine, named author wrote the article. */
  author?: { name: string; url?: string };
  /** ISO dates (YYYY-MM-DD). Must reflect real publication and update dates. */
  publishedAt: string;
  updatedAt?: string;
  relatedActivitySlugs: string[];
  published: boolean;
};

const guides: Guide[] = [
  {
    slug: "what-to-pack-timlalin-dunes",
    title: "What to Wear and Pack for a Day in the Timlalin Dunes",
    metaTitle: "What to Pack for the Timlalin Dunes",
    metaDescription:
      "Sun, sand, wind and cooler evenings: a practical packing list for a day of activities in the Timlalin coastal dunes north of Agadir.",
    excerpt:
      "Sun, sand, wind and cooler evenings — a practical list to help you enjoy the dunes in comfort.",
    intro:
      "The Timlalin dunes sit on Morocco's Atlantic coast north of Agadir, near the village of Tamri. Being close to the ocean shapes the conditions: the sun is strong, the wind often carries fine sand, and evenings can feel noticeably cooler than the middle of the day. A little preparation makes a big difference to how much you enjoy your time on the sand.",
    sections: [
      {
        heading: "Protect yourself from the sun",
        paragraphs: [
          "Open dunes offer very little shade, and pale sand reflects sunlight back at you. Even on a breezy day when it does not feel hot, you can burn quickly.",
        ],
        list: [
          "High-factor sunscreen, reapplied during the day",
          "A hat that will not blow away easily, or a cap with a strap",
          "Sunglasses — they also keep wind-blown sand out of your eyes",
          "Lip balm with sun protection",
        ],
      },
      {
        heading: "Dress for sand and wind",
        paragraphs: [
          "Lightweight, breathable clothing that covers your shoulders is more comfortable than you might expect, because it protects from both sun and sand. Choose clothes you do not mind getting dusty, especially for quad or buggy rides.",
          "A light scarf or neck gaiter is one of the most useful things you can bring. Pull it over your nose and mouth when the wind picks up or when riding behind other vehicles.",
        ],
      },
      {
        heading: "Footwear",
        paragraphs: [
          "Many people enjoy walking on the dunes barefoot, but sand can become very hot in the middle of the day. Closed trainers or sturdy sandals that stay on your feet are a safe choice, and closed shoes are the better option if your day includes rocky ground such as a canyon outing.",
        ],
      },
      {
        heading: "Bring a layer for the evening",
        paragraphs: [
          "If you are staying for sunset tea or dinner, pack a light jumper or windproof jacket. Coastal evenings can cool down quickly once the sun has set, even after a warm afternoon.",
        ],
      },
      {
        heading: "Keep your gear sand-proof",
        list: [
          "A refillable water bottle — drink regularly, as wind and sun dehydrate you faster than you notice",
          "A small zip-lock bag or pouch to protect your phone from fine sand",
          "A lens cloth if you are bringing a camera",
          "A small backpack that closes fully",
        ],
      },
      {
        heading: "Respect the landscape",
        paragraphs: [
          "The wider Tamri area is known as a habitat of the northern bald ibis, an endangered bird species. Take all of your rubbish home with you, keep to the routes your guide recommends and avoid disturbing wildlife, so the dunes stay as remarkable for the next visitors as they are for you.",
        ],
      },
    ],
    heroImage: media.packingGuide,
    publishedAt: "2026-10-10",
    relatedActivitySlugs: ["sandboarding-timlalin", "camel-ride", "sunset-tea"],
    published: true,
  },
  {
    slug: "choosing-a-desert-activity",
    title: "Sandboarding, Quad, Buggy or Camel? Choosing Your Dune Activity",
    metaTitle: "How to Choose a Timlalin Dune Activity",
    metaDescription:
      "Not sure which dune activity to choose at Timlalin? Compare sandboarding, quad biking, buggy rides and camel rides by pace, energy and who they suit.",
    excerpt:
      "Compare the main dune activities by pace, energy level and who they suit, so you can plan the right day for your group.",
    intro:
      "Each way of exploring the Timlalin dunes offers a different experience. Some are about speed and adrenaline, others about slowing down and taking in the coastal scenery. This guide compares the main options so you can choose what suits you — or combine several into one day.",
    sections: [
      {
        heading: "Sandboarding: for the playful and active",
        paragraphs: [
          "Sandboarding is the most physical option. The runs down are quick and fun, but the climbs back up in soft sand take real effort. It suits active travellers, families with energetic children and anyone who enjoys trying a new board sport. If you have snowboarded before, you will recognise the stance — although sand is slower and much more forgiving.",
        ],
      },
      {
        heading: "Quad biking: for independence and speed",
        paragraphs: [
          "On a quad you control your own vehicle, which appeals to visitors who want to feel the terrain under the wheels and cover more ground. It is energetic, noisy and dusty in the best way. Expect sand on your clothes and bring sunglasses and a scarf.",
        ],
      },
      {
        heading: "Buggy: for sharing the ride",
        paragraphs: [
          "A buggy offers a similar motorised thrill to a quad, but with side-by-side seating in a framed vehicle. It is a sociable choice for couples and friends who want to experience the ride together, with one person driving and the other free to enjoy the view or film the journey.",
        ],
      },
      {
        heading: "Camel ride: for a slower pace",
        paragraphs: [
          "If you would rather not drive or exert yourself, a camel ride is calm and atmospheric. The pace is gentle, the view from the saddle is wide, and the experience connects you with a long tradition of desert travel in North Africa. It works well for mixed groups and pairs beautifully with sunset.",
        ],
      },
      {
        heading: "Combining activities",
        paragraphs: [
          "Many visitors like to mix energy levels: an active session on a board or quad, followed by a slower camel ride, then mint tea as the sun goes down. When you send an enquiry, mention which activities interest you and who is in your group, and the details can be planned around you.",
        ],
      },
      {
        heading: "Questions to ask before you book",
        list: [
          "What is the duration of each activity, and how much time is spent actively riding or boarding?",
          "Are there minimum age or experience requirements?",
          "What safety equipment and briefing are provided?",
          "Is transport from your accommodation included or available?",
          "What happens if the weather is unsuitable on the day?",
        ],
      },
    ],
    heroImage: media.choosingGuide,
    publishedAt: "2026-10-10",
    relatedActivitySlugs: [
      "sandboarding-timlalin",
      "quad-biking-timlalin",
      "buggy-adventure",
      "camel-ride",
    ],
    published: true,
  },
];

export function getPublishedGuides(): Guide[] {
  return guides.filter((guide) => guide.published);
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
