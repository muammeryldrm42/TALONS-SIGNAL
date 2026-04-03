import type { ReactNode } from "react";
import { BottomNav } from "@/components/bottom-nav";
import { TopHeader } from "@/components/top-header";

export function AppShell({
  children,
  title,
  subtitle
}: {
  children: ReactNode;
  title?: string;
  subtitle?: string;
}) {
  return (
    <div className="app-frame safe-pb">
      <TopHeader />
      <main className="px-4 pb-8 pt-4">
        {(title || subtitle) && (
          <section className="mb-5">
            {title ? <h1 className="text-2xl font-semibold tracking-tight">{title}</h1> : null}
            {subtitle ? <p className="mt-1 text-sm text-fade">{subtitle}</p> : null}
          </section>
        )}
        {children}
      </main>
      <BottomNav />
    </div>
  );
}
