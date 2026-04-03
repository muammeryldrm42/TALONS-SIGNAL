import { promises as fs } from "node:fs";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { ActivityItem, SessionRecord, StoredUser, StoreData, User } from "@/lib/types";

const STORE_PATH = path.join("/tmp", "talons-signal-store.json");

function nowIso() {
  return new Date().toISOString();
}

function makeActivity(label: string, value: string, meta = "just now"): ActivityItem {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    label,
    value,
    meta
  };
}

function avatarFor(seed: string) {
  return `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(seed)}`;
}

function createStoredUser(user: Partial<User> & Pick<User, "fid">): StoredUser {
  const username = user.username ?? `fid${user.fid}`;
  const displayName = user.displayName ?? username;
  const createdAt = nowIso();

  return {
    fid: user.fid,
    username,
    displayName,
    pfpUrl: user.pfpUrl ?? avatarFor(username),
    bio: user.bio,
    tsPoints: user.tsPoints ?? 0,
    referrals: user.referrals ?? 0,
    streak: user.streak ?? 0,
    referralCode: String(user.fid),
    createdAt,
    updatedAt: createdAt,
    activity: [makeActivity("Account ready", "0 TS", "session started")]
  };
}

async function ensureStoreFile() {
  try {
    await fs.access(STORE_PATH);
  } catch {
    const empty: StoreData = { users: {}, referrals: [], sessions: {} };
    await fs.writeFile(STORE_PATH, JSON.stringify(empty, null, 2), "utf8");
  }
}

async function normalizeStore(store: Partial<StoreData>): Promise<StoreData> {
  return {
    users: store.users ?? {},
    referrals: store.referrals ?? [],
    sessions: store.sessions ?? {}
  };
}

export async function readStore(): Promise<StoreData> {
  await ensureStoreFile();
  const raw = await fs.readFile(STORE_PATH, "utf8");
  const parsed = JSON.parse(raw) as Partial<StoreData>;
  return normalizeStore(parsed);
}

export async function writeStore(store: StoreData) {
  const tempPath = `${STORE_PATH}.tmp`;
  await fs.writeFile(tempPath, JSON.stringify(store, null, 2), "utf8");
  await fs.rename(tempPath, STORE_PATH);
}

export async function upsertUser(input: Partial<User> & Pick<User, "fid">): Promise<StoredUser> {
  const store = await readStore();
  const key = String(input.fid);
  const existing = store.users[key];

  const next = existing
    ? {
        ...existing,
        username: input.username ?? existing.username,
        displayName: input.displayName ?? existing.displayName,
        pfpUrl: input.pfpUrl ?? existing.pfpUrl,
        bio: input.bio ?? existing.bio,
        updatedAt: nowIso()
      }
    : createStoredUser(input);

  store.users[key] = next;
  await writeStore(store);
  return next;
}

export async function getUser(fid: number): Promise<StoredUser | null> {
  const store = await readStore();
  return store.users[String(fid)] ?? null;
}

export async function createSession(fid: number): Promise<SessionRecord> {
  const store = await readStore();
  const now = nowIso();
  const id = randomUUID();
  const record: SessionRecord = {
    id,
    fid,
    createdAt: now,
    updatedAt: now
  };

  store.sessions[id] = record;
  await writeStore(store);
  return record;
}

export async function getUserBySession(sessionId: string): Promise<StoredUser | null> {
  const store = await readStore();
  const session = store.sessions[sessionId];
  if (!session) {
    return null;
  }

  const user = store.users[String(session.fid)] ?? null;
  if (!user) {
    return null;
  }

  store.sessions[sessionId] = {
    ...session,
    updatedAt: nowIso()
  };
  await writeStore(store);
  return user;
}

export async function claimReferral(referrerFid: number, referred: Partial<User> & Pick<User, "fid">) {
  const store = await readStore();

  if (referrerFid === referred.fid) {
    return { ok: false as const, reason: "self_referral" };
  }

  const alreadyClaimed = store.referrals.some(
    (item) => item.referrerFid === referrerFid && item.referredFid === referred.fid
  );

  if (alreadyClaimed) {
    return { ok: false as const, reason: "already_claimed" };
  }

  const referrerKey = String(referrerFid);
  const referredKey = String(referred.fid);

  const referrer = store.users[referrerKey] ?? createStoredUser({ fid: referrerFid });
  const referredUser = store.users[referredKey] ?? createStoredUser(referred);

  referrer.tsPoints += 10;
  referrer.referrals += 1;
  referrer.updatedAt = nowIso();
  referrer.activity = [
    makeActivity("Referral completed", "+10 TS", "new referral"),
    ...referrer.activity
  ].slice(0, 12);

  referredUser.updatedAt = nowIso();
  referredUser.activity = [
    makeActivity("Joined from referral", "linked", "welcome"),
    ...referredUser.activity
  ].slice(0, 12);

  store.users[referrerKey] = referrer;
  store.users[referredKey] = referredUser;
  store.referrals.push({ referrerFid, referredFid: referred.fid, createdAt: nowIso() });

  await writeStore(store);
  return { ok: true as const, referrer, referredUser };
}
