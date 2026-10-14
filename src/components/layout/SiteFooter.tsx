import Link from "next/link";
import { getActivityPath, getPublishedActivities } from "@/content/activities";
import {
  footerNavigation,
  hasContactDetails,
  legalNavigation,
  siteConfig,
  type NavItem,
} from "@/lib/site-config";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { CopyrightYear } from "./CopyrightYear";
import { Logo } from "./Logo";

function FooterColumn({ title, items }: { title: string; items: NavItem[] }) {
  return (
    <div>
      <h2 className="mb-5 font-sans text-xs font-semibold tracking-[0.2em] text-orange uppercase">{title}</h2>
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className="link-underline text-sm text-white/75 transition-colors hover:text-white">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ContactColumn() {
  const { contact } = siteConfig;
  if (!hasContactDetails(contact)) return null;

  return (
    <div>
      <h2 className="mb-5 font-sans text-xs font-semibold tracking-[0.2em] text-orange uppercase">Contact</h2>
      <ul className="space-y-3 text-sm text-white/75">
        {contact.email && (
          <li>
            <a href={`mailto:${contact.email}`} className="link-underline hover:text-white">
              {contact.email}
            </a>
          </li>
        )}
        {contact.phone && (
          <li>
            <a href={`tel:${contact.phone.replace(/\s+/g, "")}`} className="link-underline hover:text-white">
              {contact.phone}
            </a>
          </li>
        )}
        {contact.whatsapp && (
          <li>
            <a
              href={`https://wa.me/${contact.whatsapp}`}
              className="link-underline hover:text-white"
              rel="noopener noreferrer"
              target="_blank"
            >
              WhatsApp
            </a>
          </li>
        )}
        {contact.address && (
          <li>
            <address className="not-italic">
              {[contact.address.streetAddress, contact.address.locality, contact.address.country]
                .filter(Boolean)
                .join(", ")}
            </address>
          </li>
        )}
      </ul>
    </div>
  );
}

export function SiteFooter() {
  const activityLinks: NavItem[] = getPublishedActivities().map((activity) => ({
    label: activity.shortName,
    href: getActivityPath(activity),
  }));

  return (
    <footer className="grain bg-charcoal text-white">
      {/* Extra bottom space on small screens keeps the floating WhatsApp button off the credits. */}
      <div className="container-site pt-20 pb-28 sm:pb-10">
        <div className="grid gap-12 border-b border-charcoal-line pb-14 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="max-w-sm">
            {/* Light plate: the logo's dark lettering needs a light background. */}
            <div className="inline-block bg-sand px-4 py-3">
              <Logo height={64} loading="lazy" />
            </div>
            <p className="mt-5 text-sm leading-relaxed text-muted-inverse">{siteConfig.description}</p>
            <SocialLinks className="mt-6" />
          </div>
          <FooterColumn title="Explore" items={footerNavigation} />
          <FooterColumn title="Activities" items={activityLinks} />
          <div className="space-y-12">
            <ContactColumn />
            <FooterColumn title="Legal" items={legalNavigation} />
          </div>
        </div>
        <div className="flex flex-col gap-3 pt-8 text-xs text-muted-inverse sm:flex-row sm:items-center sm:justify-between sm:pr-20 2xl:pr-0">
          <p>
            © <CopyrightYear /> {siteConfig.name}. All rights reserved.
          </p>
          <p>
            Website by{" "}
            <a
              href="https://mehdicodes.com"
              target="_blank"
              rel="noopener"
              className="link-underline font-semibold text-white/80 transition-colors hover:text-orange"
            >
              mehdicodes.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
