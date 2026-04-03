"use client";

import type { ReactNode } from "react";
import { UserProvider } from "@/components/user-provider";

export function Providers({ children }: { children: ReactNode }) {
  return <UserProvider>{children}</UserProvider>;
}
