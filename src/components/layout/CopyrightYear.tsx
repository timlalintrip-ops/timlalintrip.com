import { cacheLife } from "next/cache";

/** Current year, refreshed daily so static pages stay correct across new year. */
export async function CopyrightYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}
