import type { Metadata } from "next";
import PrivacyPage from "@/components/PrivacyPage";
import { getSite } from "@/constants/site";

const ja = getSite("ja");

export const metadata: Metadata = {
  title: `${ja.privacy.title} | ${ja.name}`,
  description: ja.description,
};

export default function PrivacyJa() {
  return <PrivacyPage locale="ja" />;
}
