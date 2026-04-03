"use client";

import { Share2, Sparkles } from "lucide-react";
import { Quest } from "@/lib/types";

export function QuestCard({
  quest,
  shareUrl,
  onShare
}: {
  quest: Quest;
  shareUrl: string;
  onShare: () => Promise<void>;
}) {
  const percent = Math.min(100, Math.round((quest.progress / quest.goal) * 100));

  return (
    <div className="panel purple-ring rounded-[28px] p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-purple/20 text-purple">
            <Share2 className="h-7 w-7" />
          </div>
          <div>
            <div className="text-xl font-semibold tracking-tight">{quest.title}</div>
            <div className="mt-1 text-sm text-fade">{quest.description}</div>
          </div>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full border border-purple/30 bg-purple/15 px-3 py-1 text-sm font-semibold text-purple">
          <Sparkles className="h-4 w-4" />
          {quest.rewardTs} TS
        </div>
      </div>

      <div className="mt-5">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="text-fade">Referral progress</span>
          <span>{quest.progress}/{quest.goal}</span>
        </div>
        <div className="h-3 rounded-full bg-white/8">
          <div className="h-3 rounded-full bg-gradient-to-r from-purple to-purple2" style={{ width: `${percent}%` }} />
        </div>
      </div>

      <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
        <div className="text-xs uppercase tracking-[0.2em] text-fade">Your referral link</div>
        <div className="mt-2 break-all text-sm text-white/90">{shareUrl || "Preparing link..."}</div>
      </div>

      <div className="mt-5 flex items-center justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-fade">Reward rule</div>
          <div className="mt-1 text-sm font-medium text-white">Every successful referral = 10 TS</div>
        </div>
        <button
          type="button"
          onClick={() => void onShare()}
          className="rounded-2xl bg-purple px-4 py-3 text-sm font-semibold text-white transition hover:bg-purple2"
        >
          Share link
        </button>
      </div>
    </div>
  );
}
