import { site } from "@/constants/site";
import Reveal from "@/components/Reveal";

export default function Vision() {
  const { vision } = site;

  return (
    <section
      className="page-pad section-block"
      aria-labelledby="vision-heading"
    >
      <Reveal>
        <h2 id="vision-heading" className="section-heading-lg mx-auto">
          {vision.title}
        </h2>
      </Reveal>
      <Reveal delayMs={120}>
        <p className="mx-auto mt-6 max-w-[820px] whitespace-pre-line text-center text-[clamp(16px,1.8vw,22px)] leading-relaxed text-black">
          {vision.subtitle}
        </p>
      </Reveal>
    </section>
  );
}
