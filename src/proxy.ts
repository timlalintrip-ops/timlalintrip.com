import { NextResponse, type NextRequest } from "next/server";
import { getActivityBySlug } from "@/content/activities";
import { getGuideBySlug } from "@/content/guides";

/**
 * Sends unknown activity and guide slugs to the standard 404 page before
 * rendering, so they get a 404 status and a fully server-rendered not-found
 * page. The pages themselves still call notFound() as a fallback.
 */
export function proxy(request: NextRequest) {
  const [, section, slug, ...rest] = request.nextUrl.pathname.split("/");
  const known =
    rest.length === 0 &&
    ((section === "activities" && getActivityBySlug(slug)) || (section === "travel-guide" && getGuideBySlug(slug)));

  if (known) return NextResponse.next();
  return NextResponse.rewrite(new URL("/404", request.url));
}

export const config = {
  matcher: ["/activities/:slug+", "/travel-guide/:slug+"],
};
