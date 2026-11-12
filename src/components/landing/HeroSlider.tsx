"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useDemoModal } from "@/components/DemoModalContext";

const scrollToSection = (id: string) => {
  document.getElementById(id)?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
};
const HeroSlider = () => {
  const { openDemo } = useDemoModal();
  const slides = [
    { image: "/uploads/landing/slide1.webp" },
    { image: "/uploads/landing/slide2.webp" },
    { image: "/uploads/landing/slide3.webp" },
    // { image: "/uploads/landing/slide4.jpeg" },
    // { image: "/uploads/landing/slide4.jpg" },
    
  ];

  const [current, setCurrent] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const next = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prev = () => {
    setCurrent((prev) =>
      prev === 0 ? slides.length - 1 : prev - 1
    );
  };

  /* ================= Autoplay ================= */
  useEffect(() => {
    intervalRef.current = setInterval(next, 5000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-24 pb-14 bg-cover bg-top bg-no-repeat"
      style={{ backgroundImage: "url('/uploads/landing/herobg2.webp')" }}
    >
      <div className="relative w-full mx-auto">

        {/* ================= STATIC TEXT ================= */}
        <div className="text-center max-w-4xl mx-auto pt-4 md:pt-4">

        <p className="mt-4 mb-2 text-[14px] border border-[2px] border-pink-600 w-[fit-content] px-4 py-1 mb-4 rounded-full mx-auto uppercase font-[900] text-pink-600">
        30-DAY FREE TRIAL
          </p>
          <h1 className="text-2xl md:text-[2.2rem] text-[#191E49] font-light leading-[1.2] md:w-[80%] md:mx-auto">
          Advanced Management System for <br></br>
         <span className="text-2xl md:text-[2.2rem] font-medium"> Boutiques & Alterations</span>
          </h1>

         
          <div className="flex justify-center gap-4 mt-8 mb-4 md:mb-0">
            <a href={'/pricing'} className="h-[50px] flex flex-col justify-center px-5 py-2 rounded-full font-bold bg-blue-600 text-white shadow-lg hover:scale-105 transition">
            Start Your 30-Day Free Trial
            </a>
          
            <a  onClick={openDemo} className="h-[50px] flex flex-col justify-center  px-5 py-2 rounded-full border-2 border-pink-500 text-pink-500 bg-white hover:bg-pink-50 transition">
              Request a demo
            </a>
          </div>

        </div>

        {/* ================= SLIDER ================= */}
        <div className="relative w-full md:h-[660px] h-[250px] overflow-hidden flex items-center justify-center">

          {slides.map((slide, i) => {
            const total = slides.length;

            // Circular distance calculation (true infinite feel)
            let offset = i - current;

            if (offset > total / 2) offset -= total;
            if (offset < -total / 2) offset += total;

            const isActive = offset === 0;

            return (

              <div
                key={i}
                className="absolute transition-all duration-500 ease-in-out w-[80%] md:w-[60%]"
                style={{
                  transform: `
                    translateX(${offset * 100}%)
                    scale(${isActive ? 1.12 : 0.82})
                  `,
                  opacity: isActive ? 1 : 0.45,
                  zIndex: isActive ? 30 : 10,
                 
                }}
              >
                
                <div className="h-full rounded-[28px] flex items-center justify-center">
                  <img
                    src={slide.image}
                    alt="mockup"
                    className="w-full h-full md:p-3  p-1 rounded-[28px]"
                  />
                </div>
              </div>
            );
          })}
        </div>
         
        {/* ================= DOTS ================= */}
        <div className="flex justify-center gap-3 mt-6">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`transition-all duration-300 ${
                i === current
                  ? "w-16 h-1.5 bg-white rounded-full"
                  : "w-10 h-1.5 bg-white/40 rounded-full"
              }`}
            />
          ))}
        </div>
        <div className="max-w-5xl mx-auto">
        <p className="mt-6 text-[16px] md:text-[20px] text-[#2d2d2d] align-center font-semibold ">
        FittingFlow is an all-in-one management and point of sale (POS) platform for boutiques and alteration shops. Start with a <span className="text-[16px] md:text-[20px] font-bold text-white">30-day free trial</span>, then pay one simple monthly price. Manage appointments, customers, alterations, inventory, orders, payments, and staff in one simple platform.

           </p>
        </div>
      </div>

      {/* ================= ARROWS ================= */}
    
    </section>
  );
};

export default HeroSlider;