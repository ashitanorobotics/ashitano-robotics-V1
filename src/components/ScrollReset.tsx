"use client";

import { useEffect } from "react";

/** Prevent browser from restoring previous scroll position on reload. */
export default function ScrollReset() {
  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    // Hash links (#request-demo-section) should still jump to the section.
    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }
  }, []);

  return null;
}
