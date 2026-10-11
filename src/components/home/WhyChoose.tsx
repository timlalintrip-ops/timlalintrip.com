import { valuePropositions } from "@/content/home";

export function WhyChoose() {
  return (
    <section aria-labelledby="why-title" className="grain bg-charcoal py-24 text-white sm:py-32">
      <div className="container-site grid gap-14 lg:grid-cols-[1fr_1.3fr] lg:gap-24">
        <div className="lg:sticky lg:top-[calc(var(--spacing-header)+3rem)] lg:self-start">
          <p className="eyebrow mb-4 text-orange">Why TimlalinTrip</p>
          <h2 id="why-title" className="text-headline font-semibold">
            Adventure planned around you, not a timetable
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-muted-inverse">
            We are building TimlalinTrip around a simple idea: a great day in the dunes starts with clear information
            and an honest conversation.
          </p>
        </div>
        <ol className="border-t border-charcoal-line">
          {valuePropositions.map((item, index) => (
            <li
              key={item.title}
              className="grid gap-4 border-b border-charcoal-line py-9 sm:grid-cols-[5rem_1fr] sm:gap-6"
            >
              <span aria-hidden="true" className="font-display text-4xl font-semibold text-orange">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-title font-semibold">{item.title}</h3>
                <p className="mt-3 leading-relaxed text-muted-inverse">{item.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
