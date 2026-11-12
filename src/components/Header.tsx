"use client";

import { useEffect, useState } from "react";
import { CalendarPlus, LogInIcon, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { appUrl } from "@/lib/site";

const menuItems = [
  { label: "About", link: "/about" },
  { label: "Features", link: "/features" },
  { label: "Pricing", link: "/pricing" },
  { label: "Why Fittingflow", link: "/why-fittingflow" },
  { label: "Contact Us", link: "/contact" },
];

/** Same look as the app's PublicHeader. Login and booking go to the app. */
export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || menuOpen ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <a href="/" className="flex items-center space-x-2" aria-label="FittingFlow home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/uploads/logo.png" alt="FittingFlow" width={140} height={36} />
        </a>

        <nav className="hidden md:flex items-center gap-8 text-sm" aria-label="Main">
          {menuItems.map((item) => (
            <a
              key={item.label}
              href={item.link}
              className="text-[#191E49] hover:text-pink-600 tracking-[0.5px] transition-colors font-medium"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 md:gap-3">
          <Button asChild size="sm" className="bg-[#F22DCE] hover:bg-pink-600 text-white rounded-full px-3 md:px-5">
            <a href={appUrl("/book")}>
              <CalendarPlus className="h-4 w-4" />
              <span className="hidden sm:inline">Book Now</span>
            </a>
          </Button>
          <Button asChild variant="outline" size="sm" className="box-shadow border-pink-600 bg-white rounded-full text-pink-500">
            <a href={appUrl("/signin")}>
              <LogInIcon />
              Login
            </a>
          </Button>
          <Button asChild size="sm" className="hidden md:inline-flex box-shadow bg-blue-600 text-white hover:bg-blue-700 rounded-full px-5">
            <a href="/pricing">Get 30-Day Free</a>
          </Button>
        </div>

        <button
          className="md:hidden p-2 rounded-lg hover:bg-muted"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white border-t border-border px-6 py-4 flex flex-col gap-4">
          {menuItems.map((item) => (
            <a key={item.label} href={item.link} className="text-gray-700 hover:text-pink-600 transition">
              {item.label}
            </a>
          ))}
          <Button asChild className="bg-[#F22DCE] hover:bg-pink-600 text-white rounded-full">
            <a href={appUrl("/book")}>
              <CalendarPlus className="mr-1 h-4 w-4" />
              Book Now
            </a>
          </Button>
          <Button asChild className="bg-primary text-primary-foreground rounded-full">
            <a href="/pricing">Get Started Free</a>
          </Button>
        </div>
      )}
    </header>
  );
}
