import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EZER — Tech Enthusiast & Storyteller",
  description: "EZER by Janice NutiFafa Middleton-Dogbe — tech enthusiast, storyteller, photographer, writer, spoken word artist, and young Christian advocate. Passion. Innovation. Impact.",
  
  openGraph: { title: "EZER — Janice NutiFafa Middleton-Dogbe", description: "Passion. Innovation. Impact.", type: "website" },
  robots: { index: true, follow: true }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
