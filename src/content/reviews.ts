/**
 * Guest reviews copied word for word from our Google Business Profile. Reviews that Google truncated end at the
 * last complete sentence followed by "…". Do not add Review or AggregateRating markup for these: Google treats
 * reviews a business publishes about itself as self-serving and ignores them.
 */

export type GuestReview = {
  author: string;
  /** Google "Local Guide" badge shown next to the reviewer's name. */
  localGuide?: boolean;
  text: string;
  /** Activity slugs the review mentions, used to show it on those activity pages. */
  activitySlugs: string[];
};

export const reviewSource = {
  name: "Google",
  businessName: "Timlalin Action Quad / Desert experience",
};

export const guestReviews: GuestReview[] = [
  {
    author: "Cécile Etemaj",
    text: "We visited the canyon, went on a quad ride, and ended the day with a tajine by the fire. Rachid accompanied us throughout the whole experience, took great care of us, and captured beautiful photos and videos. We warmly thank him for this colourful and memorable activity to celebrate our 10th anniversary.",
    activitySlugs: ["canyon-tour", "quad-biking-timlalin", "moroccan-dinner"],
  },
  {
    author: "Angharad Preston",
    text: "We had the best time Quad Biking and Camel Riding. I wasn’t sure nervous to start having fallen off a quad previously, but I soon became confident thanks to the amazing instructor who made me feel so confident. He took fabulous photos of us and we truly had the best time. Highly recommended",
    activitySlugs: ["quad-biking-timlalin", "camel-ride"],
  },
  {
    author: "Matteo Bertoni",
    text: "We had a full afternoon of sand-board and quad! It was an amazing and unforgettable experience with Rashid and Mustafa! They were super kind and professional, showing us the best spot for those activities! Highly recommend…",
    activitySlugs: ["sandboarding-timlalin", "quad-biking-timlalin"],
  },
  {
    author: "Chloe London",
    text: "Such a good time! Rachid’s great. Would 100% recommend. This is the spot to book :)",
    activitySlugs: [],
  },
  {
    author: "Malak Al-Mousa",
    text: "We had the pleasure of doing sandboarding with Timlaline Heritage Tours — what an amazing experience! From start to finish, our guide was absolutely phenomenal: kind, patient, and so helpful. …",
    activitySlugs: ["sandboarding-timlalin"],
  },
  {
    author: "Abdou Bouchich",
    text: "Had an amazing experience at timlaline Heritage! The quads were powerful and well-maintained, and riding through the dunes with the ocean view nearby felt incredible. Sand surfing was a lot of fun too…",
    activitySlugs: ["quad-biking-timlalin", "sandboarding-timlalin"],
  },
  {
    author: "dennis fi",
    localGuide: true,
    text: "It was a blast, we absolutely loved it! The quads and the place were amazing and the owner was very nice and helpful with everything. It definetly was the highlight of our vacation. …",
    activitySlugs: ["quad-biking-timlalin"],
  },
  {
    author: "Carolin H.",
    localGuide: true,
    text: "We had an amazing experience with Timlaline Heritage Tours! Communication via WhatsApp was super easy — our guide always replied very quickly and was extremely helpful and friendly. …",
    activitySlugs: [],
  },
  {
    author: "James Warburton",
    text: "Rachid and Mohammed was amazing from the moment we was collected from the hotel, great hospitality and telling us facts about the local area…",
    activitySlugs: ["sandboarding-timlalin"],
  },
  {
    author: "Eliška Kortanová",
    text: "The tour guide was really nice and helpful! When I wanted to book the tour, he responded very fast and answered all of my questions. Tour was really nice and everything we wanted to see, he showed us. …",
    activitySlugs: [],
  },
  {
    author: "Mister Charmz",
    text: "The tour on the quad was great, there were beautiful spots to see and absorb. We were serviced immediately upon arrival and the prices were very reasonable !",
    activitySlugs: ["quad-biking-timlalin"],
  },
  {
    author: "Nadia Ouchaikh",
    text: "Such a lovely time! Truly recommend. Thank you Rachid for your warm guidance and thoughtful support throughout the journey! …",
    activitySlugs: [],
  },
];

export function getReviewsForActivity(slug: string, limit = 3): GuestReview[] {
  return guestReviews.filter((review) => review.activitySlugs.includes(slug)).slice(0, limit);
}
