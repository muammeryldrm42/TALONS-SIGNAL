import { NextRequest, NextResponse } from "next/server";
import { getUser, getUserBySession } from "@/lib/store";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const sessionId = request.cookies.get("ts_session")?.value;
  if (sessionId) {
    const sessionUser = await getUserBySession(sessionId);
    if (sessionUser) {
      return NextResponse.json({ user: sessionUser, activity: sessionUser.activity });
    }
  }

  const { searchParams } = new URL(request.url);
  const fid = Number(searchParams.get("fid"));

  if (!Number.isFinite(fid)) {
    return NextResponse.json({ error: "No active session" }, { status: 401 });
  }

  const user = await getUser(fid);
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json({ user, activity: user.activity });
}
