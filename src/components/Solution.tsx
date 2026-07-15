import Image from "next/image";
import fs from "fs";
import path from "path";
import { site } from "@/constants/site";
import Reveal from "@/components/Reveal";

const ROBOT_IMAGES = [
  { src: "/images/fv-1.png", alt: "ヒューマノイドロボット 01" },
  { src: "/images/fv-2.png", alt: "ヒューマノイドロボット 02" },
  { src: "/images/fv-3.png", alt: "ヒューマノイドロボット 03" },
  { src: "/images/fv-4.png", alt: "ヒューマノイドロボット 04" },
] as const;

function publicPathExists(src: string) {
  return fs.existsSync(
    path.join(process.cwd(), "public", src.replace(/^\//, "")),
  );
}

function existingRobotImages() {
  return ROBOT_IMAGES.filter((img) => publicPathExists(img.src));
}

export default function Solution() {
  const { solution } = site;
  const robots = existingRobotImages();

  return (
    <section
      className="page-pad section-block"
      aria-labelledby="solution-heading"
    >
      <Reveal>
        <h2 id="solution-heading" className="section-heading mx-auto">
          {solution.title}
        </h2>
      </Reveal>

      <Reveal delayMs={80}>
        <div className="relative mt-12 flex h-[min(36vh,320px)] items-center justify-center overflow-hidden rounded-[24px] bg-white lg:mt-14">
          {robots.length > 0 ? (
            <div className="mx-auto grid h-full w-full max-w-[920px] min-h-0 grid-cols-2 gap-2 p-6 sm:gap-4 sm:p-8 lg:grid-cols-4 lg:gap-5 lg:p-10">
              {robots.map((img, index) => (
                <Reveal
                  key={img.src}
                  delayMs={120 + index * 80}
                  className="relative h-full w-full min-h-0 scale-90"
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 1024px) 40vw, 180px"
                    className="object-contain object-center"
                  />
                </Reveal>
              ))}
            </div>
          ) : null}
        </div>
      </Reveal>

      <Reveal delayMs={100}>
        <div className="mx-auto mt-14 max-w-[880px] text-center lg:mt-16">
          <p className="text-[20px] font-medium leading-relaxed text-black sm:text-[22px]">
            {solution.emphasis}
          </p>
        </div>
      </Reveal>

      <div className="capability-grid">
        {solution.capabilities.map((cap, index) => (
          <Reveal key={cap.title} delayMs={index * 110}>
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
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
