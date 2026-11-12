"use client";

import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { useDemoModal } from "@/components/DemoModalContext";

export const BLUE = "#3764F3";
export const PINK = "#F22DCE";
export const NAVY = "#191E49";

/** Small pill label above section headings. */
export function Eyebrow({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <p
      className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] ${
        dark ? "border-white/20 bg-white/5 text-[#ff7fe6]" : "border-pink-200 bg-white text-[#F22DCE]"
      }`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-[#F22DCE]" aria-hidden="true" />
      {children}
    </p>
  );
}

const base =
  "inline-flex h-12 items-center justify-center gap-2 rounded-full px-6 text-[15px] font-semibold transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2";
const styles = {
  blue: "bg-[#3764F3] text-white shadow-[0_10px_30px_rgba(55,100,243,0.35)] hover:bg-[#2a52d9] hover:-translate-y-0.5 focus-visible:outline-[#3764F3]",
  white: "bg-white text-[#191E49] hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-white",
  outline: "border-[1.5px] border-[#3764F3] text-[#3764F3] hover:bg-[#3764F3]/5 focus-visible:outline-[#3764F3]",
  outlineWhite: "border-[1.5px] border-white/70 text-white hover:bg-white/10 focus-visible:outline-white",
};
type Variant = keyof typeof styles;

export function TrialButton({ variant = "blue", className = "" }: { variant?: Variant; className?: string }) {
  return (
    <a href="/pricing" className={`${base} ${styles[variant]} ${className}`}>
      Get 30-Day Free
    </a>
  );
}

export function DemoButton({
  variant = "outline",
  className = "",
  children = "Book A Demo",
}: {
  variant?: Variant;
  className?: string;
  children?: ReactNode;
}) {
  const { openDemo } = useDemoModal();
  return (
    <button type="button" onClick={openDemo} className={`${base} ${styles[variant]} ${className}`}>
      {children}
    </button>
  );
}

/** Pink "Book A Demo" pill with the round arrow, as in the header design. */
export function DemoPill({ className = "" }: { className?: string }) {
  const { openDemo } = useDemoModal();
  return (
    <button
      type="button"
      onClick={openDemo}
      className={`group inline-flex items-center rounded-full bg-[#F22DCE] p-1 pl-5 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(242,45,206,0.35)] transition hover:bg-[#e01fbd] ${className}`}
    >
      Book A Demo
      <span className="ml-3 grid h-8 w-8 place-items-center rounded-full bg-white/20 transition group-hover:translate-x-0.5">
        <ArrowRight className="h-4 w-4" />
      </span>
    </button>
  );
}
