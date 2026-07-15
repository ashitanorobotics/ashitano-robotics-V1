import Image from "next/image";
import fs from "fs";
import path from "path";
import { site } from "@/constants/site";

function hasPublicFile(...parts: string[]) {
  return fs.existsSync(path.join(process.cwd(), "public", ...parts));
}

export default function Hero() {
  const hasDesktop = hasPublicFile("images", "hero-vision.png");
  const hasMobileVideo = hasPublicFile("videos", "hero-vision-mobile.mp4");
  const hasMedia = hasDesktop || hasMobileVideo;

  return (
    <div className="pt-[88px]">
      <section className="page-pad" aria-label="メインビジュアル">
        <div
          className="relative overflow-hidden rounded-[24px] bg-white"
          style={{ height: "calc(100vh - 112px)" }}
        >
          {hasMedia ? (
            <>
              {hasMobileVideo ? (
                <video
                  className="absolute inset-0 h-full w-full object-cover object-center md:hidden"
                  src="/videos/hero-vision-mobile.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  aria-label="人とヒューマノイドロボットが並び、未来を見据える様子"
                />
              ) : null}
              {hasDesktop ? (
                <Image
                  src="/images/hero-vision.png"
                  alt="人とヒューマノイドロボットが並び、未来を見据える様子"
                  fill
                  priority
                  sizes="100vw"
                  className={
                    hasMobileVideo
                      ? "hidden object-cover object-center md:block"
                      : "object-cover object-center"
                  }
                />
              ) : null}
            </>
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-black/40">
              /images/hero-vision.png
            </div>
          )}
        </div>
      </section>

      <section
        className="page-pad section-block flex flex-col items-center gap-6 text-center"
        aria-labelledby="hero-heading"
      >
        <h1
          id="hero-heading"
          className="font-display whitespace-nowrap text-[clamp(28px,6vw,64px)] font-bold leading-[1.15] tracking-[-0.03em] text-black"
        >
          {site.nameEn}
        </h1>
        <p className="text-[18px] font-normal leading-[1.5] text-black sm:text-[20px]">
          {site.hero.subtitle}
        </p>
        <p className="max-w-[880px] text-[clamp(16px,2vw,24px)] font-medium leading-[1.6] text-black">
          {site.hero.description}
        </p>
      </section>
    </div>
  );
}
