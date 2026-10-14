"use client";

import { useState, type ReactNode } from "react";
import { PauseIcon, PlayIcon } from "@/components/ui/icons";

const SECONDS_PER_CARD = 7;

/**
 * Continuously scrolling row of cards. The list is rendered twice so the loop is seamless; with reduced motion the
 * copy is hidden and the row becomes a regular swipeable scroller.
 */
export function ReviewsMarquee({ items }: { items: { key: string; node: ReactNode }[] }) {
  const [paused, setPaused] = useState(false);

  const renderList = (copy: boolean) => (
    <ul
      aria-hidden={copy || undefined}
      inert={copy}
      className={`flex shrink-0 items-stretch gap-6 pr-6 ${copy ? "motion-reduce:hidden" : ""}`}
    >
      {items.map((item) => (
        <li key={item.key} className="w-[19rem] shrink-0 snap-start sm:w-[24rem]">
          {item.node}
        </li>
      ))}
    </ul>
  );

  return (
    <div>
      <div className="group overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent)] motion-reduce:snap-x motion-reduce:snap-mandatory motion-reduce:overflow-x-auto motion-reduce:[mask-image:none]">
        <div
          style={{
            animationDuration: `${items.length * SECONDS_PER_CARD}s`,
            ...(paused ? { animationPlayState: "paused" } : {}),
          }}
          className="flex w-max motion-safe:animate-marquee motion-safe:group-hover:[animation-play-state:paused] motion-safe:group-focus-within:[animation-play-state:paused]"
        >
          {renderList(false)}
          {renderList(true)}
        </div>
      </div>
      <div className="container-site mt-8 flex motion-reduce:hidden">
        <button
          type="button"
          onClick={() => setPaused((value) => !value)}
          aria-label={paused ? "Play reviews" : "Pause reviews"}
          className="grid size-10 place-items-center border border-charcoal/20 text-charcoal transition-colors hover:border-orange-deep hover:bg-orange"
        >
          {paused ? <PlayIcon className="size-4" /> : <PauseIcon className="size-4" />}
        </button>
      </div>
    </div>
  );
}
