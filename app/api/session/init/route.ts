import { NextRequest, NextResponse } from "next/server";
import { createSession, upsertUser } from "@/lib/store";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const fid = Number(body?.fid);

    if (!Number.isFinite(fid)) {
      return NextResponse.json({ error: "Invalid fid" }, { status: 400 });
    }

    const user = await upsertUser({
      fid,
      username: typeof body?.username === "string" ? body.username : undefined,
      displayName: typeof body?.displayName === "string" ? body.displayName : undefined,
      pfpUrl: typeof body?.pfpUrl === "string" ? body.pfpUrl : undefined,
      bio: typeof body?.bio === "string" ? body.bio : undefined
    });

    const session = await createSession(user.fid);
    const response = NextResponse.json({ user, sessionId: session.id });

    response.cookies.set("ts_session", session.id, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 30
    });

    return response;
  } catch {
    return NextResponse.json({ error: "Failed to initialize session" }, { status: 500 });
  }
}
