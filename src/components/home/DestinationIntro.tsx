import Link from "next/link";
import { destinationContent } from "@/content/home";
import { media } from "@/content/media";
import { SiteImage } from "@/components/ui/SiteImage";

export function DestinationIntro() {
  return (
    <section aria-labelledby="destination-title" className="py-24 sm:py-32">
      <div className="container-site grid items-center gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <div className="relative aspect-[4/5] overflow-hidden bg-sand-deep">
          <SiteImage image={media.destination} sizes="(min-width: 1024px) 45vw, 100vw" showPlaceholderBrief />
        </div>
        <div>
          <p className="eyebrow mb-4 text-orange-deep">{destinationContent.eyebrow}</p>
          <h2 id="destination-title" className="text-headline font-semibold">
            {destinationContent.title}
          </h2>
          <div className="mt-8 space-y-5 text-lg leading-relaxed text-charcoal/80">
            {destinationContent.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 32)}>{paragraph}</p>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4 border-t border-sand-line pt-8 text-sm font-semibold">
            <Link href="/travel-guide" className="link-underline text-orange-deep hover:text-charcoal">
              Read the travel guide
            </Link>
            <Link href="/activities/sunset-tea" className="link-underline text-orange-deep hover:text-charcoal">
              Sunset tea on the dunes
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
