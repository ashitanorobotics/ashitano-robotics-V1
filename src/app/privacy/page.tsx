import type { Metadata } from "next";
import PrivacyPage from "@/components/PrivacyPage";
import JsonLd from "@/components/JsonLd";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata("ja", "privacy");

export default function Privacy() {
  return (
    <>
      <JsonLd locale="ja" page="privacy" />
      <PrivacyPage locale="ja" />
    </>
  );
}
