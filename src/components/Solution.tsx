import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { getSite, type Locale } from "@/constants/site";
import Reveal from "@/components/Reveal";

export default function Solution({ locale }: { locale: Locale }) {
  const { solution } = getSite(locale);

  return (
    <section
      id="solution-section"
      className="page-pad section-block"
      aria-labelledby="solution-heading"
    >
      <div className="mx-auto w-full max-w-[1280px]">
        <Reveal>
          <h2
            id="solution-heading"
            className="max-w-[900px] whitespace-pre-line text-left text-[clamp(22px,3.2vw,40px)] font-normal leading-[1.45] tracking-[-0.02em] text-black"
          >
            {solution.statement}
          </h2>
        </Reveal>

        <div className="capability-grid">
          {solution.capabilities.map((cap, i) => (
            <Reveal key={cap.title} delayMs={80 + i * 80}>
              <article className="capability-card">
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
                  <a
                    href="#request-demo-section"
                    className="capability-cta"
                  >
                    {solution.cardCta}
                    <ArrowUpRight size={14} strokeWidth={2} />
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
