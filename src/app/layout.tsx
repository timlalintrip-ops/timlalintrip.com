import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Inter } from "next/font/google";
import { FloatingActions } from "@/components/layout/FloatingActions";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { defaultSocialImage } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";
import "./globals.css";

// Headings only use the semibold weight; a single static weight is much smaller
// than the variable font and it is on the critical path for the hero heading.
const display = Bricolage_Grotesque({
  variable: "--font-display-face",
  subsets: ["latin"],
  weight: "600",
  display: "swap",
});

// Not preloaded: Chrome holds the first paint for preloaded fonts, and the
// metric-matched fallback keeps the later swap free of layout shift.
const body = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Timlalin Dunes Adventures near Agadir`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  icons: {
    icon: [
      {
        url: siteConfig.favicon.src,
        sizes: `${siteConfig.favicon.width}x${siteConfig.favicon.height}`,
      },
    ],
  },
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    url: siteConfig.url,
    images: [defaultSocialImage],
  },
  twitter: {
    card: "summary_large_image",
    images: [defaultSocialImage.url],
  },
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
};

export const viewport: Viewport = {
  themeColor: "#111719",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang={siteConfig.language} className={`${display.variable} ${body.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main-content"
          className="sr-only z-[60] bg-orange px-4 py-3 font-semibold text-charcoal focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to main content
        </a>
        <SiteHeader />
        <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">
          {children}
        </main>
        <SiteFooter />
        <FloatingActions />
      </body>
    </html>
  );
}
