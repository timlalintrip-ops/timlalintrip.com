import type { MediaAsset } from "./media";

/**
 * Verified company information for the About page. Leave arrays empty until
 * the business has supplied and approved the content — empty sections are not
 * rendered in production.
 */

export type TeamMember = {
  name: string;
  role: string;
  bio?: string;
  /** Real photo of this person, added to `media.ts`. */
  photo?: MediaAsset;
};

export const aboutContent: {
  /** Verified story paragraphs: who runs TimlalinTrip, local roots, years of operation. */
  story: string[];
  /** Verifiable credentials only: licences, insurance, guide training, safety practices. */
  credentials: string[];
  team: TeamMember[];
} = {
  story: [],
  credentials: [],
  team: [],
};
