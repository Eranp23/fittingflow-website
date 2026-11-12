import { DemoButton, TrialButton } from "./ui";

/** Hero from the new design: headline over the gradient, with the dashboard in a glass frame. */
export default function Hero() {
  return (
    <section className="ff-hero-bg relative overflow-hidden pt-[124px] md:pt-[140px]">
      <div className="ff-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto max-w-[1320px] px-5 text-center lg:px-8">
        <h1 className="mx-auto max-w-4xl text-[34px] font-medium leading-[1.12] tracking-[-0.01em] text-white sm:text-5xl lg:text-[56px] [animation:ff-rise_.7s_ease-out_both]">
          Run your boutique. Get discovered. <span className="whitespace-nowrap">Grow your business.</span>
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/85 md:text-lg [animation:ff-rise_.7s_.08s_ease-out_both]">
          The all-in-one software for bridal boutiques and alteration shops: appointments, fittings, alterations, orders,
          payments and your own online storefront.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 [animation:ff-rise_.7s_.16s_ease-out_both]">
          <TrialButton variant="white" />
          <DemoButton variant="outlineWhite" />
        </div>
        <p className="mt-5 text-[13px] text-white/70 [animation:ff-rise_.7s_.2s_ease-out_both]">
          30-day free trial on every plan · Run and developed by{" "}
          <a href="/about" className="font-semibold text-white underline decoration-white/40 underline-offset-4 hover:decoration-white">
            Tekgaru
          </a>
        </p>

        <div className="relative mx-auto mt-10 max-w-[1180px] md:mt-14 [animation:ff-rise_.9s_.25s_ease-out_both]">
          <div className="rounded-t-[22px] border border-b-0 border-white/35 bg-white/15 p-2 pb-0 shadow-[0_40px_120px_rgba(10,16,80,0.45)] backdrop-blur-md md:rounded-t-[34px] md:p-3.5 md:pb-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/uploads/home2/dashboard.webp"
              alt="FittingFlow dashboard showing today's appointments, customers, alterations, tasks and revenue for a bridal boutique"
              width={1201}
              height={634}
              fetchPriority="high"
              className="block w-full rounded-t-[16px] md:rounded-t-[24px]"
            />
          </div>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[32%] bg-gradient-to-t from-white via-white/80 to-transparent" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
