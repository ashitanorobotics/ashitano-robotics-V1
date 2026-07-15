import { site } from "@/constants/site";

export default function Footer() {
  return (
    <footer className="border-t border-black/10 bg-white">
      <div className="page-pad mx-auto max-w-[1280px] py-14">
        <div className="flex flex-col gap-10 sm:flex-row sm:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-8 w-8 shrink-0 rounded-full bg-black" aria-hidden />
              <p className="font-display text-2xl font-bold text-black">
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
          <nav aria-label="フッター">
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
    </footer>
  );
}
