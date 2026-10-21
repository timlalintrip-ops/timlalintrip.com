import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

// Static (nonce-free) policy: nonces require per-request rendering, which is
// incompatible with the prerendered/partially prerendered pages used here.
// Next.js still needs inline scripts for its streamed RSC payload, hence
// 'unsafe-inline' in script-src. Third-party origins are limited to GA4.
const googleAnalyticsOrigins = {
  scripts: "https://*.googletagmanager.com",
  images: "https://*.google-analytics.com https://*.googletagmanager.com",
  connect:
    "https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com",
};

const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} ${googleAnalyticsOrigins.scripts}`,
  "style-src 'self' 'unsafe-inline'",
  `img-src 'self' data: blob: ${googleAnalyticsOrigins.images}`,
  "font-src 'self'",
  `connect-src 'self' ${googleAnalyticsOrigins.connect}`,
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
];

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75],
    // Only local photography and logo files may be optimised. Add narrowly
    // scoped `remotePatterns` here if images are ever served from a CDN.
    localPatterns: [{ pathname: "/images/**" }, { pathname: "/logo/**" }],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
