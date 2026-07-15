import { site } from "@/constants/site";

export default function Footer() {
  return (
    <footer className="border-t border-black/10 bg-white">
      {/* 他セクションと同じ: 外側 page-pad → 内側 max 1280 */}
      <div className="page-pad">
        <div
          className="mx-auto py-14"
          style={{ maxWidth: 1280, width: "100%" }}
        >
          <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <div className="flex items-center gap-2.5 sm:gap-3">
                <span
                  className="h-7 w-7 shrink-0 rounded-full bg-black sm:h-8 sm:w-8 md:h-10 md:w-10"
                  aria-hidden
                />
                <p className="font-display text-base font-bold leading-[1.45] tracking-[-0.02em] text-black sm:text-lg md:text-2xl md:tracking-[-0.48px]">
                  {site.nameEn}
                </p>
              </div>
              <p className="mt-2 text-sm text-tertiary">{site.name}</p>
              <a
                href={`mailto:${site.email}`}
                className="mt-3 inline-block text-sm text-tertiary transition hover:text-black"
              >
                {site.email}
              </a>
            </div>
            <nav aria-label="フッター" className="sm:pt-1">
              <ul className="flex flex-col gap-3 sm:items-end">
                <li>
                  <a
                    href="#request-demo-section"
                    className="text-sm text-tertiary transition hover:text-black"
                  >
                    お問い合わせ
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          <p className="mt-14 text-center text-xs text-tertiary">
            {site.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
