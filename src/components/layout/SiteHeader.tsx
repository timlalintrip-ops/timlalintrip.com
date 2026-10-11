import Link from "next/link";
import { primaryNavigation } from "@/lib/site-config";
import { Logo } from "./Logo";
import { MobileNav } from "./MobileNav";
import { NavLinks } from "./NavLinks";

/**
 * Light header: the official logo has dark lettering. No backdrop-filter here,
 * as it would become the containing block of the fixed mobile menu panel.
 */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-sand-line bg-sand">
      <div className="container-site flex h-header items-center justify-between gap-6">
        <Logo />
        <nav aria-label="Main" className="hidden lg:block">
          <NavLinks items={primaryNavigation} />
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href="/book-now"
            className="hidden min-h-11 items-center bg-orange px-5 text-sm font-semibold text-charcoal transition-colors duration-300 hover:bg-charcoal hover:text-white sm:inline-flex"
          >
            Book Now
          </Link>
          <MobileNav items={primaryNavigation} />
        </div>
      </div>
    </header>
  );
}
