import type { Metadata } from "next";
import CompanyPage from "@/components/CompanyPage";
import JsonLd from "@/components/JsonLd";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata("ja", "company");

export default function Company() {
  return (
    <>
      <JsonLd locale="ja" page="company" />
      <CompanyPage locale="ja" />
    </>
  );
}
