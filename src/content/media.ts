/**
 * Image registry.
 *
 * Every visual on the site is referenced from here. No real photography has
 * been supplied yet, so each entry renders an illustrated placeholder that is
 * visibly labelled as such.
 *
 * To use a real photo:
 *   1. Add the file to /public/images/ with a descriptive filename,
 *      e.g. /public/images/activities/sandboarding-timlalin-dunes.jpg
 *   2. Set `src` to that path and update `width`, `height` and `alt`.
 *
 * Only use photos actually taken at Timlalin (or of TimlalinTrip activities)
 * for which you hold the usage rights.
 */

export type SceneVariant = "coast" | "dunes" | "sunset" | "tracks" | "caravan" | "canyon" | "night";

export type MediaAsset = {
  id: string;
  /** Path inside /public. Leave undefined until a real photo is available. */
  src?: string;
  alt: string;
  width: number;
  height: number;
  /** Illustration used while `src` is missing. */
  scene: SceneVariant;
  /** Describes the photo that should replace the placeholder. */
  brief: string;
};

function asset(entry: Omit<MediaAsset, "width" | "height"> & Partial<MediaAsset>): MediaAsset {
  return { width: 1600, height: 1067, ...entry };
}

export const media = {
  homeHero: asset({
    id: "home-hero",
    alt: "Golden sand dunes of Timlalin meeting the Atlantic coast north of Agadir",
    scene: "coast",
    brief: "Wide landscape of the Timlalin dunes with the ocean in view",
  }),
  activitiesHero: asset({
    id: "activities-hero",
    alt: "Riders crossing the sand dunes at Timlalin",
    scene: "tracks",
    brief: "Group activity on the dunes, wide shot",
  }),
  sandboarding: asset({
    id: "sandboarding",
    alt: "A visitor sandboarding down a steep dune face at Timlalin",
    scene: "dunes",
    brief: "Sandboarder mid-descent on a dune slope",
  }),
  quadBiking: asset({
    id: "quad-biking",
    alt: "Quad bikes riding across the Timlalin dunes",
    scene: "tracks",
    brief: "Quad bikes in motion on the sand",
  }),
  buggy: asset({
    id: "buggy",
    alt: "A dune buggy driving over a sandy ridge",
    scene: "tracks",
    brief: "Buggy on a dune crest",
  }),
  camelRide: asset({
    id: "camel-ride",
    alt: "A small camel caravan walking along the dunes",
    scene: "caravan",
    brief: "Camel ride along the dunes, ideally with the coast visible",
  }),
  canyonTour: asset({
    id: "canyon-tour",
    alt: "Rocky canyon walls near the Timlalin area",
    scene: "canyon",
    brief: "The actual canyon visited on the tour",
  }),
  sunsetTea: asset({
    id: "sunset-tea",
    alt: "Moroccan mint tea served on the dunes at sunset",
    scene: "sunset",
    brief: "Tea glasses and teapot on the sand in warm evening light",
  }),
  moroccanDinner: asset({
    id: "moroccan-dinner",
    alt: "A Moroccan dinner table set outdoors after dark",
    scene: "night",
    brief: "Dinner setting as actually offered to guests",
  }),
  destination: asset({
    id: "destination",
    alt: "The Timlalin dunes stretching towards the Atlantic Ocean",
    scene: "coast",
    brief: "Landscape showing dunes and sea together",
    width: 1200,
    height: 1500,
  }),
  aboutHero: asset({
    id: "about-hero",
    alt: "The TimlalinTrip team on the dunes",
    scene: "sunset",
    brief: "Genuine photo of the team or guides",
  }),
  packingGuide: asset({
    id: "packing-guide",
    alt: "Shoes and a backpack resting on the sand",
    scene: "dunes",
    brief: "Practical gear on the dunes",
  }),
  choosingGuide: asset({
    id: "choosing-guide",
    alt: "Visitors on the dunes choosing between activities",
    scene: "tracks",
    brief: "Several activities visible in one frame, or a collage",
  }),
} satisfies Record<string, MediaAsset>;

export const galleryImages: MediaAsset[] = [
  media.homeHero,
  media.sandboarding,
  media.quadBiking,
  media.camelRide,
  media.sunsetTea,
  media.buggy,
  media.canyonTour,
  media.moroccanDinner,
];

export function hasRealPhoto(image: MediaAsset): boolean {
  return Boolean(image.src);
}

/** The gallery is kept out of search results until it contains real photos. */
export function isGalleryIndexable(): boolean {
  return galleryImages.some(hasRealPhoto);
}
