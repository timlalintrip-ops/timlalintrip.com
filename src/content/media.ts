/**
 * Image registry.
 *
 * Every visual on the site is referenced from here. An entry without `src`
 * renders an illustrated placeholder that is visibly labelled as such.
 *
 * To add a real photo:
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
  /** CSS object-position keeping the subject in frame when the photo is cropped. */
  focus?: string;
};

function asset(entry: Omit<MediaAsset, "width" | "height"> & Partial<MediaAsset>): MediaAsset {
  return { width: 1600, height: 1067, ...entry };
}

export const media = {
  activitiesHero: asset({
    id: "activities-hero",
    src: "/images/activities/timlalin-quad-biking-coast-ride.jpg",
    width: 1280,
    height: 736,
    alt: "Quad rider crossing a sandy plateau above the Atlantic coast during a Timlalin dunes tour near Agadir",
    scene: "tracks",
    brief: "Group activity on the dunes, wide shot",
  }),
  sandboarding: asset({
    id: "sandboarding",
    src: "/images/activities/timlalin-sandboarding-dune-ride.jpg",
    focus: "50% 40%",
    width: 1024,
    height: 1280,
    alt: "Smiling visitor sandboarding down a steep golden dune face at Timlalin",
    scene: "dunes",
    brief: "Sandboarder mid-descent on a dune slope",
  }),
  sandboardingYoungRider: asset({
    id: "sandboarding-young-rider",
    src: "/images/activities/timlalin-sandboarding-young-rider.jpg",
    focus: "50% 20%",
    width: 1280,
    height: 741,
    alt: "Young rider balancing on a sandboard while sliding down a Timlalin dune",
    scene: "dunes",
    brief: "Beginner on the board",
  }),
  sandboardingOceanView: asset({
    id: "sandboarding-ocean-view",
    src: "/images/activities/timlalin-sandboarding-ocean-view.jpg",
    width: 1500,
    height: 2000,
    alt: "Sandboarder carrying a board across rippled dunes above the sunlit Atlantic Ocean at Timlalin",
    scene: "coast",
    brief: "Dunes and ocean with a sandboarder",
  }),
  sandboardingClimb: asset({
    id: "sandboarding-climb",
    src: "/images/activities/timlalin-sandboarding-climbing-dune.jpg",
    width: 1500,
    height: 2000,
    alt: "Visitor climbing back up a sand dune with a sandboard in the Timlalin dunes",
    scene: "dunes",
    brief: "Climbing back up the dune",
  }),
  sandboardingWalkUp: asset({
    id: "sandboarding-walk-up",
    src: "/images/activities/timlalin-sandboarding-walking-up.jpg",
    width: 1500,
    height: 2000,
    alt: "Sandboarder walking up the ridge of a tall Timlalin dune with a board in hand",
    scene: "dunes",
    brief: "Walking up the dune",
  }),
  sandboardingBoard: asset({
    id: "sandboarding-board",
    src: "/images/activities/timlalin-sandboarding-board-pose.jpg",
    width: 1500,
    height: 2000,
    alt: "Visitor holding up a purple sandboard on a dune slope at Timlalin",
    scene: "dunes",
    brief: "Posing with the board",
  }),
  quadBiking: asset({
    id: "quad-biking",
    src: "/images/activities/timlalin-quad-biking-pair-atlantic.jpg",
    focus: "50% 55%",
    width: 960,
    height: 1280,
    alt: "Two smiling riders in helmets on orange quad bikes on a Timlalin dune above the Atlantic Ocean",
    scene: "tracks",
    brief: "Quad bikes in motion on the sand",
  }),
  quadAction: asset({
    id: "quad-action",
    src: "/images/activities/timlalin-quad-biking-action.jpg",
    width: 960,
    height: 1280,
    alt: "Rider in helmet and goggles driving a quad bike through the sand, kicking up dust, in the Timlalin dunes",
    scene: "tracks",
    brief: "Quad in motion",
  }),
  quadCoastRide: asset({
    id: "quad-coast-ride",
    src: "/images/activities/timlalin-quad-biking-coast-ride.jpg",
    width: 1280,
    height: 736,
    alt: "Rider on a turquoise quad bike crossing a sandy plateau with the Atlantic coast behind, near Agadir",
    scene: "coast",
    brief: "Quad with the coast",
  }),
  quadOceanView: asset({
    id: "quad-ocean-view",
    src: "/images/activities/timlalin-quad-biking-ocean-view.jpg",
    width: 1500,
    height: 2000,
    alt: "Riders getting on orange and green quad bikes at the top of the dunes overlooking the ocean",
    scene: "coast",
    brief: "Quads at the dune top with the sea",
  }),
  quadGroupLineup: asset({
    id: "quad-group-lineup",
    src: "/images/activities/timlalin-quad-biking-group-lineup.jpg",
    width: 1500,
    height: 2000,
    alt: "Group of riders lined up on quad bikes ready to set off across the Timlalin dunes",
    scene: "tracks",
    brief: "Group ready to ride",
  }),
  quadTwoRiders: asset({
    id: "quad-two-riders",
    src: "/images/activities/timlalin-quad-biking-two-riders.jpg",
    width: 1500,
    height: 2000,
    alt: "Two riders sharing an orange quad bike on the open sand at Timlalin, with the sea on the horizon",
    scene: "tracks",
    brief: "Two riders on one quad",
  }),
  quadDuneTop: asset({
    id: "quad-dune-top",
    src: "/images/activities/timlalin-quad-biking-dune-top.jpg",
    focus: "50% 75%",
    width: 960,
    height: 1280,
    alt: "Two riders on quad bikes resting on a sandy ridge above the Atlantic near Timlalin",
    scene: "coast",
    brief: "Quads on the ridge",
  }),
  quadHelmets: asset({
    id: "quad-helmets",
    src: "/images/activities/timlalin-quad-biking-helmets-selfie.jpg",
    width: 960,
    height: 1280,
    alt: "Two visitors in motocross helmets and goggles taking a selfie before their quad ride by the beach",
    scene: "coast",
    brief: "Helmet selfie",
  }),
  buggy: asset({
    id: "buggy",
    src: "/images/activities/timlalin-buggy-tour-group.jpg",
    width: 1200,
    height: 1600,
    alt: "Group of riders in helmets celebrating on their dune buggies during a Timlalin buggy tour",
    scene: "tracks",
    brief: "Buggy on a dune crest",
  }),
  buggyPair: asset({
    id: "buggy-pair",
    src: "/images/activities/timlalin-buggy-tour-two-buggies.jpg",
    width: 1200,
    height: 1600,
    alt: "Two orange dune buggies with helmeted riders side by side on the sand at Timlalin",
    scene: "tracks",
    brief: "Two buggies on the sand",
  }),
  camelRide: asset({
    id: "camel-ride",
    src: "/images/activities/timlalin-camel-ride-caravan.jpg",
    focus: "50% 30%",
    width: 1500,
    height: 2000,
    alt: "Camel caravan with riders in blue robes and red headscarves crossing the sand at Timlalin",
    scene: "caravan",
    brief: "Camel ride along the dunes, ideally with the coast visible",
  }),
  camelRider: asset({
    id: "camel-rider",
    src: "/images/activities/timlalin-camel-ride-rider.jpg",
    width: 1500,
    height: 2000,
    alt: "Rider in a traditional blue robe and pink scarf seated on a camel at Timlalin",
    scene: "caravan",
    brief: "A rider on a camel",
  }),
  camelSaddle: asset({
    id: "camel-saddle",
    src: "/images/activities/timlalin-camel-ride-traditional-saddle.jpg",
    width: 1500,
    height: 2000,
    alt: "Camel with a red Berber-pattern saddle blanket and a rider taking photos during the Timlalin camel ride",
    scene: "caravan",
    brief: "Traditional saddle close-up",
  }),
  camelGroup: asset({
    id: "camel-group",
    src: "/images/activities/timlalin-camel-ride-group-close.jpg",
    width: 1500,
    height: 2000,
    alt: "Group of riders on camels walking in line along a sandy track at Timlalin",
    scene: "caravan",
    brief: "Group riding in line",
  }),
  camelTowardsDunes: asset({
    id: "camel-towards-dunes",
    src: "/images/activities/timlalin-camel-ride-towards-dunes.jpg",
    width: 1500,
    height: 2000,
    alt: "Camel caravan heading towards the golden Timlalin dunes",
    scene: "caravan",
    brief: "Caravan heading towards the dunes",
  }),
  canyonTour: asset({
    id: "canyon-tour",
    src: "/images/activities/timlalin-canyon-tour-slot-canyon-walk.jpg",
    width: 1024,
    height: 1280,
    alt: "Visitor walking barefoot through the sandy slot canyon at Timlalin, between curved golden sandstone walls",
    scene: "canyon",
    brief: "The actual canyon visited on the tour",
  }),
  canyonFromAbove: asset({
    id: "canyon-from-above",
    src: "/images/activities/timlalin-canyon-from-above.jpg",
    width: 1280,
    height: 720,
    alt: "Narrow sandstone canyon at Timlalin seen from above, with sand at its base",
    scene: "canyon",
    brief: "The canyon from above",
  }),
  canyonVisitor: asset({
    id: "canyon-visitor",
    src: "/images/activities/timlalin-canyon-tour-visitor.jpg",
    width: 1500,
    height: 2000,
    alt: "Visitor standing inside the Timlalin canyon among tall, wind-carved sandstone walls",
    scene: "canyon",
    brief: "A visitor inside the canyon",
  }),
  coastSeaArch: asset({
    id: "coast-sea-arch",
    src: "/images/activities/timlalin-coast-sandstone-sea-arch.jpg",
    width: 1280,
    height: 720,
    alt: "Sandstone sea arch and cliffs above the Atlantic waves on the coast near Timlalin",
    scene: "coast",
    brief: "Atlantic coastline near the canyon",
  }),
  sunsetTea: asset({
    id: "sunset-tea",
    src: "/images/activities/timlalin-sunset-tea-couple-ocean.jpg",
    focus: "50% 55%",
    width: 960,
    height: 1280,
    alt: "Couple enjoying Moroccan tea by a small fire on the Timlalin dunes as the sun sets over the Atlantic",
    scene: "sunset",
    brief: "Tea glasses and teapot on the sand in warm evening light",
  }),
  sunsetDuneCampfire: asset({
    id: "sunset-dune-campfire",
    src: "/images/activities/timlalin-sunset-tea-dune-campfire.jpg",
    width: 1080,
    height: 720,
    alt: "Visitors gathered around a campfire and candles on a dune ridge above the ocean at sunset near Timlalin",
    scene: "sunset",
    brief: "Sunset gathering on the dune",
  }),
  sunsetCelebration: asset({
    id: "sunset-celebration",
    src: "/images/activities/timlalin-sunset-tea-birthday-setup.jpg",
    width: 960,
    height: 1280,
    alt: "Birthday celebration setup on the sand with a low table, cushions, lanterns and balloons under a lit arch at night",
    scene: "night",
    brief: "Private celebration setup",
  }),
  moroccanDinner: asset({
    id: "moroccan-dinner",
    src: "/images/activities/timlalin-moroccan-dinner-sunset-canopy.jpg",
    width: 1080,
    height: 1440,
    alt: "Couple at a Moroccan dinner under a draped canopy on the sand, with lanterns and the Atlantic sunset behind",
    scene: "night",
    brief: "Dinner setting as actually offered to guests",
  }),
  dinnerCampfire: asset({
    id: "dinner-campfire",
    src: "/images/activities/timlalin-moroccan-dinner-group-campfire.jpg",
    width: 1500,
    height: 2000,
    alt: "Group seated on rugs under a lit canopy beside a campfire during a night dinner in the Timlalin dunes",
    scene: "night",
    brief: "Group dinner at night",
  }),
  dinnerLanterns: asset({
    id: "dinner-lanterns",
    src: "/images/activities/timlalin-moroccan-dinner-lanterns-ocean.jpg",
    width: 1500,
    height: 2000,
    alt: "Dinner setting with rugs, lanterns and a campfire on the sand above the ocean at dusk near Timlalin",
    scene: "night",
    brief: "Dinner setting at dusk",
  }),
  destination: asset({
    id: "destination",
    src: "/images/activities/timlalin-sandboarding-ocean-view.jpg",
    alt: "Rippled Timlalin dunes running down to the sunlit Atlantic Ocean north of Agadir",
    scene: "coast",
    brief: "Landscape showing dunes and sea together",
    width: 1500,
    height: 2000,
  }),
  aboutHero: asset({
    id: "about-hero",
    src: "/images/activities/timlalin-sunset-tea-dune-campfire.jpg",
    width: 1080,
    height: 720,
    alt: "Visitors on a Timlalin dune ridge above the Atlantic Ocean at sunset, gathered around a campfire and candles",
    scene: "sunset",
    brief: "Genuine photo of the team or guides",
  }),
} satisfies Record<string, MediaAsset>;

