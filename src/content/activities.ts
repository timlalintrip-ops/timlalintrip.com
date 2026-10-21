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

const meetingPoint = "Timlalin Dunes, near Tamri — about 60 km north of Agadir on the N1 coastal road";
const hotelPickup = "Hotel pickup from Agadir, Taghazout or Imsouane available as an extra — tell us where you are staying";
const payOnArrival = "No advance payment: you pay on arrival. Send an enquiry and we confirm availability by email.";

/** Short pointer to the directions guides — full route copy lives on those pages. */
const gettingThereFaq: Faq = {
  question: "How do I get to the Timlalin Dunes?",
  answer:
    "The meeting point is the Timlalin Dunes near Tamri, about 60 km north of Agadir. Hotel pickup from Agadir, Taghazout or Imsouane can be added as an extra — mention where you are staying in your enquiry. Driving directions, times and pickup details are in the guides [from Agadir](/travel-guide/how-to-get-to-timlalin-dunes-from-agadir) and [from Taghazout and Imsouane](/travel-guide/timlalin-dunes-from-taghazout-and-imsouane).",
};

const paymentFaq: Faq = {
  question: "Do I need to pay in advance?",
  answer:
    "No. There is no advance payment — you pay on arrival on the day of your activity. Send an enquiry with your preferred date and group size, and we confirm availability by email.",
};

