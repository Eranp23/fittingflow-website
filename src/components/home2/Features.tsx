"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft, ArrowRight, BarChart3, CalendarDays, ClipboardCheck, CreditCard, Images, Mail, MessageSquareText, Package, PenLine, Scissors, Sparkles, Users,
  type LucideIcon,
} from "lucide-react";
import { Eyebrow } from "./ui";

type Feature = { id: string; name: string; line: string; cta: string; icon: LucideIcon; tag?: string; screen?: boolean };

/** `screen: true` = an app screen exists (shown on top of the photo). The rest show the photo until screens arrive. */
const features: Feature[] = [
  { id: "appointment-scheduling", name: "Appointment scheduling", line: "Online booking, suite and staff calendars, synced with Google Calendar.", cta: "Explore scheduling", icon: CalendarDays, screen: true },
  { id: "alterations-measurements", name: "Alterations & measurements", line: "Save measurements, track every garment and never miss a due date.", cta: "Explore alterations", icon: Scissors, tag: "Professional & Business", screen: true },
  { id: "inventory-orders", name: "Inventory & orders", line: "See what is in stock, on order and arriving for each client.", cta: "Explore inventory", icon: Package, screen: true },
  { id: "pos-stripe-square", name: "POS: Stripe & Square", line: "Take payments, update balances and send receipts in seconds.", cta: "Explore payments", icon: CreditCard, screen: true },
  { id: "customer-portal-chat", name: "Customer portal & chat", line: "Clients see appointments, balances and messages in one place.", cta: "Explore the portal", icon: MessageSquareText, tag: "Professional & Business", screen: true },
  { id: "staff-time-off", name: "Staff & time off", line: "Plan shifts, availability, vacations and store closure dates.", cta: "Explore staff tools", icon: Users, screen: true },
  { id: "marketing-email", name: "Marketing & email automation", line: "Birthday and holiday greetings, promotional emails and reminders.", cta: "Explore marketing", icon: Mail, tag: "Campaigns: Professional & Business", screen: true },
  { id: "digital-pickup-signature", name: "Digital pickup signatures", line: "Customers sign at pickup to acknowledge receipt of their purchases.", cta: "Explore pickups", icon: PenLine, screen: true },
  { id: "task-board", name: "Task board", line: "Organize daily work and keep your team on track.", cta: "Explore tasks", icon: ClipboardCheck, screen: true },
  { id: "reports-analytics", name: "Reports & analytics", line: "Track bookings, sales and business performance.", cta: "Explore reports", icon: BarChart3, screen: true },
  { id: "style-board", name: "Style board & gallery", line: "Organize garment images and customer inspiration.", cta: "Explore style boards", icon: Images, tag: "Professional & Business", screen: true },
  { id: "ai-assistant", name: "Connect your AI assistant", line: "Let a compatible external AI assistant create appointments.", cta: "Ask us about it", icon: Sparkles, screen: true },
];

const ROTATE_MS = 6500;

/**
 * Combined features section (Natella, Nov 11): one big picture — boutique photo with the app screen on top —
 * and the text on one side. Phones: arrows on the picture, swipe, and dots, with the text right under it.
 */
