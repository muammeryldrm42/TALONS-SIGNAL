import { AppShell } from "@/components/app-shell";
import { RankingRow } from "@/components/ranking-row";
import { SectionTitle } from "@/components/section-title";
import { rankingRows } from "@/lib/mock-data";

export default function RankingsPage() {
  return (
    <AppShell title="Rankings" subtitle="Top creators, projects, and channels in Talons Signal.">
      <section className="space-y-3">
        <SectionTitle title="Top right now" />
        {rankingRows.map((row) => (
          <RankingRow key={`${row.rank}-${row.name}`} {...row} />
        ))}
      </section>
    </AppShell>
  );
}