const activities: Activity[] = [
  {
    slug: "sandboarding-timlalin",
    name: "Sandboarding in the Timlalin Dunes near Agadir",
    shortName: "Sandboarding",
    summary:
      "Slide down giant golden dunes above the Atlantic — boards provided on site, perfect for beginners and families.",
    metaTitle: "Sandboarding at Timlalin near Agadir – €10",
    metaDescription:
      "Sandboarding on the giant Timlalin Dunes, 60 km north of Agadir near Tamri. Boards provided, beginner-friendly, from €10 per person. Pay on arrival.",
    intro:
      "A sandboarding session at Timlalin is a bookable activity on the coastal dunes near Tamri: a local guide, a board provided on site, and a start price of €10 per person, paid on arrival.",
    overview: [
      "The session takes place on the long dune faces behind the Atlantic near Tamri, about an hour north of Agadir. From the crest the view runs from golden sand to the ocean. The board is included in the price, which starts from €10 per person, and you pay on arrival — no advance payment.",
      "It suits first-timers as well as families and groups. You can ride standing or sitting, and your guide shows you the basics before the first run. Stance, stopping, falling safely and the walk back up the dune are covered in our [sandboarding for beginners](/travel-guide/sandboarding-for-beginners) guide.",
      "A sandboarding session combines well with a camel ride or a quad bike tour, and can finish with sunset tea on the dunes. Tell us which experiences interest you and we plan the day around your group.",
    ],
    expectations: [
      {
        title: "Fast, repeatable runs",
        text: "Each descent lasts only seconds, so you can go again and again, improving your stance with every run.",
      },
      {
        title: "Stand up or sit down",
        text: "Ride standing like a snowboarder or seated like a sled — a gentle option for children and cautious beginners.",
      },
      {
        title: "Views from the crest",
        text: "Climbing back up the soft sand is part of the fun, and the top of every dune rewards you with views over the Atlantic.",
      },
    ],
    heroImage: media.sandboarding,
    galleryImages: [
      media.sandboarding,
      media.sandboardingYoungRider,
      media.sandboardingOceanView,
      media.sandboardingClimb,
      media.sandboardingWalkUp,
    ],
    practical: {
      price: "From €10 per person",
      meetingPoint,
      transport: hotelPickup,
      inclusions: ["Sandboard provided on site", "Local guide"],
      whatToBring: ["Sunglasses and sun protection", "Comfortable clothes you do not mind getting sandy", "Water"],
      bookingNotes: payOnArrival,
    },
    faqs: [
      {
        question: "How much does sandboarding at Timlalin cost?",
        answer:
          "Sandboarding at the Timlalin Dunes starts from €10 per person, with the board provided on site. You pay on arrival — no advance payment is required.",
      },
      {
        question: "Is sandboarding suitable for beginners and children?",
        answer:
          "Yes. Sandboarding is beginner-friendly and popular with families. You can ride standing or sitting, and your local guide shows you how before your first run.",
      },
      gettingThereFaq,
    ],
    relatedSlugs: ["quad-biking-timlalin", "camel-ride", "sunset-tea"],
    relatedGuideSlugs: ["sandboarding-for-beginners", "timlalin-dunes-with-kids", "what-to-pack-timlalin-dunes"],
    published: true,
  },
  {
    slug: "quad-biking-timlalin",
    name: "Quad Biking in the Timlalin Dunes near Agadir",
    shortName: "Quad Biking",
    summary:
      "A one-hour guided quad ride across towering golden dunes with panoramic Atlantic views — no experience needed.",
    metaTitle: "Quad Biking Timlalin near Agadir – 1h, €25",
    metaDescription:
      "Guided 1-hour quad biking (ATV) tour across the Timlalin Dunes near Agadir, with Atlantic Ocean views. No experience needed, from €25. Pay on arrival.",
    intro:
      "Book a one-hour guided quad ride across the Timlalin Dunes: a briefing before you set off, a local guide with the group, Atlantic viewpoints, from €25 per person, paid on arrival. No previous experience is required.",
    overview: [
      "On a quad bike (ATV) you cover far more of the Timlalin landscape than on foot: wide sandy plains, rolling dune ridges and lookout points where the dunes meet the ocean, near Tamri about 60 km north of Agadir. The guided ride lasts about one hour and starts from €25 per person.",
      "Your local guide gives a full briefing before departure and rides with the group, adapting the pace to beginners and more confident riders. How sand feels under the wheels, what to wear and how the hour is structured are in the [first-timer quad guide](/travel-guide/quad-biking-near-agadir).",
      "Quad biking pairs well with sandboarding or a canyon tour for a fuller day, and the evening can finish with mint tea on the dunes at sunset.",
    ],
    expectations: [
      {
        title: "Briefing and guided ride",
        text: "A local guide explains the controls before you start and leads the ride, choosing a route that suits your group.",
      },
      {
        title: "Dunes and ocean panoramas",
        text: "The route crosses golden sand and dune crests with wide views over the Atlantic coastline.",
      },
      {
        title: "Sand, wind and adrenaline",
        text: "Sand gets everywhere on a quad ride — sunglasses and clothes you do not mind getting dusty make it more comfortable.",
      },
    ],
    heroImage: media.quadBiking,
    galleryImages: [
      media.quadBiking,
      media.quadAction,
      media.quadCoastRide,
      media.quadOceanView,
      media.quadGroupLineup,
      media.quadTwoRiders,
      media.quadDuneTop,
    ],
    practical: {
      duration: "1 hour",
      price: "From €25 per person",
      meetingPoint,
      transport: hotelPickup,
      inclusions: ["Local guide for the whole ride", "Briefing before departure"],
      whatToBring: ["Sunglasses", "Closed shoes", "Clothes you do not mind getting dusty", "A scarf or buff against sand and wind"],
      bookingNotes: payOnArrival,
    },
    faqs: [
      {
        question: "How much does quad biking at Timlalin cost?",
        answer:
          "A one-hour guided quad bike ride in the Timlalin Dunes starts from €25 per person. You pay on arrival — no advance payment is required.",
      },
      {
        question: "Do I need experience to ride a quad bike?",
        answer:
          "No. Quad biking at Timlalin is designed for beginners. Your guide gives you a full briefing before departure and accompanies the group for the whole ride.",
      },
      {
        question: "How long is the quad biking tour?",
        answer: "The guided quad ride lasts about one hour across the dunes, with stops for photos and views.",
      },
      gettingThereFaq,
    ],
    relatedSlugs: ["buggy-adventure", "sandboarding-timlalin", "canyon-tour"],
    relatedGuideSlugs: ["quad-biking-near-agadir", "quad-or-buggy-timlalin", "staying-safe-on-the-dunes"],
    published: true,
  },
  {
    slug: "buggy-adventure",
    name: "Buggy Tour in the Timlalin Dunes near Agadir",
    shortName: "Buggy Adventure",
    summary:
      "Share the thrill side by side in a dune buggy built for soft sand, steep climbs and Atlantic views.",
    metaTitle: "Dune Buggy Tour Timlalin near Agadir",
    metaDescription:
      "Ride a dune buggy across the Timlalin Dunes near Tamri, 60 km north of Agadir. Side-by-side seating, local guide, pay on arrival. Send your enquiry.",
    intro:
      "A buggy tour brings all the excitement of motorised dune riding with a different feel from a quad: you sit side by side in a sturdy framed vehicle, making it a sociable way to share the adventure with a partner, friend or family member.",
    overview: [
      "Buggies are built for loose sand, so they handle the climbs and dips of the Timlalin Dunes with confidence. Because you share the vehicle, one person can focus on driving while the other enjoys the scenery and films the ride — a great option for couples and friends looking for adventure activities near Agadir.",
      "The dunes lie near Tamri on Morocco's Atlantic coast, about an hour north of Agadir and a short drive from Taghazout and Imsouane. A local guide leads the way and adapts the route to your group.",
      "Duration, price and driving requirements for the buggy tour are confirmed with you when you enquire, so you know exactly what to expect before the day.",
    ],
    expectations: [
      {
        title: "A shared adventure",
        text: "Side-by-side seating means you experience every climb and descent together.",
      },
      {
        title: "Built for sand",
        text: "Buggies are designed for soft, uneven terrain, so the ride feels stable even as the dunes rise and fall.",
      },
      {
        title: "Room for the camera",
        text: "With a passenger seat beside the driver, there is a free pair of hands for photos and video.",
      },
    ],
    heroImage: media.buggy,
    galleryImages: [media.buggy, media.buggyPair],
    practical: {
      meetingPoint,
      transport: hotelPickup,
      inclusions: ["Local guide"],
      whatToBring: ["Sunglasses", "Closed shoes", "A scarf or buff against sand and wind"],
      bookingNotes: payOnArrival,
    },
    faqs: [gettingThereFaq, paymentFaq],
    relatedSlugs: ["quad-biking-timlalin", "canyon-tour", "sunset-tea"],
    relatedGuideSlugs: ["quad-or-buggy-timlalin", "romantic-things-to-do-near-agadir", "choosing-a-desert-activity"],
    published: true,
  },
  {
    slug: "camel-ride",
    name: "Camel Ride in the Timlalin Dunes near Agadir",
    shortName: "Camel Ride",
    summary:
      "A peaceful 40-minute camel ride through golden dunes by the Atlantic — a family favourite and a true Moroccan classic.",
    metaTitle: "Camel Ride Timlalin near Agadir – 40 min, €20",
    metaDescription:
      "Enjoy a 40-minute camel ride through the golden Timlalin Dunes near Agadir, beside the Atlantic Ocean. Ideal for families, from €20. Pay on arrival.",
    intro:
      "A camel ride is the timeless way to discover the Timlalin Dunes. For around 40 minutes you sway gently above the golden sand, with time to take in the shapes of the dunes and the peaceful Atlantic desert landscape.",
    overview: [
      "Camels have carried travellers across North Africa for centuries, and riding one remains one of the most memorable experiences in Morocco. At Timlalin, about 60 km north of Agadir near Tamri, the ride takes you through golden dunes with the ocean never far away — a rare setting where the desert meets the Atlantic.",
      "The pace is slow and relaxing, and the view from the saddle is higher than you might expect. It is a wonderful activity for families with children, couples and first-time visitors to Morocco, and it makes for unforgettable photos.",
      "Late afternoon is a beautiful time to ride, when the sand turns copper and the light softens. Combine your camel ride with sunset tea on the dunes or a Moroccan dinner to make an evening of it.",
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
        text: "With no steering to worry about, you can simply enjoy the scenery, the silence and the photos.",
      },
    ],
    heroImage: media.camelRide,
    galleryImages: [media.camelRide, media.camelTowardsDunes, media.camelSaddle, media.camelRider, media.camelGroup],
    practical: {
      duration: "About 40 minutes",
      price: "From €20 per person",
      meetingPoint,
      transport: hotelPickup,
      inclusions: ["Local guide leading the camels"],
      whatToBring: ["Sun protection and a hat", "Comfortable trousers", "A light layer for late afternoon rides"],
      bookingNotes: payOnArrival,
    },
    faqs: [
      {
        question: "How much does a camel ride at Timlalin cost?",
        answer:
          "A camel ride of about 40 minutes in the Timlalin Dunes starts from €20 per person. You pay on arrival — no advance payment is required.",
      },
      {
        question: "Is the camel ride suitable for children?",
        answer:
          "Yes. The camel ride is calm and slow, which makes it one of the most popular Timlalin activities for families. A local guide leads the camels throughout.",
      },
      gettingThereFaq,
    ],
    relatedSlugs: ["sunset-tea", "sandboarding-timlalin", "moroccan-dinner"],
    relatedGuideSlugs: ["your-first-camel-ride", "timlalin-dunes-vs-sahara-desert", "timlalin-dunes-with-kids"],
    published: true,
  },
  {
    slug: "canyon-tour",
    name: "Timlalin Canyon Tour near Agadir",
    shortName: "Canyon Tour",
    summary:
      "A guided 35–50 minute walk through dramatic rock formations and hidden canyon paths near Tamri.",
    metaTitle: "Timlalin Canyon Tour near Agadir – From €10",
    metaDescription:
      "Guided canyon tour at Timlalin near Tamri, north of Agadir: rock formations, hidden paths and bald ibis country. 35–50 min, from €10. Pay on arrival.",
    intro:
      "The Timlalin area is not only sand. A short guided walk takes you into a canyon of dramatic rock formations and hidden pathways — one of the most scenic and surprising experiences on the coast north of Agadir.",
    overview: [
      "Where the dunes are soft and always moving, the canyon is all about stone: layered rock walls, narrow passages and textures shaped by water and wind over thousands of years. The tour lasts around 35 to 50 minutes and shows a side of the Tamri coast that most visitors drive straight past.",
      "The Tamri area is known as one of the last wild habitats of the northern bald ibis, one of the world's rarest birds. Nature lovers and photographers especially enjoy this tour — keep your camera ready and respect the wildlife you may encounter.",
      "The canyon tour combines naturally with quad biking or a buggy ride, giving you both the golden dunes and the rocky canyon in a single trip from Agadir, Taghazout or Imsouane.",
    ],
    expectations: [
      {
        title: "A change of scenery",
        text: "Rock formations and ravines make a striking contrast with the golden dunes.",
      },
      {
        title: "Uneven ground",
        text: "Canyon paths can be rocky. Comfortable closed shoes are the sensible choice.",
      },
      {
        title: "Nature and photography",
        text: "Shadows, layered stone and the area's birdlife create very different images from the open dunes.",
      },
    ],
    heroImage: media.canyonTour,
    galleryImages: [media.canyonTour, media.canyonVisitor, media.canyonFromAbove, media.coastSeaArch],
    practical: {
      duration: "35–50 minutes",
      price: "From €10 per person",
      meetingPoint,
      transport: hotelPickup,
      inclusions: ["Local guide"],
      whatToBring: ["Comfortable closed shoes", "Water", "Sun protection", "A camera"],
      bookingNotes: payOnArrival,
    },
    faqs: [
      {
        question: "How much does the Timlalin canyon tour cost?",
        answer:
          "The guided canyon tour starts from €10 per person and lasts around 35 to 50 minutes. You pay on arrival — no advance payment is required.",
      },
      {
        question: "Is the canyon tour difficult?",
        answer:
          "No special experience is needed. The walk is short, but the ground can be rocky, so wear comfortable closed shoes. Your guide adapts the pace to the group.",
      },
      gettingThereFaq,
    ],
    relatedSlugs: ["quad-biking-timlalin", "buggy-adventure", "camel-ride"],
    relatedGuideSlugs: ["exploring-the-timlalin-canyon", "tamri-and-the-northern-bald-ibis", "photography-tips-timlalin-dunes"],
    published: true,
  },
  {
    slug: "sunset-tea",
    name: "Sunset Tea on the Timlalin Dunes",
    shortName: "Sunset Tea",
    summary:
      "Watch the sun sink into the Atlantic from the warm dunes with a glass of traditional Moroccan mint tea.",
    metaTitle: "Sunset Tea on Timlalin Dunes near Agadir",
    metaDescription:
      "Sit on the warm Timlalin Dunes and watch the Atlantic sunset with traditional Moroccan mint tea. A peaceful evening near Agadir for couples and groups.",
    intro:
      "Late afternoon is when the Timlalin Dunes are at their most beautiful. Shadows lengthen, the sand turns from gold to copper and the sun sinks towards the Atlantic horizon — the perfect moment for a glass of Moroccan mint tea.",
    overview: [
      "Mint tea is at the heart of Moroccan hospitality. Sweet, fragrant and poured from a height to create a light foam, it is offered to guests as a sign of welcome. Sharing a glass on the dunes as the light changes is a simple moment that visitors remember long after the more energetic activities.",
      "Few places in Morocco let you watch the sun set over the ocean from the top of a sand dune. At Timlalin, about an hour north of Agadir, the desert meets the Atlantic — making sunset tea one of the most romantic and peaceful experiences on the coast, ideal for couples and groups.",
      "Sunset tea pairs naturally with a camel ride or a sandboarding session earlier in the afternoon, and can lead into a Moroccan dinner. Sunset time changes with the season, so we confirm timing with you when you enquire.",
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
        text: "Temperatures near the coast drop once the sun goes down. A warm layer is worth bringing.",
      },
    ],
    heroImage: media.sunsetTea,
    galleryImages: [media.sunsetTea, media.sunsetDuneCampfire, media.sunsetCelebration],
    practical: {
      meetingPoint,
      transport: hotelPickup,
      inclusions: ["Traditional Moroccan mint tea"],
      whatToBring: ["A warm layer for after sunset", "A camera"],
      bookingNotes: payOnArrival,
    },
    faqs: [
      {
        question: "What time does the sunset tea take place?",
        answer:
          "It is timed around sunset, which changes through the year. Send your preferred date and we confirm the timing for that day.",
      },
      gettingThereFaq,
      paymentFaq,
    ],
    relatedSlugs: ["camel-ride", "moroccan-dinner", "sandboarding-timlalin"],
    relatedGuideSlugs: ["watching-the-sunset-at-timlalin-dunes", "romantic-things-to-do-near-agadir", "best-time-to-visit-timlalin-dunes"],
    published: true,
  },
  {
    slug: "moroccan-dinner",
    name: "Moroccan Dinner in the Timlalin Dunes",
    shortName: "Moroccan Dinner",
    summary:
      "End your day with a traditional Moroccan dinner and mint tea in the desert, beneath the open Moroccan sky.",
    metaTitle: "Moroccan Dinner at Timlalin Dunes near Agadir",
    metaDescription:
      "Traditional Moroccan dinner and mint tea in the Timlalin Dunes desert near Agadir, under the open sky. A unique evening for couples, families and groups.",
    intro:
      "Book a traditional Moroccan dinner at the Timlalin Dunes: a meal and mint tea in the desert after your activities, with vegetarian or allergy needs arranged when you enquire.",
    overview: [
      "The evening includes a traditional Moroccan dinner and mint tea, served in the dunes rather than in a restaurant in town. The menu and setting are confirmed with you when you enquire — mention vegetarian, allergy or other dietary requirements in your message so they can be arranged in advance.",
      "It suits couples, families and groups who want a sit-down finish after a camel ride or sunset tea. A warm layer is useful once the sun has gone down.",
      "How Moroccan meals are shared, the mint-tea ritual and what to mention for dietary needs are in the [dinner in the dunes guide](/travel-guide/moroccan-dinner-in-the-dunes).",
    ],
    expectations: [
      {
        title: "Traditional flavours",
        text: "Moroccan dishes, bread and mint tea, served to share in true Moroccan style.",
      },
      {
        title: "Under the open sky",
        text: "Far from city lights, the desert sky makes a memorable backdrop as evening falls.",
      },
      {
        title: "Dietary needs",
        text: "Mention vegetarian, allergy or other requirements in your enquiry so they can be prepared for you.",
      },
    ],
    heroImage: media.moroccanDinner,
    galleryImages: [media.moroccanDinner, media.dinnerLanterns, media.dinnerCampfire],
    practical: {
      meetingPoint,
      transport: hotelPickup,
      inclusions: ["Traditional Moroccan dinner", "Moroccan mint tea"],
      whatToBring: ["A warm layer for the evening"],
      bookingNotes: payOnArrival,
    },
    faqs: [
      {
        question: "Can the dinner cater for vegetarians or allergies?",
        answer:
          "Mention any dietary requirements in your enquiry and we confirm what can be prepared before your visit.",
      },
      gettingThereFaq,
      paymentFaq,
    ],
    relatedSlugs: ["sunset-tea", "camel-ride", "canyon-tour"],
    relatedGuideSlugs: ["moroccan-dinner-in-the-dunes", "romantic-things-to-do-near-agadir", "watching-the-sunset-at-timlalin-dunes"],
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

export function joinEnglishList(items: string[]): string {
  if (items.length <= 1) return items[0] ?? "";
  return `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;
}

/** FAQs for the activities hub — prices are derived from confirmed practical fields. */
export function getActivitiesHubFaqs(): Faq[] {
  const published = getPublishedActivities();
  const priced = published.flatMap((activity) => {
    const price = activity.practical?.price;
    return price ? [`${activity.shortName.toLowerCase()} ${price.replace(/^From /i, "from ")}`] : [];
  });
  const unpriced = published
    .filter((activity) => !activity.practical?.price)
    .map((activity) => activity.shortName.toLowerCase());
  const timed = published.flatMap((activity) => {
    const duration = activity.practical?.duration;
    return duration ? [`${activity.shortName.toLowerCase()} ${duration.toLowerCase()}`] : [];
  });

  return [
    {
      question: "How much does a Timlalin trip cost?",
      answer: [
        priced.length > 0 ? `Starting prices: ${joinEnglishList(priced)}.` : null,
        unpriced.length > 0 ? `${joinEnglishList(unpriced)} ${unpriced.length === 1 ? "is" : "are"} confirmed when you enquire.` : null,
        "You pay on arrival — no advance payment.",
      ]
        .filter(Boolean)
        .join(" "),
    },
    {
      question: "Can I do a Timlalin trip from Agadir?",
      answer:
        "Yes. The meeting point is the Timlalin Dunes near Tamri, about 60 km north of Agadir. Hotel pickup from Agadir, Taghazout or Imsouane can be added as an extra. Driving directions are in the guide [from Agadir](/travel-guide/how-to-get-to-timlalin-dunes-from-agadir).",
    },
    {
      question: "Can I combine several activities in one day?",
      answer: [
        timed.length > 0
          ? `Published durations: ${joinEnglishList(timed)}. Those experiences combine easily in one visit.`
          : "Activities can be combined in one visit.",
        "[Sample itineraries](/travel-guide/timlalin-dunes-day-itinerary) show a half day, a sunset afternoon and a full day with dinner.",
      ].join(" "),
    },
  ];
}
