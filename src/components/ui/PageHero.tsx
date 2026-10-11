import type { ReactNode } from "react";
import type { MediaAsset } from "@/content/media";
import type { BreadcrumbItem } from "@/lib/structured-data";
import { Breadcrumbs } from "./Breadcrumbs";
import { SiteImage } from "./SiteImage";

type PageHeroProps = {
  title: string;
  eyebrow?: string;
  intro?: string;
  breadcrumbs?: BreadcrumbItem[];
  image?: MediaAsset;
  children?: ReactNode;
};

/**
 * Dark page header shared by inner pages. With an image it becomes a split
 * editorial layout; without one it is a typographic header.
 */
export function PageHero({ title, eyebrow, intro, breadcrumbs, image, children }: PageHeroProps) {
  return (
    <header className="grain bg-charcoal text-white">
      <div
        className={`container-site grid gap-10 pt-10 pb-14 sm:pt-14 sm:pb-20 ${image ? "lg:grid-cols-[1.1fr_1fr] lg:items-end lg:gap-16" : ""}`}
      >
        <div className="max-w-3xl">
          {breadcrumbs && (
            <div className="mb-10">
              <Breadcrumbs items={breadcrumbs} />
            </div>
          )}
          {eyebrow && <p className="eyebrow mb-5 text-orange">{eyebrow}</p>}
          <h1 className="text-headline font-semibold">{title}</h1>
          {intro && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/75">{intro}</p>}
          {children && <div className="mt-8">{children}</div>}
        </div>
        {image && (
          <div className="relative aspect-[4/3] overflow-hidden bg-charcoal-soft">
            <SiteImage
              image={image}
              sizes="(min-width: 1344px) 620px, (min-width: 1024px) 46vw, 100vw"
              preload
              showPlaceholderBrief
            />
          </div>
        )}
      </div>
    </header>
  );
}
