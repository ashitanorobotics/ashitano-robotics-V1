"use client";

import { usePathname } from "next/navigation";
import { getSite, type Locale } from "@/constants/site";

export default function Header({ locale }: { locale: Locale }) {
  const site = getSite(locale);
  const pathname = usePathname() ?? "/";
  const home = locale === "ja" ? "/ja" : "/";

  // Map current path to its counterpart in the other locale
  const basePath = pathname.replace(/^\/ja(?=\/|$)/, "") || "/";
  const jaPath = basePath === "/" ? "/ja" : `/ja${basePath}`;
  const enPath = basePath;

  return (
    <header className="site-header">
      <div className="header-inner">
        <a href={home} className="header-company">
          <span className="company-name">{site.nameEn}</span>
        </a>

        <div className="header-buttons">
          <nav aria-label="Language" className="lang-switch">
            <a href={jaPath} className={locale === "ja" ? "lang-active" : ""}>
              JP
            </a>
            <span className="lang-divider">/</span>
            <a href={enPath} className={locale === "en" ? "lang-active" : ""}>
              EN
            </a>
          </nav>
          <a href={`${home}#request-demo-section`} className="primary-button">
            {site.contact.cta}
          </a>
        </div>
      </div>
    </header>
  );
}
