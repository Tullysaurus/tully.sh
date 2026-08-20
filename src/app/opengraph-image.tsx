import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "96px",
          backgroundColor: "#0f191c",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, color: "#9fb0af" }}>
          <span style={{ color: "#7fb77e" }}>$&nbsp;</span>
          <span>whoami</span>
        </div>
        <div style={{ display: "flex", fontSize: 96, fontWeight: 700, color: "#ece8e0", marginTop: 28 }}>
          {site.name}
        </div>
        <div style={{ display: "flex", fontSize: 40, color: "#c79a45", marginTop: 20 }}>{site.role}</div>
      </div>
    ),
    { ...size },
  );
}
