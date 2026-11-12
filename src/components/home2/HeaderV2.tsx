"use client";

import { useEffect, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { appUrl } from "@/lib/site";
import { DemoPill } from "./ui";

type Item = { label: string; href?: string; children?: { label: string; href: string; note?: string }[] };

const nav: Item[] = [
  { label: "About", href: "/about" },
  {
    label: "Features",
    children: [
      { label: "All features", href: "/features", note: "Everything in one place" },
      { label: "Boutique software", href: "/boutique-software", note: "Fittings, orders and payments" },
      { label: "Bridal alteration software", href: "/bridal-alteration-software", note: "Track every gown" },
      { label: "Alteration software", href: "/alteration-software", note: "For shops and tailors" },
    ],
  },
  {
    label: "Why FittingFlow",
    children: [
      { label: "Why FittingFlow", href: "/why-fittingflow", note: "Built for boutiques" },
      { label: "Switch for free", href: "/switch", note: "We move your data" },
      { label: "How to choose", href: "/best-boutique-software", note: "A buyer's guide" },
      { label: "Data security", href: "/data-security", note: "How we protect your data" },
    ],
  },
  { label: "Pricing", href: "/pricing" },
  {
    label: "Resources",
    children: [
      { label: "Blog", href: "/blog", note: "Guides for boutiques" },
      { label: "FAQ", href: "#faq", note: "Common questions" },
      { label: "Contact", href: "/contact", note: "Talk to the team" },
    ],
  },
];

/** Header from the new design: clear over the hero, white once the page scrolls. */
export default function HeaderV2() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = scrolled || open;
  const link = solid ? "text-[#191E49] hover:text-[#F22DCE]" : "text-white/90 hover:text-white";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        solid ? "bg-white/95 shadow-[0_1px_0_rgba(25,30,73,0.08)] backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-[76px] max-w-[1320px] items-center justify-between px-5 lg:px-8">
        <a href="/" aria-label="FittingFlow home" className="shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={solid ? "/uploads/logo.png" : "/uploads/white-logo.png"} alt="FittingFlow" width={150} height={38} className="h-8 w-auto sm:h-9" />
        </a>

        <nav aria-label="Main" className="hidden items-center gap-8 lg:flex">
          {nav.map((item) =>
            item.children ? (
              <div key={item.label} className="group relative">
                <button type="button" className={`flex items-center gap-1 py-6 text-[15px] font-medium transition-colors ${link}`} aria-haspopup="true">
                  {item.label}
                  <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180 group-focus-within:rotate-180" />
                </button>
                <div className="invisible absolute left-1/2 top-full w-72 -translate-x-1/2 translate-y-1 rounded-2xl border border-slate-100 bg-white p-2 opacity-0 shadow-[0_24px_60px_rgba(25,30,73,0.18)] transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                  {item.children.map((child) => (
                    <a key={child.href} href={child.href} className="block rounded-xl px-4 py-3 hover:bg-[#F4F5FF]">
                      <span className="block text-[15px] font-semibold text-[#191E49]">{child.label}</span>
                      {child.note && <span className="block text-[13px] text-slate-500">{child.note}</span>}
                    </a>
                  ))}
                </div>
              </div>
            ) : (
              <a key={item.label} href={item.href} className={`text-[15px] font-medium transition-colors ${link}`}>
                {item.label}
              </a>
            ),
          )}
        </nav>

        <div className="flex items-center gap-3 lg:gap-5">
          <a href={appUrl("/signin")} className={`hidden text-[15px] font-medium sm:block ${link}`}>
            Login
          </a>
          <DemoPill className="max-sm:pl-3.5 max-sm:text-[13px] max-sm:[&>span]:ml-2 max-sm:[&>span]:h-7 max-sm:[&>span]:w-7" />
          <button
            type="button"
            className={`rounded-lg p-2 lg:hidden ${solid ? "text-[#191E49]" : "text-white"}`}
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="max-h-[calc(100dvh-76px)] overflow-y-auto border-t border-slate-100 bg-white px-5 pb-6 lg:hidden">
          {nav.map((item) => (
            <div key={item.label} className="border-b border-slate-100 py-3">
              {item.href ? (
                <a href={item.href} className="block text-base font-semibold text-[#191E49]">{item.label}</a>
              ) : (
                <>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">{item.label}</p>
                  <div className="mt-2 grid gap-2">
                    {item.children!.map((child) => (
                      <a key={child.href} href={child.href} onClick={() => setOpen(false)} className="text-base font-medium text-[#191E49]">
                        {child.label}
                      </a>
                    ))}
                  </div>
                </>
              )}
            </div>
          ))}
          <div className="mt-5 flex items-center gap-4">
            <a href={appUrl("/signin")} className="text-base font-semibold text-[#191E49]">Login</a>
            <DemoPill />
          </div>
        </div>
      )}
    </header>
  );
}
