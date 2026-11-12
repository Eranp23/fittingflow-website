"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { ChevronLeft, ChevronRight } from "lucide-react";

import "swiper/css";

interface TrustedCompany {
  name: string;
  logo: string;
}

interface TrustedStripProps {
  companies: TrustedCompany[];
}

export const TrustedStrip = ({ companies }: TrustedStripProps) => {
  const swiperRef = useRef<SwiperType | null>(null);
  const slides = companies.length < 8 ? [...companies, ...companies] : companies;

  return (
    <section className="py-8 md:py-10 bg-white">
      <div className="mx-auto px-8 md:px-20 lg:px-28 text-center">
        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gray-500 mb-1">
        Trusted by the best 
        </p>
      
        <div className="relative">
          <button
            type="button"
            aria-label="Previous"
            onClick={() => swiperRef.current?.slidePrev()}
            className="absolute -left-8 md:-left-10 top-1/2 -translate-y-1/2 z-10 p-1 text-gray-600 hover:text-gray-900"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <Swiper
            modules={[Autoplay]}
            onSwiper={(s) => (swiperRef.current = s)}
            loop
            spaceBetween={0}
            slidesPerView={2}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            breakpoints={{
              640: { slidesPerView: 3 },
              1024: { slidesPerView: 6 },
            }}
          >
            {slides.map((company, index) => (
              <SwiperSlide key={`${company.name}-${index}`}>
                <div className="flex h-16 items-center justify-center">
                  <img
                    src={company.logo}
                    alt={company.name}
                    className="max-h-12 max-w-full object-contain"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <button
            type="button"
            aria-label="Next"
            onClick={() => swiperRef.current?.slideNext()}
            className="absolute -right-8 md:-right-10 top-1/2 -translate-y-1/2 z-10 p-1 text-gray-600 hover:text-gray-900"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};
