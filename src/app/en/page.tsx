import type { Metadata } from "next";
import HomePage from "@/components/HomePage";
import JsonLd from "@/components/JsonLd";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata("en", "home");

export default function HomeEn() {
  return (
    <>
      <JsonLd locale="en" page="home" />
      <HomePage locale="en" />
    </>
  );
}
