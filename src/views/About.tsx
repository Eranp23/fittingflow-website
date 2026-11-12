"use client";

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Heart,
  Users,
  Target,
  Sparkles,
  ShieldCheck,
  Globe2,
  Award,
  Handshake,
  BadgeHelp,
  AwardIcon
} from "lucide-react"

import Footer from "@/components/landing/Footer"
import Header from "@/components/Header";
import CTASection from "@/components/landing/CTASection"
import IconCardGrid from "@/components/landing/IconGrid"
import { pageSeo } from "@/lib/seoPages";

const TEAM: [string, string][] = [
  ["Natella Peretz", "CEO & Founder"],
  ["Eran Peretz", "CTO"],
  ["Tapu Sharma", "Department Manager"],
  ["David", "Project Manager"],
  ["Akash Dubey", "Sr Full Stack Developer"],
  ["Shivanand Pathak", "Sr Full Stack Developer"],
  ["S. Nagda", "Sr Backend Developer"],
  ["Darshan Patel", "Full Stack Developer"],
  ["Sonu", "Flutter Developer"],
  ["Kedar Rajput", "UI/UX Designer"],
  ["Vishakha", "UI/UX Designer"],
  ["Kate", "QA Engineer"],
  ["Eli", "Software Analyst"],
  ["Noa", "Content Management"],
  ["Nidhi Mali", "Digital Marketing Specialist"],
  ["Digvijay Singh Rathore", "Digital Marketing"],
];

