import type { Metadata } from "next";
import { BookingCta } from "@/components/booking/BookingCta";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { PlaceholderNote } from "@/components/ui/PlaceholderNote";
import { SiteImage } from "@/components/ui/SiteImage";
import { aboutContent } from "@/content/about";
import { valuePropositions } from "@/content/home";
import { media } from "@/content/media";
import { staticPageSeo } from "@/content/static-pages";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, jsonLdGraph } from "@/lib/structured-data";

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about-us" },
];

export const metadata: Metadata = buildMetadata(staticPageSeo.about);

export default function AboutPage() {
  return (
    <>
      <JsonLd data={jsonLdGraph(breadcrumbSchema(breadcrumbs))} />
      <PageHero
        eyebrow="About us"
        title="Dedicated to the Timlalin Dunes"
        intro="TimlalinTrip exists for one landscape: the coastal dunes north of Agadir, where golden sand runs down to the Atlantic. Our aim is to help visitors experience it fully, safely and respectfully."
        breadcrumbs={breadcrumbs}
        image={media.aboutHero}
      />

      <section aria-labelledby="story-title" className="py-20 sm:py-28">
        <div className="container-site grid gap-14 lg:grid-cols-[1fr_1.2fr] lg:gap-24">
          <div>
            <p className="eyebrow mb-4 text-orange-deep">Our approach</p>
            <h2 id="story-title" className="text-headline font-semibold">
              Clear information before every adventure
            </h2>
          </div>
          <div className="space-y-6 text-lg leading-relaxed text-charcoal/80">
            <p>
              Many visitors to the Agadir region hear about the dunes at Timlalin but are unsure what to expect, how to
              get there or which activity suits them. TimlalinTrip brings these experiences together in one place, with
              honest descriptions and a simple enquiry process.
            </p>
            <p>
              Rather than publishing fixed packages, we start with a conversation. You tell us what you would like to do,
              when and with whom, and we reply with the details that apply to your date — so there are no surprises on
              the day.
            </p>
            {aboutContent.story.map((paragraph) => (
              <p key={paragraph.slice(0, 32)}>{paragraph}</p>
            ))}
            {aboutContent.credentials.length > 0 && (
              <ul className="space-y-2 border-t border-sand-line pt-6 text-base">
                {aboutContent.credentials.map((credential) => (
                  <li key={credential}>{credential}</li>
                ))}
              </ul>
            )}
            {aboutContent.story.length === 0 && (
              <PlaceholderNote
                title="Company story and credentials"
                devHint={
                  <>
                    Add the verified story (who runs TimlalinTrip, local roots, years of operation) and credentials
                    (licences, insurance, guide training, safety practices) to <code>src/content/about.ts</code>.
                  </>
                }
              />
            )}
          </div>
        </div>
      </section>

      <section aria-labelledby="values-title" className="bg-sand-deep py-20 sm:py-28">
        <div className="container-site">
          <h2 id="values-title" className="text-headline mb-14 max-w-2xl font-semibold">
            What guides our work
          </h2>
          <ul className="grid gap-10 md:grid-cols-2">
            {valuePropositions.map((item) => (
              <li key={item.title} className="border-t border-charcoal/20 pt-6">
                <h3 className="text-title font-semibold">{item.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {aboutContent.team.length > 0 ? (
        <section aria-labelledby="team-title" className="py-20 sm:py-28">
          <div className="container-site">
            <h2 id="team-title" className="text-headline mb-14 font-semibold">
              The team
            </h2>
            <ul className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {aboutContent.team.map((member) => (
                <li key={member.name}>
                  {member.photo && (
                    <div className="relative mb-5 aspect-[4/5] overflow-hidden bg-sand-deep">
                      <SiteImage image={member.photo} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" />
                    </div>
                  )}
                  <h3 className="text-title font-semibold">{member.name}</h3>
                  <p className="mt-1 text-sm font-semibold text-orange-deep">{member.role}</p>
                  {member.bio && <p className="mt-3 leading-relaxed text-muted">{member.bio}</p>}
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : process.env.NODE_ENV === "development" ? (
        <div className="container-site py-12">
          <PlaceholderNote
            title="Team members"
            devHint={
              <>
                Add names, roles, short biographies and real photos to <code>src/content/about.ts</code>. The team
                section stays hidden until at least one member is added.
              </>
            }
          />
        </div>
      ) : null}

      <BookingCta />
    </>
  );
}
