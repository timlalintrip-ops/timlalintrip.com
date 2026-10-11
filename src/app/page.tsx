import type { Metadata } from "next";
import { BookingCta } from "@/components/booking/BookingCta";
import { ActivitiesSection } from "@/components/home/ActivitiesSection";
import { DestinationIntro } from "@/components/home/DestinationIntro";
import { GalleryPreview } from "@/components/home/GalleryPreview";
import { Hero } from "@/components/home/Hero";
import { WhyChoose } from "@/components/home/WhyChoose";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { jsonLdGraph, organizationSchema, websiteSchema } from "@/lib/structured-data";

export const metadata: Metadata = buildMetadata({
  title: "TimlalinTrip | Timlalin Dunes Adventures near Agadir",
  absoluteTitle: true,
  description:
    "Sandboarding, quad biking, buggy and camel rides, sunset tea and Moroccan dinner in the Timlalin Dunes, the coastal dunes north of Agadir. Send a booking enquiry.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <JsonLd data={jsonLdGraph(organizationSchema(), websiteSchema())} />
      <Hero />
      <ActivitiesSection />
      <WhyChoose />
      <DestinationIntro />
      <GalleryPreview />
      <BookingCta />
    </>
  );
}
