import { getSite, type Locale } from "@/constants/site";

export default function News({ locale }: { locale: Locale }) {
  const { news } = getSite(locale);
  const item = news.items[0];
  if (!item) return null;

  return (
    <section className="grid grid-cols-1 px-4 py-6 lg:px-6 lg:py-12 md:grid-cols-12">
      <article className="rounded-xl border border-black/10 bg-bg px-3 py-3 text-left md:col-span-8 md:col-start-3 lg:col-span-6 lg:col-start-4 lg:px-4 lg:py-4">
        <time
          dateTime={item.datetime}
          className="block text-xs leading-none text-muted lg:text-sm"
        >
          {item.date}
        </time>
        <h2 className="mt-2 text-sm font-normal leading-relaxed text-fg lg:text-[15px]">
          {item.title}
        </h2>
      </article>
    </section>
  );
}
