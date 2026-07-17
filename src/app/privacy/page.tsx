import type { Metadata } from "next";
import PrivacyPage from "@/components/PrivacyPage";
import { getSite } from "@/constants/site";

const en = getSite("en");

export const metadata: Metadata = {
  title: `${en.privacy.title} | ${en.name}`,
  description: en.description,
};

export default function Privacy() {
  return <PrivacyPage locale="en" />;
}
