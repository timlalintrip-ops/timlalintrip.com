import type { Metadata } from "next";
import Link from "next/link";
import { LegalDocument, ToComplete } from "@/components/ui/LegalDocument";
import { legalReview } from "@/content/legal";
import { formatDate } from "@/lib/format";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "Privacy Policy", path: "/privacy-policy" },
];

const { reviewed, lastUpdated } = legalReview.privacyPolicy;

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description: "How TimlalinTrip collects, uses and protects personal information submitted through timlalintrip.com.",
  path: "/privacy-policy",
  index: reviewed,
});

export default function PrivacyPolicyPage() {
  return (
    <LegalDocument
      title="Privacy Policy"
      intro="This policy explains what personal information we collect through this website, why we collect it and how you can exercise your rights."
      breadcrumbs={breadcrumbs}
      reviewed={reviewed}
    >
      {lastUpdated && (
        <p>
          Last updated: <time dateTime={lastUpdated}>{formatDate(lastUpdated)}</time>
        </p>
      )}

      <h2>Who we are</h2>
      <p>
        This website, {siteConfig.url.replace("https://", "")}, is operated by {siteConfig.name}.{" "}
        <ToComplete>legal entity name, registered address and contact email for privacy requests</ToComplete>
      </p>

      <h2>Information we collect</h2>
      <p>
        When you submit the{" "}
        <Link href="/book-now">booking enquiry form</Link>, we receive the information you provide:
      </p>
      <ul>
        <li>your full name and email address;</li>
        <li>the activity you are interested in, your preferred date and the number of participants;</li>
        <li>any message you choose to include.</li>
      </ul>
      <p>
        We ask you not to include sensitive information (such as health details) in the message field unless it is
        necessary for us to answer your enquiry, for example an accessibility requirement.
      </p>

      <h2>How we use your information</h2>
      <p>
        We use the information in your enquiry only to reply to you, to provide information about availability and to
        arrange the experience you ask about. We do not sell your information or use it for unrelated marketing.
      </p>
      <p>
        <ToComplete>legal basis for processing under the laws that apply to the business</ToComplete>
      </p>

      <h2>Services that process your information</h2>
      <p>
        Enquiries are transmitted securely to the service we use to receive them, and the website is served by a
        hosting provider that processes technical data such as IP addresses in server logs. We also use Google
        Analytics, operated by Google LLC, to measure visits to this website.
      </p>
      <p>
        <ToComplete>names of the hosting provider and enquiry-handling service, and where they store data</ToComplete>
      </p>

      <h2>Cookies and analytics</h2>
      <p>
        This website uses Google Analytics (measurement ID {siteConfig.googleAnalyticsId}) to understand which pages
        are visited. Google may collect technical data such as IP address, browser type, pages viewed and approximate
        location. We do not use advertising or remarketing tags. See Google&apos;s privacy policy for how Google
        handles this data.
      </p>

      <h2>How long we keep your information</h2>
      <p>
        <ToComplete>retention period for enquiries and booking records</ToComplete>
      </p>

      <h2>Your rights</h2>
      <p>
        Depending on where you live, data protection laws — such as Moroccan Law 09-08 or, for visitors in the
        European Union and United Kingdom, the GDPR — may give you the right to access, correct or delete the
        personal information we hold about you, and to object to certain uses of it.
      </p>
      <p>
        <ToComplete>how to submit a request, and the relevant supervisory authority</ToComplete>
      </p>

      <h2>Changes to this policy</h2>
      <p>We will update this page when our practices change and show the date of the latest revision above.</p>
    </LegalDocument>
  );
}
