import { SignalCard } from "@/components/signal-card";
import { SignalCardData } from "@/lib/types";

export function SignalGrid({ items }: { items: SignalCardData[] }) {
  return (
    <div className="grid grid-cols-4 gap-3">
      {items.map((item) => (
        <SignalCard key={item.id} item={item} />
      ))}
    </div>
  );
}
