import { site } from "@/constants/site";

export default function Problem() {
  const { problem } = site;

  return (
    <section
      className="page-pad section-block"
      aria-labelledby="problem-heading"
    >
      <h2
        id="problem-heading"
        className="section-heading mx-auto whitespace-pre-line"
      >
        {problem.title}
      </h2>

      <div className="mx-auto mt-12 grid max-w-[1280px] gap-5 lg:grid-cols-3 lg:mt-14">
        {problem.items.map((item) => (
          <article
            key={item.number}
            className="rounded-[24px] bg-[#f5f5f5] p-8"
          >
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
        ))}
      </div>
    </section>
  );
}
