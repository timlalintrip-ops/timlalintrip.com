"use client";

import { useEffect, useState } from "react";
import { ArrowIcon, WhatsAppIcon } from "@/components/ui/icons";
import { siteConfig } from "@/lib/site-config";

const SHOW_SCROLL_TOP_AFTER = 600;

const whatsappMessage = encodeURIComponent(
  `Hello ${siteConfig.name}, I would like some information about your activities in the Timlalin Dunes.`,
);

export function FloatingActions() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { whatsapp } = siteConfig.contact;

  useEffect(() => {
    const update = () => setShowScrollTop(window.scrollY > SHOW_SCROLL_TOP_AFTER);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  function scrollToTop() {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  }

  return (
    // Below the mobile menu (z-40) so the open menu covers these buttons.
    <div className="pointer-events-none fixed right-4 bottom-4 z-30 flex flex-col items-center gap-3 sm:right-6 sm:bottom-6">
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Scroll back to top"
        tabIndex={showScrollTop ? 0 : -1}
        aria-hidden={!showScrollTop}
        className={`grid size-11 place-items-center bg-charcoal text-white shadow-lg transition-[opacity,translate,background-color] duration-300 ease-out-soft hover:bg-orange hover:text-charcoal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange ${
          showScrollTop ? "pointer-events-auto translate-y-0 opacity-100" : "translate-y-3 opacity-0"
        }`}
      >
        <ArrowIcon className="size-5 -rotate-90" />
      </button>

      {whatsapp && (
        <a
          href={`https://wa.me/${whatsapp}?text=${whatsappMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with us on WhatsApp"
          className="group pointer-events-auto relative grid size-14 place-items-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform duration-300 ease-out-soft hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366]"
        >
          <span
            aria-hidden="true"
            className="absolute inset-0 rounded-full bg-[#25D366] opacity-40 motion-safe:animate-ping motion-safe:[animation-duration:2.5s] motion-safe:[animation-iteration-count:3]"
          />
          <WhatsAppIcon className="relative size-7" />
          <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap bg-charcoal px-3 py-2 text-sm font-medium text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 md:block">
            Chat on WhatsApp
          </span>
        </a>
      )}
    </div>
  );
}
