import type { CSSProperties, ReactNode } from "react";

/** FV・Vision などで共通の角丸メディアフレーム */
export default function MediaFrame({
  children,
  className = "",
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-[8px] ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}
