/**
 * Central brand, domain and business configuration.
 *
 * Every business fact here must be verified before it is filled in. Optional
 * fields that are left `undefined` are simply not rendered anywhere on the site
 * (and are never emitted in structured data).
 */

export type ContactDetails = {
  email?: string;
  /** International format, e.g. "+212 600 000 000". */
  phone?: string;
  /** Digits only in international format, e.g. "212600000000". */
  whatsapp?: string;
  address?: {
    streetAddress?: string;
    locality: string;
    region?: string;
    postalCode?: string;
    country: string;
  };
};

export type SocialProfile = {
  label: string;
  url: string;
};

export type LogoAsset = {
  /** Path inside /public. The logo has dark lettering: place it on light backgrounds only. */
  src: string;
  /** Intrinsic pixel size of the file. */
  width: number;
  height: number;
};

export type SocialImage = {
  /** Path inside /public. 1200×630 is recommended. */
  src: string;
  width: number;
  height: number;
  alt: string;
};

type SiteConfig = {
  name: string;
  legalName?: string;
  url: string;
  locale: string;
  language: string;
  tagline: string;
  description: string;
  /**
   * Set this once the official logo file is added to /public/logo/.
   * Until then a typographic wordmark is rendered instead.
   */
  logo?: LogoAsset;
  favicon: { src: string; width: number; height: number };
  socialImage: SocialImage;
  contact: ContactDetails;
  socialProfiles: SocialProfile[];
};

export const siteConfig: SiteConfig = {
  name: "TimlalinTrip",
  // Must match the primary domain in Vercel; the apex redirects to www.
  url: "https://www.timlalintrip.com",
  locale: "en_GB",
  language: "en",
  tagline: "Desert adventures in the Timlalin Dunes",
  description:
    "Sandboarding, quad biking, buggy rides, camel rides and sunset experiences in the Timlalin Dunes, the coastal dune landscape north of Agadir, Morocco.",
  logo: { src: "/logo/logo.png", width: 500, height: 300 },
  favicon: { src: "/favicon.ico", width: 40, height: 40 },
  socialImage: {
    src: "/og-image.jpg",
    width: 500,
    height: 300,
    alt: "TimlalinTrip logo — desert adventures in the Timlalin Dunes",
  },
  contact: {
    email: "timlalintrip@gmail.com",
    whatsapp: "212659727363",
  },
  socialProfiles: [],
};

export type NavItem = {
  label: string;
  href: string;
};

export const primaryNavigation: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Activities", href: "/activities" },
  { label: "About Us", href: "/about-us" },
  { label: "Travel Guide", href: "/travel-guide" },
  { label: "Contact", href: "/contact" },
];

export const footerNavigation: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Activities", href: "/activities" },
  { label: "Gallery", href: "/gallery" },
  { label: "About Us", href: "/about-us" },
  { label: "Travel Guide", href: "/travel-guide" },
  { label: "Contact", href: "/contact" },
  { label: "Book Now", href: "/book-now" },
];

export const legalNavigation: NavItem[] = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms and Conditions", href: "/terms-and-conditions" },
];

export function absoluteUrl(path = "/"): string {
  return new URL(path, siteConfig.url).toString();
}

export function hasContactDetails(contact: ContactDetails = siteConfig.contact): boolean {
  return Boolean(contact.email || contact.phone || contact.whatsapp || contact.address);
}
