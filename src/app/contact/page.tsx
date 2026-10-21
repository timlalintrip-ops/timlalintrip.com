import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { PageHero } from "@/components/ui/PageHero";
import { PlaceholderNote } from "@/components/ui/PlaceholderNote";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { staticPageSeo } from "@/content/static-pages";
import { buildMetadata } from "@/lib/seo";
import { hasContactDetails, siteConfig } from "@/lib/site-config";
import { breadcrumbSchema, jsonLdGraph } from "@/lib/structured-data";

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "Contact", path: "/contact" },
];

export const metadata: Metadata = buildMetadata({
  ...staticPageSeo.contact,
  // A contact page without any contact details is thin content; index it once details are configured.
  index: hasContactDetails(siteConfig.contact),
});

function ContactDetails() {
  const { contact } = siteConfig;

  if (!hasContactDetails(contact)) {
    return (
      <PlaceholderNote
        title="Direct contact details"
        devHint={
          <>
            Add the verified email address, phone or WhatsApp number and, if applicable, a business address in{" "}
            <code>src/lib/site-config.ts</code>. They will then appear here and in the footer automatically.
          </>
        }
      >
        Our email and phone details have not been published yet.
      </PlaceholderNote>
    );
  }

  return (
    <dl className="divide-y divide-sand-line border-y border-sand-line">
      {contact.email && (
        <div className="py-5">
          <dt className="text-xs font-semibold tracking-[0.16em] text-muted uppercase">Email</dt>
          <dd className="mt-1 text-lg font-medium">
            <a href={`mailto:${contact.email}`} className="hover:text-orange-deep">
              {contact.email}
            </a>
          </dd>
        </div>
      )}
      {contact.phone && (
        <div className="py-5">
          <dt className="text-xs font-semibold tracking-[0.16em] text-muted uppercase">Phone</dt>
          <dd className="mt-1 text-lg font-medium">
            <a href={`tel:${contact.phone.replace(/\s+/g, "")}`} className="hover:text-orange-deep">
              {contact.phone}
            </a>
          </dd>
        </div>
      )}
      {contact.whatsapp && (
        <div className="py-5">
          <dt className="text-xs font-semibold tracking-[0.16em] text-muted uppercase">WhatsApp</dt>
          <dd className="mt-1 text-lg font-medium">
            <a
              href={`https://wa.me/${contact.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-orange-deep"
            >
              Message us on WhatsApp
            </a>
          </dd>
        </div>
      )}
      {contact.address && (
        <div className="py-5">
          <dt className="text-xs font-semibold tracking-[0.16em] text-muted uppercase">Address</dt>
          <dd className="mt-1 text-lg font-medium">
            <address className="not-italic">
              {[
                contact.address.streetAddress,
                contact.address.postalCode,
                contact.address.locality,
                contact.address.region,
                contact.address.country,
              ]
                .filter(Boolean)
                .join(", ")}
            </address>
          </dd>
        </div>
      )}
    </dl>
  );
}

export default function ContactPage() {
  return (
    <>
      <JsonLd data={jsonLdGraph(breadcrumbSchema(breadcrumbs))} />
      <PageHero
        eyebrow="Contact"
        title="Get in touch"
        intro="Questions about an activity, a special occasion or a larger group? The quickest way to reach us is through the enquiry form."
        breadcrumbs={breadcrumbs}
      />

      <section aria-labelledby="contact-options" className="py-20 sm:py-28">
        <div className="container-site grid gap-14 lg:grid-cols-2 lg:gap-24">
          <div>
            <h2 id="contact-options" className="text-headline font-semibold">
              Send an enquiry
            </h2>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted">
              Use the booking enquiry form for questions as well as booking requests — choose “Not sure yet” as the
              activity if you would like help deciding. Include your preferred date and group size so we can give you
              accurate information.
            </p>
            <div className="mt-10">
              <ButtonLink href="/book-now" withArrow>
                Open the enquiry form
              </ButtonLink>
            </div>
          </div>
          <div>
            <h2 className="mb-6 font-sans text-xs font-semibold tracking-[0.2em] text-orange-deep uppercase">
              Contact details
            </h2>
            <ContactDetails />
            {siteConfig.socialProfiles.length > 0 && (
              <div className="mt-8">
                <p className="mb-3 text-xs font-semibold tracking-[0.16em] text-muted uppercase">Follow us</p>
                <SocialLinks tone="dark" />
              </div>
            )}
            <p className="mt-8 text-sm leading-relaxed text-muted">
              Planning your visit? Our{" "}
              <Link href="/travel-guide" className="font-semibold text-orange-deep underline underline-offset-4">
                travel guide
              </Link>{" "}
              covers what to pack and how to choose an activity.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
