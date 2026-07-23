import type { Metadata } from "next";
import CompanyPage from "@/components/CompanyPage";
import { getSite } from "@/constants/site";

const en = getSite("en");

export const metadata: Metadata = {
  title: `${en.company.title} | ${en.name}`,
  description: en.description,
};

export default function CompanyEn() {
  return <CompanyPage locale="en" />;
}
