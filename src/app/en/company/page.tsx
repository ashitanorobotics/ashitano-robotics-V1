import type { Metadata } from "next";
import CompanyPage from "@/components/CompanyPage";
import JsonLd from "@/components/JsonLd";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata("en", "company");

export default function CompanyEn() {
  return (
    <>
      <JsonLd locale="en" page="company" />
      <CompanyPage locale="en" />
    </>
  );
}
