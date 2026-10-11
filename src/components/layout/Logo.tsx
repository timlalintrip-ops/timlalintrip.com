import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

type LogoProps = {
  /** Rendered height in pixels; width follows the logo's aspect ratio. */
  height?: number;
  /** Eager (and preloaded) by default for the header; use "lazy" below the fold. */
  loading?: "eager" | "lazy";
  className?: string;
};

/**
 * Official logo from `siteConfig.logo`. It has dark lettering, so it must sit
 * on a light background. Falls back to a plain text wordmark if no logo is set.
 */
export function Logo({ height = 56, loading = "eager", className = "" }: LogoProps) {
  const { logo, name } = siteConfig;

  return (
    <Link href="/" aria-label={`${name} home`} className={`inline-flex shrink-0 items-center ${className}`}>
      {logo ? (
        <Image
          src={logo.src}
          alt={name}
          width={Math.round((height * logo.width) / logo.height)}
          height={height}
          loading={loading}
        />
      ) : (
        <span className="font-display text-xl font-bold tracking-tight text-charcoal">
          Timlalin<span className="text-orange-deep">Trip</span>
        </span>
      )}
    </Link>
  );
}
