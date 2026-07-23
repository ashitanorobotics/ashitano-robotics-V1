import type { Metadata } from "next";
import PrivacyPage from "@/components/PrivacyPage";
import JsonLd from "@/components/JsonLd";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata("en", "privacy");

export default function PrivacyEn() {
  return (
    <>
      <JsonLd locale="en" page="privacy" />
      <PrivacyPage locale="en" />
    </>
  );
}
