"use client";

import { site } from "@/constants/site";

export default function Header() {
  return (
    <header className="site-header">
      <div className="header-inner">
        <a href="#" className="header-company">
          <svg
            className="company-logo"
            width="40"
            height="40"
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
