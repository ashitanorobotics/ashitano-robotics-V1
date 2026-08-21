"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { INTRO_DONE_EVENT } from "@/constants/events";

function unlockAutoplay(video: HTMLVideoElement) {
  video.controls = false;
  video.muted = true;
  video.defaultMuted = true;
  video.playsInline = true;
  video.autoplay = true;
  video.setAttribute("muted", "");
  video.setAttribute("playsinline", "");
  video.setAttribute("webkit-playsinline", "");
  video.setAttribute("autoplay", "");
}

async function playVideo(video: HTMLVideoElement) {
  unlockAutoplay(video);
  if (!video.paused && !video.ended) return true;
  try {
    await video.play();
    return !video.paused;
  } catch {
    return false;
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
  const [playing, setPlaying] = useState(false);
  const fitClass = objectFit === "contain" ? "object-contain" : "object-cover";
  const surfaceClass = surface === "accent" ? "bg-accent" : "bg-black";
  const mediaStyle = { objectPosition };

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !videoSrc) return;

    unlockAutoplay(video);

    const syncPlaying = () => setPlaying(!video.paused && !video.ended);

    const tryPlay = () => {
      void playVideo(video).then((ok) => {
        if (ok) setPlaying(true);
        else syncPlaying();
      });
    };

    tryPlay();

    const mediaEvents = [
      "loadedmetadata",
      "loadeddata",
      "canplay",
      "canplaythrough",
      "playing",
      "pause",
      "ended",
      "suspend",
    ] as const;
    for (const event of mediaEvents) {
      video.addEventListener(event, syncPlaying);
    }
    for (const event of [
      "loadedmetadata",
      "loadeddata",
      "canplay",
      "canplaythrough",
    ] as const) {
      video.addEventListener(event, tryPlay);
    }

    const onVisibility = () => {
      if (document.visibilityState === "visible") tryPlay();
    };
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener(INTRO_DONE_EVENT, tryPlay);

    const unlockEvents = [
      "pointerdown",
      "touchstart",
      "touchend",
      "keydown",
      "scroll",
      "wheel",
    ] as const;
    const onGesture = () => tryPlay();
    for (const event of unlockEvents) {
      window.addEventListener(event, onGesture, { passive: true });
    }

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.some(
          (entry) => entry.isIntersecting && entry.intersectionRatio > 0,
        );
        if (visible) tryPlay();
      },
      { threshold: [0, 0.1, 0.25, 0.5] },
    );
    io.observe(video);

    const started = Date.now();
    const timer = window.setInterval(() => {
      tryPlay();
      if (!video.paused || Date.now() - started > 12000) {
        window.clearInterval(timer);
      }
    }, 300);

    return () => {
      for (const event of mediaEvents) {
        video.removeEventListener(event, syncPlaying);
      }
      for (const event of [
        "loadedmetadata",
        "loadeddata",
        "canplay",
        "canplaythrough",
      ] as const) {
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
      className={`media-slot relative overflow-hidden rounded-xl ${surfaceClass} ${className}${playing ? " is-playing" : ""}`}
      onPointerDown={() => {
        const video = videoRef.current;
        if (video) void playVideo(video).then((ok) => ok && setPlaying(true));
      }}
    >
      {videoSrc ? (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          controls={false}
          disablePictureInPicture
          disableRemotePlayback
          aria-label={alt || undefined}
          className={`media-slot-video absolute inset-0 h-full w-full ${fitClass}`}
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
