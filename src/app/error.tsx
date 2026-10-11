"use client";

import Link from "next/link";

export default function ErrorPage({ retry }: { error: Error & { digest?: string }; retry: () => void }) {
  return (
    <section className="grain bg-charcoal text-white">
      <div className="container-site py-24 sm:py-36">
        <p className="eyebrow mb-6 text-orange">Something went wrong</p>
        <h1 className="text-headline max-w-3xl font-semibold">We could not load this page</h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-inverse">
          A temporary problem stopped this page from loading. Please try again, or return to the homepage.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={retry}
            className="inline-flex min-h-12 items-center justify-center bg-orange px-6 text-sm font-semibold text-charcoal hover:bg-orange-bright"
          >
            Try again
          </button>
          <Link
            href="/"
            className="inline-flex min-h-12 items-center justify-center border border-white/40 px-6 text-sm font-semibold hover:bg-white hover:text-charcoal"
          >
            Back to the homepage
          </Link>
        </div>
      </div>
    </section>
  );
}
