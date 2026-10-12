import Link from "next/link";
import { getGuidePath, getReadingMinutes, guideCategories, type Guide } from "@/content/guides";
import { SiteImage } from "@/components/ui/SiteImage";

type GuideCardProps = {
  guide: Guide;
  headingLevel?: "h2" | "h3";
  sizes?: string;
};

export function GuideCard({
  guide,
  headingLevel: Heading = "h3",
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
}: GuideCardProps) {
  return (
    <article className="group relative flex h-full flex-col has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-4 has-[a:focus-visible]:outline-orange has-[a:focus-visible]:outline-solid">
      <div className="relative aspect-[3/2] overflow-hidden bg-sand-deep">
        <div className="absolute inset-0 transition-transform duration-700 ease-out-soft group-hover:scale-[1.03]">
          <SiteImage image={guide.heroImage} sizes={sizes} meaningful={false} />
        </div>
      </div>
      <p className="mt-5 text-xs font-semibold tracking-[0.16em] text-orange-deep uppercase">
        {guideCategories[guide.category].label}
        <span className="text-muted"> · {getReadingMinutes(guide)} min read</span>
      </p>
      <Heading className="mt-3 text-xl leading-snug font-semibold">
        <Link
          href={getGuidePath(guide)}
          className="transition-colors after:absolute after:inset-0 after:content-[''] group-hover:text-orange-deep focus-visible:outline-none"
        >
          {guide.title}
        </Link>
      </Heading>
      <p className="mt-3 leading-relaxed text-muted">{guide.excerpt}</p>
    </article>
  );
}
