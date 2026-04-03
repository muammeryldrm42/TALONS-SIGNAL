"use client";

import type { ReactNode } from "react";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { AppState, ActivityItem, User } from "@/lib/types";

const browserPreviewUser: User = {
  fid: 778812,
  username: "preview",
  displayName: "Browser Preview",
  pfpUrl: "https://api.dicebear.com/7.x/adventurer/svg?seed=Preview",
  tsPoints: 0,
  referrals: 0,
  streak: 0,
  referralCode: "778812"
};

const AppUserContext = createContext<AppState>({
  user: browserPreviewUser,
  activity: [],
  loading: true,
  isMiniApp: false,
  shareUrl: "",
  claimStatus: null,
  refresh: async () => {}
});

async function postJson<T>(url: string, body: unknown): Promise<T> {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

async function getJson<T>(url: string): Promise<T> {
  const response = await fetch(url, { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }
  return response.json() as Promise<T>;
}

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(browserPreviewUser);
  const [activity, setActivity] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isMiniApp, setIsMiniApp] = useState(false);
  const [claimStatus, setClaimStatus] = useState<string | null>(null);
  const [shareUrl, setShareUrl] = useState("");

  const refresh = async () => {
    const data = await getJson<{ user: User; activity: ActivityItem[] }>("/api/profile/me");
    setUser(data.user);
    setActivity(data.activity);
    setShareUrl(`${window.location.origin}/?ref=${data.user.referralCode}`);
  };

  useEffect(() => {
    let cancelled = false;

    async function init() {
      try {
        let initialUser = browserPreviewUser;
        let mini = false;

        try {
          const mod = await import("@farcaster/miniapp-sdk");
          const sdk = mod.sdk;
          const contextUser = sdk.context?.user;

          if (contextUser?.fid) {
            mini = true;
            initialUser = {
              fid: contextUser.fid,
              username: contextUser.username ?? `fid${contextUser.fid}`,
              displayName: contextUser.displayName ?? contextUser.username ?? `FID ${contextUser.fid}`,
              pfpUrl: contextUser.pfpUrl ?? browserPreviewUser.pfpUrl,
              tsPoints: 0,
              referrals: 0,
              streak: 0,
              referralCode: String(contextUser.fid)
            };
          }

          if (sdk.actions?.ready) {
            sdk.actions.ready();
          }
        } catch {
          mini = false;
        }

        const session = await postJson<{ user: User }>("/api/session/init", initialUser);

        if (cancelled) {
          return;
        }

        setUser(session.user);
        setIsMiniApp(mini);
        setShareUrl(`${window.location.origin}/?ref=${session.user.referralCode}`);

        const params = new URLSearchParams(window.location.search);
        const referralCode = params.get("ref");
        const referrerFid = referralCode ? Number(referralCode) : NaN;

        if (Number.isFinite(referrerFid) && referrerFid !== session.user.fid) {
          const localClaimKey = `ts-ref-claim:${referrerFid}:${session.user.fid}`;
          const hasLocalClaim = window.localStorage.getItem(localClaimKey) === "1";

          if (!hasLocalClaim) {
            const claim = await postJson<{ ok?: boolean; reason?: string }>("/api/referrals/claim", {
              referrerFid,
              referredFid: session.user.fid,
              username: session.user.username,
              displayName: session.user.displayName,
              pfpUrl: session.user.pfpUrl
            });

            if (claim.ok) {
              window.localStorage.setItem(localClaimKey, "1");
              setClaimStatus("Referral linked successfully.");
            } else if (claim.reason === "already_claimed") {
              setClaimStatus("Referral was already counted.");
            } else if (claim.reason === "self_referral") {
              setClaimStatus("Your own link cannot credit yourself.");
            }
          }
        }

        await refresh();
      } catch {
        if (!cancelled) {
          setClaimStatus("Session could not be initialized.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void init();

    return () => {
      cancelled = true;
    };
  }, []);

  const value = useMemo<AppState>(
    () => ({
      user,
      activity,
      loading,
      isMiniApp,
      shareUrl,
      claimStatus,
      refresh
    }),
    [activity, claimStatus, isMiniApp, loading, shareUrl, user]
  );

  return <AppUserContext.Provider value={value}>{children}</AppUserContext.Provider>;
}

export function useAppUser() {
  return useContext(AppUserContext);
}
