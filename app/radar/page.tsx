import { AppShell } from "@/components/app-shell";
import { RadarCard } from "@/components/radar-card";
import { SectionTitle } from "@/components/section-title";
import { radarItems } from "@/lib/mock-data";
import { Search } from "lucide-react";

export default function RadarPage() {
  return (
    <AppShell title="Radar" subtitle="Find hot signals before they become crowded.">
      <section className="space-y-4">
        <div className="panel flex items-center gap-3 rounded-3xl px-4 py-4">
          <Search className="h-5 w-5 text-white/50" />
          <span className="text-white/55">Search creators, projects, channels...</span>
        </div>

        <SectionTitle title="Breakout radar" />
        <div className="grid gap-3">
          {radarItems.map((item) => (
            <RadarCard key={item.title} {...item} />
          ))}
        </div>
      </section>
    </AppShell>
  );
}
