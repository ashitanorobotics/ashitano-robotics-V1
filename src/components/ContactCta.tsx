"use client";

import { FormEvent, useState } from "react";
import { site } from "@/constants/site";
import Reveal from "@/components/Reveal";

export default function ContactCta() {
  const [sentHint, setSentHint] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const email = String(data.get("email") || "");
    const company = String(data.get("company") || "");
    const role = String(data.get("role") || "");
    const message = String(data.get("message") || "");

    const subject = encodeURIComponent(`お問い合わせ（${company || site.nameEn}）`);
    const body = encodeURIComponent(
      [
        `メール: ${email}`,
        `会社・組織: ${company}`,
        `ご担当: ${role}`,
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
            className="text-[clamp(16px,4vw,48px)] font-bold leading-[1.33] tracking-[-0.02em] md:whitespace-nowrap"
          >
            {site.contact.title}
          </h2>
          <p className="mt-4 whitespace-pre-line text-[18px] leading-relaxed text-white/90">
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
              メールアドレス（必須）
            </span>
            <input
              required
              name="email"
              type="email"
              className="w-full rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-[var(--accent)] focus:shadow-[0_0_0_4px_rgba(3,136,183,0.15)]"
            />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm text-white/70">
              会社・組織名（必須）
            </span>
            <input
              required
              name="company"
              type="text"
              className="w-full rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-[var(--accent)] focus:shadow-[0_0_0_4px_rgba(3,136,183,0.15)]"
            />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm text-white/70">
              ご担当（任意）
            </span>
            <input
              name="role"
              type="text"
              className="w-full rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-[var(--accent)] focus:shadow-[0_0_0_4px_rgba(3,136,183,0.15)]"
            />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm text-white/70">
              メッセージ（任意）
            </span>
            <textarea
              name="message"
              rows={4}
              className="w-full resize-y rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-[var(--accent)] focus:shadow-[0_0_0_4px_rgba(3,136,183,0.15)]"
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
            送信する
          </button>
          {sentHint && (
            <p className="text-center text-sm text-white/60">
              メールアプリが開きます。送信先は {site.email} です。
            </p>
          )}
        </form>
      </Reveal>
    </section>
  );
}
