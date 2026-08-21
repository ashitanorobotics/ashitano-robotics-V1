"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { getSite, type Locale } from "@/constants/site";

export default function Header({ locale }: { locale: Locale }) {
  const site = getSite(locale);
  const pathname = usePathname() ?? "/";
  const home = locale === "en" ? "/en" : "/";
  const prefix = locale === "en" ? "/en" : "";
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastY = useRef(0);
  const ticking = useRef(false);

  const basePath = pathname.replace(/^\/en(?=\/|$)/, "") || "/";
  const jaPath = basePath;
  const enPath = basePath === "/" ? "/en" : `/en${basePath}`;

  const links = [
    { label: site.nav.services, href: `${home}#services` },
    { label: site.nav.useCases, href: `${home}#use-cases` },
    { label: site.nav.faqs, href: `${home}#faqs` },
    { label: site.nav.company, href: `${prefix}/company` },
    { label: site.nav.contact, href: `${prefix}/contact` },
  ];

  useEffect(() => {
    setOpen(false);
    setVisible(true);
    lastY.current = window.scrollY;
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (open) {
      setVisible(true);
      return;
    }

    lastY.current = window.scrollY;

    const update = () => {
      const y = window.scrollY;
      const delta = y - lastY.current;

      if (y <= 16) {
        setVisible(true);
      } else if (delta > 6) {
        setVisible(false);
      } else if (delta < -6) {
        setVisible(true);
      }

      lastY.current = y;
      ticking.current = false;
    };

    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  return (
    <header className={`site-nav${visible ? "" : " is-hidden"}`}>
      <div className={`site-nav-shell${open ? " is-open" : ""}`}>
        <div className="site-nav-bar">
          <a aria-label="Home" href={home} className="site-nav-mark">
            <img src="/images/logo-mark.png" alt="" />
          </a>
          <a aria-label="Home" href={home} className="site-nav-wordmark">
            {site.nameEn}
          </a>
          <button
            type="button"
            className="site-nav-toggle"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="site-nav-toggle-line site-nav-toggle-line-top" />
            <span className="site-nav-toggle-line site-nav-toggle-line-bottom" />
          </button>
        </div>

        <div className="site-nav-panel-wrap">
          <div className="site-nav-panel">
            <nav aria-label="Main" className="flex flex-col items-start gap-2">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <div className="site-nav-meta">
              <span>{site.tagline}</span>
              <nav aria-label="Language" className="site-nav-langs">
                <a
                  href={jaPath}
                  className={`site-nav-lang${locale === "ja" ? " is-active" : ""}`}
                >
                  JP
                </a>
                <span className="site-nav-lang-sep" aria-hidden>
                  /
                </span>
                <a
                  href={enPath}
                  className={`site-nav-lang${locale === "en" ? " is-active" : ""}`}
                >
                  EN
                </a>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
