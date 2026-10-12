"use client";

import Link from "next/link";
import { useRef, useState, type FocusEvent, type ReactNode } from "react";
import type { MediaAsset } from "@/content/media";
import { buttonClassName } from "@/components/ui/ButtonLink";
import { ArrowIcon, PauseIcon, PlayIcon } from "@/components/ui/icons";
import { SiteImage } from "@/components/ui/SiteImage";

export type HeroSlide = {
  slug: string;
  name: string;
  href: string;
  facts: string[];
  image: MediaAsset;
  /** Server-rendered booking button for this activity. */
  action: ReactNode;
};

type HeroSlideshowProps = {
  slides: HeroSlide[];
  labelledBy: string;
  children: ReactNode;
};

const SWIPE_THRESHOLD = 50;

function pad(value: number): string {
  return String(value).padStart(2, "0");
}

export function HeroSlideshow({ slides, labelledBy, children }: HeroSlideshowProps) {
  const count = slides.length;
  const [active, setActive] = useState(0);
  // Images are mounted one slide ahead so the next photo is ready before it fades in.
  const [loaded, setLoaded] = useState(() => new Set([0, 1 % count]));
  const [stopped, setStopped] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [keyboardFocus, setKeyboardFocus] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const paused = stopped || hovered || keyboardFocus;
  const slide = slides[active];

  function show(index: number) {
    const next = (index + count) % count;
    const ahead = (next + 1) % count;
    setActive(next);
    setLoaded((previous) => {
      if (previous.has(next) && previous.has(ahead)) return previous;
      return new Set(previous).add(next).add(ahead);
    });
  }

  function handleFocus(event: FocusEvent<HTMLElement>) {
    if (event.target.matches(":focus-visible")) setKeyboardFocus(true);
  }

  function handleBlur(event: FocusEvent<HTMLElement>) {
    if (!event.currentTarget.contains(event.relatedTarget)) setKeyboardFocus(false);
  }

  return (
    <section
      aria-labelledby={labelledBy}
      className="relative isolate overflow-hidden bg-charcoal text-white"
      onPointerEnter={(event) => event.pointerType === "mouse" && setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onTouchStart={(event) => {
        touchStartX.current = event.touches[0]?.clientX ?? null;
      }}
      onTouchEnd={(event) => {
        const start = touchStartX.current;
        const end = event.changedTouches[0]?.clientX;
        touchStartX.current = null;
        if (start === null || end === undefined) return;
        const distance = end - start;
        if (Math.abs(distance) >= SWIPE_THRESHOLD) show(active + (distance < 0 ? 1 : -1));
      }}
    >
      <div className="absolute inset-0 -z-10">
        {slides.map((item, index) => (
          <div
            key={item.slug}
            aria-hidden={index !== active}
            className={`absolute inset-0 transition-opacity duration-1000 ease-out-soft ${
              index === active ? "opacity-100" : "opacity-0"
            }`}
          >
            {loaded.has(index) && (
              <div
                className={`absolute inset-0 transition-transform duration-[7000ms] ease-out ${
                  index === active ? "scale-100" : "motion-safe:scale-[1.06]"
                }`}
              >
                <SiteImage image={item.image} sizes="100vw" preload={index === 0} />
              </div>
            )}
          </div>
        ))}
        {/* Contrast scrim behind the text only */}
        <div className="absolute inset-0 bg-linear-to-b from-charcoal/55 via-charcoal/65 to-charcoal/85 lg:bg-linear-to-r lg:from-charcoal/85 lg:via-charcoal/45 lg:to-charcoal/10" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-charcoal/90 to-transparent" />
      </div>

      <div className="container-site flex min-h-[calc(100svh-var(--spacing-header))] flex-col justify-end pt-20 pb-6 sm:min-h-[44rem] lg:min-h-[calc(100svh-var(--spacing-header))]">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between lg:gap-12">
          {children}

          <div className="flex flex-col gap-5 border-t border-white/20 pt-6 pb-8 sm:flex-row sm:items-end sm:justify-between lg:w-80 lg:shrink-0 lg:flex-col lg:items-start lg:border-t-0 lg:border-l lg:pt-0 lg:pb-10 lg:pl-8">
            <div aria-live={paused ? "polite" : "off"} aria-atomic="true">
              <p className="eyebrow text-orange">
                Activity {pad(active + 1)} / {pad(count)}
              </p>
              <p className="mt-2 font-display text-2xl font-semibold sm:text-3xl">
                <Link href={slide.href} className="link-underline">
                  {slide.name}
                </Link>
              </p>
              {slide.facts.length > 0 && <p className="mt-1.5 text-sm text-white/75">{slide.facts.join(" · ")}</p>}
            </div>
            <div className="flex flex-wrap items-center gap-3">
              {slides.map((item, index) => (
                <div key={item.slug} className={index === active ? "contents" : "hidden"}>
                  {item.action}
                </div>
              ))}
              <Link href={slide.href} className={buttonClassName("outline-light", "min-h-11 px-5")}>
                <span>Discover</span>
                <ArrowIcon className="size-4 transition-transform duration-300 ease-out-soft group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>

        <div role="region" aria-roledescription="carousel" aria-label="Featured activities">
          <div className="flex items-start gap-4">
            <button
              type="button"
              onClick={() => setStopped((value) => !value)}
              aria-label={stopped ? "Play slideshow" : "Pause slideshow"}
              className="grid size-9 shrink-0 cursor-pointer place-items-center border border-white/30 text-white transition-colors hover:border-white hover:bg-white hover:text-charcoal"
            >
              {stopped ? <PlayIcon className="size-3.5" /> : <PauseIcon className="size-3.5" />}
            </button>
            <ol
              className="grid flex-1 gap-2 sm:gap-3"
              style={{ gridTemplateColumns: `repeat(${count}, minmax(0, 1fr))` }}
            >
              {slides.map((item, index) => (
                <li key={item.slug}>
                  <button
                    type="button"
                    onClick={() => show(index)}
                    aria-label={`Show ${item.name}`}
                    aria-current={index === active ? "true" : undefined}
                    className="group block w-full cursor-pointer pt-4 pb-1 text-left"
                  >
                    <span className="relative block h-0.5 overflow-hidden bg-white/25">
                      {index === active && (
                        <span
                          key={active}
                          onAnimationEnd={() => show(active + 1)}
                          style={{ animationPlayState: paused ? "paused" : "running" }}
                          className="absolute inset-0 origin-left bg-orange motion-safe:animate-slide-progress"
                        />
                      )}
                    </span>
                    <span
                      className={`mt-3 hidden truncate text-xs font-semibold tracking-wide transition-colors lg:block ${
                        index === active ? "text-white" : "text-white/55 group-hover:text-white"
                      }`}
                    >
                      {item.name}
                    </span>
                  </button>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
