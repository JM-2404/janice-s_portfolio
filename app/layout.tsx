import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Janice Middleton-Dogbe — Creative Technologist & Storyteller",
  description: "The digital home of Janice NutiFafa Middleton-Dogbe: creative technologist, designer, photographer, writer and spoken word artist in Ghana.",
  metadataBase: new URL("https://janicemiddletondogbe.com"),
  openGraph: { title: "Janice Middleton-Dogbe", description: "Technology, creativity, and human connection.", type: "website" },
  robots: { index: true, follow: true }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
