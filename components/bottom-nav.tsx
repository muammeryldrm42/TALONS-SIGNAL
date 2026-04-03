"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, Home, Radar, Target, UserCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { href: "/", label: "Home", icon: Home },
  { href: "/rankings", label: "Rankings", icon: BarChart3 },
  { href: "/radar", label: "Radar", icon: Radar },
  { href: "/quest", label: "Quest", icon: Target },
  { href: "/profile", label: "Profile", icon: UserCircle2 }
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 mx-auto max-w-[460px] border-t border-white/10 bg-[#0b0e16]/90 px-2 pb-[calc(env(safe-area-inset-bottom,0px)+10px)] pt-3 backdrop-blur-2xl">
      <div className="grid grid-cols-5 gap-1">
        {items.map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1 rounded-2xl px-2 py-2 text-xs font-medium transition",
                active ? "text-purple" : "text-white/70 hover:text-white"
              )}
            >
              <Icon className={cn("h-6 w-6", active && "drop-shadow-[0_0_12px_rgba(139,92,246,0.45)]")} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
