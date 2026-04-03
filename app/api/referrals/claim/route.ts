import { NextRequest, NextResponse } from "next/server";
import { claimReferral } from "@/lib/store";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const referrerFid = Number(body?.referrerFid);
    const referredFid = Number(body?.referredFid);

    if (!Number.isFinite(referrerFid) || !Number.isFinite(referredFid)) {
      return NextResponse.json({ error: "Invalid referral payload" }, { status: 400 });
    }

    const result = await claimReferral(referrerFid, {
      fid: referredFid,
      username: typeof body?.username === "string" ? body.username : undefined,
      displayName: typeof body?.displayName === "string" ? body.displayName : undefined,
      pfpUrl: typeof body?.pfpUrl === "string" ? body.pfpUrl : undefined
    });

    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: "Failed to claim referral" }, { status: 500 });
  }
}
