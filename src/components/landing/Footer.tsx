"use client";

import {
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
} from "lucide-react";
import DemoRequestForm from "./DemoRequestForm";


const Footer = () => {

  return (
    <><footer className="bg-blue-600 text-white py-20">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid lg:grid-cols-2 gap-16">

          {/* LEFT SIDE */}
          <div>

            {/* Logo */}
            <div className="flex items-center gap-3 mb-8">
              <img
                src="/uploads/white-logo.png"
                alt="FittingFlow"
                className="h-8" />

            </div>

            <h2 className="text-2xl md:text-3xl font-semibold mb-8 leading-snug">
              Smart & Seamless Booking for <br />
              Modern Boutiques & Alterations
            </h2>

            <p className="text-blue-100 mb-6">
              See what's happening in:
            </p>

            <div className="grid grid-cols-2 gap-x-16 gap-y-4 text-blue-50 text-lg font-medium">
              <span>Online Booking</span>
              <span>Staff Management</span>
              <span>Client Management</span>
              <span>Reports & Analytics</span>
              <span>Appointment Calendar</span>
              <span>Payments & Invoicing</span>
              <span>Automated Reminders</span>
              <span>POS Integration</span>
            </div>

            <button className="mt-6 text-blue-200 hover:text-white transition">
              Explore more →
            </button>

            {/* Divider */}
            <div className="border-t border-blue-400/30 my-12"></div>

            {/* Footer Links */}
            <div className="grid grid-cols-3 gap-8 text-sm">
              <div>
                <p className="text-blue-200 mb-4">People</p>
                <ul className="space-y-2 text-blue-100">
                  <li><a href={'/features'}>Features</a></li>
                  <li><a href={'/blog'}>Blogs</a></li>
                  <li><a href={'/contact'}>Help Center</a></li>

                </ul>
              </div>

              <div>
                <p className="text-blue-200 mb-4">Company</p>
                <ul className="space-y-2 text-blue-100">
                  <li><a href={'/about'}>About Us</a></li>
                  <li><a href={'/why-fittingflow'}>Why FittingFlow</a></li>
                  <li><a href={'/boutique-software'}>Boutique software</a></li>
                  <li><a href={'/bridal-alteration-software'}>Bridal alteration software</a></li>
                  <li><a href={'/alteration-software'}>Alteration software</a></li>
                  <li><a href={'/best-boutique-software'}>Best boutique software</a></li>
                  <li><a href={'/switch'}>Switch for free</a></li>
                  <li><a href={'/pricing'}>Pricing</a></li>
                  <li><a href={'/contact'}>Contact</a></li>
                </ul>
              </div>

              <div>
                <p className="text-blue-200 mb-4">Legal</p>
                <ul className="space-y-2 text-blue-100">
                  <li><a href={'/privacy'}>Privacy Policy</a></li>
                  <li><a href={'/terms'}>Terms & Conditions</a></li>
                  <li><a href={'/data-security'}>Data Security</a></li>
                  <li><a href={'/privacy'}>Compliance</a></li>
                </ul>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="md:order-l border-blue-400/30 md:pl-12 pl-0">

            <p className="text-blue-200 mb-6 text-left">
              Try it free — no credit card required.
            </p>

            <div className="bg-white rounded-3xl overflow-hidden shadow-2xl mb-8">
              <img
                src="/uploads/landing/footer.webp"
                alt="Fitting Flow"
                className="w-full h-72 object-cover" />
            </div>

            <p className="text-lg text-blue-50 mb-8">
              Manage appointments, clients, payments, and team schedules
              effortlessly – designed for bridal boutiques and alteration shops.
            </p>

            <div className="bg-white/20 backdrop-blur-md rounded-xl p-6 flex justify-between items-center mb-8">
              <p className="text-blue-100 text-sm">
                manage your business empire with elegance and efficiency
              </p>
              <a href={'/pricing'} className="min-w-[92px] bg-white text-blue-600 px-4 py-2 rounded-full font-semibold">
                Try It Free
              </a>
            </div>

            <div className="text-blue-100 space-y-2 mb-6">
              <p>Call us on: <a href="tel:+18888390060">(888) 839-0060</a></p>

              <p>info@fittingflow.com</p>
            </div>

            {/* Social Icons */}
            <div className="flex gap-6 text-blue-100">
              <a
                href="https://www.facebook.com/profile.php?id=61589879087854"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook className="w-5 h-5 cursor-pointer hover:text-white transition-colors" />
              </a>

              <a
                href="https://instagram.com/fittingflow"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="w-5 h-5 cursor-pointer hover:text-white transition-colors" />
              </a>

              <a
                href="https://www.linkedin.com/company/fittingflow/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="w-5 h-5 cursor-pointer hover:text-white transition-colors" />
              </a>

              <a
                href="https://x.com/fittingflow"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter className="w-5 h-5 cursor-pointer hover:text-white transition-colors" />
              </a>


              <a
                href="https://www.youtube.com/@Fittingflow"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Youtube className="w-5 h-5 cursor-pointer hover:text-white transition-colors" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer></>
  );
};

export default Footer;

