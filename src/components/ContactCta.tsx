"use client";

import { FormEvent, useState } from "react";
import { getSite, type Locale } from "@/constants/site";
import Reveal from "@/components/Reveal";

const inputClassName =
  "w-full rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-[var(--accent)] focus:shadow-[0_0_0_4px_rgba(3,136,183,0.15)]";

export default function ContactCta({ locale }: { locale: Locale }) {
  const site = getSite(locale);
  const { form } = site.contact;
  const [sentHint, setSentHint] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const email = String(data.get("email") || "");
    const company = String(data.get("company") || "");
    const role = String(data.get("role") || "");
    const message = String(data.get("message") || "");

    const subject = encodeURIComponent(
      `${form.subject} (${company || site.nameEn})`,
    );
    const body = encodeURIComponent(
      [
        `${form.bodyLabels.email}: ${email}`,
        `${form.bodyLabels.company}: ${company}`,
        `${form.bodyLabels.role}: ${role || "—"}`,
        "",
        message,
      ].join("\n"),
    );

    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
    setSentHint(true);
  };

  return (
    <section
      id="request-demo-section"
      className="bg-black px-6 py-[var(--section-y)] text-white lg:py-[var(--section-y-lg)]"
      aria-labelledby="contact-heading"
    >
      <Reveal>
        <div className="mx-auto max-w-[640px] text-center">
          <h2
            id="contact-heading"
            className="section-heading-lg mx-auto"
          >
            {site.contact.title}
          </h2>
          <p className="mt-6 text-[clamp(16px,1.8vw,22px)] leading-relaxed text-white/90">
            {site.contact.body}
          </p>
        </div>
      </Reveal>

      <Reveal delayMs={140}>
        <form
          className="mx-auto mt-10 max-w-[640px] space-y-4 text-left"
          onSubmit={onSubmit}
        >
          <label className="block">
            <span className="mb-2 block text-sm text-white/70">
              {form.email}
            </span>
            <input
              required
              name="email"
              type="email"
              autoComplete="email"
              className={inputClassName}
            />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm text-white/70">
              {form.company}
            </span>
            <input
              required
              name="company"
              type="text"
              autoComplete="organization"
              className={inputClassName}
            />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm text-white/70">
              {form.role}
            </span>
            <input name="role" type="text" className={inputClassName} />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm text-white/70">
              {form.message}
            </span>
            <textarea
              name="message"
              rows={4}
              placeholder={form.messagePlaceholder}
              className={`${inputClassName} resize-y`}
            />
          </label>

          <button
            type="submit"
            className="mt-4 flex w-full items-center justify-center rounded-[12px] border border-transparent bg-black px-6 py-3.5 text-base font-medium text-white shadow-[0_8px_40px_rgba(3,136,183,0.4)] transition hover:border-white md:hover:scale-[1.03]"
            style={{
              backgroundImage:
                "linear-gradient(#000,#000), linear-gradient(90deg,#0388b7,#00d4ff)",
              backgroundOrigin: "border-box",
              backgroundClip: "padding-box, border-box",
              border: "1px solid transparent",
            }}
          >
            {site.contact.submit}
          </button>
          {sentHint && (
            <p className="text-center text-sm text-white/60">
              {form.hint} {site.email}
            </p>
          )}
        </form>
      </Reveal>
    </section>
  );
}
