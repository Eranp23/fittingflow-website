"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useDemoModal } from "@/components/DemoModalContext";
const CTASection = () => {
  const { openDemo } = useDemoModal();



  return (
    <>
      <section
        className="relative md:py-24 py-12 bg-cover bg-center"
        style={{
          backgroundImage: "url('/uploads/landing/cta-feature.webp')",
        }}
      >
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">

            {/* LEFT CONTENT */}
            <div>
              <h2 className="text-3xl md:text-4xl font-light text-gray-900 leading-tight mb-6">
                Ready to Transform <br />
                Your{" "}
                <span className="text-3xl md:text-4xl font-medium">
                  Boutique Business?
                </span>
              </h2>

              <p className="text-lg text-gray-600 leading-relaxed mb-8 max-w-lg">
                Start saving time, reducing errors, and delivering unforgettable
                client experiences.
              </p>

              <div className="flex md:flex-row flex-col gap-4">

                <a
                  href="/pricing"
                  className="text-center bg-pink-500 hover:bg-pink-600 text-white rounded-full md:text-lg text-sm md:px-8 px-4 py-3 font-semibold shadow-lg"
                >
                  Start with Free Trial
                </a>

                <button
                 onClick={openDemo}
                  className="text-center rounded-full md:px-8 px-4 md:text-lg text-sm py-3 font-semibold border border-blue-400 text-blue-600 hover:bg-blue-50"
                >
                  Request a demo
                </button>

              </div>
            </div>

            {/* RIGHT IMAGE */}
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-xl">
                <img
                  src="/uploads/landing/ctasection.webp"
                  alt="Boutique business"
                  className="w-full h-[380px] object-cover"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

 
    </>
  );
};

export default CTASection;