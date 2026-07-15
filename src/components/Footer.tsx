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
                <svg
                  className="company-logo h-7 w-7 sm:h-8 sm:w-8 md:h-10 md:w-10"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden
                >
                  <path
                    d="M26.1818 0H13.8182C6.18661 0 0 6.18661 0 13.8182V26.1818C0 33.8134 6.18661 40 13.8182 40H26.1818C33.8134 40 40 33.8134 40 26.1818V13.8182C40 6.18661 33.8134 0 26.1818 0Z"
                    fill="black"
                  />
                  <path
                    d="M32 20C32 26.6274 26.6274 32 20 32C13.3726 32 8 26.6274 8 20C8 13.3726 13.3726 8 20 8C26.6274 8 32 13.3726 32 20ZM11.9224 20C11.9224 24.4612 15.5388 28.0776 20 28.0776C24.4612 28.0776 28.0776 24.4612 28.0776 20C28.0776 15.5388 24.4612 11.9224 20 11.9224C15.5388 11.9224 11.9224 15.5388 11.9224 20Z"
                    fill="white"
                  />
                </svg>
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
