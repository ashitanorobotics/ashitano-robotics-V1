import type { Metadata } from "next";
import HomePage from "@/components/HomePage";
import { getSite } from "@/constants/site";

const en = getSite("en");

export const metadata: Metadata = {
  title: en.name,
  description: en.description,
};

export default function HomeEn() {
  return <HomePage locale="en" />;
}
