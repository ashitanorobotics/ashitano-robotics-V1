import Image from "next/image";
import fs from "fs";
import path from "path";
import { site } from "@/constants/site";

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
      <h2 id="solution-heading" className="section-heading mx-auto">
        {solution.title}
      </h2>

      <div className="relative mt-12 flex h-[min(52vh,480px)] items-center overflow-hidden rounded-[24px] bg-white lg:mt-14">
        {robots.length > 0 ? (
          <div className="grid h-full w-full min-h-0 grid-cols-2 gap-2 p-4 sm:gap-4 sm:p-6 lg:grid-cols-4 lg:gap-6 lg:p-8">
            {robots.map((img) => (
              <div key={img.src} className="relative h-full w-full min-h-0">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-contain object-center"
                />
              </div>
            ))}
          </div>
        ) : null}
      </div>

      <div className="mx-auto mt-14 max-w-[880px] text-center lg:mt-16">
        <p className="text-[20px] font-medium leading-relaxed text-black sm:text-[22px]">
          {solution.emphasis}
        </p>
      </div>

      <div className="mx-auto mt-14 grid max-w-[1280px] gap-8 md:grid-cols-3 lg:mt-16">
        {solution.capabilities.map((cap) => {
          const hasImage = publicPathExists(cap.image);

          return (
            <article key={cap.title} className="flex flex-col gap-5">
              <div className="relative aspect-[16/10] overflow-hidden rounded-[16px] bg-[#f5f5f5]">
                {hasImage ? (
                  <Image
                    src={cap.image}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-center"
                  />
                ) : null}
              </div>
              <div>
                <h3 className="text-xl font-bold text-black">{cap.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-muted">
                  {cap.description}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
