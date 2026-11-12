"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  Clock,
  Shield,
  BarChart3,
  Users,
  Scissors,
  CreditCard,
  Star,
  Check,
  X
} from 'lucide-react';

import Footer from '@/components/landing/Footer';
import Header from "@/components/Header";
import CTASection from '@/components/landing/CTASection';
import { pageSeo } from "@/lib/seoPages";

const reasons = [
  {
    icon: "Scissors",
    title: 'Built for Boutiques & Alterations',
    desc: 'Unlike generic scheduling tools, FittingFlow understands boutique and alteration workflows — fittings, alterations, measurements, designer orders, and client timelines.',
  },
  {
    icon: "Clock",
    title: 'Save 10+ Hours Every Week',
    desc: 'Automate reminders, follow-ups, and manual data entry. Boutiques save an average of 12 hours per week on admin tasks.',
  },
  {
    icon: "Users",
    title: 'Delight Every Client',
    desc: 'Give clients a premium portal to book appointments, track orders, view measurements, and stay updated throughout their journey.',
  },
  {
    icon: "BarChart3",
    title: 'Data-Driven Decisions',
    desc: 'Real-time analytics on revenue, staff performance, popular services, and customer trends.',
  },
  {
    icon: "CreditCard",
    title: 'All-in-One Platform',
    desc: 'Appointments, CRM, POS, inventory, alterations, and payments — everything in one place.',
  },
  {
    icon: "Shield",
    title: 'Enterprise-Grade Security',
    desc: 'Your data is encrypted, backed up, and protected with modern security standards.',
  },
];

const comparisons = [
  { feature: 'Boutique & alteration workflows', us: true, them: false },
  { feature: 'Alteration tracking', us: true, them: false },
  { feature: 'Client self-service portal', us: true, them: false },
  { feature: 'Measurement management', us: true, them: false },
  { feature: 'Online appointment booking', us: true, them: true },
  { feature: 'SMS & email reminders', us: true, them: true },
  { feature: 'Integrated POS', us: true, them: false },
  { feature: 'Multi-location support', us: true, them: true },
  { feature: 'Style board for clients', us: true, them: false },
  { feature: 'Client timeline tracking', us: true, them: false },
];

const testimonials = [
  {
    quote:
      'We switched from a generic tool and saw our booking efficiency double within the first month.',
    name: 'Alexandra K.',
    role: 'Owner, Bella Boutique NYC',
  },
  {
    quote:
      'FittingFlow understands boutiques and alterations. The alteration tracking alone saved us from so many mistakes.',
    name: 'Michelle T.',
    role: 'Manager, The White Dress Co',
  },
  {
    quote:
      'Our clients love the portal. They feel taken care of from day one.',
    name: 'Jennifer L.',
    role: 'Owner, Grace Studio',
  },
];

const WhyFittingFlow = () => {
  const navigate = (to: string) => { window.location.href = to; };

  return (
    <div className="page-urbanist min-h-screen bg-background">
      
      <Header />

      <section
  className="pt-32 pb-28 text-center relative overflow-hidden bg-cover bg-center"
  style={{ backgroundImage: "url('/uploads/landing/inner.webp')" }}
>
  <div className="max-w-6xl mx-auto px-6">

    <p className="text-pink-500 font-medium mb-4">
      Built for Boutiques & Alterations
    </p>

    <h1 className="text-4xl md:text-5xl font-extralight text-slate-900 leading-tight">
      Why Choose <span className="ftext-4xl md:text-5xl  font-semibold">FittingFlow</span>?
    </h1>

    <p className="text-slate-500 max-w-2xl mx-auto mt-4">
      The platform built for boutiques and alteration shops.
      Manage clients, appointments, fittings, alterations,
      and designer orders in one beautiful system.
    </p>

  </div>
  <div className="max-w-6xl mx-auto px-6">



    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-1 mt-10">

      {reasons.map((r) => (
        <div
          key={r.title}
          className="bg-white rounded-2xl p-8 shadow-sm border hover:shadow-lg transition"
        >

          <div
          className={`w-12 h-12 mb-5 feature-icon bg-center bg-no-repeat bg-contain ${r.icon}`}
          style={{ backgroundImage: "url('/uploads/landing/feature.svg')" }}
        ></div>
       

          <h3 className="font-semibold text-lg mb-2 text-left">
            {r.title}
          </h3>

          <p className="text-slate-500 text-sm text-left">
            {r.desc}
          </p>

        </div>
      ))}

    </div>

  </div>

</section>
<section className="py-24">
  <div className="max-w-6xl mx-auto px-6">

    <div className="bg-[#3868FC] text-white rounded-[50px] p-16">

      {/* Title */}
      <div className="text-center mb-16">
        <h2 className="text-4xl font-semibold">
          FittingFlow <span className="text-4xl font-extralight">vs Generic Tools</span>
        </h2>
        <p className="opacity-80 mt-3">
          See why boutique-specific software matters.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-12 items-start">

        {/* FEATURES */}
        <div>
          <h4 className="font-semibold mb-10">Feature</h4>

          <div className="space-y-7 text-sm">
            {comparisons.map((c) => (
              <div key={c.feature}>{c.feature}</div>
            ))}
          </div>
        </div>

        {/* FITTINGFLOW COLUMN */}
        <div>

          <h4 className="text-center font-semibold mb-[5px]">
      <img src="/uploads/white-logo.png" alt="FittingFlow" className='w-[100px]'/>
          </h4>

          <div className="bg-white/10  rounded-[35px] py-5 flex flex-col items-center space-y-6 backdrop-blur">

            {comparisons.map((c) =>
              c.us ? (
                <Check key={c.feature} className="text-white w-6 h-6" />
              ) : (
                <X key={c.feature} className="text-white w-6 h-6" />
              )
            )}

          </div>

        </div>

        {/* OTHERS COLUMN */}
        <div>

          <h4 className="text-center font-semibold mb-6">
            Others
          </h4>

          <div className="bg-white/10  rounded-[35px] py-5 flex flex-col items-center space-y-6 backdrop-blur">

            {comparisons.map((c) =>
              c.them ? (
                <Check key={c.feature} className="text-white  w-6 h-6" />
              ) : (
                <X key={c.feature} className="text-white  w-6 h-6" />
              )
            )}

          </div>

        </div>

      </div>

    </div>

  </div>
</section>

      {/* CTA */}
   <CTASection />

      <Footer />

    </div>
  );
};

export default WhyFittingFlow;