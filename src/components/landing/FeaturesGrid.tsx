"use client";

import {
    Calendar,
    Users,
    CreditCard,
    Bell,
    Scissors,
    MessageSquare,
    Shield,
    BarChart3,
    Palette,
    MapPin,
    Mail,
    Settings
  } from "lucide-react";
  const FeaturesSection = () => {
    const features = [
      {
        icon: "Calendar",
        title: "Appointment Scheduling",
        desc: "Book appointments quickly, with types, duration, and clean calendar views."
      },
      {
        icon: "Users",
        title: "Customer Portal",
        desc: "Manage customers, notes, and history in one place — and import older customer data from Excel."
      },
      {
        icon: "Palette",
        title: "Style Boards",
        desc: "Build style boards with colors, fabrics, images, plus video inspiration in-shop."
      },
      {
        icon: "order",
        title: "Orders",
        desc: "Create orders with items, totals, taxes, statuses, and due dates per client."
      },
      {
        icon: "CreditCard",
        title: "Payments & Total Due",
        desc: "Track payments and balances so staff always know what's still due instantly."
      },
      {
        icon: "Scissors",
        title: "Alterations Board",
        desc: "Run alterations from pending to completed with services, pricing and time saved."
      },
      {
        icon: "Measurements",
        title: "Measurements",
        desc: "Capture precise measurements using templates for consistent fittings every time."
      },
      {
        icon: "MapPin",
        title: "Multi-Location",
        desc: "Manage multiple locations with capacity, hours, services, plus managers at once."
      },
      {
        icon: "Mail",
        title: "Email Templates",
        desc: "Choose a theme, add an image and message, and send promotions from an Excel list with your store details."
      },
      {
        icon: "Shield",
        title: "Staff Management",
        desc: "Add staff, assign roles, and control store access permissions."
      },
      {
        icon: "Settings",
        title: "Admin Lookups & Setup",
        desc: "Control appointment types, services, categories, and dropdown data."
      },
      {
        icon: "BarChart",
        title: "Analytics",
        desc: "Track revenue, customers, appointments, and business performance."
      }
    ];
  
    return (
      <section className="md:py-24 py-10 bg-[#fcfafa]">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Heading */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-gray-900 mb-4">
              Everything Your Boutique Needs — <span className="text-4xl font-semibold">All in One Place</span>
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
              Smart, elegant tools crafted for boutiques and alteration shops —
              to simplify scheduling and elevate every client experience.
            </p>
          </div>
  
          {/* Grid */}
     {/* Desktop Grid */}
<div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-8">
  {features.map((feature, index) => (
    <div
      key={index}
      className="bg-white rounded-2xl p-8 md:text-left shadow-sm hover:shadow-md transition duration-300"
    >
      <div className="w-12 h-12 flex items-center justify-center rounded-xl">
        <div
          className={`w-12 h-12 feature-icon bg-center bg-no-repeat bg-contain ${feature.icon}`}
          style={{ backgroundImage: "url('/uploads/landing/feature.svg')" }}
        ></div>
      </div>

      <h3 className="text-base font-semibold text-gray-900 mb-3">
        {feature.title}
      </h3>

      <p className="text-sm text-gray-500 leading-relaxed">
        {feature.desc}
      </p>
    </div>
  ))}
</div>

          {/* Bottom Link */}
          <div className="text-center mt-12">
            <a
              href="#how-it-works"
              className="text-pink-500 hover:text-pink-600 text-sm font-medium underline underline-offset-4"
            >
              Learn more about the more features
            </a>
          </div>
        </div>
      </section>
    );
  };
  
  export default FeaturesSection;