"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { DemoButton } from "./ui";

type Panel = {
  id: string;
  tag: string;
  title: string;
  /** Short title shown sideways while the panel is closed. */
  side: [string, string];
  text: string;
  points: string[];
  img: string;
  alt: string;
  w: number;
  h: number;
  bg: string;
  cta?: boolean;
};

const panels: Panel[] = [
  {
    id: "directory",
    tag: "Optional public listing",
    title: "Get discovered. Get booked.",
    side: ["Get discovered.", "Get booked."],
    text: "Choose to list your boutique in the FittingFlow directory so brides in your area can find you and book an appointment.",
    points: ["Appear in local search results", "Show reviews, photos and services", "Bookings land straight in your calendar"],
    img: "/uploads/home2/sf-directory.webp",
    alt: "A directory of bridal boutiques near the bride, each with a Book button",
    w: 1100,
    h: 816,
    bg: "#EAF1FF",
  },
  {
    id: "storefront",
    tag: "Included with every plan",
    title: "Your boutique's own online storefront",
    side: ["Your own", "online storefront."],
    text: "A beautiful, bookable page that carries your brand, your services and your availability.",
    points: [
      "Show your services, pricing and gallery",
      "Let brides book consultations 24/7",
      "Collect deposits at the time of booking",
      "Syncs with your calendar and inventory",
    ],
    img: "/uploads/home2/storefront.webp",
    alt: "A boutique's online storefront on a laptop, with gowns, services and a Book a fitting button",
    w: 708,
    h: 510,
    bg: "#FFEDF9",
    cta: true,
  },
  {
    id: "marketing",
    tag: "Marketing that runs itself",
    title: "Stay connected. Build loyalty.",
    side: ["Stay connected.", "Build loyalty."],
    text: "Celebrate your clients' milestones and bring them back with campaigns that send themselves.",
    points: ["Birthday and anniversary messages", "Email campaigns with your branding", "Appointment reminders that cut no-shows"],
    img: "/uploads/home2/sf-marketing.webp",
    alt: "A branded email campaign, a birthday message and an appointment reminder",
    w: 1100,
    h: 813,
    bg: "#F0EBFE",
  },
];

/** Three panels from the design: the open one shows its text and picture, the closed ones show a sideways title. */
export default function Storefront() {
  const [active, setActive] = useState("storefront");

  return (
    <section className="bg-white px-5 py-20 md:py-28 lg:px-8">
      <div className="mx-auto flex max-w-[1320px] flex-col gap-3 lg:h-[540px] lg:flex-row lg:gap-4">
        {panels.map((p) => {
          const open = p.id === active;
          return (
            <div
              key={p.id}
              style={{ backgroundColor: p.bg }}
              className={`relative overflow-hidden rounded-[28px] transition-[flex-grow,flex-basis] duration-500 ease-out lg:min-w-0 ${
                open ? "lg:flex-[1_1_0%]" : "lg:flex-[0_0_150px]"
              }`}
            >
              {!open && (
                <button
                  type="button"
                  onClick={() => setActive(p.id)}
                  aria-expanded={false}
                  aria-controls={`sf-${p.id}`}
                  className="group flex w-full items-center justify-between gap-4 px-6 py-5 text-left lg:h-full lg:justify-center lg:p-0"
                >
                  <span className="text-xl font-bold leading-tight tracking-[-0.01em] text-[#191E49] transition-colors group-hover:text-[#3764F3] lg:rotate-180 lg:text-[30px] lg:leading-[1.15] lg:[writing-mode:vertical-rl]">
                    {p.side[0]} <br className="hidden lg:block" />
                    {p.side[1]}
                  </span>
                  <Plus className="h-5 w-5 shrink-0 text-[#191E49] lg:hidden" aria-hidden="true" />
                </button>
              )}
              {open && (
                <div id={`sf-${p.id}`} className="grid h-full items-center lg:grid-cols-[1fr_1.05fr] [animation:ff-rise_.5s_ease-out_both]">
                  <div className="p-7 md:p-12 lg:p-14">
                    <p className="inline-flex rounded-full border border-[#3764F3]/25 bg-white px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-[#3764F3]">
                      {p.tag}
                    </p>
                    <h2 className="mt-5 text-[30px] font-bold leading-[1.1] tracking-[-0.01em] text-[#191E49] md:text-[42px]">{p.title}</h2>
                    <p className="mt-4 max-w-md text-[17px] leading-relaxed text-[#191E49]/80">{p.text}</p>
                    <ul className="mt-5 space-y-2.5">
                      {p.points.map((pt) => (
                        <li key={pt} className="flex items-start gap-3 text-base text-[#191E49]/85">
                          <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#F22DCE]" aria-hidden="true" />
                          {pt}
                        </li>
                      ))}
                    </ul>
                    {p.cta && (
                      <DemoButton variant="blue" className="mt-7">
                        See The Storefront In Action
                      </DemoButton>
                    )}
                  </div>
                  <div className={p.id === "storefront" ? "self-end" : "px-6 pb-7 lg:px-8 lg:pb-0"}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.img} alt={p.alt} width={p.w} height={p.h} loading="lazy" className="mx-auto block max-h-[440px] w-full object-contain" />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
