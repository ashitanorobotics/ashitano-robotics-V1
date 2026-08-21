import Header from "@/components/Header";
import IntroLoader from "@/components/IntroLoader";
import Hero from "@/components/Hero";
import News from "@/components/News";
import ServicesHeadline from "@/components/ServicesHeadline";
import UseCases from "@/components/UseCases";
import Technology from "@/components/Technology";
import Faq from "@/components/Faq";
import Spotlight from "@/components/Spotlight";
import Footer from "@/components/Footer";
import type { Locale } from "@/constants/site";

export default function HomePage({ locale }: { locale: Locale }) {
  return (
    <>
      <IntroLoader />
      <Header locale={locale} />
      <div className="content-wrapper">
        <main>
          <Hero locale={locale} />
          <News locale={locale} />
          <ServicesHeadline locale={locale} />
          <Technology locale={locale} />
          <UseCases locale={locale} />
          <Faq locale={locale} />
          <div className="page-pad site-bottom">
            <Spotlight locale={locale} />
          </div>
        </main>
        <Footer locale={locale} />
      </div>
    </>
  );
}
