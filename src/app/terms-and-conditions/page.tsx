import type { Metadata } from "next";
import Link from "next/link";
import { LegalDocument, ToComplete } from "@/components/ui/LegalDocument";
import { legalReview } from "@/content/legal";
import { formatDate } from "@/lib/format";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "Terms and Conditions", path: "/terms-and-conditions" },
];

const { reviewed, lastUpdated } = legalReview.terms;

export const metadata: Metadata = buildMetadata({
  title: "Terms and Conditions",
  description: "Terms for using timlalintrip.com and for booking enquiries and activities with TimlalinTrip.",
  path: "/terms-and-conditions",
  index: reviewed,
});

export default function TermsPage() {
  return (
    <LegalDocument
      title="Terms and Conditions"
      intro="These terms describe how this website may be used and how enquiries and bookings with TimlalinTrip work."
      breadcrumbs={breadcrumbs}
      reviewed={reviewed}
    >
      {lastUpdated && (
        <p>
          Last updated: <time dateTime={lastUpdated}>{formatDate(lastUpdated)}</time>
        </p>
      )}

      <h2>About these terms</h2>
      <p>
        This website is operated by {siteConfig.name}.{" "}
        <ToComplete>legal entity name, registration details and contact address</ToComplete>
      </p>

      <h2>Enquiries are not bookings</h2>
      <p>
        Submitting the <Link href="/book-now">booking enquiry form</Link> does not create a booking or a contract. A
        booking is only confirmed once we have replied with the details of your experience — including date, price and
        what is included — and you have accepted them.
      </p>

      <h2>Prices and payment</h2>
      <p>
        <ToComplete>how prices are quoted, accepted currencies, deposits and payment methods</ToComplete>
      </p>

      <h2>Cancellations and changes</h2>
      <p>
        <ToComplete>cancellation and amendment policy for guests, and refund conditions</ToComplete>
      </p>

      <h2>Weather and safety</h2>
      <p>
        Outdoor activities depend on weather and ground conditions. Guides may adapt or postpone an activity when
        conditions are unsafe.{" "}
        <ToComplete>policy for weather-related changes, safety requirements, age limits and health conditions</ToComplete>
      </p>

      <h2>Liability and insurance</h2>
      <p>
        <ToComplete>liability terms and insurance arrangements, reviewed by a qualified adviser</ToComplete>
      </p>

      <h2>Use of this website</h2>
      <p>
        The content of this website is provided for general information. We aim to keep it accurate, but details of
        specific activities are confirmed individually when you enquire. You may not copy or reuse the text or images on
        this website for commercial purposes without permission.
      </p>

      <h2>Governing law</h2>
      <p>
        <ToComplete>governing law and jurisdiction</ToComplete>
      </p>
    </LegalDocument>
  );
}
