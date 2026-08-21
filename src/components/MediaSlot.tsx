import type { ReactNode } from "react";

export default function MediaSlot({
  className = "aspect-video",
  src,
  videoSrc,
  poster,
  alt = "",
  objectFit = "cover",
  objectPosition = "center",
  surface = "black",
  children,
}: {
  className?: string;
  src?: string;
  videoSrc?: string;
  poster?: string;
  alt?: string;
  objectFit?: "cover" | "contain";
  objectPosition?: string;
  surface?: "black" | "accent";
  children?: ReactNode;
}) {
  const fitClass = objectFit === "contain" ? "object-contain" : "object-cover";
  const surfaceClass = surface === "accent" ? "bg-accent" : "bg-black";
  const mediaStyle = { objectPosition };

  return (
    <div
      className={`relative overflow-hidden rounded-xl ${surfaceClass} ${className}`}
    >
      {videoSrc ? (
        <video
          src={videoSrc}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
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
