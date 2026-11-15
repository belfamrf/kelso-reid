import Image from "next/image";
import Link from "next/link";
import { QuoteComparison } from "@/components/quote-comparison";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SiteVisitForm } from "@/components/site-visit-form";

const SCOPES = [
  {
    name: "Kitchens",
    body: "Layout, joinery and services in one scope. The order of the trades matters more than the finish.",
  },
  {
    name: "Bathrooms",
    body: "Waterproofing, drainage and ventilation come first. Tiles are the last decision, not the first.",
  },
  {
    name: "Extensions",
    body: "Structure, roof, glazing and the join to the existing house. Permits are part of the plan, not an afterthought.",
  },
  {
    name: "Whole houses",
    body: "One schedule across every room, so the house is finished in one run instead of three.",
  },
];

const STAGES = [
  {
    step: "01",
    name: "Site visit",
    body: "We walk the house with you, look at access and services, and write down what you want to keep.",
  },
  {
    step: "02",
    name: "Written scope and quote",
    body: "Every line from the comparison above appears in your quote. You see the exclusions before you decide.",
  },
  {
    step: "03",
    name: "Build",
    body: "One named person on site each day, and a short weekly note on what was done and what comes next.",
  },
  {
    step: "04",
    name: "Handover",
    body: "A walkthrough, a list of defects with dates, and the certificates and manuals in one folder.",
  },
];

const WRITTEN = [
  "Waste removal, with the skip and the tip fees named.",
  "Permits and inspections, and who lodges them.",
  "Floor and furniture protection before demolition starts.",
  "Start and finish dates, and the things that can move them.",
  "A payment schedule tied to completed stages, not to dates.",
  "What happens when something unexpected is found.",
];

const QUESTIONS = [
  {
    q: "Do you quote before or after a site visit?",
    a: "After. A quote written from photographs is a guess, and guesses turn into variations.",
  },
  {
    q: "Can we keep living in the house during the work?",
    a: "Usually for part of it. It depends on the scope, and we say so at the visit rather than in week two.",
  },
  {
    q: "Do you work with our own designer or architect?",
    a: "Yes. We ask for the drawings and specifications, then list what is missing before we price anything.",
  },
  {
    q: "What if we change our mind mid-build?",
    a: "It becomes a written variation with a price and a time effect. Work on that item waits for your approval.",
  },
  {
    q: "How long does a quote take to prepare?",
    a: "Long enough to price it properly. We tell you the date we will send it, and we send it on that date.",
  },
  {
    q: "Is Kelso & Reid a real business?",
    a: "No. This site is a concept project for a design portfolio. The business, the projects and the quotes are fictional.",
  },
];

