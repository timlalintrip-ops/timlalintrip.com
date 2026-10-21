import type { Metadata } from "next";
import { BookingCta } from "@/components/booking/BookingCta";
import { ActivitiesSection } from "@/components/home/ActivitiesSection";
import { DestinationIntro } from "@/components/home/DestinationIntro";
import { GalleryPreview } from "@/components/home/GalleryPreview";
import { Hero } from "@/components/home/Hero";
import { WhyChoose } from "@/components/home/WhyChoose";
import { ReviewsSection } from "@/components/reviews/ReviewsSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { media } from "@/content/media";
import { guestReviews, reviewSource } from "@/content/reviews";
import { staticPageSeo } from "@/content/static-pages";
import { buildMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site-config";
import { jsonLdGraph, organizationSchema, touristAttractionSchema, websiteSchema } from "@/lib/structured-data";

export const metadata: Metadata = buildMetadata(staticPageSeo.home);

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={jsonLdGraph(
          organizationSchema(),
          websiteSchema(),
          touristAttractionSchema(media.destination.src ? absoluteUrl(media.destination.src) : undefined),
        )}
      />
      <Hero />
      <ActivitiesSection />
      <WhyChoose />
      <ReviewsSection
        reviews={guestReviews}
        title="What our guests say"
        intro={`Words from travellers who rode, surfed and dined with us in the Timlalin Dunes — shared on ${reviewSource.name}.`}
        className="bg-sand-deep"
      />
      <DestinationIntro />
      <GalleryPreview />
      <BookingCta />
    </>
  );
}
