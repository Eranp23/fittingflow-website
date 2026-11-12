import { Check } from "lucide-react";
import { TrialButton } from "./ui";

/** Digital pickup signature spotlight (Natella, Nov 11). Picture is from the design until a real app screenshot is supplied. */
export default function Pickup() {
  return (
    <section id="pickup-signature" className="scroll-mt-24 bg-white px-5 pt-20 md:pt-28 lg:px-8">
      <div className="mx-auto grid max-w-[1320px] items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="relative mx-auto aspect-[10/9] w-full max-w-[640px]">
          <div className="absolute -inset-3 -z-10 rounded-[36px] bg-gradient-to-br from-[#FFEDF9] to-[#EEF1FF]" aria-hidden="true" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/uploads/features/photos/digital-pickup-signature.webp" alt="A customer signs on a tablet to confirm pickup of her gown" width={483} height={307} loading="lazy"
            className="absolute left-0 top-0 w-[68%] rounded-[20px] shadow-[0_20px_50px_rgba(25,30,73,0.2)]" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/uploads/features/digital-pickup-signature.webp" alt="Pickup confirmation screen in FittingFlow with the customer's signature, items picked up and a receipt" width={1012} height={860} loading="lazy"
            className="absolute bottom-0 right-0 w-[76%] rounded-[24px] shadow-[0_30px_70px_rgba(25,30,73,0.3)]" />
        </div>
        <div>
          <p className="inline-flex rounded-full border border-[#3764F3]/25 bg-white px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-[#3764F3]">
            Included with every plan
          </p>
          <h2 className="mt-5 text-[32px] font-bold leading-[1.1] tracking-[-0.01em] text-[#191E49] md:text-[44px]">
            Digital pickup signature
          </h2>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-[#191E49]/80">
            Make pickups simple and secure. Capture customer signatures digitally when orders are collected and keep a
            record of every pickup.
          </p>
          <ul className="mt-6 space-y-3">
            {["Customers sign electronically at pickup", "A pickup receipt for every order", "Time-stamped records you can look up later"].map((t) => (
              <li key={t} className="flex items-center gap-3 text-base text-[#191E49]/85">
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#22C55E] text-white"><Check className="h-4 w-4" strokeWidth={3} /></span>
                {t}
              </li>
            ))}
          </ul>
          <TrialButton className="mt-8" />
        </div>
      </div>
    </section>
  );
}
