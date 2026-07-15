import { site } from "@/constants/site";

export default function Vision() {
  const { vision } = site;

  return (
    <section
      className="page-pad section-block"
      aria-labelledby="vision-heading"
    >
      <h2 id="vision-heading" className="section-heading-lg mx-auto">
        {vision.title}
      </h2>
      <p className="mx-auto mt-6 max-w-[820px] text-center text-[clamp(16px,1.8vw,22px)] leading-relaxed text-black">
        {vision.subtitle}
      </p>
    </section>
  );
}
