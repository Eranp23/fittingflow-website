"use client";

import { useDemoModal } from "@/components/DemoModalContext";

interface Step {
    num: string;
    title: string;
    desc: string;
  }
  
  interface HowItWorksSectionProps {
    steps: Step[];
    onPrimaryClick?: () => void;
    onSecondaryClick?: () => void;
    onOpenDemo?: () => void;
  }
  
  export const HowItWorksSection = ({
    steps,
    onOpenDemo,
    onPrimaryClick,
    onSecondaryClick,
  }: HowItWorksSectionProps) => {
    const { openDemo } = useDemoModal();
    return (
      <section id="how-it-works" className="relative overflow-hidden py-24 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white">
  
        {/* Glow effect */}
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_20%_50%,rgba(255,255,255,0.2),transparent_50%)]" />
  
        <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
  
          {/* LEFT SIDE */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              How it <span className="text-white/90 text-4xl md:text-5xl ">works</span>
            </h2>
  
            <p className="text-white/80 mb-12 max-w-lg">
              Simplify your daily operations with a step-by-step system
              designed to save time, reduce errors, and keep everything organized.
            </p>
  
            <div className="space-y-10">
              {steps.map((step, index) => (
                <div key={index} className="flex gap-6">
                  {/* Timeline */}
                  <div className="flex flex-col items-center">
                    <span className="text-white/50 text-lg font-semibold">
                      {step.num}
                    </span>
                    {index !== steps.length - 1 && (
                      <span className="w-px h-16 bg-white/30 mt-2" />
                    )}
                  </div>
  
                  {/* Step Content */}
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      {step.title}
                    </h3>
                    <p className="text-white/70 text-sm leading-relaxed max-w-md">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
  
            {/* Buttons */}
            <div className="flex gap-2 md:gap-4  mt-12">
              <a
                href={'/pricing'}
                className="text-center bg-blue-600 border border-white text-white hover:bg-white/90 hover:text-blue-600 rounded-full md:px-8 px-6 py-3 font-semibold transition"
              >
                Start with Free Trial
              </a>
  
              <a
               onClick={onOpenDemo ?? openDemo}
                className="bg-white border border-pink-600 text-pink-600 hover:bg-white/10 rounded-full md:px-8 px-6 py-3 font-semibold transition"
              >
                Request a demo
              </a>
            </div>
          </div>
  
          {/* RIGHT SIDE */}
          <div className="relative hidden lg:block">
  
    <img
                src="/uploads/landing/howitworks.webp"
                alt="User"
                className="w-full h-full object-cover"
              />
      
  
          </div>
        </div>
      </section>
    );
  };