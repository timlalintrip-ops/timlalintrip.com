import { galleryImages } from "@/content/media";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { SiteImage } from "@/components/ui/SiteImage";

const layout = [
  "col-span-2 row-span-2 aspect-square md:aspect-auto",
  "aspect-[4/5] md:aspect-auto",
  "aspect-[4/5] md:aspect-auto",
  "col-span-2 aspect-[2/1] md:col-span-1 md:aspect-auto",
  "col-span-2 aspect-[2/1] md:col-span-1 md:aspect-auto",
];

export function GalleryPreview() {
  // Skip the first gallery image: it is already used as the homepage hero.
  const images = galleryImages.slice(1, layout.length + 1);

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
        <ul className="grid grid-cols-2 gap-3 md:grid-cols-4 md:grid-rows-[repeat(2,minmax(15rem,1fr))] md:gap-4">
          {images.map((image, index) => (
            <li key={image.id} className={`relative overflow-hidden bg-sand-line ${layout[index]}`}>
              <SiteImage
                image={image}
                sizes={index === 0 ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 25vw, 50vw"}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
