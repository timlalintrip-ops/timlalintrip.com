import type { Metadata } from "next";
import { BookingCta } from "@/components/booking/BookingCta";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { PlaceholderNote } from "@/components/ui/PlaceholderNote";
import { SiteImage } from "@/components/ui/SiteImage";
import { galleryImages, isGalleryIndexable } from "@/content/media";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, jsonLdGraph } from "@/lib/structured-data";

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "Gallery", path: "/gallery" },
];

export const metadata: Metadata = buildMetadata({
  title: "Photo Gallery: Timlalin Dunes",
  description:
    "Photos of the Timlalin Dunes and TimlalinTrip experiences on Morocco's Atlantic coast north of Agadir: sandboarding, rides, sunsets and more.",
  path: "/gallery",
  index: isGalleryIndexable(),
});

const spans = ["sm:col-span-2 sm:row-span-2", "", "", "sm:col-span-2", "", "", "sm:col-span-2", ""];

export default function GalleryPage() {
  const hasPhotos = isGalleryIndexable();

  return (
    <>
      <JsonLd data={jsonLdGraph(breadcrumbSchema(breadcrumbs))} />
      <PageHero
        eyebrow="Gallery"
        title="Moments from the dunes"
        intro="Golden sand, Atlantic light and the experiences that fill a day at Timlalin."
        breadcrumbs={breadcrumbs}
      />

      <section aria-label="Photo gallery" className="py-16 sm:py-24">
        <div className="container-site">
          {!hasPhotos && (
            <div className="mb-12 max-w-2xl">
              <PlaceholderNote
                title="Photos from Timlalin"
                devHint={
                  <>
                    Add real photos in <code>src/content/media.ts</code>. The page stays out of search engines until at
                    least one gallery image has a real photo.
                  </>
                }
              >
                Our photo gallery is being prepared. The illustrations below are placeholders, not photographs of
                Timlalin.
              </PlaceholderNote>
            </div>
          )}
          <ul className="grid auto-rows-[16rem] grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4 lg:auto-rows-[18rem] lg:grid-cols-4">
            {galleryImages.map((image, index) => (
              <li key={image.id} className={`relative overflow-hidden bg-sand-deep ${spans[index % spans.length]}`}>
                <figure className="h-full">
                  <SiteImage
                    image={image}
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 100vw"
                    showPlaceholderBrief
                  />
                  {image.src && (
                    <figcaption className="absolute inset-x-0 bottom-0 bg-linear-to-t from-charcoal/80 to-transparent p-4 pt-10 text-sm text-white">
                      {image.alt}
                    </figcaption>
                  )}
                </figure>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <BookingCta />
    </>
  );
}