function SectionHead({ n, title, id }: { n: string; title: string; id?: string }) {
  return (
    <div className="mb-8 flex items-baseline gap-4 border-b border-line pb-4">
      <p className="label text-ink-soft" aria-hidden>
        {n}
      </p>
      <h2 id={id} className="text-[clamp(2.25rem,5vw,3.5rem)] leading-[1.05] text-ink">
        {title}
      </h2>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-ink focus:px-4 focus:py-3 focus:text-paper"
      >
        Skip to content
      </a>

      <SiteHeader />

      <main id="main" className="flex-1">
        <section aria-labelledby="hero-title" className="mx-auto w-full max-w-[1200px] px-4 pb-16 pt-14 sm:px-10 lg:pt-20">
          <p className="label text-ink-soft">Renovation contractor, Melbourne</p>
          <h1
            id="hero-title"
            className="mt-5 max-w-[12ch] text-[clamp(3rem,9vw,6rem)] leading-[0.98] text-ink"
          >
            The whole job, on paper.
          </h1>
          <p className="mt-8 max-w-[54ch] text-lg leading-relaxed text-ink-soft">
            You are comparing three quotes. The shortest one usually leaves the most out.
            This page shows what to look for, and how we write ours.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#site-visit"
              className="inline-flex min-h-12 items-center bg-brick px-6 font-semibold text-paper no-underline transition-colors hover:bg-ink"
            >
              Request a site visit
            </a>
            <a
              href="#in-writing"
              className="inline-flex min-h-12 items-center border border-ink px-6 font-semibold text-ink no-underline transition-colors hover:bg-ink hover:text-paper"
            >
              See what we put in writing
            </a>
          </div>
        </section>

        <section aria-labelledby="quotes-title" className="mx-auto w-full max-w-[1200px] px-4 pb-24 sm:px-10">
          <div data-motion>
            <SectionHead n="01" title="Three quotes, read properly" id="quotes-title" />
          </div>
          <div data-motion className="mb-8 max-w-[62ch]">
            <p className="text-lg leading-relaxed text-ink-soft">
              The cheapest quote is often the shortest one. That is not a coincidence. Ask
              every contractor the same eight questions, then compare the answers rather
              than the totals.
            </p>
          </div>
          <div data-motion>
            <QuoteComparison />
          </div>
        </section>

        <section aria-labelledby="scope-title" className="border-t border-line">
          <div className="mx-auto w-full max-w-[1200px] px-4 py-24 sm:px-10">
            <div data-motion>
              <SectionHead n="02" title="What we renovate" id="scope-title" />
            </div>
            <ul className="divide-y divide-line border-y border-line">
              {SCOPES.map((scope) => (
                <li key={scope.name} data-motion className="group grid gap-2 py-6 sm:grid-cols-[18rem_1fr] sm:gap-10">
                  <h3 className="font-display text-2xl leading-tight text-ink transition-colors group-hover:text-brick">
                    {scope.name}
                  </h3>
                  <p className="text-ink-soft">{scope.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section aria-labelledby="how-title" id="how-it-runs" className="border-t border-line">
          <div className="mx-auto w-full max-w-[1200px] px-4 py-24 sm:px-10">
            <div data-motion>
              <SectionHead n="03" title="How the job runs" id="how-title" />
            </div>
            <ol className="grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
              {STAGES.map((stage) => (
                <li key={stage.step} data-motion className="bg-paper p-6">
                  <p className="label text-brick">{stage.step}</p>
                  <h3 className="mt-3 text-lg font-semibold text-ink">{stage.name}</h3>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-soft">{stage.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section aria-labelledby="written-title" id="in-writing" className="border-t border-line">
          <div className="mx-auto w-full max-w-[1200px] px-4 py-24 sm:px-10">
            <div data-motion>
              <SectionHead n="04" title="What we put in writing" id="written-title" />
            </div>
            <div className="grid gap-8 md:grid-cols-[1fr_20rem] md:gap-16">
              <ul className="grid gap-4 sm:grid-cols-2">
                {WRITTEN.map((item) => (
                  <li key={item} data-motion className="flex gap-3 border-t border-line pt-4">
                    <span aria-hidden className="mt-1 text-check">
                      ✓
                    </span>
                    <span className="text-[0.9375rem] leading-relaxed text-ink">{item}</span>
                  </li>
                ))}
              </ul>
              <aside data-motion className="h-fit bg-paper-deep p-6">
                <p className="label text-ink-soft">The rule</p>
                <p className="mt-3 font-display text-2xl leading-snug text-ink">
                  If it is not written in the quote, it is not in the price.
                </p>
                <p className="mt-4 text-sm leading-relaxed text-ink-soft">
                  That applies to us as much as to anyone else. Anything left out is named
                  as an exclusion, not discovered later.
                </p>
              </aside>
            </div>
          </div>
        </section>

        <section aria-labelledby="work-title" id="work" className="border-t border-line">
          <div className="mx-auto w-full max-w-[1200px] px-4 py-24 sm:px-10">
            <div data-motion>
              <SectionHead n="05" title="Work" id="work-title" />
            </div>

            <figure data-motion>
              <Image
                src="/photos/room-mid-renovation.jpg"
                alt="A room mid-renovation, with exposed framing and a ladder standing against the wall."
                width={1800}
                height={1238}
                sizes="(min-width: 1280px) 1120px, (min-width: 640px) 90vw, 100vw"
                className="h-auto w-full border border-line"
              />
              <figcaption className="mt-3 text-sm text-ink-soft">
                A room in the middle of a renovation. Site photograph, not a finished project.
              </figcaption>
            </figure>

            <div className="mt-8 grid gap-8 sm:grid-cols-2">
              <figure data-motion>
                <Image
                  src="/photos/lath-plaster.jpg"
                  alt="Old lath and plaster exposed after a wall lining was removed."
                  width={1600}
                  height={1200}
                  sizes="(min-width: 640px) 45vw, 100vw"
                  className="h-auto w-full border border-line"
                />
                <figcaption className="mt-3 text-sm text-ink-soft">
                  Lath and plaster, exposed. This is where budgets move.
                </figcaption>
              </figure>

              <figure data-motion>
                <Image
                  src="/photos/kitchen-floor.jpg"
                  alt="Floor tiles being laid over a prepared subfloor in a kitchen."
                  width={648}
                  height={864}
                  sizes="(min-width: 640px) 45vw, 100vw"
                  className="h-auto w-full border border-line"
                />
                <figcaption className="mt-3 text-sm text-ink-soft">
                  Flooring going down over a prepared subfloor.
                </figcaption>
              </figure>
            </div>

            <p className="mt-8 max-w-[62ch] text-sm leading-relaxed text-ink-soft">
              Photographs are licensed stock. They show the kind of work, not our own
              projects. Photographers and licences are listed on the{" "}
              <Link href="/credits" className="text-ink underline decoration-line underline-offset-4 hover:decoration-brick">
                credits page
              </Link>
              .
            </p>
          </div>
        </section>

        <section aria-labelledby="faq-title" id="faq" className="border-t border-line">
          <div className="mx-auto w-full max-w-[1200px] px-4 py-24 sm:px-10">
            <div data-motion>
              <SectionHead n="06" title="Questions we are asked" id="faq-title" />
            </div>
            <div className="max-w-[70ch] divide-y divide-line border-y border-line">
              {QUESTIONS.map((item) => (
                <details key={item.q} data-motion className="group py-2">
                  <summary className="flex min-h-11 cursor-pointer items-center justify-between gap-4 py-3 text-[1.0625rem] font-semibold text-ink marker:content-none">
                    {item.q}
                    <span aria-hidden className="text-brick transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="pb-4 pr-8 text-ink-soft">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section aria-labelledby="visit-title" id="site-visit" className="border-t border-line">
          <div className="mx-auto w-full max-w-[1200px] px-4 py-24 sm:px-10">
            <div data-motion>
              <SectionHead n="07" title="Request a site visit" id="visit-title" />
            </div>
            <div className="grid gap-10 md:grid-cols-[1fr_20rem] md:gap-16">
              <div data-motion>
                <SiteVisitForm />
              </div>
              <aside data-motion className="h-fit">
                <p className="label text-ink-soft">What happens next</p>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-soft">
                  We reply with a time for the visit and a short list of what to have
                  ready: drawings if you have them, the rooms you want to change, and what
                  you want to keep.
                </p>
              </aside>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
