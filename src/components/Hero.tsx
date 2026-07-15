import Image from "next/image";
import fs from "fs";
import path from "path";
import { site } from "@/constants/site";
import Reveal from "@/components/Reveal";

function hasPublicFile(...parts: string[]) {
  return fs.existsSync(path.join(process.cwd(), "public", ...parts));
}

export default function Hero() {
  const hasDesktop = hasPublicFile("images", "hero-vision-desktop-v3.png");
  const hasMobile = hasPublicFile("images", "hero-vision-mobile.png");
  const hasMedia = hasDesktop || hasMobile;

  return (
    <div className="pt-20">
      <section className="page-pad" aria-label="メインビジュアル">
        <Reveal preset="hero-media" className="block w-full">
          <div
            className="motion-hero-frame relative overflow-hidden rounded-[24px] bg-white"
            style={{ height: "calc(100vh - 112px)" }}
          >
            <div className="motion-hero-media absolute inset-0">
              <div className="motion-hero-kenburns absolute inset-0">
                {hasMedia ? (
                  <>
                    {hasMobile ? (
                      <Image
                        src="/images/hero-vision-mobile.png"
                        alt="人とヒューマノイドロボットが並び、未来を見据える様子"
                        fill
                        priority
                        quality={95}
                        sizes="100vw"
                        className="object-cover object-center md:hidden"
                      />
                    ) : null}
                    {hasDesktop ? (
                      <Image
                        src="/images/hero-vision-desktop-v3.png"
                        alt="人とヒューマノイドロボットが並び、未来を見据える様子"
                        fill
                        priority
                        quality={95}
                        sizes="100vw"
                        className={
                          hasMobile
                            ? "hidden object-cover object-[center_70%] md:block"
                            : "object-cover object-[center_70%]"
                        }
                      />
                    ) : null}
                  </>
                ) : (
                  <div className="flex h-full items-center justify-center text-sm text-black/40">
                    /images/hero-vision-desktop-v3.png
                  </div>
                )}
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <section
        className="page-pad section-block motion-hero-copy flex flex-col items-center gap-6 text-center"
        aria-labelledby="hero-heading"
      >
        <Reveal preset="hero-title" className="w-full">
          <h1
            id="hero-heading"
            className="font-display text-[clamp(24px,7vw,64px)] font-bold leading-[1.15] tracking-[-0.03em] text-black md:whitespace-nowrap"
          >
            {site.nameEn}
          </h1>
        </Reveal>
        <Reveal preset="hero-line" delayMs={120} className="w-full">
          <p className="text-[18px] font-normal leading-[1.5] text-black sm:text-[20px]">
            {site.hero.subtitle}
          </p>
        </Reveal>
        <Reveal preset="hero-line" delayMs={240} className="w-full">
          <p className="mx-auto max-w-[880px] whitespace-pre-line text-[clamp(16px,2vw,24px)] font-medium leading-[1.6] text-black">
            {site.hero.description}
          </p>
        </Reveal>
      </section>
    </div>
  );
}
