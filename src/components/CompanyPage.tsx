import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getSite, type Locale } from "@/constants/site";

export default function CompanyPage({ locale }: { locale: Locale }) {
  const site = getSite(locale);

  return (
    <>
      <Header locale={locale} />
      <main className="pt-20">
        <section className="page-pad section-block" aria-labelledby="company-heading">
          <div className="mx-auto w-full max-w-[840px]">
            <h1
              id="company-heading"
              className="text-[clamp(26px,3.4vw,40px)] font-bold tracking-[-0.02em] text-black"
            >
              {site.company.title}
            </h1>
            <dl className="mt-12 divide-y divide-black/10 border-y border-black/10">
              {site.company.rows.map((row) => (
                <div
                  key={row.label}
                  className="grid gap-2 py-6 sm:grid-cols-[200px_1fr] sm:gap-6"
                >
                  <dt className="text-sm font-medium text-tertiary sm:pt-0.5">
                    {row.label}
                  </dt>
                  <dd className="text-base leading-relaxed text-black">
                    {row.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  );
}
