import { NextRequest, NextResponse } from "next/server";
import { getUserBySession } from "@/lib/store";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const sessionId = request.cookies.get("ts_session")?.value;
  if (!sessionId) {
    return NextResponse.json({ error: "No active session" }, { status: 401 });
  }

  const user = await getUserBySession(sessionId);
  if (!user) {
    return NextResponse.json({ error: "Invalid session" }, { status: 401 });
  }

  return NextResponse.json({ ok: true, user });
}
