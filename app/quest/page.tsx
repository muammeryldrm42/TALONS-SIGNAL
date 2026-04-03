"use client";

import { AppShell } from "@/components/app-shell";
import { ProfileStat } from "@/components/profile-stat";
import { QuestCard } from "@/components/quest-card";
import { SectionTitle } from "@/components/section-title";
import { useAppUser } from "@/components/user-provider";
import { buildReferralQuest } from "@/lib/mock-data";

export default function QuestPage() {
  const { user, shareUrl, claimStatus } = useAppUser();
  const quest = buildReferralQuest(user.referrals);

  const handleShare = async () => {
    if (!shareUrl) {
      return;
    }

    const text = `Join me on Talons Signal. Use my referral link: ${shareUrl}`;

    if (navigator.share) {
      await navigator.share({ title: "Talons Signal", text, url: shareUrl });
      return;
    }

    await navigator.clipboard.writeText(shareUrl);
    window.alert("Referral link copied.");
  };

  return (
    <AppShell title="Quest" subtitle="Referral quest is active. More tasks can be added later.">
      <section className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <ProfileStat label="Total TS" value={`${user.tsPoints} TS`} />
          <ProfileStat label="Referrals" value={`${user.referrals}`} />
        </div>

        {claimStatus ? (
          <div className="rounded-2xl border border-purple/30 bg-purple/10 px-4 py-3 text-sm text-purple">
            {claimStatus}
          </div>
        ) : null}

        <QuestCard quest={quest} shareUrl={shareUrl} onShare={handleShare} />

        <section>
          <SectionTitle title="How it works" />
          <div className="space-y-3">
            {[
              "Open Talons Signal inside Farcaster.",
              "Copy or share your referral link.",
              "Each unique referral credits 10 TS to your profile."
            ].map((item) => (
              <div key={item} className="panel rounded-3xl px-4 py-4 text-sm text-white/85">
                {item}
              </div>
            ))}
          </div>
        </section>
      </section>
    </AppShell>
  );
}
