import type { Metadata } from "next";
import HomePage from "@/components/HomePage";
import { getSite } from "@/constants/site";

const ja = getSite("ja");

export const metadata: Metadata = {
  title: ja.name,
  description: ja.description,
};

export default function Home() {
  return <HomePage locale="ja" />;
}
