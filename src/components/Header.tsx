"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { getSite, type Locale } from "@/constants/site";

const SCROLL_THRESHOLD = 48;

export default function Header({ locale }: { locale: Locale }) {
  const site = getSite(locale);
  const pathname = usePathname() ?? "/";
  const home = locale === "ja" ? "/ja" : "/";
  const [inverted, setInverted] = useState(false);

  const basePath = pathname.replace(/^\/ja(?=\/|$)/, "") || "/";
  const jaPath = basePath === "/" ? "/ja" : `/ja${basePath}`;
  const enPath = basePath;

  const isHome = basePath === "/";

  const navLinks = isHome
    ? [
        { label: site.nav.solution, href: `${home}#solution-section` },
        { label: site.nav.vision, href: `${home}#vision-section` },
        { label: site.nav.contact, href: `${home}#request-demo-section` },
      ]
    : [];

  useEffect(() => {
    const onScroll = () => {
      setInverted(window.scrollY > SCROLL_THRESHOLD);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`site-header${inverted ? " site-header--inverted" : ""}`}
    >
      <div className="header-inner">
        <a href={home} className="header-company">
          <span className="company-name">{site.nameEn}</span>
        </a>

        {navLinks.length > 0 ? (
          <nav aria-label="Main" className="header-nav">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
          </nav>
        ) : null}

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
