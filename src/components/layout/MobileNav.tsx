"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { CloseIcon, MenuIcon } from "@/components/ui/icons";
import type { NavItem } from "@/lib/site-config";
import { isActivePath } from "./NavLinks";

const PANEL_ID = "mobile-navigation";
const DESKTOP_QUERY = "(min-width: 64rem)";

export function MobileNav({ items }: { items: NavItem[] }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = "hidden";

    panelRef.current?.querySelector<HTMLElement>("a[href]")?.focus();

    function close(returnFocus: boolean) {
      setOpen(false);
      if (returnFocus) toggleRef.current?.focus();
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        close(true);
        return;
      }
      if (event.key !== "Tab" || !panelRef.current || !toggleRef.current) return;

      // Keep focus within the toggle button and the open panel.
      const focusable = [
        toggleRef.current,
        ...panelRef.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])"),
      ];
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    const desktop = window.matchMedia(DESKTOP_QUERY);
    function onViewportChange(event: MediaQueryListEvent) {
      if (event.matches) close(false);
    }

    document.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onViewportChange);
    return () => {
      root.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onViewportChange);
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        ref={toggleRef}
        type="button"
        aria-expanded={open}
        aria-controls={PANEL_ID}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((value) => !value)}
        className="-mr-2 inline-flex size-12 items-center justify-center text-charcoal"
      >
        {open ? <CloseIcon className="size-6" /> : <MenuIcon className="size-6" />}
      </button>

      <div
        ref={panelRef}
        id={PANEL_ID}
        hidden={!open}
        className="fixed inset-x-0 top-header bottom-0 z-40 overflow-y-auto bg-sand motion-safe:animate-menu-in"
      >
        <nav aria-label="Mobile" className="container-site flex min-h-full flex-col py-10">
          <ul className="flex flex-col">
            {items.map((item) => {
              const active = isActivePath(pathname, item.href);
              return (
                <li key={item.href} className="border-b border-sand-line">
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={`flex items-center justify-between py-5 font-display text-2xl font-semibold ${active ? "text-orange-deep" : "text-charcoal"}`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <Link
            href="/book-now"
            onClick={() => setOpen(false)}
            className="mt-10 inline-flex min-h-14 items-center justify-center bg-orange px-6 font-semibold text-charcoal"
          >
            Book Now
          </Link>
        </nav>
      </div>
    </div>
  );
}
