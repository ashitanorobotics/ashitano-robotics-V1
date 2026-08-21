"use client";

import { useEffect, useRef, useState } from "react";
import { displayTitleClassName } from "@/constants/typography";
import { getSite, type Locale } from "@/constants/site";
import MediaSlot from "@/components/MediaSlot";

const titleClassName = displayTitleClassName;

type HeroMetrics = {
  baseTop: number;
  titleHeight: number;
  travel: number;
  moveDistance: number;
};

export default function Hero({ locale }: { locale: Locale }) {
  const site = getSite(locale);
  const { mission } = site;
  const titleLines = site.hero.title.split("\n");
  const sectionRef = useRef<HTMLElement>(null);
  const spacerRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const metricsRef = useRef<HeroMetrics | null>(null);
  const [useMotion, setUseMotion] = useState(true);

  useEffect(() => {
    const section = sectionRef.current;
    const spacer = spacerRef.current;
    const media = mediaRef.current;
    const title = titleRef.current;
    if (!section || !spacer || !media || !title) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion) {
      setUseMotion(false);
      return;
    }

    setUseMotion(true);

    const measure = () => {
      const spacerRect = spacer.getBoundingClientRect();
      const mediaRect = media.getBoundingClientRect();
      const titleHeight = spacerRect.height;
      const baseTop = spacerRect.top;
      const targetTop = mediaRect.top + mediaRect.height / 2 - titleHeight / 2;
      const travel = Math.max(0, targetTop - baseTop);

      metricsRef.current = {
        baseTop,
        titleHeight,
        travel,
        moveDistance: travel > 0 ? travel : window.innerHeight * 0.35,
      };
      title.style.top = `${baseTop}px`;
    };

    let raf = 0;
    let ticking = false;

    const update = () => {
      ticking = false;
      if (!metricsRef.current) return;

      const metrics = metricsRef.current;
      const scrollY = window.scrollY;
      const sectionRect = section.getBoundingClientRect();
      const mediaRect = media.getBoundingClientRect();

      if (sectionRect.bottom <= 0) {
        title.style.visibility = "hidden";
        title.style.opacity = "0";
        return;
      }

      title.style.visibility = "visible";

      const translateY =
        scrollY <= metrics.moveDistance
          ? (scrollY / metrics.moveDistance) * metrics.travel
          : metrics.travel + (scrollY - metrics.moveDistance);

      const currentTop = metrics.baseTop + translateY;
      const titleBottom = currentTop + metrics.titleHeight;
      const centerY = currentTop + metrics.titleHeight / 2;

      const overlap =
        Math.min(titleBottom, mediaRect.bottom) -
        Math.max(currentTop, mediaRect.top);
      const inMedia = overlap > metrics.titleHeight * 0.25;

      const isMobile = window.innerWidth < 1024;
      let opacity = 1;

      if (isMobile) {
        const fadeStartY = window.innerHeight * 0.36;
        const fadeLen = window.innerHeight * 0.04;
        if (centerY >= fadeStartY) {
          opacity = Math.max(0, 1 - (centerY - fadeStartY) / fadeLen);
        }

        const fadeScrollStart = metrics.moveDistance * 0.35;
        const fadeScrollLen = window.innerHeight * 0.045;
        if (scrollY >= fadeScrollStart) {
          opacity = Math.min(
            opacity,
            Math.max(0, 1 - (scrollY - fadeScrollStart) / fadeScrollLen),
          );
        }
      } else {
        const fadeStart = window.innerHeight * 0.5;
        const fadeDistance = window.innerHeight * 0.18;

        if (centerY >= fadeStart) {
          opacity = Math.max(0, 1 - (centerY - fadeStart) / fadeDistance);
        }

        if (scrollY >= metrics.moveDistance) {
          const fadeByScroll = Math.min(
            1,
            (scrollY - metrics.moveDistance) / (window.innerHeight * 0.22),
          );
          opacity = Math.min(opacity, 1 - fadeByScroll);
        }
      }

      title.style.transform = `translate3d(0, ${translateY}px, 0)`;
      title.style.opacity = String(opacity);
      title.style.color = inMedia ? "#ffffff" : "var(--fg)";
      title.style.textShadow = inMedia
        ? "0 2px 24px rgba(0, 0, 0, 0.35)"
        : "none";

      if (opacity <= 0.01) {
        title.style.visibility = "hidden";
      }
    };

    const onScroll = () => {
      if (window.scrollY <= 0) {
        measure();
      }
      if (!ticking) {
        ticking = true;
        raf = requestAnimationFrame(update);
      }
    };

    const onResize = () => {
      measure();
      onScroll();
    };

    title.style.willChange = "transform, opacity";
    measure();
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(raf);
    };
  }, []);

  const titleContent = titleLines.map((line) => (
    <span key={line} className="block">
      {line}
    </span>
  ));

  return (
    <section ref={sectionRef} id="introduction" className="relative">
      <div className="pt-24 lg:pt-28">
        <div className="px-4 lg:px-6">
          {useMotion ? (
            <div
              ref={spacerRef}
              aria-hidden="true"
              className={`${titleClassName} pointer-events-none invisible`}
            >
              {titleContent}
            </div>
          ) : (
            <h1 className={titleClassName}>{titleContent}</h1>
          )}
          <div ref={mediaRef} className="mt-6 lg:mt-8">
            <MediaSlot
              className="aspect-video w-full lg:aspect-[2/1]"
              videoSrc="/videos/hero.mp4"
              alt={site.hero.alt}
              objectPosition="center center"
            />
          </div>
          <p className="heading-2 mt-6 lg:mt-8">{mission.body}</p>
        </div>
      </div>

      {useMotion ? (
        <h1
          ref={titleRef}
          className={`${titleClassName} pointer-events-none fixed inset-x-0 z-10 px-4 lg:px-6`}
        >
          {titleContent}
        </h1>
      ) : null}
    </section>
  );
}
