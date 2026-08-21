import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Locale } from "@/constants/site";
import type { ReactNode } from "react";

export default function SubPageLayout({
  locale,
  title,
  headingId,
  children,
  panel,
}: {
  locale: Locale;
  title: string;
  headingId: string;
  children: ReactNode;
  panel?: boolean;
}) {
  const body = (
    <>
      <h1 id={headingId} className="heading-1">
        {title}
      </h1>
      {children}
    </>
  );

  return (
    <>
      <Header locale={locale} />
      <div className="content-wrapper">
        <main className="pt-24 lg:pt-28">
          <section
            className="page-pad section-block"
            aria-labelledby={headingId}
          >
            {panel ? (
              <div className="contact-surface rounded-xl px-4 py-10 lg:px-8 lg:py-16">
                <div className="mx-auto w-full max-w-[720px]">{body}</div>
              </div>
            ) : (
              <div className="mx-auto w-full max-w-[720px]">{body}</div>
            )}
          </section>
        </main>
        <Footer locale={locale} />
      </div>
    </>
  );
}