export default function Features() {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const [inView, setInView] = useState(false);
  const section = useRef<HTMLElement>(null);
  const touchX = useRef<number | null>(null);

  useEffect(() => {
    const el = section.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!auto || !inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setTimeout(() => setActive((i) => (i + 1) % features.length), ROTATE_MS);
    return () => clearTimeout(t);
  }, [active, auto, inView]);

  const go = (i: number) => {
    setAuto(false);
    setActive((i + features.length) % features.length);
  };
  const current = features[active];
  const arrow = "grid place-items-center rounded-full bg-white text-[#191E49] shadow-lg transition hover:scale-105";

  return (
    <section
      ref={section}
      id="features"
      className="relative scroll-mt-20 overflow-hidden bg-[#161A42] py-16 text-white md:py-28"
      onMouseEnter={() => setAuto(false)}
    >
      <div className="pointer-events-none absolute -left-40 top-10 h-[520px] w-[520px] rounded-full bg-[#7A3BFF]/30 blur-[140px]" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-[520px] w-[520px] rounded-full bg-[#F22DCE]/20 blur-[150px]" aria-hidden="true" />

      <div className="relative mx-auto max-w-[1320px] px-5 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <Eyebrow dark>Explore the platform</Eyebrow>
          <h2 className="mt-5 text-[30px] font-medium leading-tight tracking-[-0.01em] text-white md:text-[46px]">
            Everything You Need to Run Your Boutique
          </h2>
          <p className="mt-4 text-base text-white/70 md:text-lg">
            Built around real boutique needs, from the first fitting to the final pickup.
          </p>
        </div>

        <div className="mt-8 grid items-center gap-5 lg:mt-16 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          {/* Picture */}
          <div className="relative mx-auto w-full max-w-[720px]">
            <div
              className="relative aspect-[10/9] w-full touch-pan-y"
              onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
              onTouchEnd={(e) => {
                if (touchX.current === null) return;
                const dx = e.changedTouches[0].clientX - touchX.current;
                touchX.current = null;
                if (Math.abs(dx) > 40) go(active + (dx < 0 ? 1 : -1));
              }}
            >
              {features.map((f, i) => (
                <div
                  key={f.id}
                  aria-hidden={i !== active}
                  className={`absolute inset-0 transition-all duration-700 ease-out ${
                    i === active ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
                  }`}
                >
                  {f.screen ? (
                    <>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={`/uploads/features/photos/${f.id}.webp`} alt={i === active ? `${f.name} in a bridal boutique` : ""} width={483} height={307} loading="lazy"
                        className="absolute left-0 top-0 w-[70%] rounded-[20px] object-cover shadow-[0_24px_60px_rgba(0,0,0,0.35)] ring-1 ring-white/15" />
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={`/uploads/features/${f.id}.webp`} alt={i === active ? `${f.name} screen in FittingFlow` : ""} width={1012} height={860} loading="lazy"
                        className="absolute bottom-0 right-0 w-[74%] rounded-[24px] shadow-[0_40px_90px_rgba(0,0,0,0.5)] ring-1 ring-white/20" />
                    </>
                  ) : (
                    <div className="flex h-full items-center">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={`/uploads/features/photos/${f.id}.webp`} alt={i === active ? `${f.name} in FittingFlow` : ""} width={483} height={307} loading="lazy"
                        className="w-full rounded-[24px] shadow-[0_40px_90px_rgba(0,0,0,0.5)] ring-1 ring-white/20" />
                    </div>
                  )}
                </div>
              ))}
              {/* Phone arrows, on the picture so they stay in view */}
              <button type="button" onClick={() => go(active - 1)} aria-label="Previous feature" className={`${arrow} absolute -left-2 top-1/2 h-9 w-9 -translate-y-1/2 lg:hidden`}>
                <ArrowLeft className="h-4 w-4" />
              </button>
              <button type="button" onClick={() => go(active + 1)} aria-label="Next feature" className={`${arrow} absolute -right-2 top-1/2 h-9 w-9 -translate-y-1/2 lg:hidden`}>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            {/* Phone: dots and the matching text, right under the picture */}
            <div className="mt-4 lg:hidden">
              <div className="flex justify-center gap-1.5" role="tablist" aria-label="Features">
                {features.map((f, i) => (
                  <button key={f.id} type="button" role="tab" aria-selected={i === active} aria-label={f.name} onClick={() => go(i)}
                    className={`h-2 rounded-full transition-all ${i === active ? "w-6 bg-[#F22DCE]" : "w-2 bg-white/30"}`} />
                ))}
              </div>
              <div className="mt-5 min-h-[150px] text-center" aria-live="polite">
                <p className="text-[22px] font-semibold leading-snug text-white">{current.name}</p>
                <p className="mx-auto mt-2 max-w-sm text-base leading-relaxed text-white/75">{current.line}</p>
                <div className="mt-3 flex flex-wrap items-center justify-center gap-3">
                  <a href="/features" className="inline-flex items-center gap-1.5 text-[15px] font-semibold text-[#8FA8FF] underline decoration-[#8FA8FF]/40 underline-offset-4">
                    {current.cta} <ArrowRight className="h-4 w-4" />
                  </a>
                  {current.tag && <span className="rounded-full border border-white/20 px-2.5 py-0.5 text-xs font-medium text-white/70">{current.tag}</span>}
                </div>
              </div>
            </div>
          </div>

          {/* Desktop: all the text on one side */}
          <div className="hidden lg:block">
            <ul className="divide-y divide-white/10 border-y border-white/10">
              {features.map((f, i) => {
                const on = i === active;
                const Icon = f.icon;
                return (
                  <li key={f.id} className="relative">
                    <button type="button" onClick={() => go(i)} aria-expanded={on} className="flex w-full items-center gap-3.5 py-2 text-left">
                      <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg transition-colors ${on ? "bg-[#3764F3] text-white" : "bg-white/8 text-white/60"}`}>
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className={`text-lg font-semibold leading-snug transition-colors ${on ? "text-white" : "text-white/55 hover:text-white/85"}`}>{f.name}</span>
                    </button>
                    <div className={`grid transition-all duration-500 ease-out ${on ? "grid-rows-[1fr] pb-4 opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                      <div className="overflow-hidden pl-[46px]">
                        <p className="text-base leading-relaxed text-white/75">{f.line}</p>
                        <div className="mt-2.5 flex flex-wrap items-center gap-3">
                          <a href="/features" tabIndex={on ? 0 : -1} className="inline-flex items-center gap-1.5 text-[15px] font-semibold text-[#8FA8FF] underline decoration-[#8FA8FF]/40 underline-offset-4 hover:text-white">
                            {f.cta} <ArrowRight className="h-4 w-4" />
                          </a>
                          {f.tag && <span className="rounded-full border border-white/20 px-2.5 py-0.5 text-xs font-medium text-white/70">{f.tag}</span>}
                        </div>
                      </div>
                    </div>
                    {on && auto && inView && (
                      <span key={active} className="absolute bottom-0 left-0 h-[2px] w-full origin-left bg-[#F22DCE] [animation:ff-progress_6.5s_linear_both]" aria-hidden="true" />
                    )}
                  </li>
                );
              })}
            </ul>
            <div className="mt-6 flex items-center justify-between gap-4">
              <div className="flex gap-2">
                <button type="button" onClick={() => go(active - 1)} aria-label="Previous feature" className={`${arrow} h-11 w-11 shadow-none`}><ArrowLeft className="h-5 w-5" /></button>
                <button type="button" onClick={() => go(active + 1)} aria-label="Next feature" className={`${arrow} h-11 w-11 shadow-none`}><ArrowRight className="h-5 w-5" /></button>
              </div>
              <a href="/features" className="inline-flex h-11 items-center gap-2 rounded-full border border-white/40 px-5 text-[15px] font-semibold text-white hover:bg-white/10">
                See all features <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center lg:hidden">
          <a href="/features" className="inline-flex h-11 items-center gap-2 rounded-full border border-white/40 px-5 text-[15px] font-semibold text-white">
            See all features <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
