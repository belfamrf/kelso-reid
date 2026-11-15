import Link from "next/link";
import { NAV } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="border-b border-line">
      <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between gap-6 px-4 py-4 sm:px-10">
        <Link
          href="/"
          className="font-display text-[1.375rem] leading-none text-ink no-underline"
        >
          Kelso &amp; Reid
        </Link>

        <nav aria-label="Sections" className="hidden items-center gap-7 md:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-ink-soft no-underline transition-colors hover:text-ink"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href="#site-visit"
          className="inline-flex min-h-11 items-center border border-ink px-4 text-sm font-semibold text-ink no-underline transition-colors hover:bg-ink hover:text-paper"
        >
          Request a site visit
        </a>
      </div>
    </header>
  );
}
