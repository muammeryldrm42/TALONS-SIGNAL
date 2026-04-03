"use client";

import { AppShell } from "@/components/app-shell";
import { ProfileStat } from "@/components/profile-stat";
import { SectionTitle } from "@/components/section-title";
import { useAppUser } from "@/components/user-provider";

export default function ProfilePage() {
  const { user, isMiniApp, activity } = useAppUser();

  return (
    <AppShell title="Profile" subtitle="Your Talons Signal account is filled automatically when opened in Farcaster.">
      <section className="space-y-4">
        <div className="panel rounded-[30px] p-5">
          <div className="flex items-center gap-4">
            <img
              src={user.pfpUrl}
              alt={user.displayName}
              className="h-20 w-20 rounded-full border border-white/10 bg-white/5"
            />
            <div>
              <div className="text-2xl font-semibold tracking-tight">{user.displayName}</div>
              <div className="mt-1 text-white/75">@{user.username}</div>
              <div className="mt-2 text-xs uppercase tracking-[0.2em] text-purple">
                {isMiniApp ? `FID ${user.fid}` : "Preview mode"}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <ProfileStat label="TS" value={`${user.tsPoints}`} />
          <ProfileStat label="Streak" value={`${user.streak}d`} />
          <ProfileStat label="Refs" value={`${user.referrals}`} />
        </div>

        <section>
          <SectionTitle title="Recent activity" />
          <div className="space-y-3">
            {activity.length ? (
              activity.map((item) => (
                <div key={item.id} className="panel flex items-center justify-between rounded-3xl px-4 py-4">
                  <div>
                    <div className="font-medium">{item.label}</div>
                    <div className="text-sm text-fade">{item.meta}</div>
                  </div>
                  <div className="font-semibold text-purple">{item.value}</div>
                </div>
              ))
            ) : (
              <div className="panel rounded-3xl px-4 py-4 text-sm text-fade">No activity yet.</div>
            )}
          </div>
        </section>
      </section>
    </AppShell>
  );
}
