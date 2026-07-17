import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Solution from "@/components/Solution";
import Vision from "@/components/Vision";
import ContactCta from "@/components/ContactCta";
import Footer from "@/components/Footer";
import type { Locale } from "@/constants/site";

export default function HomePage({ locale }: { locale: Locale }) {
  return (
    <>
      <Header locale={locale} />
      <main>
        <Hero locale={locale} />
        <Solution locale={locale} />
        <Vision locale={locale} />
        <ContactCta locale={locale} />
      </main>
      <Footer locale={locale} />
    </>
  );
}
