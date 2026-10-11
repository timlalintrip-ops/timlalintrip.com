import { media, type MediaAsset } from "./media";

export type Faq = {
  question: string;
  answer: string;
};

/**
 * Confirmed operational details. Leave a field undefined until the business has
 * confirmed it — undefined fields are never rendered.
 */
export type PracticalInfo = {
  duration?: string;
  minimumAge?: string;
  /** Include the currency and what the price covers, e.g. "From 350 MAD per person". */
  price?: string;
  meetingPoint?: string;
  transport?: string;
  inclusions?: string[];
  whatToBring?: string[];
  /** Confirmed restrictions, e.g. licence, weight or health requirements. */
  safety?: string[];
  /** Confirmed booking instructions, e.g. notice period or deposit rules. */
  bookingNotes?: string;
};

export type Activity = {
  slug: string;
  name: string;
  /** Short label for cards, menus and the booking form. */
  shortName: string;
  summary: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  overview: string[];
  expectations: { title: string; text: string }[];
  heroImage: MediaAsset;
  galleryImages: MediaAsset[];
  practical?: PracticalInfo;
  /** Only add FAQs answered from real, confirmed business information. */
  faqs?: Faq[];
  relatedSlugs: string[];
  relatedGuideSlugs?: string[];
  published: boolean;
};

