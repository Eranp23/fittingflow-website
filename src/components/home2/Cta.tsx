import { DemoButton, Eyebrow, TrialButton } from "./ui";

export default function Cta() {
  return (
    <section className="relative overflow-hidden bg-white px-5 pb-24 pt-10 text-center md:pb-28 lg:px-8">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[70%] bg-[linear-gradient(180deg,rgba(255,255,255,0)_0%,rgba(247,170,240,0.55)_60%,rgba(140,160,255,0.85)_100%)]" aria-hidden="true" />
      <div className="relative">
        <Eyebrow>Start in an afternoon</Eyebrow>
        <h2 className="mx-auto mt-5 max-w-3xl text-[32px] font-medium leading-tight tracking-[-0.01em] text-[#191E49] md:text-[46px]">
          Ready to simplify your boutique?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600 md:text-lg">
          From first setup to your first booking in a single afternoon. No training needed.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <TrialButton />
          <DemoButton className="bg-white/60" />
        </div>
      </div>
    </section>
  );
}
