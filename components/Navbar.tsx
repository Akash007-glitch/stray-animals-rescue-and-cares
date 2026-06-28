"use client";

import React from "react";
import { Phone, Mail, MapPin, Menu, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

interface NavbarProps {
  scrolled: boolean;
  activeSection: string;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (val: boolean) => void;
  scrollSmoothTo: (id: string) => void;
}

export default function Navbar({
  scrolled,
  activeSection,
  mobileMenuOpen,
  setMobileMenuOpen,
  scrollSmoothTo
}: NavbarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleNavClick = (target: string) => {
    setMobileMenuOpen(false);
    
    // Ensure we resolve the path correctly even during hydration or client router lags
    const currentPath = pathname || (typeof window !== "undefined" ? window.location.pathname : "/");

    if (target === "about") {
      router.push("/about");
    } else {
      if (currentPath === "/") {
        scrollSmoothTo(target);
      } else {
        router.push(`/#${target}`);
      }
    }
  };

  const isActive = (target: string) => {
    if (target === "about") {
      return pathname === "/about";
    }
    return pathname === "/" && activeSection === target;
  };
  return (
    <header className="fixed top-0 left-0 right-0 z-40 transition-all duration-300 w-full">
      {/* Topbar: Contact & Social Info */}
      {!scrolled && (
        <div className="bg-navy-dark text-[#FAF7F2]/70 text-xs py-2.5 px-6 border-b border-white/5 hidden md:block">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-6 font-medium">
              <span className="flex items-center gap-1.5">
                <Phone className="h-3.5 w-3.5 text-coral" /> (+91) 9217377060
              </span>
              <span className="flex items-center gap-1.5">
                <Mail className="h-3.5 w-3.5 text-coral" /> strayanimalsrescueandcare@gmail.com
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-coral" /> Tinsukia, Assam
              </span>
            </div>
            <div className="flex items-center gap-3">
              {["facebook", "twitter", "youtube", "instagram"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="h-6 w-6 rounded-full bg-white/10 hover:bg-coral hover:text-white flex items-center justify-center transition-colors text-white font-bold text-[10px]"
                >
                  {social === "facebook" && "f"}
                  {social === "twitter" && "t"}
                  {social === "youtube" && "y"}
                  {social === "instagram" && "i"}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main Floating Capsule Navbar */}
      <div className={`w-full transition-all duration-300 ${scrolled ? "py-2" : "py-4 md:py-6"}`}>
        <div className="max-w-6xl mx-auto px-6">
          <div
            className={`transition-all duration-300 bg-white/95 backdrop-blur-md rounded-full border border-charcoal/5 flex items-center justify-between w-full max-w-6xl mx-auto ${scrolled ? "py-2.5 px-6 shadow-md" : "py-4 px-8 shadow-lg"
              }`}
          >
            {/* Brand Logo */}
            <a onClick={() => handleNavClick("home")} className="cursor-pointer flex items-center gap-2">
              <span className="bg-coral/10 text-coral p-2 rounded-full inline-flex items-center justify-center">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <circle cx="8" cy="6" r="2" />
                  <circle cx="12" cy="4" r="2" />
                  <circle cx="16" cy="6" r="2" />
                  <circle cx="7" cy="11" r="2" />
                  <circle cx="17" cy="11" r="2" />
                  <path d="M12 10c-3 0-5 2-5 5s2 4 5 4 5-1 5-4-2-5-5-5z" />
                </svg>
              </span>
              <div className="font-sans text-2xl font-black tracking-tight text-charcoal">S.A.R.C</div>
              <span className="text-[9px] uppercase font-bold tracking-widest px-1.5 py-0.5 border border-charcoal/20 text-charcoal/60 rounded-xs">
                Assam
              </span>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-8 font-semibold">
              {[
                { label: "Home", target: "home" },
                { label: "Live Tracker", target: "tracker" },
                { label: "About Us", target: "about" },
                { label: "Service", target: "adopt" },
                { label: "Features", target: "volunteer" },
                { label: "Pages", target: "donate" }
              ].map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.target)}
                  className={`text-sm tracking-wide transition-colors hover:text-coral cursor-pointer ${isActive(item.target)
                    ? "text-coral font-bold border-b-2 border-coral pb-0.5"
                    : "text-charcoal/80"
                    }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Contact Us Nav Button */}
            <div className="hidden md:block">
              <button
                onClick={() => handleNavClick("volunteer")}
                className="text-xs uppercase tracking-widest font-black px-6 py-3 rounded-full border-2 border-navy text-navy hover:bg-[#0B0E37] hover:text-white transition-all cursor-pointer"
              >
                Contact Us
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1 cursor-pointer text-charcoal"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[68px] bg-[#FAF7F2] border-b border-terracotta/20 shadow-xl py-6 px-6 flex flex-col gap-4 animate-fade-in-up">
          {[
            { label: "Home", target: "home" },
            { label: "Live Tracker", target: "tracker" },
            { label: "About Us", target: "about" },
            { label: "Service", target: "adopt" },
            { label: "Features", target: "volunteer" },
            { label: "Pages", target: "donate" }
          ].map((item) => (
            <button
              key={item.label}
              onClick={() => handleNavClick(item.target)}
              className={`text-left text-lg font-serif font-bold py-2 border-b border-terracotta/10 cursor-pointer ${isActive(item.target) ? "text-coral" : "text-charcoal"
                }`}
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => handleNavClick("volunteer")}
            className="mt-2 w-full py-3 text-center uppercase tracking-widest text-sm font-bold bg-coral text-white rounded-lg hover:bg-coral-light cursor-pointer"
          >
            Contact Us
          </button>
        </div>
      )}
    </header>
  );
}
