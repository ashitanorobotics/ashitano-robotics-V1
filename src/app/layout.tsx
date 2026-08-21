import type { Metadata } from "next";
import { Geist, Geist_Mono, Montserrat, Noto_Sans_JP } from "next/font/google";
import { createRootMetadata } from "@/lib/seo";
import ScrollReset from "@/components/ScrollReset";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["700"],
  display: "swap",
});

const notoSansJp = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = createRootMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${geist.variable} ${geistMono.variable} ${montserrat.variable} ${notoSansJp.variable} antialiased`}
    >
      <body className="bg-bg font-sans text-fg antialiased">
        <ScrollReset />
        {children}
      </body>
    </html>
  );
}
