"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    title: "Client Portal",
    text: "Clients see appointment, alteration, and order updates in real time.",
    desktopImage: "/uploads/landing/featureslider.webp",
    mobileImage: "/uploads/landing/featuremobile1.png", // same for now, replace with mobile version later
  },
  {
    title: "Live Status Updates",
    text: "Customers can log in to share preferences, submit measurements, and track progress.",
    desktopImage: "/uploads/landing/featureslider1.webp",
    mobileImage: "/uploads/landing/featureslider1.webp",
  },
  {
    title: "Notifications & Messages",
    text: "Automatic alerts and messages keep everyone informed before the big day.",
    desktopImage: "/uploads/landing/featureslider2.webp",
    mobileImage: "/uploads/landing/featureslider2.webp",
  },
  {
    title: "Inspiration Sharing",
    text: "Clients can upload reference photos, inspiration, and important documents in one place.",
    desktopImage: "/uploads/landing/featureslider3.webp",
    mobileImage: "/uploads/landing/featureslider3.webp",
  },
];

export default function ClientExperienceSlider() {
  const [active, setActive] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Track window size to toggle mobile vs desktop image
  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 768); // Tailwind md breakpoint
    }
    handleResize(); // set initially
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const tabsRef = useRef<HTMLDivElement>(null);
  const tabButtonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    if (
      tabsRef.current &&
      tabButtonRefs.current[active]
    ) {
      const container = tabsRef.current;
      const activeTab = tabButtonRefs.current[active];

      const containerRect = container.getBoundingClientRect();
      const activeRect = activeTab.getBoundingClientRect();

      if (activeRect.left < containerRect.left) {
        container.scrollBy({
          left: activeRect.left - containerRect.left - 16,
          behavior: "smooth",
        });
      } else if (activeRect.right > containerRect.right) {
        container.scrollBy({
          left: activeRect.right - containerRect.right + 16,
          behavior: "smooth",
        });
      }
    }
  }, [active]);

  const next = () => setActive((p) => (p + 1) % slides.length);
  const prev = () => setActive((p) => (p - 1 + slides.length) % slides.length);

  return (
    <section
      className="md:py-24 py-12 bg-cover bg-center"
      style={{ backgroundImage: "url('/uploads/landing/cta-feature.webp')" }}
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading on Desktop */}
        <div className="hidden md:block text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-light mb-3">
            Client Experience Portal{" "}
            <span className="text-3xl md:text-4xl font-semibold">(Client Portal)</span>
          </h2>
          <p className="text-muted-foreground text-sm max-w-xl mx-auto">
            A seamless experience for your clients
          </p>
        </div>

        {/* Heading on Mobile */}
        <div className="md:hidden text-center mb-6">
          <h2 className="text-2xl font-semibold mb-1">
            Client Experience Portal <br />
            <span className="font-bold">(Client Portal)</span>
          </h2>
          <p className="text-gray-600 text-sm max-w-xs mx-auto">
            A seamless experience for your clients
          </p>
        </div>

        {/* Tabs */}
        <div
          ref={tabsRef}
          className="max-w-5xl mx-auto mb-10 overflow-x-auto scrollbar-hide"
        >
          <div className="flex gap-6 min-w-max md:min-w-0 md:justify-between">
            {slides.map((s, i) => (
              <button
                key={i}
                ref={(el) => { tabButtonRefs.current[i] = el; }}
                onClick={() => setActive(i)}
                className={`text-sm font-semibold pb-2 whitespace-nowrap transition ${
                  active === i
                    ? "border-primary text-foreground border-b-2"
                    : "border-[#9FA0B2] text-[#9FA0B2]"
                }`}
              >
                {i + 1} {s.title}
              </button>
            ))}
          </div>
        </div>

        {/* Slider */}
        <div className="relative">

          {/* On Mobile show text below image */}
          <div className="md:hidden mt-4 px-2 text-center">
            <p className="text-lg font-semibold text-gray-400 leading-normal mb-4">{slides[active].text}</p>
          </div>

          {/* Image */}
          <div className="relative md:h-[480px] h-[280px] w-full  md:rounded-3xl  md:shadow-2xl">
            <img
              src={isMobile ? slides[active].mobileImage : slides[active].desktopImage}
              className="rounded-3xl shadow-2xl absolute inset-0 w-full h-full object-cover object-right"
              alt={`${slides[active].title} in the FittingFlow client portal`}
            />

            {/* LEFT DARK OVERLAY on Desktop only */}
            <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent  rounded-3xl  shadow-2xl" />

            {/* LEFT WHITE TEXT overlay on Desktop only */}
            <div className="hidden md:block absolute left-12 top-1/2 -translate-y-1/2 text-white max-w-lg">
              <h3 className="text-3xl font-bold mb-4">
                {slides[active].text}
              </h3>
            </div>
          </div>

          {/* Buttons + Text below image container */}
          <div className="flex justify-between items-center mt-6 max-w-7xl mx-auto px-6">

            <button
              onClick={prev}
              className="flex items-center gap-2 text-gray-900 font-semibold hover:text-primary transition"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="bg-white rounded-full" />
              Previous
            </button>

            <button
              onClick={next}
              className="flex items-center gap-2 text-gray-900 font-semibold hover:text-primary transition"
              aria-label="Next Slide"
            >
              Next
              <ChevronRight className="bg-white rounded-full" />
            </button>

          </div>
        </div>
      </div>
    </section>
  );
}