import type { Metadata } from "next";
import { Geist, JetBrains_Mono, Newsreader } from "next/font/google";
import "./globals.css";
import { SITE_URL } from "@/lib/site";
import { Shell } from "@/components/shell/shell";
import { InlineScript } from "@/components/inline-script";
import { themeScript } from "@/lib/theme";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = JetBrains_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const newsreader = Newsreader({ variable: "--font-newsreader", subsets: ["latin"], style: ["normal", "italic"] });

const description = "The portfolio of Bryan Jhade: thoughtful digital design, front-end craft, and creative technology.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Bryan Jhade — Developer", template: "%s — Bryan Jhade" },
  description,
  openGraph: { type: "website", siteName: "Bryan Jhade", title: "Bryan Jhade — Developer", description, images: [{ url: "/profile.png", alt: "Portrait of Bryan Jhade" }] },
  twitter: { card: "summary", title: "Bryan Jhade — Developer", description, images: ["/profile.png"] },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${newsreader.variable}`} suppressHydrationWarning><head><InlineScript html={themeScript} /></head><body><Shell>{children}</Shell></body></html>;
}
