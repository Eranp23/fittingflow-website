import { Eyebrow } from "./ui";

/** Tool icons exported from the Figma design, with the FittingFlow mark in the middle. */
export default function Integrations() {
  return (
    <section className="bg-white px-5 py-20 text-center md:py-24 lg:px-8">
      <Eyebrow>Built on everything you connect</Eyebrow>
      <h2 className="mx-auto mt-5 max-w-3xl text-[32px] font-medium leading-tight tracking-[-0.01em] text-[#191E49] md:text-[44px]">
        Seamlessly connect the tools you already use
      </h2>
      <div className="mx-auto mt-12 flex max-w-[1240px] flex-col items-center justify-center gap-5 lg:flex-row lg:gap-7">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/uploads/home2/tools-left.png" alt="Google Calendar, Google, Squarespace, PayPal and Stripe" width={810} height={141} loading="lazy" className="order-2 h-auto w-full max-w-[460px] lg:order-none lg:min-w-0 lg:flex-1 lg:max-w-[520px]" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/uploads/home2/ff-mark.webp" alt="FittingFlow" width={116} height={116} className="order-1 h-[96px] w-[96px] shrink-0 rounded-full shadow-[0_18px_44px_rgba(242,45,206,0.4)] lg:order-none lg:h-[116px] lg:w-[116px]" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/uploads/home2/tools-right.png" alt="Chat, Facebook, Outlook, WhatsApp and notifications" width={810} height={141} loading="lazy" className="order-3 h-auto w-full max-w-[460px] lg:order-none lg:min-w-0 lg:flex-1 lg:max-w-[520px]" />
      </div>
      <p className="mx-auto mt-10 max-w-xl text-base leading-relaxed text-slate-500">
        From scheduling and payments to notifications and chat, integrate everything you need to run your business
        smoothly in one place.
      </p>
    </section>
  );
}
