"use client";

import { site } from "@/constants/site";

export default function Header() {
  return (
    <header className="site-header">
      <div className="header-inner">
        <a href="#" className="header-company">
          <span className="company-logo rounded-full bg-black" aria-hidden />
          <span className="company-name">{site.nameEn}</span>
        </a>

        <div className="header-center-desktop" aria-hidden>
          <div className="header-center-content">
            <span className="header-product">{site.productLine}</span>
            <span className="center-divider">|</span>
            <span className="center-description">{site.headerCaption}</span>
          </div>
        </div>

        <div className="header-buttons">
          <a href="#request-demo-section" className="primary-button">
            お問い合わせ
          </a>
        </div>
      </div>
    </header>
  );
}
