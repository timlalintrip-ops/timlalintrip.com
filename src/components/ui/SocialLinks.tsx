import { siteConfig, type SocialProfile } from "@/lib/site-config";
import { FacebookIcon, InstagramIcon } from "./icons";

const icons: Record<SocialProfile["network"], typeof FacebookIcon> = {
  facebook: FacebookIcon,
  instagram: InstagramIcon,
};

const tones = {
  light: "border-white/25 text-white/80 hover:border-orange hover:bg-orange hover:text-charcoal",
  dark: "border-charcoal/20 text-charcoal hover:border-orange-deep hover:bg-orange hover:text-charcoal",
};

export function SocialLinks({ tone = "light", className = "" }: { tone?: keyof typeof tones; className?: string }) {
  if (siteConfig.socialProfiles.length === 0) return null;

  return (
    <ul className={`flex flex-wrap gap-3 ${className}`}>
      {siteConfig.socialProfiles.map((profile) => {
        const Icon = icons[profile.network];
        return (
          <li key={profile.url}>
            <a
              href={profile.url}
              target="_blank"
              rel="noopener noreferrer me"
              aria-label={`${siteConfig.name} on ${profile.label}`}
              className={`grid size-11 place-items-center border transition-colors ${tones[tone]}`}
            >
              <Icon className="size-5" />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
