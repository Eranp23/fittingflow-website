"use client";

import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BarChart3,
  Calendar,
  CircleDollarSign,
  ClipboardList,
  Mail,
  MapPin,
  MousePointer2,
  Ruler,
  Settings,
  ShoppingBag,
  User,
} from "lucide-react";
import { useDemoModal } from "@/components/DemoModalContext";

type FeatureItem = {
  icon: LucideIcon;
  title: string;
  desc: string;
};

type FeatureColumn = {
  number: string;
  title: string;
  subtitle: string;
  items: FeatureItem[];
};

function DressIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M9 4.2 12 7l3-2.8" />
      <path d="M8.2 6.4 5.8 10l2.8 1.4L7 20h10l-1.6-8.6L18.2 10 15.8 6.4" />
      <path d="M9.4 6.3c.5 1.1 1.4 1.7 2.6 1.7s2.1-.6 2.6-1.7" />
    </svg>
  );
}

const columns: FeatureColumn[] = [
  {
    number: "01",
    title: "Client Experience",
    subtitle: "Delight every bride from first booking to final look.",
    items: [
      {
        icon: Calendar,
        title: "Appointment Scheduling",
        desc: "Book appointments quickly with types, durations and clean calendar views.",
      },
      {
        icon: User,
        title: "Customer Profiles",
        desc: "Contact info, notes, history and tags in one view — and import older customer data from Excel.",
      },
      {
        icon: ClipboardList,
        title: "Style Boards",
        desc: "Build boards with colors, fabrics, images and video inspiration in-shop.",
      },
      {
        icon: Mail,
        title: "Email Templates",
        desc: "Choose a theme, add an image and message, and send promotions from an Excel list with your store details.",
      },
    ],
  },
  {
    number: "02",
    title: "Fittings & Orders",
    subtitle: "Keep every gown, fitting and payment on track.",
    items: [
      {
        icon: ShoppingBag,
        title: "Orders",
        desc: "Create orders with items, totals, taxes, statuses and due dates per client.",
      },
      {
        icon: DressIcon as LucideIcon,
        title: "Alterations Board",
        desc: "Move alterations from pending to completed with services and pricing.",
      },
      {
        icon: Ruler,
        title: "Measurements",
        desc: "Capture precise measurements with templates for consistent fittings.",
      },
      {
        icon: CircleDollarSign,
        title: "Payments & Total Due",
        desc: "Track payments and balances so staff always know what's still due.",
      },
    ],
  },
  {
    number: "03",
    title: "Boutique Operations",
    subtitle: "Run your team and locations with total clarity.",
    items: [
      {
        icon: MapPin,
        title: "Multi-Location",
        desc: "Manage locations with capacity, hours, services and managers.",
      },
      {
        icon: Settings,
        title: "Staff Management",
        desc: "Add staff, assign roles and control store access permissions.",
      },
      {
        icon: MousePointer2,
        title: "Admin Lookups & Setup",
        desc: "Control appointment types, services, categories and dropdown data.",
      },
      {
        icon: BarChart3,
        title: "Analytics",
        desc: "Track revenue, customers, appointments and business performance.",
      },
    ],
  },
];

const HomeFeaturesGrid = () => {
  const { openDemo } = useDemoModal();

  return (
    <section id="home-features" className="relative overflow-hidden bg-[#fbf7fb] py-16 md:py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.9),rgba(251,236,248,0.55)_55%,rgba(247,240,250,0.2))]" />

      <div className="relative mx-auto max-w-6xl px-5">
        <div className="mx-auto mb-12 max-w-3xl text-center md:mb-14">
          <p className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-[#f3b6e6] bg-white/80 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#e23aad]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#e23aad]" />
            All-in-one boutique platform
          </p>

          <h2 className="text-4xl font-light tracking-tight text-[#1b2140] md:text-5xl">
            Everything Your Boutique Needs
          </h2>
          <p className="mt-1 text-4xl font-semibold tracking-tight text-[#e23aad] md:text-5xl">
            All in One Place
          </p>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-[#8b90a3] md:text-base">
            Smart, elegant tools crafted exclusively for bridal boutiques — to simplify
            scheduling and elevate every client experience.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3 lg:gap-6">
          {columns.map((column) => (
            <article
              key={column.number}
              className="h-full rounded-[28px] border border-[#f0c4e8] bg-white px-6 py-7 shadow-[0_10px_40px_rgba(226,60,174,0.06)] md:px-7 md:py-8"
            >
              <p className="text-sm font-medium text-[#e7a8d6]">{column.number}</p>
              <h3 className="mt-3 text-[22px] font-semibold text-[#1b2140]">{column.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-[#8d93a6]">{column.subtitle}</p>

              <ul className="mt-6">
                {column.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li
                      key={item.title}
                      className="flex items-start gap-4 border-t border-[#f3e7f1] py-4 first:border-t-0"
                    >
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#fdeef8] text-[#e23aad]">
                        <Icon className="h-5 w-5" strokeWidth={1.8} />
                      </span>
                      <span>
                        <span className="block text-[15px] font-semibold text-[#1b2140]">
                          {item.title}
                        </span>
                        <span className="mt-1 block text-[13px] leading-snug text-[#8d93a6]">
                          {item.desc}
                        </span>
                      </span>
                    </li>
                  );
                })}
              </ul>
            </article>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="/features"
            className="inline-flex items-center gap-2 rounded-full bg-[#1c2344] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#121833]"
          >
            Explore all features
            <ArrowRight className="h-4 w-4" />
          </a>
          <button
            type="button"
            onClick={openDemo}
            className="rounded-full border border-[#d7dbe8] bg-white px-6 py-3 text-sm font-medium text-[#1c2344] transition hover:bg-[#f7f8fc]"
          >
            Book a demo
          </button>
        </div>
      </div>
    </section>
  );
};

export default HomeFeaturesGrid;
