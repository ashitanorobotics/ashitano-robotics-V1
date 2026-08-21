"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getSite, type Locale } from "@/constants/site";
import { displayTitleClassName } from "@/constants/typography";

gsap.registerPlugin(ScrollTrigger);

export default function UseCases({ locale }: { locale: Locale }) {
  const { useCases } = getSite(locale);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set(section, { backgroundColor: "#000000", color: "#ffffff" });
      } else {
        gsap.fromTo(
          section,
          { backgroundColor: "#fff6ec", color: "#1a1a1a" },
          {
            backgroundColor: "#000000",
            color: "#ffffff",
            ease: "power1.inOut",
            scrollTrigger: {
              trigger: section,
              start: "top 75%",
              end: "top 40%",
              scrub: 0.8,
            },
          },
        );
      }

      if (reduced) return;

      section.querySelectorAll<HTMLElement>('[data-anim="fade-in"]').forEach((el) => {
        gsap.set(el, { opacity: 0, y: 40 });
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="use-cases"
      ref={sectionRef}
      className="use-cases industries-section"
    >
      <div className="industries-container">
        <div className="industries-content">
          <div className="industries-heading">
            <h2 className={`${displayTitleClassName} industries-title`}>
              {useCases.title}
            </h2>
            {useCases.subtitle ? (
              <p className="subheading-2 industries-subtitle lg:heading-3">
                {useCases.subtitle}
              </p>
            ) : null}
          </div>

          <div className="industries-collection">
            <ul className="industries-list">
              {useCases.robots.map((robot) => (
                <li key={robot.type}>
                  <article
                    data-anim="fade-in"
                    data-industry="card"
                    className="industries-card"
                  >
                    <div className="industries-bg">
                      {robot.image ? (
                        <img
                          data-industry="image"
                          className="industries-image"
                          src={robot.image}
                          alt=""
                          loading="lazy"
                        />
                      ) : null}
                      <div className="industries-overlay" />
                    </div>
                    <div className="industries-text">
                      <div
                        data-industry="square"
                        className="industries-square"
                        aria-hidden
                      />
                      <div data-industry="text" className="industries-label">
                        {robot.title}
                      </div>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
