"use client";

import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Eyebrow } from "./ui";

/**
 * Real customer reviews only, in the customer's exact words (Natella, Nov 11: no fictional testimonials).
 * `more` is shown after "Read more". Add a review here only with the customer's approval.
 */
type Review = {
  name: string;
  /** Second line under the name, e.g. the boutique and where the review was posted. */
  source: string;
  /** Link for the source line (customer's website). Opened in a new tab, nofollow. */
  url?: string;
  /** Only when the customer gave a star rating. Never add stars a customer didn't give. */
  stars?: number;
  /** Store logo in /public/uploads/reviews/. Falls back to the first letter of the name. */
  logo?: string;
  text: string;
  more?: string[];
};

const reviews: Review[] = [
  {
    name: "Valeri Rogol",
    source: "AL Couture Bridal · Google review",
    logo: "/uploads/reviews/al-couture-bridal.png",
    stars: 5,
    text: "I’ve been using FittingFlow, developed by Tekgaru, to manage my bridal business, and it has completely transformed the way I organize my daily operations.",
    more: [
      "From appointment scheduling and client management to fittings and business organization, everything is centralized in one intuitive platform. The system is incredibly easy to navigate, comfortable to use, and thoughtfully designed specifically for bridal boutiques. It has saved me an incredible amount of time and helped me create a much smoother experience for my brides.",
      "What truly sets FittingFlow apart is the outstanding customer support. The team is responsive, knowledgeable, and genuinely committed to helping its clients succeed.",
      "As a bridal business owner, I can confidently say that FittingFlow has become an essential part of my workflow. I highly recommend it to any bridal boutique looking for a modern, reliable, and user-friendly management solution.",
    ],
  },
  {
    name: "Tziona",
    source: "shoptziona.com",
    url: "https://shoptziona.com/",
    logo: "/uploads/reviews/tziona.png",
    stars: 5,
    text: "I love using FittingFlow! It has so many useful features that make my day-to-day operations easier, especially the pickup signature form and staff management. It saves me time and helps keep everything organized!",
  },
  {
    name: "Strawberry Blum",
    source: "FittingFlow customer",
    logo: "/uploads/reviews/strawberry-blum.png",
    stars: 5,
    // Two typos fixed with the customer's OK (Nov 11): "softwares" → "software", "lending page" → "landing page".
    text: "We love FittingFlow with pos and inventory. I really love it after using other software… everything is there invoice booking staff locations and you get a free landing page plus customers can see you on portal",
  },
];

function Card({ r }: { r: (typeof reviews)[number] }) {
  const [open, setOpen] = useState(false);
  return (
    <figure className="flex h-full flex-col rounded-[24px] border border-slate-200 bg-[#F7F8FC] p-7 text-left md:p-9">
      <span className="flex items-center justify-between">
        <span className="text-5xl font-bold leading-none text-[#F22DCE]" aria-hidden="true">“</span>
        {r.stars ? (
          <span className="text-lg tracking-[2px] text-[#F5B301]" role="img" aria-label={`${r.stars} out of 5 stars`}>{"★".repeat(r.stars)}</span>
        ) : null}
      </span>
      <blockquote className="mt-1 text-[17px] leading-relaxed text-[#191E49] md:text-lg">
        <p>{r.text}</p>
        {open && r.more?.map((para) => <p key={para.slice(0, 24)} className="mt-3">{para}</p>)}
      </blockquote>
      <figcaption className="mt-6 flex items-center justify-between gap-4">
        <span className="flex items-center gap-3">
          {r.logo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={r.logo} alt="" loading="lazy" className="h-11 w-auto max-w-[120px] shrink-0 object-contain" />
          ) : (
            <span className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-[#F22DCE] to-[#3764F3] text-base font-semibold text-white" aria-hidden="true">
              {r.name.charAt(0)}
            </span>
          )}
          <span>
            <span className="block text-[15px] font-semibold text-[#191E49]">{r.name}</span>
            {r.url ? (
              <a href={r.url} target="_blank" rel="nofollow noopener noreferrer" className="block text-[13px] text-slate-500 hover:text-[#3764F3] hover:underline">
                {r.source}
              </a>
            ) : (
              <span className="block text-[13px] text-slate-500">{r.source}</span>
            )}
          </span>
        </span>
        {r.more && (
          <button type="button" onClick={() => setOpen(!open)} aria-expanded={open} className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-[#3764F3] hover:underline">
            <ArrowRight className={`h-4 w-4 transition-transform ${open ? "rotate-90" : ""}`} />
            {open ? "Show less" : "Read more"}
          </button>
        )}
      </figcaption>
    </figure>
  );
}

export default function Reviews() {
  const track = useRef<HTMLDivElement>(null);
  const many = reviews.length > 1;
  const move = (dir: number) => {
    const el = track.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: "smooth" });
  };
  return (
    <section className="bg-white px-5 pb-20 md:pb-28 lg:px-8" aria-labelledby="reviews-title">
      <div className="mx-auto max-w-[1320px] text-center">
        <Eyebrow>Customer stories</Eyebrow>
        <h2 id="reviews-title" className="mt-5 text-[32px] font-medium leading-tight tracking-[-0.01em] text-[#191E49] md:text-[44px]">
          What our customers say about us
        </h2>
        <div className="relative mt-10">
          <div
            ref={track}
            className={`flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${many ? "" : "justify-center"}`}
          >
            {reviews.map((r) => (
              <div key={r.name} className={`shrink-0 snap-center ${many ? "w-[88%] md:w-[46%] lg:w-[32%]" : "w-full max-w-[760px]"}`}>
                <Card r={r} />
              </div>
            ))}
          </div>
          {many && (
            <div className="mt-6 flex justify-center gap-2">
              <button type="button" onClick={() => move(-1)} aria-label="Previous review" className="grid h-10 w-10 place-items-center rounded-full border border-slate-200 text-[#191E49] hover:border-[#3764F3] hover:text-[#3764F3]">
                <ArrowLeft className="h-4 w-4" />
              </button>
              <button type="button" onClick={() => move(1)} aria-label="Next review" className="grid h-10 w-10 place-items-center rounded-full border border-slate-200 text-[#191E49] hover:border-[#3764F3] hover:text-[#3764F3]">
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
