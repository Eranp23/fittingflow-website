"use client";

import { Circle } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

type Feature = {
  title: string;
  desc: string;
  items: string[];
  image: string;
};

const features: Feature[] = [
  {
    title: "Multi-Location & Team Management",
    desc: "Manage locations, staff, and permissions effortlessly while keeping operations organized across your business.",
    items: [
      "Manage multiple locations with hours & services",
      "Assign managers with role permissions",
      "Create custom staff roles",
      "Track team activity easily",
    ],
    image: "/uploads/landing/1.webp",
  },
  {
    title: "Admin & Communication",
    desc: "Customize your system to match boutique workflows and keep communication professional and consistent.",
    items: [
      "Store lookups & dropdown workflows",
      "Flexible services & categories",
      "Email templates with live preview",
      "Branding, tax & timezone settings",
    ],
    image: "/uploads/landing/2.webp",
  },
  {
    title: "Analytics & Insights",
    desc: "Monitor performance, trends, and opportunities with real-time dashboards and growth metrics.",
    items: [
      "Revenue dashboards",
      "Customer growth charts",
      "Booking analytics",
      "Staff performance metrics",
    ],
    image: "/uploads/landing/3.webp",
  },
];

export default function FeatureShowcase() {
  const FeatureBlock = ({ f }: any) => (
    <div className="space-y-8 mb-[30px]">

      {/* Image */}
      <img
        src={f.image}
        alt={f.title}
        className="w-full rounded-xl"
      />

      {/* Text */}
      <div>
        <h2 className="text-2xl font-semibold mb-3">
          {f.title}
        </h2>

        <p className="text-gray-600 mb-5">
          {f.desc}
        </p>

        <div className="space-y-3 mb-6">
          {f.items.map((item: string, j: number) => (
            <div key={j} className="flex gap-3">
              <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
              <p>{item}</p>
            </div>
          ))}
        </div>

        <a
          href="/pricing"
          className="rounded-full px-6 py-3 bg-pink-500 text-white"
        >
          Start with Free Trial
        </a>
      </div>
    </div>
  );

  return (
    <section className="md:py-24 py-12 bg-[#f7f7fb]">

      {/* MOBILE */}
      <div className="lg:hidden px-6">

        <Swiper
          modules={[Pagination]}
          slidesPerView={1}
          spaceBetween={30}
          pagination={{
            clickable: true,
            el: ".feature-pagination",
          }}
        >
          {features.map((f, i) => (
            <SwiperSlide key={i}>
              <FeatureBlock f={f} />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Pagination */}
        <div className="feature-pagination flex justify-center gap-3 mt-12"></div>

      </div>

      {/* DESKTOP */}
      <div className="hidden lg:block max-w-7xl mx-auto px-6 space-y-28">
        {features.map((f, i) => {
          const reversed = i % 2 === 1;

          return (
            <div
              key={i}
              className="grid lg:grid-cols-2 gap-16 items-center"
            >
              <div className={reversed ? "lg:order-2" : ""}>
                <img src={f.image} alt={`${f.title} in FittingFlow`} loading="lazy" className="w-full" />
              </div>

              <div className={reversed ? "lg:order-1" : ""}>
                <h2 className="text-4xl font-medium mb-5">
                  {f.title}
                </h2>

                <p className="text-gray-600 mb-7">
                  {f.desc}
                </p>

                <div className="space-y-3 mb-8">
                  {f.items.map((item, j) => (
                    <div key={j} className="flex gap-3">
                      <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
                      <p>{item}</p>
                    </div>
                  ))}
                </div>

                <a
                  href="/pricing"
                  className="rounded-full px-7 py-3 bg-pink-500 text-white"
                >
                  Start with Free Trial
                </a>
              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
}