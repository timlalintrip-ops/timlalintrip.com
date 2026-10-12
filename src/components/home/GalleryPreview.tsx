import { media, type MediaAsset } from "@/content/media";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { SiteImage } from "@/components/ui/SiteImage";

const large = { className: "col-span-2 row-span-2 aspect-square md:aspect-auto", sizes: "(min-width: 768px) 50vw, 100vw" };
const small = { className: "aspect-[4/5] md:aspect-auto", sizes: "(min-width: 768px) 25vw, 50vw" };
const wide = { className: "col-span-2 aspect-[2/1] md:aspect-auto", sizes: "(min-width: 768px) 50vw, 100vw" };

// One photo per activity, none of them reused from the hero or the activity cards.
const tiles: { image: MediaAsset; className: string; sizes: string }[] = [
  { image: media.sunsetDuneCampfire, ...large },
  { image: media.quadAction, ...small },
  { image: media.camelTowardsDunes, ...small },
  { image: media.buggyPair, ...small },
  { image: media.dinnerLanterns, ...small },
  { image: media.sandboardingYoungRider, ...wide },
  { image: media.canyonFromAbove, ...wide },
];

export function GalleryPreview() {
  return (
    <section aria-labelledby="gallery-title" className="bg-sand-deep py-24 sm:py-32">
      <div className="container-site">
        <div className="mb-12 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="eyebrow mb-4 text-orange-deep">Gallery</p>
            <h2 id="gallery-title" className="text-headline font-semibold">
              Sand, sea and changing light
            </h2>
          </div>
          <ButtonLink href="/gallery" variant="outline-dark" withArrow className="self-start md:self-auto">
            Open the gallery
          </ButtonLink>
        </div>
        <ul className="grid grid-cols-2 gap-3 md:grid-cols-4 md:grid-rows-[repeat(3,minmax(15rem,1fr))] md:gap-4">
          {tiles.map(({ image, className, sizes }) => (
            <li key={image.id} className={`group relative overflow-hidden bg-sand-line ${className}`}>
              <div className="absolute inset-0 transition-transform duration-700 ease-out-soft group-hover:scale-[1.03]">
                <SiteImage image={image} sizes={sizes} />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
