export function RadarCard({ title, value, meta }: { title: string; value: string; meta: string }) {
  return (
    <div className="panel rounded-3xl p-4">
      <div className="text-xs uppercase tracking-[0.22em] text-purple">{title}</div>
      <div className="mt-2 text-xl font-semibold">{value}</div>
      <div className="mt-1 text-sm text-fade">{meta}</div>
    </div>
  );
}
