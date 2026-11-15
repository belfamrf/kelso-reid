import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Photo credits: Kelso & Reid",
  description:
    "Photographers, licences and changes for the photographs used on the Kelso & Reid concept site.",
  alternates: { canonical: "/credits" },
};

const PHOTOS = [
  {
    file: "room-mid-renovation.jpg",
    title: "McBride Commons renovations, progress continues",
    photographer: "Kemberly Groue, United States Air Force",
    licence: "Public domain",
    licenceUrl: "https://commons.wikimedia.org/wiki/Commons:Copyright_tags",
    source:
      "https://commons.wikimedia.org/wiki/File:McBride_Commons_renovations,_progress_continues_170106-F-BD983-014.jpg",
    used: "A room in the middle of a renovation.",
  },
  {
    file: "lath-plaster.jpg",
    title: "Lathe and plaster 2",
    photographer: "BrittaniaJones",
    licence: "CC BY-SA 4.0",
    licenceUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    source: "https://commons.wikimedia.org/wiki/File:Lathe_and_plaster_2.jpg",
    used: "Old lath and plaster, exposed.",
  },
  {
    file: "kitchen-floor.jpg",
    title: "Kitchen renovation, flooring in progress",
    photographer: "Tomwsulcer",
    licence: "CC0",
    licenceUrl: "https://creativecommons.org/publicdomain/zero/1.0/",
    source:
      "https://commons.wikimedia.org/wiki/File:Kitchen_renovation_9a_flooring_in_progress_with_flat_washed_b%26w_tile_about_to_be_covered_over.JPG",
    used: "Flooring going down over a prepared subfloor.",
  },
];

export default function Credits() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-[900px] flex-1 px-4 py-14 sm:px-10">
        <p className="label text-ink-soft">Credits</p>
        <h1 className="mt-5 text-[clamp(2.5rem,7vw,4.25rem)] leading-[1.02] text-ink">
          Photographs and licences
        </h1>
        <p className="mt-6 max-w-[64ch] text-lg leading-relaxed text-ink-soft">
          Kelso &amp; Reid is a concept project. The photographs below are of real places
          that have no connection to this fictional business. Each one has been resized,
          desaturated and recompressed for the web.
        </p>

        <ul className="mt-12 space-y-10">
          {PHOTOS.map((photo) => (
            <li key={photo.file} className="border-t border-line pt-6">
              <h2 className="text-xl font-semibold text-ink">{photo.title}</h2>
              <dl className="mt-4 grid gap-2 text-sm sm:grid-cols-[10rem_1fr] sm:gap-4">
                <dt className="label text-ink-soft">Photographer</dt>
                <dd className="text-ink">{photo.photographer}</dd>

                <dt className="label text-ink-soft">Licence</dt>
                <dd className="text-ink">
                  <a
                    href={photo.licenceUrl}
                    className="underline decoration-line underline-offset-4 hover:decoration-brick"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {photo.licence}
                  </a>
                </dd>

                <dt className="label text-ink-soft">Source</dt>
                <dd className="text-ink">
                  <a
                    href={photo.source}
                    className="break-words underline decoration-line underline-offset-4 hover:decoration-brick"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Wikimedia Commons
                  </a>
                </dd>

                <dt className="label text-ink-soft">Used for</dt>
                <dd className="text-ink-soft">{photo.used}</dd>

                <dt className="label text-ink-soft">Changes</dt>
                <dd className="text-ink-soft">Resized, desaturated, recompressed.</dd>
              </dl>
            </li>
          ))}
        </ul>

        <p className="mt-12 text-sm text-ink-soft">
          <Link href="/" className="text-ink underline decoration-line underline-offset-4 hover:decoration-brick">
            Back to the site
          </Link>
        </p>
      </main>
      <SiteFooter />
    </>
  );
}
