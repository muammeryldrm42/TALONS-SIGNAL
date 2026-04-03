import { Sparkline } from "@/components/sparkline";
import { SignalCardData } from "@/lib/types";
import { cn, formatSignedPercent } from "@/lib/utils";

const toneStyles = {
  up: "bg-[linear-gradient(180deg,rgba(20,143,122,0.95),rgba(11,83,77,0.92))]",
  down: "bg-[linear-gradient(180deg,rgba(143,53,85,0.95),rgba(95,27,52,0.92))]",
  neutral: "bg-[linear-gradient(180deg,rgba(22,31,54,0.95),rgba(16,24,44,0.92))]"
};

const sizeStyles = {
  lg: "col-span-2 min-h-[178px]",
  md: "col-span-1 min-h-[152px]",
  sm: "col-span-1 min-h-[140px]"
};

export function SignalCard({ item }: { item: SignalCardData }) {
  return (
    <article className={cn("signal-card p-4", toneStyles[item.tone], sizeStyles[item.size ?? "md"])}>
      <div className="relative z-10 flex h-full flex-col">
        <div className="flex items-start gap-3">
          <img src={item.avatar} alt={item.name} className="h-10 w-10 rounded-full border border-white/15 bg-white/10" />
          <div className="min-w-0">
            <div className="truncate text-2xl font-semibold leading-none tracking-tight">{item.name}</div>
            <div className="mt-1 text-xl font-medium text-white/95">{formatSignedPercent(item.change)}</div>
          </div>
        </div>

        {item.badge ? (
          <div className="mt-3 inline-flex w-fit rounded-full border border-white/15 bg-purple/90 px-3 py-1 text-xs font-semibold tracking-[0.18em] text-white">
            {item.badge}
          </div>
        ) : null}

        <div className="mt-auto pt-5">
          <Sparkline values={item.sparkline} />
        </div>
      </div>
    </article>
  );
}
