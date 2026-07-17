import { Fragment } from "react";
import Image from "next/image";
import { getSite, type Locale } from "@/constants/site";
import Reveal from "@/components/Reveal";

export default function Vision({ locale }: { locale: Locale }) {
  const { vision } = getSite(locale);
  const titleLines = vision.title.split("\n");

  return (
    <section className="page-pad section-block" aria-labelledby="vision-heading">
      <Reveal className="mx-auto w-full max-w-[1400px]">
        <div className="relative overflow-hidden rounded-[24px] px-6 py-20 text-white sm:px-12 lg:px-20 lg:py-28">
          <Image
            src="/images/vision-robots.jpg"
            alt=""
            fill
            quality={85}
            sizes="(max-width: 1400px) 100vw, 1400px"
            className="object-cover object-center"
            aria-hidden
          />
          <div className="absolute inset-0 bg-black/70" aria-hidden />

          <div className="relative">
            <h2
              id="vision-heading"
              className="text-center text-[clamp(22px,3.4vw,40px)] font-bold leading-[1.4] tracking-[-0.02em]"
            >
              {titleLines.map((line, i) => (
                <Fragment key={line}>
                  {line}
                  {i < titleLines.length - 1 && (
                    /* 日本語はモバイルのみ改行、英語は常に改行 */
                    <br className={locale === "ja" ? "md:hidden" : undefined} />
                  )}
                </Fragment>
              ))}
            </h2>
            <p className="mx-auto mt-8 max-w-[720px] whitespace-pre-line text-center text-[clamp(15px,1.6vw,18px)] leading-[2] text-white/85">
              {vision.body}
            </p>
            <p className="font-display mt-12 text-center text-[clamp(20px,2.6vw,30px)] font-bold tracking-[-0.02em] text-white">
              {vision.closing}
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
