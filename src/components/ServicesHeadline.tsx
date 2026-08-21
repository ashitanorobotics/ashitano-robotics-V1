import { getSite, type Locale } from "@/constants/site";
import { displayTitleClassName } from "@/constants/typography";

export default function ServicesHeadline({ locale }: { locale: Locale }) {
  const { business } = getSite(locale);

  return (
    <section id="services" className="px-4 py-16 lg:px-6 lg:py-24">
      {business.stickyWords.map((word, i) => (
        <p
          key={word}
          className={`${displayTitleClassName} text-center`}
          style={{ textIndent: i > 0 ? "0.5em" : undefined }}
        >
          {word}
        </p>
      ))}
    </section>
  );
}
