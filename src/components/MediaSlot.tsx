"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { INTRO_DONE_EVENT } from "@/constants/events";

function unlockAutoplay(video: HTMLVideoElement) {
  video.muted = true;
  video.defaultMuted = true;
  video.playsInline = true;
  video.setAttribute("muted", "");
  video.setAttribute("playsinline", "");
  video.setAttribute("webkit-playsinline", "");
}

async function playVideo(video: HTMLVideoElement) {
  unlockAutoplay(video);
  if (!video.paused && !video.ended) return;
  try {
    await video.play();
  } catch {
    // Will retry on later events / user gesture.
  }
}

export default function MediaSlot({
  className = "aspect-video",
  src,
  videoSrc,
  alt = "",
  objectFit = "cover",
  objectPosition = "center",
  surface = "black",
  children,
}: {
  className?: string;
  src?: string;
  videoSrc?: string;
  alt?: string;
  objectFit?: "cover" | "contain";
  objectPosition?: string;
  surface?: "black" | "accent";
  children?: ReactNode;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const fitClass = objectFit === "contain" ? "object-contain" : "object-cover";
  const surfaceClass = surface === "accent" ? "bg-accent" : "bg-black";
  const mediaStyle = { objectPosition };

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !videoSrc) return;

    unlockAutoplay(video);

    const tryPlay = () => {
      void playVideo(video);
    };

    tryPlay();
    if (video.readyState < 2) {
      video.load();
    }

    const events = [
      "loadedmetadata",
      "loadeddata",
      "canplay",
      "canplaythrough",
      "playing",
      "suspend",
    ] as const;
    for (const event of events) {
      video.addEventListener(event, tryPlay);
    }

    const onVisibility = () => {
      if (document.visibilityState === "visible") tryPlay();
    };
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener(INTRO_DONE_EVENT, tryPlay);

    // iOS often blocks the first play until a gesture; unlock on first input.
    const unlockEvents = ["pointerdown", "touchstart", "keydown", "scroll"] as const;
    const onGesture = () => tryPlay();
    for (const event of unlockEvents) {
      window.addEventListener(event, onGesture, { passive: true });
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting && entry.intersectionRatio > 0)) {
          tryPlay();
        }
      },
      { threshold: [0, 0.1, 0.25, 0.5] },
    );
    io.observe(video);

    // Keep retrying briefly after mount / intro reveal.
    const started = Date.now();
    const timer = window.setInterval(() => {
      tryPlay();
      if (!video.paused || Date.now() - started > 8000) {
        window.clearInterval(timer);
      }
    }, 400);

    return () => {
      for (const event of events) {
        video.removeEventListener(event, tryPlay);
      }
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener(INTRO_DONE_EVENT, tryPlay);
      for (const event of unlockEvents) {
        window.removeEventListener(event, onGesture);
      }
      io.disconnect();
      window.clearInterval(timer);
    };
  }, [videoSrc]);

  return (
    <div
      className={`relative overflow-hidden rounded-xl ${surfaceClass} ${className}`}
    >
      {videoSrc ? (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          disablePictureInPicture
          aria-label={alt || undefined}
          className={`absolute inset-0 h-full w-full ${fitClass}`}
          style={mediaStyle}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      ) : src ? (
        <img
          src={src}
          alt={alt}
          className={`absolute inset-0 h-full w-full ${fitClass}`}
          style={mediaStyle}
        />
      ) : null}
      {children}
    </div>
  );
}
