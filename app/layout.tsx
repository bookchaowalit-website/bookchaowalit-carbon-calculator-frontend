import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Carbon Tally — Activity Ledger",
  description: "A transparent activity ledger for exploring a demonstrative carbon estimate.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
