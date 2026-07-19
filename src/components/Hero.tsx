import Image from "next/image";
import fs from "fs";
import path from "path";
import { ArrowUpRight } from "lucide-react";
import { getSite, type Locale } from "@/constants/site";
import Reveal from "@/components/Reveal";
import MediaFrame from "@/components/MediaFrame";

function hasPublicFile(...parts: string[]) {
  return fs.existsSync(path.join(process.cwd(), "public", ...parts));
}

export default function Hero({ locale }: { locale: Locale }) {
  const site = getSite(locale);
  const hasDesktop = hasPublicFile("images", "hero-vision-desktop-v5.png");
  const desktopSrc = "/images/hero-vision-desktop-v5.png";
  const hasMobile = hasPublicFile("images", "hero-vision-mobile.png");
  const hasMedia = hasDesktop || hasMobile;
  const titleLines = site.hero.title.split("\n");

  return (
    <div className="pt-20">
      <section className="page-pad" aria-labelledby="hero-heading">
        <Reveal preset="hero-media" className="block w-full">
          <MediaFrame className="motion-hero-frame hero-frame bg-black">
            <div className="motion-hero-media absolute inset-0">
              {hasMedia ? (
                <>
                  {hasMobile ? (
                    <Image
                      src="/images/hero-vision-mobile.png"
                      alt={site.hero.alt}
                      fill
                      priority
                      quality={100}
                      unoptimized
                      sizes="100vw"
                      className="hero-image hero-image-mobile object-cover md:hidden"
                    />
                  ) : null}
                  {hasDesktop ? (
                    <Image
                      src={desktopSrc}
                      alt={site.hero.alt}
                      fill
                      priority
                      quality={100}
                      unoptimized
                      sizes="100vw"
                      className={
                        hasMobile
                          ? "hero-image hero-image-desktop hidden object-cover md:block"
                          : "hero-image hero-image-desktop object-cover"
                      }
                    />
                  ) : null}
                </>
              ) : (
                <div className="flex h-full items-center justify-center text-sm text-white/40">
                  /images/hero-vision-desktop-v5.png
                </div>
              )}
            </div>

            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/55 via-black/15 to-transparent"
              aria-hidden
            />

            <div className="relative flex h-full items-center p-6 sm:p-10 lg:p-14">
              <div>
                <h1
                  id="hero-heading"
                  className={`hero-heading text-[clamp(28px,4.2vw,56px)] font-normal leading-[1.2] tracking-[-0.02em] text-white ${locale === "ja" ? "break-keep" : "font-display"}`}
                >
                  {titleLines.map((line) => (
                    <span key={line} className="hero-title-line">
                      {line}
                    </span>
                  ))}
                </h1>
                <a
                  href="#request-demo-section"
                  className="primary-button primary-button-light mt-5 inline-flex items-center gap-1"
                >
                  {site.hero.cta}
                  <ArrowUpRight size={18} strokeWidth={2} />
                </a>
                <p className="mt-4 max-w-[520px] whitespace-pre-line text-[clamp(14px,1.4vw,16px)] font-normal leading-relaxed text-white/75">
                  {site.hero.sub}
                </p>
              </div>
            </div>
          </MediaFrame>
        </Reveal>
      </section>
    </div>
  );
}
