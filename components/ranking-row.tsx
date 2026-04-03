export function RankingRow({
  rank,
  name,
  handle,
  score,
  change,
  tag
}: {
  rank: number;
  name: string;
  handle: string;
  score: string;
  change: string;
  tag: string;
}) {
  return (
    <div className="panel flex items-center gap-4 rounded-3xl px-4 py-4">
      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/5 text-sm font-semibold text-white/90">
        {rank}
      </div>
      <div className="min-w-0 flex-1">
        <div className="truncate text-base font-semibold">{name}</div>
        <div className="text-sm text-fade">{handle}</div>
      </div>
      <div className="text-right">
        <div className="text-base font-semibold">{score}</div>
        <div className="text-sm text-purple">{change}</div>
      </div>
      <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.15em] text-white/70">
        {tag}
      </div>
    </div>
  );
}