const activities: Activity[] = [
  {
    slug: "sandboarding-timlalin",
    name: "Sandboarding in the Timlalin Dunes",
    shortName: "Sandboarding",
    summary:
      "Climb a dune crest, strap in and carve your way down soft golden sand with the Atlantic on the horizon.",
    metaTitle: "Sandboarding at Timlalin Dunes near Agadir",
    metaDescription:
      "Try sandboarding on the coastal dunes of Timlalin, north of Agadir. Learn what the experience involves and send a booking enquiry to TimlalinTrip.",
    intro:
      "Sandboarding is the simplest way to feel the shape of the Timlalin dunes: a board, a slope and gravity. It works for first-timers and for anyone who has spent winters on snow and wants to see how sand compares.",
    overview: [
      "The dunes at Timlalin rise close to the Atlantic coast, which gives the landscape a rare mix of sand, sea air and wide open views. Sandboarding turns that landscape into a playground — each run is short, but the climb back up and the view from the top are part of the experience.",
      "Sand is slower than snow and far more forgiving. Most people find their balance within a few attempts, and a fall usually ends in laughter and sand in your pockets rather than bruises.",
    ],
    expectations: [
      {
        title: "Short, repeatable runs",
        text: "Each descent lasts seconds, so you can try again and again, adjusting your stance as your confidence grows.",
      },
      {
        title: "Climbing between runs",
        text: "Walking back up a dune in soft sand is a genuine workout. Take it at your own pace and enjoy the view from the crest.",
      },
      {
        title: "Sitting or standing",
        text: "Sandboarding can be done standing like a snowboard or sitting down like a sled — a good option for anyone who wants a gentler ride.",
      },
    ],
    heroImage: media.sandboarding,
    galleryImages: [media.sandboarding, media.homeHero],
    relatedSlugs: ["quad-biking-timlalin", "camel-ride", "sunset-tea"],
    relatedGuideSlugs: ["what-to-pack-timlalin-dunes", "choosing-a-desert-activity"],
    published: true,
  },
  {
    slug: "quad-biking-timlalin",
    name: "Quad Biking at Timlalin",
    shortName: "Quad Biking",
    summary:
      "Ride a quad across open sand and dune tracks for an energetic way to cover more of the landscape.",
    metaTitle: "Quad Biking at Timlalin Dunes, North of Agadir",
    metaDescription:
      "Explore the Timlalin dunes by quad bike. Find out what a quad ride on the sand involves and request your preferred date with TimlalinTrip.",
    intro:
      "A quad bike lets you travel further across the dunes than you could on foot, with the freedom of open sand around you. It is the choice for visitors who want speed, engine noise and a bit of adrenaline.",
    overview: [
      "Riding on sand feels very different from riding on a road. The terrain shifts under the wheels, slopes appear suddenly and the dunes reveal new views at every crest. Covering ground this way gives you a real sense of how large and varied the Timlalin landscape is.",
      "Quad biking suits people who enjoy being in control of their own vehicle. Riding style, routes and safety arrangements are confirmed with you directly when you enquire.",
    ],
    expectations: [
      {
        title: "Changing terrain",
        text: "Firm patches, soft sand and gentle slopes each feel different under the wheels, which keeps every stretch of the ride interesting.",
      },
      {
        title: "Wide open views",
        text: "Moving across the dunes gives you constantly shifting perspectives over sand, scrub and coastline.",
      },
      {
        title: "Dust and wind",
        text: "Sand gets everywhere on a quad ride. Sunglasses and clothes you do not mind getting dusty make the experience more comfortable.",
      },
    ],
    heroImage: media.quadBiking,
    galleryImages: [media.quadBiking, media.activitiesHero],
    relatedSlugs: ["buggy-adventure", "sandboarding-timlalin", "sunset-tea"],
    relatedGuideSlugs: ["choosing-a-desert-activity", "what-to-pack-timlalin-dunes"],
    published: true,
  },
  {
    slug: "buggy-adventure",
    name: "Buggy Adventure in the Dunes",
    shortName: "Buggy Adventure",
    summary:
      "Take a seat in a dune buggy and experience the sand from a sturdier, side-by-side vehicle built for rough terrain.",
    metaTitle: "Dune Buggy Adventure at Timlalin, Morocco",
    metaDescription:
      "Discover a dune buggy adventure on the Timlalin sand dunes north of Agadir. See what to expect and send TimlalinTrip an enquiry for your dates.",
    intro:
      "A buggy brings the thrill of motorised dune riding with a different feel from a quad: you sit side by side in a framed vehicle, which makes it a sociable way to share the ride with a friend or partner.",
    overview: [
      "Buggies are designed for loose ground, so they handle the climbs and dips of the dunes with confidence. Because you share the vehicle, one person can focus on driving while the other takes in the scenery and the photos.",
      "Seating arrangements, driving requirements and route details are confirmed individually when you enquire, so you know exactly what to expect before the day.",
    ],
    expectations: [
      {
        title: "A shared experience",
        text: "Side-by-side seating means the ride is something you experience together rather than one behind the other.",
      },
      {
        title: "Built for sand",
        text: "Buggies are made for soft, uneven terrain, so the ride feels stable even as the dunes rise and fall.",
      },
      {
        title: "Room for the camera",
        text: "With a passenger seat beside the driver, there is a free pair of hands for photos and video of the landscape.",
      },
    ],
    heroImage: media.buggy,
    galleryImages: [media.buggy, media.activitiesHero],
    relatedSlugs: ["quad-biking-timlalin", "canyon-tour", "sunset-tea"],
    relatedGuideSlugs: ["choosing-a-desert-activity"],
    published: true,
  },
  {
    slug: "camel-ride",
    name: "Camel Ride at Timlalin",
    shortName: "Camel Ride",
    summary:
      "Slow down and travel the dunes at a camel's unhurried pace — a calm, timeless way to take in the scenery.",
    metaTitle: "Camel Ride in the Timlalin Dunes near Agadir",
    metaDescription:
      "Enjoy a calm camel ride across the Timlalin dunes on Morocco's Atlantic coast. Learn what the ride is like and enquire with TimlalinTrip.",
    intro:
      "A camel ride is the quiet counterpoint to engines and boards. Swaying gently above the sand, you have time to notice the shapes the wind carves into the dunes and the light changing over the coast.",
    overview: [
      "Camels have carried travellers across North Africa for centuries, and riding one is still one of the most memorable ways to experience a dune landscape. The pace is slow, the movement is rhythmic and the view from the saddle is higher than you might expect.",
      "This is a good choice for visitors who prefer a relaxed experience, for mixed groups with different energy levels, and for anyone who wants photographs that feel unmistakably Moroccan.",
    ],
    expectations: [
      {
        title: "A gentle rhythm",
        text: "Camels walk at an easy pace. The rolling motion takes a moment to get used to, then becomes surprisingly relaxing.",
      },
      {
        title: "Mounting and dismounting",
        text: "Camels kneel to let riders on and off. Hold on as they rise — it happens back legs first.",
      },
      {
        title: "Time to look around",
        text: "With no steering to worry about, you can simply enjoy the scenery and the quiet of the dunes.",
      },
    ],
    heroImage: media.camelRide,
    galleryImages: [media.camelRide, media.sunsetTea],
    relatedSlugs: ["sunset-tea", "sandboarding-timlalin", "moroccan-dinner"],
    relatedGuideSlugs: ["choosing-a-desert-activity", "what-to-pack-timlalin-dunes"],
    published: true,
  },
  {
    slug: "canyon-tour",
    name: "Canyon Tour",
    shortName: "Canyon Tour",
    summary:
      "Swap sand for rock on an outing into rugged canyon scenery, adding a different texture to your day.",
    metaTitle: "Canyon Tour from the Timlalin Area, Morocco",
    metaDescription:
      "Add rugged canyon scenery to your Timlalin adventure. Read what this outing offers and contact TimlalinTrip to confirm the route and details.",
    intro:
      "The coastline north of Agadir is not only sand. Rocky ground, cliffs and ravines shape the landscape too, and a canyon outing shows a side of the region that many visitors pass without noticing.",
    overview: [
      "Where the dunes are soft and constantly shifting, canyon scenery is all about stone: layered rock walls, narrow passages and the textures left by water and wind over a very long time. Pairing the two in one trip gives you a fuller picture of the area's geography.",
      "The exact canyon, route, level of walking and means of transport for this tour are confirmed directly when you enquire, so you can decide whether it suits your group.",
    ],
    expectations: [
      {
        title: "A change of scenery",
        text: "Rock formations and ravines make a striking contrast after a morning on the sand.",
      },
      {
        title: "Uneven ground",
        text: "Canyon terrain can be rocky. Comfortable closed shoes are a sensible choice.",
      },
      {
        title: "Photography opportunities",
        text: "Shadows and layered stone create very different images from the open dunes.",
      },
    ],
    heroImage: media.canyonTour,
    galleryImages: [media.canyonTour],
    relatedSlugs: ["buggy-adventure", "quad-biking-timlalin", "camel-ride"],
    relatedGuideSlugs: ["what-to-pack-timlalin-dunes"],
    published: true,
  },
  {
    slug: "sunset-tea",
    name: "Sunset Tea on the Dunes",
    shortName: "Sunset Tea",
    summary:
      "Watch the light fade over the dunes and the ocean with a glass of traditional Moroccan mint tea.",
    metaTitle: "Sunset Mint Tea on the Timlalin Dunes",
    metaDescription:
      "End your day at Timlalin with Moroccan mint tea as the sun sets over the dunes and the Atlantic. Send TimlalinTrip an enquiry for your evening.",
    intro:
      "Late afternoon is when the Timlalin dunes are at their most beautiful. Shadows lengthen, the sand turns from gold to copper and, on a clear evening, the sun drops towards the Atlantic horizon.",
    overview: [
      "Mint tea is at the heart of Moroccan hospitality. Sweet, fragrant and poured from height to create a light foam, it is offered to guests as a sign of welcome. Sharing a glass on the dunes as the light changes is a simple moment that many visitors remember long after the more energetic activities.",
      "Sunset tea pairs naturally with a camel ride or a sandboarding session earlier in the afternoon. Timing depends on the season, and the details are agreed with you when you enquire.",
    ],
    expectations: [
      {
        title: "Changing light",
        text: "The colour of the dunes shifts minute by minute in the hour before sunset — ideal for photography.",
      },
      {
        title: "A tea ritual",
        text: "Moroccan mint tea is traditionally poured from a height, which aerates it and gives each glass its foam.",
      },
      {
        title: "Cooler evenings",
        text: "Temperatures near the coast can drop once the sun goes down. A light layer is worth bringing.",
      },
    ],
    heroImage: media.sunsetTea,
    galleryImages: [media.sunsetTea, media.homeHero],
    relatedSlugs: ["camel-ride", "moroccan-dinner", "sandboarding-timlalin"],
    relatedGuideSlugs: ["what-to-pack-timlalin-dunes"],
    published: true,
  },
  {
    slug: "moroccan-dinner",
    name: "Moroccan Dinner",
    shortName: "Moroccan Dinner",
    summary:
      "Round off a day in the dunes with a Moroccan meal — a relaxed way to slow down after the adventure.",
    metaTitle: "Moroccan Dinner after a Day at Timlalin Dunes",
    metaDescription:
      "Complete your Timlalin day with a Moroccan dinner. Find out about this experience and contact TimlalinTrip to confirm the menu and details.",
    intro:
      "After a day of wind, sand and sun, sitting down to a Moroccan meal is the natural way to close the experience. It is a chance to rest, talk about the day and taste the flavours of the Souss region.",
    overview: [
      "Moroccan cooking is known for slow-cooked dishes, warm spices, fresh bread and generous sharing plates. A shared meal is central to Moroccan hospitality, and enjoying one after time in the dunes turns an activity into a full day out.",
      "The menu, setting and dietary options for this dinner are confirmed directly when you enquire. Let us know about any allergies or requirements in your message.",
    ],
    expectations: [
      {
        title: "Shared plates",
        text: "Moroccan meals are traditionally served to share, which makes dinner a sociable end to the day.",
      },
      {
        title: "Time to unwind",
        text: "The pace slows right down after the activities — this part of the day is about rest and conversation.",
      },
      {
        title: "Dietary needs",
        text: "Mention vegetarian, allergy or other requirements in your enquiry so they can be discussed in advance.",
      },
    ],
    heroImage: media.moroccanDinner,
    galleryImages: [media.moroccanDinner, media.sunsetTea],
    relatedSlugs: ["sunset-tea", "camel-ride", "canyon-tour"],
    published: true,
  },
];

export function getPublishedActivities(): Activity[] {
  return activities.filter((activity) => activity.published);
}

export function getActivityBySlug(slug: string): Activity | undefined {
  return getPublishedActivities().find((activity) => activity.slug === slug);
}

export function getRelatedActivities(activity: Activity): Activity[] {
  return activity.relatedSlugs
    .map((slug) => getActivityBySlug(slug))
    .filter((related): related is Activity => related !== undefined);
}

export function getActivityPath(activity: Pick<Activity, "slug">): string {
  return `/activities/${activity.slug}`;
}

export function hasPracticalInfo(practical: PracticalInfo | undefined): practical is PracticalInfo {
  if (!practical) return false;
  return Object.values(practical).some((value) =>
    Array.isArray(value) ? value.length > 0 : Boolean(value),
  );
}
