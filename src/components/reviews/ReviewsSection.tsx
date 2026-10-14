import { QuoteIcon } from "@/components/ui/icons";
import { reviewSource, type GuestReview } from "@/content/reviews";
import { ReviewsMarquee } from "./ReviewsMarquee";

/** Above this many reviews the cards scroll in a row instead of sitting in a grid. */
const MAX_GRID_REVIEWS = 3;

function ReviewCard({ review }: { review: GuestReview }) {
  return (
    <figure className="flex h-full flex-col border border-sand-line bg-white p-7 sm:p-8">
      <QuoteIcon className="size-7 text-orange" />
      <blockquote className="mt-5 flex-1 leading-relaxed text-charcoal/85">
        <p>{review.text}</p>
      </blockquote>
      <figcaption className="mt-7 flex items-center gap-4 border-t border-sand-line pt-5">
        <span
          aria-hidden="true"
          className="grid size-10 shrink-0 place-items-center bg-charcoal font-display text-sm font-semibold text-orange uppercase"
        >
          {review.author.charAt(0)}
        </span>
        <span>
          <span className="block font-semibold">{review.author}</span>
          <span className="block text-sm text-muted">
            {review.localGuide ? "Local Guide · " : ""}
            {reviewSource.name} review
          </span>
        </span>
      </figcaption>
    </figure>
  );
}

type ReviewsSectionProps = {
  reviews: GuestReview[];
  title: string;
  eyebrow?: string;
  intro?: string;
  className?: string;
};

export function ReviewsSection({ reviews, title, eyebrow = "Guest reviews", intro, className = "" }: ReviewsSectionProps) {
  if (reviews.length === 0) return null;
  const scrolling = reviews.length > MAX_GRID_REVIEWS;

  return (
    <section aria-labelledby="reviews-title" className={`py-20 sm:py-28 ${className}`}>
      <div className="container-site mb-12">
        <div className="max-w-2xl">
          <p className="eyebrow mb-4 text-orange-deep">{eyebrow}</p>
          <h2 id="reviews-title" className="text-headline font-semibold">
            {title}
          </h2>
          {intro && <p className="mt-6 text-lg leading-relaxed text-muted">{intro}</p>}
        </div>
      </div>
      {scrolling ? (
        <ReviewsMarquee
          items={reviews.map((review) => ({ key: review.author, node: <ReviewCard review={review} /> }))}
        />
      ) : (
        <div className="container-site">
          <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {reviews.map((review) => (
              <li key={review.author}>
                <ReviewCard review={review} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
