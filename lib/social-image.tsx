import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const socialSize = { width: 1200, height: 630 };

export async function socialImage(name: string, subtitle: string) {
  const [sans, mono] = await Promise.all([
    readFile(join(process.cwd(), "assets/fonts/geist-social.ttf")),
    readFile(join(process.cwd(), "assets/fonts/geist-mono-og.ttf")),
  ]);

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "80px 84px",
        position: "relative",
        background: "#111820",
        color: "#f4f5f7",
      }}
    >
      <div
        style={{
          fontFamily: "Geist Mono",
          fontSize: 21,
          letterSpacing: "0.05em",
          color: "#c5f779",
          marginBottom: 18,
          maxWidth: 880,
        }}
      >
        {subtitle}
      </div>
      <div
        style={{ fontFamily: "Geist", fontSize: 84, letterSpacing: "-0.05em" }}
      >
        {name}
      </div>
      <svg
        viewBox="0 0 1020 94"
        width="1020"
        height="94"
        style={{ position: "absolute", left: 85, bottom: 51 }}
      >
        <path
          d="M8 65H520V26H1007M350 65V91H845"
          fill="none"
          stroke="#7d8ea5"
          strokeWidth="2"
        />
        <path d="M8 65H285" fill="none" stroke="#c5f779" strokeWidth="2" />
        <circle cx="8" cy="65" r="6" fill="#c5f779" />
        <circle cx="520" cy="26" r="6" fill="#c5f779" />
        <circle cx="1007" cy="26" r="6" fill="#c5f779" />
      </svg>
    </div>,
    {
      ...socialSize,
      fonts: [
        { name: "Geist", data: sans },
        { name: "Geist Mono", data: mono },
      ],
    },
  );
}
