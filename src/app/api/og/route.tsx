import { ImageResponse } from "next/og";

export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") ?? "NARTDI LMS";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 72,
          fontWeight: 700,
          background: "#0a0a0a",
          color: "#ffffff",
        }}
      >
        {title}
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
