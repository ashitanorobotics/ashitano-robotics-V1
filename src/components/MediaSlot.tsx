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

function pickSource(desktopSrc: string, mobileSrc?: string) {
  if (!mobileSrc || typeof window === "undefined") return desktopSrc;
  return window.matchMedia("(max-width: 1023px)").matches
    ? mobileSrc
    : desktopSrc;
}

export default function MediaSlot({
  className = "aspect-video",
  src,
  videoSrc,
  mobileVideoSrc,
  coverSrc,
  alt = "",
  objectFit = "cover",
  objectPosition = "center",
  surface = "black",
  eager = false,
  children,
}: {
  className?: string;
  src?: string;
  videoSrc?: string;
  mobileVideoSrc?: string;
  /** Opaque cover so iOS never shows its native play button. */
  coverSrc?: string;
  alt?: string;
  objectFit?: "cover" | "contain";
  objectPosition?: string;
  surface?: "black" | "accent";
  /** Load immediately (hero). Other videos wait until near viewport. */
  eager?: boolean;
  children?: ReactNode;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(eager);
  const [activeSrc, setActiveSrc] = useState(() =>
    videoSrc ? pickSource(videoSrc, mobileVideoSrc) : "",
  );
  const fitClass = objectFit === "contain" ? "object-contain" : "object-cover";
  const surfaceClass = surface === "accent" ? "bg-accent" : "bg-black";
  const mediaStyle = { objectPosition };
  const showCover = Boolean(videoSrc && coverSrc && !playing);

  useEffect(() => {
    if (!videoSrc) return;
    setActiveSrc(pickSource(videoSrc, mobileVideoSrc));
  }, [videoSrc, mobileVideoSrc]);

  // Defer attaching heavy video sources until near the viewport.
  useEffect(() => {
    if (!videoSrc || eager || shouldLoad) return;
    const root = rootRef.current;
    if (!root) return;

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldLoad(true);
          io.disconnect();
        }
      },
      { rootMargin: "400px 0px", threshold: 0.01 },
    );
    io.observe(root);
    return () => io.disconnect();
  }, [videoSrc, eager, shouldLoad]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !activeSrc || !shouldLoad) return;

    unlockAutoplay(video);
    setPlaying(false);

    const syncPlaying = () => {
      const ok = !video.paused && !video.ended && video.currentTime > 0.05;
      setPlaying(ok);
    };

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
      "timeupdate",
    ] as const;
    for (const event of mediaEvents) {
      video.addEventListener(event, syncPlaying);
    }
    for (const event of [
      "loadedmetadata",
      "loadeddata",
      "canplay",
      "canplaythrough",
      "playing",
    ] as const) {
      video.addEventListener(event, tryPlay);
    }

    const onVisibility = () => {
      if (document.visibilityState === "visible") tryPlay();
      else video.pause();
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
        else {
          video.pause();
          setPlaying(false);
        }
      },
      { threshold: [0, 0.15, 0.35] },
    );
    io.observe(video);

    const started = Date.now();
    const timer = window.setInterval(() => {
      tryPlay();
      if (!video.paused || Date.now() - started > 12000) {
        window.clearInterval(timer);
      }
    }, 400);

    return () => {
      for (const event of mediaEvents) {
        video.removeEventListener(event, syncPlaying);
      }
      for (const event of [
        "loadedmetadata",
        "loadeddata",
        "canplay",
        "canplaythrough",
        "playing",
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
  }, [activeSrc, shouldLoad]);

  return (
    <div
      ref={rootRef}
      className={`media-slot relative overflow-hidden rounded-xl ${surfaceClass} ${className}${playing ? " is-playing" : ""}`}
      onPointerDown={() => {
        const video = videoRef.current;
        if (video) void playVideo(video).then((ok) => ok && setPlaying(true));
      }}
    >
      {videoSrc ? (
        <>
          <video
            ref={videoRef}
            key={shouldLoad ? activeSrc : "deferred"}
            autoPlay
            muted
            loop
            playsInline
            preload={eager ? "metadata" : "none"}
            controls={false}
            disablePictureInPicture
            disableRemotePlayback
            aria-label={alt || undefined}
            className={`media-slot-video absolute inset-0 h-full w-full ${fitClass}${showCover ? " media-slot-video-pending" : ""}`}
            style={mediaStyle}
          >
            {shouldLoad && activeSrc ? (
              <source src={activeSrc} type="video/mp4" />
            ) : null}
          </video>
          {coverSrc ? (
            <img
              src={coverSrc}
              alt=""
              aria-hidden
              className={`media-slot-cover absolute inset-0 h-full w-full ${fitClass}${playing ? " is-hidden" : ""}`}
              style={mediaStyle}
              draggable={false}
            />
          ) : null}
        </>
      ) : src ? (
        <img
          src={src}
          alt={alt}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          className={`absolute inset-0 h-full w-full ${fitClass}`}
          style={mediaStyle}
        />
      ) : null}
      {children}
    </div>
  );
}
