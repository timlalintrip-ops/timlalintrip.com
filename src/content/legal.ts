/**
 * Legal pages stay out of search results and the sitemap until a qualified
 * reviewer has approved the final text. Set to true once that has happened.
 */
export const legalReview = {
  privacyPolicy: { reviewed: false, lastUpdated: undefined as string | undefined },
  terms: { reviewed: false, lastUpdated: undefined as string | undefined },
};
