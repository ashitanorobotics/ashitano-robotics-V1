import type { Metadata } from "next";
import { Host_Grotesk, Montserrat, Noto_Sans_JP } from "next/font/google";
import { createRootMetadata } from "@/lib/seo";
import ScrollReset from "@/components/ScrollReset";
import "./globals.css";

const hostGrotesk = Host_Grotesk({
  variable: "--font-host-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
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
      className={`${hostGrotesk.variable} ${montserrat.variable} ${notoSansJp.variable} h-full antialiased`}
    >
      <body className="min-h-full max-w-full overflow-x-clip bg-bg font-sans text-fg antialiased">
        <ScrollReset />
        {children}
      </body>
    </html>
  );
}
