import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-6 px-4 py-12 sm:px-10 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-display text-2xl text-ink">Kelso &amp; Reid</p>
          <p className="mt-2 max-w-[42ch] text-sm text-ink-soft">
            Renovations in Melbourne, written down before they start.
          </p>
        </div>

        <div className="flex flex-col gap-4 md:items-end">
          <Link href="/credits" className="text-sm text-ink-soft no-underline hover:text-ink">
            Photo credits
          </Link>
          <p className="rotate-[-3deg] border-2 border-brick px-3 py-1 label text-brick">
            Concept project
          </p>
        </div>
      </div>
    </footer>
  );
}
