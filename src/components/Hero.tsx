import Image from "next/image";
import fs from "fs";
import path from "path";
import { ArrowUpRight } from "lucide-react";
import { getSite, type Locale } from "@/constants/site";
import Reveal from "@/components/Reveal";

function hasPublicFile(...parts: string[]) {
  return fs.existsSync(path.join(process.cwd(), "public", ...parts));
}

export default function Hero({ locale }: { locale: Locale }) {
  const site = getSite(locale);
  const hasDesktop = hasPublicFile("images", "hero-vision-desktop-v3.png");
  const hasMobile = hasPublicFile("images", "hero-vision-mobile.png");
  const hasMedia = hasDesktop || hasMobile;

  return (
    <div className="pt-20">
      <section className="page-pad" aria-labelledby="hero-heading">
        <Reveal preset="hero-media" className="block w-full">
          <div
            className="motion-hero-frame relative overflow-hidden rounded-[24px] bg-black"
            style={{ height: "calc(100vh - 112px)" }}
          >
            <div className="motion-hero-media absolute inset-0">
              {hasMedia ? (
                <>
                  {hasMobile ? (
                    <Image
                      src="/images/hero-vision-mobile.png"
                      alt={site.hero.alt}
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
                      alt={site.hero.alt}
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
                <div className="flex h-full items-center justify-center text-sm text-white/40">
                  /images/hero-vision-desktop-v3.png
                </div>
              )}
            </div>

            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent"
              aria-hidden
            />

            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10 lg:p-14">
              <div className="flex flex-col items-start gap-8">
                <h1
                  id="hero-heading"
                    className="font-display whitespace-pre-line text-[clamp(34px,5.5vw,76px)] font-normal leading-[1.1] tracking-[-0.02em] text-white"
                >
                  {site.hero.title}
                </h1>
                <a
                  href="#request-demo-section"
                  className="primary-button primary-button-light inline-flex items-center gap-1.5"
                >
                  {site.hero.cta}
                  <ArrowUpRight size={18} strokeWidth={2} />
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
