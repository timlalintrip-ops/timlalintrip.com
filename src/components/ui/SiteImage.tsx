import Image from "next/image";
import type { MediaAsset } from "@/content/media";
import { ScenePlaceholder } from "./ScenePlaceholder";

type SiteImageProps = {
  image: MediaAsset;
  /** Responsive `sizes` hint, e.g. "(min-width: 1024px) 33vw, 100vw". */
  sizes: string;
  /** Set only for the above-the-fold LCP image. */
  preload?: boolean;
  /** Set false for purely decorative usage (empty alt). */
  meaningful?: boolean;
  showPlaceholderBrief?: boolean;
  className?: string;
};

/**
 * Renders a registry image inside a positioned parent that reserves its
 * aspect ratio (prevents layout shift). Falls back to a labelled illustration
 * when no real photo has been supplied.
 */
export function SiteImage({
  image,
  sizes,
  preload = false,
  meaningful = true,
  showPlaceholderBrief = false,
  className = "object-cover",
}: SiteImageProps) {
  if (!image.src) {
    return <ScenePlaceholder scene={image.scene} brief={showPlaceholderBrief ? image.brief : undefined} />;
  }

  return (
    <Image
      src={image.src}
      alt={meaningful ? image.alt : ""}
      fill
      sizes={sizes}
      className={className}
      {...(preload ? { preload: true } : { loading: "lazy" as const })}
    />
  );
}
