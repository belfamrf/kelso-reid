"use client";

import { useId, useState } from "react";

type Row = {
  label: string;
  cheapest: string;
  ours: string;
  omitted: boolean;
};

const ROWS: Row[] = [
  { label: "Waste removal", cheapest: "Not stated", ours: "Listed, with the skip on site", omitted: true },
  { label: "Permits and inspections", cheapest: "Not stated", ours: "Listed, with who lodges them", omitted: true },
  {
    label: "Floor and furniture protection",
    cheapest: "Not stated",
    ours: "Included before demolition starts",
    omitted: true,
  },
  { label: "Start and finish dates", cheapest: "A start date", ours: "Both dates, and what can move them", omitted: false },
  { label: "Payment schedule", cheapest: "Deposit on signing", ours: "Staged against completed work", omitted: false },
  { label: "Who is on site each day", cheapest: "Not stated", ours: "One named person, on site", omitted: true },
  {
    label: "Material allowances",
    cheapest: "One lump sum",
    ours: "An allowance per item, and the choice in writing",
    omitted: false,
  },
  {
    label: "When something unexpected is found",
    cheapest: "Not stated",
    ours: "Work pauses, a written variation, your approval",
    omitted: true,
  },
];

const OMITTED = ROWS.filter((row) => row.omitted).length;

export function QuoteComparison() {
  const [show, setShow] = useState<"a" | "b">("b");
  const captionId = useId();

  const summary =
    show === "b"
      ? `Showing our quote. ${OMITTED} items are not stated in the cheapest quote.`
      : `Showing the cheapest quote. ${OMITTED} items are not stated in it.`;

  return (
    <div data-show={show}>
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-4">
        <p className="label text-ink-soft">Illustrated comparison</p>
        <div role="group" aria-label="Which quote to show" className="flex border border-ink">
          <button
            type="button"
            aria-pressed={show === "a"}
            onClick={() => setShow("a")}
            className={`min-h-11 px-4 text-sm font-semibold transition-colors ${
              show === "a" ? "bg-ink text-paper" : "bg-transparent text-ink hover:bg-paper-deep"
            }`}
          >
            The cheapest quote
          </button>
          <button
            type="button"
            aria-pressed={show === "b"}
            onClick={() => setShow("b")}
            className={`min-h-11 border-l border-ink px-4 text-sm font-semibold transition-colors ${
              show === "b" ? "bg-ink text-paper" : "bg-transparent text-ink hover:bg-paper-deep"
            }`}
          >
            Our quote
          </button>
        </div>
      </div>

      <p aria-live="polite" className="sr-only">
        {summary}
      </p>

      {/* Desktop: one real table, both columns visible, the chosen one is highlighted. */}
      <table className="mt-6 hidden w-full border-collapse text-left md:table" aria-labelledby={captionId}>
        <caption id={captionId} className="sr-only">
          Items that appear in a short quote and in ours
        </caption>
        <thead>
          <tr className="border-b border-line">
            <th scope="col" className="label w-[34%] py-3 pr-4 font-semibold text-ink-soft">
              Item
            </th>
            <th
              scope="col"
              data-column="a"
              className={`label w-[30%] py-3 pr-4 font-semibold ${
                show === "a" ? "border-t-2 border-brick bg-paper-deep text-ink" : "text-ink-soft"
              }`}
            >
              The cheapest quote
            </th>
            <th
              scope="col"
              data-column="b"
              className={`label w-[36%] py-3 pl-4 font-semibold ${
                show === "b" ? "border-t-2 border-brick bg-paper-deep text-ink" : "text-ink-soft"
              }`}
            >
              Our quote
            </th>
          </tr>
        </thead>
        <tbody>
          {ROWS.map((row) => (
            <tr key={row.label} className="border-b border-line align-top">
              <th scope="row" className="py-4 pr-4 text-[0.9375rem] font-semibold text-ink">
                {row.label}
              </th>
              <td
                data-column="a"
                className={`py-4 pr-4 text-[0.9375rem] ${show === "a" ? "bg-paper-deep" : ""} ${
                  row.omitted ? "text-ink-soft" : "text-ink"
                }`}
              >
                <span className={row.omitted ? "strike inline-block" : "inline-block"}>{row.cheapest}</span>
              </td>
              <td
                data-column="b"
                className={`py-4 pl-4 text-[0.9375rem] text-ink ${show === "b" ? "bg-paper-deep" : ""}`}
              >
                <span aria-hidden className="mr-2 text-check">
                  ✓
                </span>
                {row.ours}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Mobile: one column at a time, same data, same words. */}
      <div className="mt-6 md:hidden">
        <dl hidden={show !== "a"} aria-label="The cheapest quote">
          {ROWS.map((row) => (
            <div key={row.label} className="border-b border-line py-4">
              <dt className="font-semibold text-ink">{row.label}</dt>
              <dd className={`mt-1 ${row.omitted ? "text-ink-soft" : "text-ink"}`}>
                <span className={row.omitted ? "strike strike-on inline-block" : "inline-block"}>
                  {row.cheapest}
                </span>
              </dd>
            </div>
          ))}
        </dl>

        <dl hidden={show !== "b"} aria-label="Our quote">
          {ROWS.map((row) => (
            <div key={row.label} className="border-b border-line py-4">
              <dt className="font-semibold text-ink">{row.label}</dt>
              <dd className="mt-1 text-ink">
                <span aria-hidden className="mr-2 text-check">
                  ✓
                </span>
                {row.ours}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <p className="mt-6 bg-paper-deep px-4 py-3 text-sm text-ink-soft">
        Illustration only. This is not a real quote, and not a claim about any other
        contractor.
      </p>
    </div>
  );
}
