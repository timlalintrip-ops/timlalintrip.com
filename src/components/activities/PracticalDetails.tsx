import Link from "next/link";
import { hasPracticalInfo, type PracticalInfo } from "@/content/activities";

type PracticalDetailsProps = {
  practical?: PracticalInfo;
  bookingHref: string;
};

const fieldLabels: { key: "duration" | "minimumAge" | "price" | "meetingPoint" | "transport"; label: string }[] = [
  { key: "duration", label: "Duration" },
  { key: "minimumAge", label: "Minimum age" },
  { key: "price", label: "Price" },
  { key: "meetingPoint", label: "Meeting point" },
  { key: "transport", label: "Transport" },
];

function ListBlock({ title, items }: { title: string; items?: string[] }) {
  if (!items || items.length === 0) return null;
  return (
    <div className="border-b border-sand-line py-4">
      <dt className="text-xs font-semibold tracking-[0.14em] text-muted uppercase">{title}</dt>
      <dd className="mt-2">
        <ul className="space-y-1">
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </dd>
    </div>
  );
}

/** Shows only confirmed practical details; otherwise explains how they are provided. */
export function PracticalDetails({ practical, bookingHref }: PracticalDetailsProps) {
  return (
    <aside aria-labelledby="practical-title" className="self-start border border-sand-line bg-white p-7 sm:p-8">
      <h2 id="practical-title" className="font-sans text-xs font-semibold tracking-[0.2em] text-orange-deep uppercase">
        Practical information
      </h2>

      {hasPracticalInfo(practical) ? (
        <dl className="mt-4">
          {fieldLabels.map(({ key, label }) =>
            practical[key] ? (
              <div key={key} className="border-b border-sand-line py-4">
                <dt className="text-xs font-semibold tracking-[0.14em] text-muted uppercase">{label}</dt>
                <dd className="mt-1 font-medium">{practical[key]}</dd>
              </div>
            ) : null,
          )}
          <ListBlock title="Included" items={practical.inclusions} />
          <ListBlock title="What to bring" items={practical.whatToBring} />
          <ListBlock title="Safety and restrictions" items={practical.safety} />
          {practical.bookingNotes && (
            <div className="border-b border-sand-line py-4">
              <dt className="text-xs font-semibold tracking-[0.14em] text-muted uppercase">Booking</dt>
              <dd className="mt-1">{practical.bookingNotes}</dd>
            </div>
          )}
        </dl>
      ) : (
        <div className="mt-5 space-y-4 leading-relaxed text-charcoal/80">
          <p>
            Timing, pricing, meeting point and what is included are confirmed with you directly when you send an
            enquiry, so you have accurate details for your date and group.
          </p>
        </div>
      )}

      <Link
        href={bookingHref}
        className="mt-7 inline-flex min-h-12 w-full items-center justify-center bg-charcoal px-5 text-sm font-semibold text-white transition-colors hover:bg-orange hover:text-charcoal"
      >
        Request details and availability
      </Link>
    </aside>
  );
}
