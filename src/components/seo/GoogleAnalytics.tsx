import Script from "next/script";
import { siteConfig } from "@/lib/site-config";

/**
 * Site-wide GA4 tag. Loaded with next/script after hydration so it does not
 * block first paint. Skipped in `next dev` to keep localhost out of reports.
 */
export function GoogleAnalytics() {
  const id = siteConfig.googleAnalyticsId;
  if (!id || process.env.NODE_ENV !== "production") return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${id}`} strategy="afterInteractive" />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${id}');
        `}
      </Script>
    </>
  );
}
