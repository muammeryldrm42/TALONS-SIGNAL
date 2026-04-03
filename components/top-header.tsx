"use client";

import { useAppUser } from "@/components/user-provider";
import { LogoMark } from "@/components/logo";

export function TopHeader() {
  const { user, isMiniApp, loading } = useAppUser();

  return (
    <header className="sticky top-0 z-20 border-b border-white/5 bg-[#0a0d16]/80 px-4 pb-4 pt-4 backdrop-blur-xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <LogoMark />
          <div>
            <div className="text-3xl font-semibold tracking-tight">Talons Signal</div>
            <div className="text-xs uppercase tracking-[0.24em] text-fade">
              {loading ? "Loading session" : isMiniApp ? "Farcaster account linked" : "Browser preview"}
            </div>
          </div>
        </div>
        <img
          src={user.pfpUrl}
          alt={user.displayName}
          className="h-14 w-14 rounded-full border border-white/10 bg-white/5 object-cover"
        />
      </div>
    </header>
  );
}
