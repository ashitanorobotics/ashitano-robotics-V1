"use client";

import { useEffect, useRef, type ReactNode } from "react";

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

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");

    const tryPlay = () => {
      if (video.paused) {
        void video.play().catch(() => {
          // Autoplay may still be blocked; retry on later events.
        });
      }
    };

    tryPlay();
    video.addEventListener("loadeddata", tryPlay);
    video.addEventListener("canplay", tryPlay);

    const onVisibility = () => {
      if (document.visibilityState === "visible") tryPlay();
    };
    document.addEventListener("visibilitychange", onVisibility);

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) tryPlay();
      },
      { threshold: 0.2 },
    );
    io.observe(video);

    return () => {
      video.removeEventListener("loadeddata", tryPlay);
      video.removeEventListener("canplay", tryPlay);
      document.removeEventListener("visibilitychange", onVisibility);
      io.disconnect();
    };
  }, [videoSrc]);

  return (
    <div
      className={`relative overflow-hidden rounded-xl ${surfaceClass} ${className}`}
    >
      {videoSrc ? (
        <video
          ref={videoRef}
          src={videoSrc}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          controls={false}
          disablePictureInPicture
          aria-label={alt || undefined}
          className={`absolute inset-0 h-full w-full ${fitClass}`}
          style={mediaStyle}
        />
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
