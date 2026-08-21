import SubPageLayout from "@/components/SubPageLayout";
import { getSite, type Locale } from "@/constants/site";

export default function PrivacyPage({ locale }: { locale: Locale }) {
  const site = getSite(locale);

  return (
    <SubPageLayout
      locale={locale}
      title={site.privacy.title}
      headingId="privacy-heading"
    >
      <p className="body-2 mt-8">{site.privacy.intro}</p>
      <div className="mt-12 space-y-10">
        {site.privacy.sections.map((section) => (
          <section key={section.heading}>
            <h2 className="heading-3">{section.heading}</h2>
            <p className="body-2 mt-3">{section.body}</p>
          </section>
        ))}
      </div>
    </SubPageLayout>
  );
}
