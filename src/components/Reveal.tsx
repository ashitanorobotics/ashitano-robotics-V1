"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delayMs?: number;
  /** Use CSS keyframe animations instead of the default opacity/transform transition. */
  preset?: "rise" | "hero-media" | "hero-title" | "hero-line";
};

export default function Reveal({
  children,
  className = "",
  delayMs = 0,
  preset = "rise",
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.18, rootMargin: "0px 0px -10% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const presetClass =
    preset === "rise"
      ? "reveal-rise"
      : preset === "hero-media"
        ? "reveal-hero-media"
        : preset === "hero-title"
          ? "reveal-hero-title"
          : "reveal-hero-line";

  return (
    <div
      ref={ref}
      className={`reveal ${presetClass} ${visible ? "reveal-visible" : ""} ${className}`.trim()}
      style={
        visible && delayMs > 0
          ? ({
              transitionDelay: `${delayMs}ms`,
              animationDelay: `${delayMs}ms`,
            } satisfies CSSProperties)
          : undefined
      }
    >
      {children}
    </div>
  );
}
