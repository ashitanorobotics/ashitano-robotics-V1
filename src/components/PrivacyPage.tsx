import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getSite, type Locale } from "@/constants/site";

export default function PrivacyPage({ locale }: { locale: Locale }) {
  const site = getSite(locale);

  return (
    <>
      <Header locale={locale} />
      <main className="pt-20">
        <section className="page-pad section-block" aria-labelledby="privacy-heading">
          <div className="mx-auto w-full max-w-[840px]">
            <h1
              id="privacy-heading"
              className="text-[clamp(26px,3.4vw,40px)] font-bold tracking-[-0.02em] text-black"
            >
              {site.privacy.title}
            </h1>
            <p className="mt-8 text-base leading-[1.9] text-muted">
              {site.privacy.intro}
            </p>
            <div className="mt-12 space-y-10">
              {site.privacy.sections.map((section) => (
                <section key={section.heading}>
                  <h2 className="text-lg font-bold text-black">
                    {section.heading}
                  </h2>
                  <p className="mt-3 text-base leading-[1.9] text-muted">
                    {section.body}
                  </p>
                </section>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  );
}
