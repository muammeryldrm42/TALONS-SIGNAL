import { Metric } from "@/lib/types";

export function MetricCard({ metric }: { metric: Metric }) {
  return (
    <div className="panel purple-ring rounded-3xl p-4">
      <div className="text-2xl font-semibold tracking-tight">{metric.value}</div>
      <div className="mt-1 text-sm font-medium text-white">{metric.label}</div>
      <div className="mt-1 text-xs uppercase tracking-[0.2em] text-fade">{metric.hint}</div>
    </div>
  );
}
