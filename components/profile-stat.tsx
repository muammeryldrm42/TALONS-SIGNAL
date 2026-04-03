export function ProfileStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="panel rounded-3xl p-4">
      <div className="text-xs uppercase tracking-[0.2em] text-fade">{label}</div>
      <div className="mt-2 text-2xl font-semibold tracking-tight">{value}</div>
    </div>
  );
}
