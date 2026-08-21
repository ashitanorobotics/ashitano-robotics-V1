"use client";

import { useState } from "react";
import { getSite, type Locale } from "@/constants/site";

export default function Faq({ locale }: { locale: Locale }) {
  const site = getSite(locale);
  const { faqs } = site;
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section
      id="faqs"
      className="faq-section scroll-mt-24 px-4 py-12 lg:px-6 lg:py-24"
    >
      <h2 className="faq-heading heading-1">{site.nav.faqs}</h2>
      <div className="faq-list">
        {faqs.map((item, index) => {
          const isOpen = open === index;
          return (
            <div key={item.question} className="faq-item">
              <button
                type="button"
                className="faq-trigger"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : index)}
              >
                <span>{item.question}</span>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  aria-hidden
                  className={`faq-chevron${isOpen ? " is-open" : ""}`}
                >
                  <path
                    d="M2 4.5 L6 8.5 L10 4.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.2"
                  />
                </svg>
              </button>
              <div className={`faq-panel${isOpen ? " is-open" : ""}`}>
                <div className="faq-panel-inner">
                  <p className="faq-answer">{item.answer}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
