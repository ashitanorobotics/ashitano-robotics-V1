import type { MetadataRoute } from "next";
import { absoluteUrl, type PageKey } from "@/lib/seo";

const entries: Array<{
  page: PageKey;
  jaPath: string;
  enPath: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
}> = [
  {
    page: "home",
    jaPath: "/",
    enPath: "/en",
    priority: 1,
    changeFrequency: "monthly",
  },
  {
    page: "company",
    jaPath: "/company",
    enPath: "/en/company",
    priority: 0.7,
    changeFrequency: "yearly",
  },
  {
    page: "privacy",
    jaPath: "/privacy",
    enPath: "/en/privacy",
    priority: 0.5,
    changeFrequency: "yearly",
  },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return entries.flatMap(({ jaPath, enPath, priority, changeFrequency }) => [
    {
      url: absoluteUrl(jaPath),
      lastModified,
      changeFrequency,
      priority,
      alternates: {
        languages: {
          ja: absoluteUrl(jaPath),
          en: absoluteUrl(enPath),
        },
      },
    },
    {
      url: absoluteUrl(enPath),
      lastModified,
      changeFrequency,
      priority: priority * 0.95,
      alternates: {
        languages: {
          ja: absoluteUrl(jaPath),
          en: absoluteUrl(enPath),
        },
      },
    },
  ]);
}
