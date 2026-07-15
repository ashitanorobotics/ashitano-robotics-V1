"use client";

import { site } from "@/constants/site";

export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-[1001] h-20 bg-header backdrop-blur-[10px]">
      <div className="flex h-full items-center justify-between gap-4 px-6">
        <a href="#" className="flex min-w-0 items-center gap-2.5 sm:gap-3">
          <span
            className="h-7 w-7 shrink-0 rounded-full bg-black sm:h-8 sm:w-8 md:h-10 md:w-10"
            aria-hidden
          />
          <span className="font-display min-w-0 truncate text-base font-bold leading-[1.45] tracking-[-0.02em] text-black sm:text-lg md:text-2xl md:tracking-[-0.48px]">
            {site.nameEn}
          </span>
        </a>

        <div className="pointer-events-none absolute left-1/2 hidden max-w-[min(52vw,640px)] -translate-x-1/2 items-center gap-3 lg:flex">
          <span className="font-display text-lg font-semibold text-black">
            {site.productLine}
          </span>
          <span className="text-black/25" aria-hidden>
            |
          </span>
          <span className="truncate text-base font-normal text-black/80">
            {site.headerCaption}
          </span>
        </div>

        <a
          href="#request-demo-section"
          className="shrink-0 rounded-[12px] bg-black px-4 py-2.5 text-base font-medium tracking-[-0.08px] text-white transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-[#333]"
        >
          お問い合わせ
        </a>
      </div>
    </header>
  );
}
