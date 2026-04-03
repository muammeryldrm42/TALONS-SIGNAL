import { AppShell } from "@/components/app-shell";
import { SignalGrid } from "@/components/signal-grid";
import { SignalTabs } from "@/components/signal-tabs";
import { TimeFilter } from "@/components/time-filter";
import { defaultSignals } from "@/lib/mock-data";

export default function HomePage() {
  return (
    <AppShell>
      <section className="space-y-4">
        <section className="panel rounded-[30px] p-4">
          <div className="mb-4 flex items-center justify-between gap-4">
            <SignalTabs />
            <TimeFilter />
          </div>
          <SignalGrid items={defaultSignals} />
        </section>
      </section>
    </AppShell>
  );
}
