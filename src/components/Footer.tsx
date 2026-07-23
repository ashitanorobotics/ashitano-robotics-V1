import { getSite, type Locale } from "@/constants/site";

export default function Footer({ locale }: { locale: Locale }) {
  const site = getSite(locale);
  const prefix = locale === "en" ? "/en" : "";
  const links = [
    { label: site.footer.company, href: `${prefix}/company` },
    { label: site.footer.privacy, href: `${prefix}/privacy` },
    { label: site.footer.contact, href: `${prefix || "/"}#request-demo-section` },
  ];

  return (
    <footer className="border-t border-black/10 bg-white">
      <div className="page-pad">
        <div
          className="mx-auto py-14"
          style={{ maxWidth: 1280, width: "100%" }}
        >
          <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <div className="footer-company">
                <span className="company-logo-box" aria-hidden="true">
                  <img
                    src="/images/logo-mark.png"
                    alt=""
                    className="company-logo company-logo-mark"
                  />
                </span>
                <span className="company-name">{site.nameEn}</span>
              </div>
              {locale === "ja" ? (
                <p className="mt-1 text-sm text-tertiary">{site.legalName}</p>
              ) : null}
              <p className="mt-2 text-sm text-tertiary">{site.tagline}</p>
              <a
                href={`mailto:${site.email}`}
                className="mt-3 inline-block text-sm text-tertiary transition hover:text-black"
              >
                {site.email}
              </a>
            </div>
            <nav aria-label="Footer" className="sm:pt-1">
              <ul className="flex flex-col gap-3 sm:items-end">
                {links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm text-tertiary transition hover:text-black"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <p className="mt-14 text-center text-xs text-tertiary">
            {site.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
