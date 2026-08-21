"use client";

import { useEffect, useState } from "react";
import { site } from "@/constants/site";

const STORAGE_KEY = "ashitano-intro-seen";

export default function IntroLoader() {
  const [visible, setVisible] = useState(true);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(false);
      return;
    }

    try {
      if (sessionStorage.getItem(STORAGE_KEY) === "1") {
        setVisible(false);
        return;
      }
    } catch {
      // ignore
    }

    const hide = window.setTimeout(() => {
      setDone(true);
      try {
        sessionStorage.setItem(STORAGE_KEY, "1");
      } catch {
        // ignore
      }
    }, 1400);

    const remove = window.setTimeout(() => setVisible(false), 2300);

    return () => {
      window.clearTimeout(hide);
      window.clearTimeout(remove);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`intro-loader${done ? " is-done" : ""}`}
      aria-hidden="true"
    >
      <div className="intro-brand">
        <img src="/images/logo-mark.png" alt="" />
        <span>{site.nameEn}</span>
      </div>
    </div>
  );
}
