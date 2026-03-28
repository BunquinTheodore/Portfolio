import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px",
          background:
            "radial-gradient(circle at 20% 20%, #67e8f9 0%, #ffffff 45%, #e0f2fe 100%)",
          color: "#0f172a",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            border: "1px solid #0891b2",
            borderRadius: "9999px",
            padding: "10px 18px",
            fontSize: 24,
            color: "#0e7490",
          }}
        >
          Portfolio
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ fontSize: 70, fontWeight: 700, lineHeight: 1.05 }}>
            Theodore Bunquin
          </div>
          <div style={{ fontSize: 34, color: "#155e75" }}>
            Full Stack Developer and Data Analyst
          </div>
        </div>

        <div style={{ fontSize: 24, color: "#0f766e" }}>
          Open for internships, commissions, and client projects
        </div>
      </div>
    ),
    size,
  );
}
