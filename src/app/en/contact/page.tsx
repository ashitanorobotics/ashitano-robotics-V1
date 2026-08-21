import type { Metadata } from "next";
import ContactPage from "@/components/ContactPage";
import JsonLd from "@/components/JsonLd";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata("en", "contact");

export default function ContactEn() {
  return (
    <>
      <JsonLd locale="en" page="contact" />
      <ContactPage locale="en" />
    </>
  );
}
