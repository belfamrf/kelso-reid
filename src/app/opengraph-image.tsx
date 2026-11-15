import { ImageResponse } from "next/og";
import { loadDisplayFont } from "@/lib/og-font";

export const alt =
  "Kelso & Reid, a concept renovation contractor in Melbourne: the whole job, on paper.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const font = await loadDisplayFont();
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f4efe6",
          color: "#191714",
          padding: "64px 72px",
          fontFamily: font ? "Newsreader" : undefined,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 26,
            letterSpacing: "0.08em",
            color: "#5c564d",
          }}
        >
          <span>KELSO &amp; REID</span>
          <span style={{ color: "#a63a1f" }}>MELBOURNE</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", fontSize: 96, lineHeight: 1 }}>
          <span>The whole job,</span>
          <span>
            on paper<span style={{ color: "#a63a1f" }}>.</span>
          </span>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 22,
            letterSpacing: "0.08em",
            color: "#5c564d",
          }}
        >
          <span>RENOVATION CONTRACTOR</span>
          <span>CONCEPT PROJECT</span>
        </div>
      </div>
    ),
    {
      ...size,
      ...(font
        ? { fonts: [{ name: "Newsreader", data: font, weight: 500 as const, style: "normal" as const }] }
        : {}),
    },
  );
}
