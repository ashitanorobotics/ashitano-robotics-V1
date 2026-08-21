import { getSite, type Locale } from "@/constants/site";
import MediaSlot from "@/components/MediaSlot";

export default function Technology({ locale }: { locale: Locale }) {
  const { business, implementation } = getSite(locale);
  const phases = implementation.schedule.phases;

  return (
    <section id="technology" className="px-4 pb-16 lg:px-6 lg:pb-24">
      <MediaSlot
        className="min-h-[52svh] w-full lg:min-h-0 lg:aspect-[2/1]"
        videoSrc="/videos/technology.mp4"
        alt=""
      >
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/25"
          aria-hidden
        />
        <div className="absolute inset-0 flex flex-col justify-end gap-4 p-4 text-left text-white lg:gap-5 lg:p-6">
          <p className="heading-2 text-white">{business.service}</p>
          <div className="flex flex-col gap-2 text-sm leading-relaxed text-white/85 lg:text-base">
            {business.serviceDetails.slice(0, 2).map((detail) => (
              <p key={detail}>{detail}</p>
            ))}
          </div>
        </div>
      </MediaSlot>

      <div className="mt-2 flex flex-col gap-2 lg:grid lg:grid-cols-3">
        <div className="flex aspect-video w-full flex-col justify-between rounded-xl border border-black/10 bg-transparent p-3 lg:p-4">
          {phases.map((phase) => (
            <div key={phase.step}>
              <p className="text-sm leading-snug tracking-[-0.025em] text-fg lg:text-base">
                {phase.title}
              </p>
              <p className="mt-0.5 text-xs leading-[1.4] text-muted">
                {phase.items.slice(0, 2).join("、")}
              </p>
            </div>
          ))}
        </div>

        <div className="flex w-full flex-col gap-2 lg:contents">
          <MediaSlot
            className="aspect-video w-full"
            src="/images/go2-simulation.png"
            alt=""
          />
          <MediaSlot
            className="aspect-video w-full"
            src="/images/point-cloud.png"
            alt=""
          />
        </div>
      </div>
    </section>
  );
}
