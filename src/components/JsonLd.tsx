import { getSite, type Locale } from "@/constants/site";
import {
  absoluteUrl,
  getPagePath,
  LOGO_PATH,
  type PageKey,
  SITE_URL,
} from "@/lib/seo";

type JsonLdProps = {
  locale: Locale;
  page: PageKey;
};

function organizationSchema(locale: Locale) {
  const site = getSite(locale);
  const companyRow = site.company.rows.find((row) =>
    locale === "ja" ? row.label === "社名" : row.label === "Company Name",
  );

  return {
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: companyRow?.value ?? site.nameEn,
    alternateName: [site.name, site.nameEn],
    url: SITE_URL,
    logo: absoluteUrl(LOGO_PATH),
    email: site.email,
    description: site.description,
    address: {
      "@type": "PostalAddress",
      streetAddress:
        locale === "ja"
          ? "MIEUX渋谷ビル8階 渋谷区円山町5-3"
          : "MIEUX Shibuya Building 8F, 5-3 Maruyama-cho",
      addressLocality: locale === "ja" ? "渋谷区" : "Shibuya-ku",
      addressRegion: locale === "ja" ? "東京都" : "Tokyo",
      postalCode: "150-0044",
      addressCountry: "JP",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: site.email,
      availableLanguage: ["Japanese", "English"],
    },
    sameAs: [],
  };
}

function websiteSchema(locale: Locale) {
  const site = getSite(locale);

  return {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: site.nameEn,
    description: site.description,
    inLanguage: locale === "ja" ? "ja-JP" : "en-US",
    publisher: { "@id": `${SITE_URL}/#organization` },
  };
}

function webPageSchema(locale: Locale, page: PageKey) {
  const site = getSite(locale);
  const path = getPagePath(locale, page);
  const url = absoluteUrl(path);

  const names: Record<PageKey, string> = {
    home: site.seo.homeTitle,
    company: site.company.title,
    privacy: site.privacy.title,
  };

  const descriptions: Record<PageKey, string> = {
    home: site.description,
    company: site.seo.companyDescription,
    privacy: site.seo.privacyDescription,
  };

  return {
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: names[page],
    description: descriptions[page],
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#organization` },
    inLanguage: locale === "ja" ? "ja-JP" : "en-US",
  };
}

function breadcrumbSchema(locale: Locale, page: PageKey) {
  if (page === "home") return null;

  const site = getSite(locale);
  const homePath = getPagePath(locale, "home");
  const pagePath = getPagePath(locale, page);
  const pageLabel = page === "company" ? site.company.title : site.privacy.title;

  return {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: site.name,
        item: absoluteUrl(homePath),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: pageLabel,
        item: absoluteUrl(pagePath),
      },
    ],
  };
}

export default function JsonLd({ locale, page }: JsonLdProps) {
  const graph = [
    organizationSchema(locale),
    websiteSchema(locale),
    webPageSchema(locale, page),
    breadcrumbSchema(locale, page),
  ].filter(Boolean);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": graph,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