/** Ordered so activities alternate; every ninth photo is shown large. */
export const galleryImages: MediaAsset[] = [
  media.sunsetDuneCampfire,
  media.sandboarding,
  media.quadAction,
  media.camelSaddle,
  media.buggy,
  media.canyonTour,
  media.sandboardingYoungRider,
  media.dinnerLanterns,
  media.quadCoastRide,
  media.camelRide,
  media.sunsetTea,
  media.quadTwoRiders,
  media.sandboardingOceanView,
  media.canyonFromAbove,
  media.buggyPair,
  media.camelRider,
  media.quadHelmets,
  media.sandboardingClimb,
  media.quadOceanView,
  media.coastSeaArch,
  media.camelTowardsDunes,
  media.sandboardingBoard,
  media.quadGroupLineup,
  media.canyonVisitor,
  media.sunsetCelebration,
  media.quadDuneTop,
  media.sandboardingWalkUp,
  media.moroccanDinner,
  media.camelGroup,
  media.quadBiking,
  media.dinnerCampfire,
];

export function hasRealPhoto(image: MediaAsset): boolean {
  return Boolean(image.src);
}

/** The gallery is kept out of search results until it contains real photos. */
export function isGalleryIndexable(): boolean {
  return galleryImages.some(hasRealPhoto);
}
