import type { Metadata } from "next";
import { Geist, JetBrains_Mono, Newsreader } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = JetBrains_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const newsreader = Newsreader({ variable: "--font-newsreader", subsets: ["latin"], style: ["normal", "italic"] });

export const metadata: Metadata = { title: { default: "Bryan Jhade — Developer", template: "%s — Bryan Jhade" }, description: "The portfolio of Bryan Jhade: thoughtful digital design, front-end craft, and creative technology." };

const themeScript = `try{var t=localStorage.getItem("theme");document.documentElement.dataset.theme=t==="light"?"light":"dark"}catch(e){document.documentElement.dataset.theme="dark"}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${newsreader.variable}`} suppressHydrationWarning><head><script dangerouslySetInnerHTML={{ __html: themeScript }} /></head><body>{children}</body></html>;
}
