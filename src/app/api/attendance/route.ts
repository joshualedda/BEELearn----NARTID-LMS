import { NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/app/courses/lms-actions";

export async function POST(request: NextRequest) {
  if (request.headers.get("origin") !== request.nextUrl.origin) return new NextResponse(null, { status: 403 });
  const body: unknown = await request.json().catch(() => null);
  if (!body || typeof body !== "object" || !("sessionId" in body) || !("duration" in body) ||
    typeof body.sessionId !== "string" || typeof body.duration !== "number") return new NextResponse(null, { status: 400 });
  await updateSession(body.sessionId, body.duration);
  return NextResponse.json({ ok: true });
}
