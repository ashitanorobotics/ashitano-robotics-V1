import type { Metadata } from "next";
import HomePage from "@/components/HomePage";
import JsonLd from "@/components/JsonLd";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata("ja", "home");

export default function Home() {
  return (
    <>
      <JsonLd locale="ja" page="home" />
      <HomePage locale="ja" />
    </>
  );
}
