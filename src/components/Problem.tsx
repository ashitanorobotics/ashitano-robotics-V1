import { site } from "@/constants/site";
import Reveal from "@/components/Reveal";

export default function Problem() {
  const { problem } = site;

  return (
    <section
      className="page-pad section-block"
      aria-labelledby="problem-heading"
    >
      <Reveal>
        <h2
          id="problem-heading"
          className="section-heading mx-auto whitespace-pre-line"
        >
          {problem.title}
        </h2>
      </Reveal>

      <div className="mx-auto mt-12 grid max-w-[1280px] gap-5 lg:mt-14 lg:grid-cols-3">
        {problem.items.map((item, index) => (
          <Reveal key={item.number} delayMs={index * 100}>
            <article className="motion-card h-full rounded-[24px] bg-[#f5f5f5] p-8">
              <span className="inline-flex rounded-lg bg-black/5 px-2.5 py-1 text-base font-bold text-black">
                {item.number}
              </span>
              <h3 className="mt-5 text-2xl font-bold leading-snug text-black">
                {item.title}
              </h3>
              <p className="mt-3 text-base font-normal leading-relaxed text-muted">
                {item.body}
              </p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