export default function About() {
  const values = [
    {
      icon: "Measurements",
       title: "Passion for Boutiques",
          text: "We understand the craft of fittings, alterations, and exceptional client service."
    },
    {
      icon: "Users",
       title: "Simplicity First",
          text: "Elegant tools that remove complexity for boutiques."
    },
    {
      icon: "Shield",
       title: "Community Driven",
          text: "Every feature shaped by real boutique feedback."
    },
    {
      icon: "BarChart",
       title: "Continuous Innovation",
          text: "We constantly improve the platform with smarter tools."
    },
  
  ]
  return (
    <>
    <div className="page-urbanist">
      
      <Header />

      <section
  className="pt-32 pb-28 text-center relative overflow-hidden bg-cover bg-center"
  style={{ backgroundImage: "url('/uploads/landing/inner.webp')" }}
>
  <div className="max-w-6xl mx-auto px-6">

    <p className="text-pink-500 font-medium mb-4">Our Story</p>

    <h1 className="text-4xl md:text-5xl font-extralight text-slate-900 leading-tight">
      About FittingFlow: building the <span className="text-4xl md:text-5xl font-semibold">Future of Boutique</span> Retail
    </h1>

    <p className="md:text-gray-500 text-black  max-w-2xl mx-auto mt-4">
      We're a team of boutique operators and technologists on a mission
      to empower every boutique and alteration shop with beautiful, powerful tools.
    </p>

    <div className="mt-14">
      <img
        src="/uploads/landing/about.png"
          alt="The FittingFlow team at work"
        className="mx-auto rounded-2xl shadow-lg"
      />
    </div>

  </div>
</section>

      <section className="py-24">
  <div className="max-w-5xl mx-auto px-6">

    <div className="bg-[#3868FC] text-white rounded-3xl md:p-16 p-6 text-center shadow-xl">

      <h2 className="text-3xl font-semibold mb-6">
        Our Mission
      </h2>

      <p className="max-w-3xl mx-auto opacity-90 font-extralight mb-5">
        Every client deserves a great experience, and every boutique
        deserves tools that make operations effortless. From appointment
        scheduling to analytics — we handle the operations so you can
        focus on unforgettable moments.
      </p>
     <p className="font-extralight mb-5">From appointment scheduling to alteration tracking, from customer management to analytics - we handle the operations so you can focus on creating unforgettable moments.
     </p>
     <ul className="flex justify-center gap-2"><li className="flex font-extralight"><AwardIcon className="w-4 h-4 mt-[2px] m-[5px]"/> Best Boutique Tech 2025 </li>
     <li className="flex font-extralight"><BadgeHelp className="w-4 h-4 mt-[2px] m-[5px]" />
     
     Serving 15+ Countries</li>
     
     <li className="flex font-extralight"><Handshake className="w-4 h-4 mt-[2px] m-[5px]" />
     Trusted by Top Boutiques</li></ul>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">

        <div>
          <p className="text-3xl font-bold">500+</p>
          <p className="text-sm opacity-80">Boutiques</p>
        </div>

        <div>
          <p className="text-3xl font-bold">10K+</p>
          <p className="text-sm opacity-80">Clients Served</p>
        </div>

        <div>
          <p className="text-3xl font-bold">98%</p>
          <p className="text-sm opacity-80">Client Satisfaction</p>
        </div>

        <div>
          <p className="text-3xl font-bold">15+</p>
          <p className="text-sm opacity-80">Countries</p>
        </div>

      </div>

    </div>

  </div>
</section>
      <section className="pb-24">
  <div className="max-w-6xl mx-auto px-6 text-center">

    <h2 className="text-3xl font-semibold mb-4">
      Our Values
    </h2>

    <p className="text-slate-500 mb-14">
      The principles that guide everything we build.
    </p>

    <div className="">

     <IconCardGrid
        title="Our Values"
        subtitle="The principles that guide everything we build."
        items={values}
      />
    </div>
 </div>
</section>
<section className="timeline-section">
    <h2 className="timeline-title">Our Journey</h2>

    <div className="timeline">
  

        <div className="timeline-item left">
        <div className="timeline-circle">16</div>
            <div className="content text-left  md:mx-8">
                <h3>2022</h3>
                <h4>Founded</h4>
                <p>Started with a vision to modernize boutique and alteration management.</p>
            </div>
        </div>

        <div className="timeline-item right">
        <div className="timeline-circle ">12</div>
            <div className="content text-left  md:mx-8 ">
                <h3>2023</h3>
                <h4>500+ Boutiques</h4>
                <p>Reached our first major milestone of active boutiques.</p>
            </div>
        </div>

        <div className="timeline-item left">
        <div className="timeline-circle">26</div>
            <div className="content  text-left  md:mx-8">
                <h3>2024</h3>
                <h4>Client Portal Launch</h4>
                <p>Launched the self-service portal for clients worldwide.</p>
            </div>
        </div>

        <div className="timeline-item right">
        <div className="timeline-circle ">1</div>
            <div className="content text-left  md:mx-8">
                <h3>2025</h3>
                <h4>10,000+ Clients</h4>
                <p>Helped over ten thousand clients with fittings, alterations, and boutique services.</p>
            </div>
        </div>

        <div className="timeline-item left">
          
        <div className="timeline-circle">12</div>
            <div className="content text-left   md:mx-8">
                <h3>2026</h3>
                <h4>AI-Powered</h4>
                <p>Introduced smart capture & AI-driven fitting recommendations.</p>
            </div>
        </div>

    </div>
</section>
<section className="py-24">
  <div className="max-w-6xl mx-auto px-6 text-center">

    <p className="text-pink-500 mb-2">Meet the Team</p>

    <h2 className="text-3xl font-semibold mb-12">
      The people behind the platform
    </h2>

    {/* Real team, as listed on tekgaru.com/about (Tekgaru LLC d/b/a FittingFlow). No stock photos. */}
    <ul className="grid grid-cols-2 gap-5 text-left sm:grid-cols-3 lg:grid-cols-4">
      {TEAM.map(([name, role]) => (
        <li key={name} className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
          <span
            aria-hidden="true"
            className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#F22DCE] to-[#3764F3] text-lg font-semibold text-white"
          >
            {name.charAt(0)}
          </span>
          <span className="min-w-0">
            <span className="block text-[15px] font-semibold leading-snug text-[#191E49]">{name}</span>
            <span className="block text-xs uppercase tracking-wide text-slate-500">{role}</span>
          </span>
        </li>
      ))}
    </ul>

  </div>
</section>
      {/* CTA */}
      <CTASection />
      <Footer /></div>
    </>
  )
}