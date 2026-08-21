import type { Metadata } from "next";
import ContactPage from "@/components/ContactPage";
import JsonLd from "@/components/JsonLd";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata("ja", "contact");

export default function Contact() {
  return (
    <>
      <JsonLd locale="ja" page="contact" />
      <ContactPage locale="ja" />
    </>
  );
}
