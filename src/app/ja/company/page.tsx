import type { Metadata } from "next";
import CompanyPage from "@/components/CompanyPage";
import { getSite } from "@/constants/site";

const ja = getSite("ja");

export const metadata: Metadata = {
  title: `${ja.company.title} | ${ja.name}`,
  description: ja.description,
};

export default function CompanyJa() {
  return <CompanyPage locale="ja" />;
}
