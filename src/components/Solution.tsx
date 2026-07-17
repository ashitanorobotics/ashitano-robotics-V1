import Image from "next/image";
import { getSite, type Locale } from "@/constants/site";
import Reveal from "@/components/Reveal";

export default function Solution({ locale }: { locale: Locale }) {
  const { solution } = getSite(locale);

  return (
    <section
      className="page-pad section-block"
      aria-labelledby="solution-heading"
    >
      <div className="mx-auto w-full max-w-[1280px]">
        <Reveal>
          <h2
            id="solution-heading"
            className="mx-auto max-w-[900px] text-center text-[clamp(22px,3vw,36px)] font-bold leading-[1.4] tracking-[-0.02em] text-black"
          >
            {solution.title}
          </h2>
        </Reveal>
        <Reveal delayMs={120}>
          <p className="mx-auto mt-5 max-w-[720px] whitespace-pre-line text-center text-[clamp(15px,1.6vw,18px)] leading-relaxed text-muted">
            {solution.lead}
          </p>
        </Reveal>

        <div className="capability-grid">
          {solution.capabilities.map((cap) => (
            <article key={cap.title} className="capability-card">
              <div className="capability-media">
                <Image
                  src={cap.image}
                  alt={cap.title}
                  fill
                  quality={90}
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="capability-body">
                <h3>{cap.title}</h3>
                <p>{cap.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
