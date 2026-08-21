import { getSite, type Locale } from "@/constants/site";
import CtaButton from "@/components/CtaButton";

export default function Spotlight({ locale }: { locale: Locale }) {
  const site = getSite(locale);
  const contactHref = locale === "en" ? "/en/contact" : "/contact";

  return (
    <section className="page-cta contact-surface">
      <h2 className="page-cta-title heading-2">{site.contact.title}</h2>
      {site.contact.body ? (
        <p className="page-cta-body">{site.contact.body}</p>
      ) : null}
      <CtaButton href={contactHref}>{site.contact.cta}</CtaButton>
    </section>
  );
}
