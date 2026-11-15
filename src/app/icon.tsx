import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f4efe6",
          color: "#191714",
          border: "6px solid #191714",
          fontSize: 40,
          fontWeight: 700,
          fontFamily: "Georgia, serif",
        }}
      >
        K
      </div>
    ),
    { ...size },
  );
}
