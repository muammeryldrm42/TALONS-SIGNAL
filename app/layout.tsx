import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { Providers } from "@/app/providers";

export const metadata: Metadata = {
  title: "Talons Signal",
  description: "Farcaster-native signal and referral quest mini app",
  openGraph: {
    title: "Talons Signal",
    description: "Farcaster-native signal and referral quest mini app",
    images: ["/preview.png"]
  },
  other: {
    "fc:miniapp": "Talons Signal"
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
