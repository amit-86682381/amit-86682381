import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const alt = site.name;
export const size = { width: 1200, height: 630 };
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
          justifyContent: "center",
          padding: 80,
          background: "linear-gradient(135deg, #050b1a 0%, #0f2547 100%)",
          color: "#fff",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 26, color: "#9aa3ae", letterSpacing: 6 }}>
          <div style={{ width: 48, height: 2, background: "#f26b1d" }} />
          <div>CIVIL ENGINEERING · INFRASTRUCTURE</div>
        </div>
        <div style={{ marginTop: 32, fontSize: 76, fontWeight: 600, lineHeight: 1.08 }}>Building Infrastructure.</div>
        <div style={{ fontSize: 76, fontWeight: 600, lineHeight: 1.08, color: "#f26b1d" }}>Connecting Tomorrow.</div>
        <div style={{ marginTop: 40, fontSize: 28, color: "#9aa3ae" }}>{`${site.name} · Ranchi, Jharkhand`}</div>
      </div>
    ),
    size,
  );
}
