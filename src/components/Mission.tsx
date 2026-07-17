import { getSite, type Locale } from "@/constants/site";
import Reveal from "@/components/Reveal";

export default function Mission({ locale }: { locale: Locale }) {
  const { mission } = getSite(locale);

  return (
    <section className="page-pad section-block" aria-label="Mission">
      <div className="mx-auto w-full max-w-[1280px]">
        <Reveal>
          <p className="max-w-[1000px] whitespace-pre-line text-left text-[clamp(22px,3.2vw,40px)] font-bold leading-[1.45] tracking-[-0.02em] text-black">
            {mission.statement}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
