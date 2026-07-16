"use client";

import React from "react";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

interface FooterProps {
  scrollSmoothTo: (id: string) => void;
}

export default function Footer({ scrollSmoothTo }: FooterProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleNavClick = (target: string) => {
    // Ensure we resolve the path correctly even during hydration or client router lags
    const currentPath = pathname || (typeof window !== "undefined" ? window.location.pathname : "/");

    if (target === "about") {
      router.push("/about");
    } else {
      if (currentPath === "/") {
        scrollSmoothTo(target);
      } else {
        router.push(`/#${target}`, { scroll: false });
      }
    }
  };

  return (
    <footer className="relative bg-navy text-white mt-16 md:mt-24">
      {/* Main Content Area */}
      <div className="max-w-6xl mx-auto px-6 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Card containing S.A.R.C branding */}
          <div className="col-span-1 md:col-span-4 relative -mt-24 md:-mt-28 z-10 bg-[#2C2E63] p-8 md:p-9 rounded-[2rem] shadow-xl text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
            {/* Logo */}
            <div className="flex items-center gap-2 mb-6">
              <span className="text-white inline-flex items-center justify-center">
                <svg className="w-8 h-8 fill-current text-white" viewBox="0 0 24 24">
                  <circle cx="8" cy="6" r="2" />
                  <circle cx="12" cy="4" r="2" />
                  <circle cx="16" cy="6" r="2" />
                  <circle cx="7" cy="11" r="2" />
                  <circle cx="17" cy="11" r="2" />
                  <path d="M12 10c-3 0-5 2-5 5s2 4 5 4 5-1 5-4-2-5-5-5z" />
                </svg>
              </span>
              <span className="font-sans text-2xl font-bold tracking-tight text-white">S.A.R.C</span>
            </div>

            {/* Description */}
            <p className="text-xs text-white/80 leading-relaxed mb-6 font-medium">
              S.A.R.C is Tinsukia&apos;s leading street animal rescue network, providing around-the-clock emergency field aid, foster circles, and community care to protect the voiceless.
            </p>

            {/* Social Media Icons */}
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-coral hover:bg-coral-light text-white flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-md"
                aria-label="Facebook"
              >
                <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-coral hover:bg-coral-light text-white flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-md"
                aria-label="Twitter"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-coral hover:bg-coral-light text-white flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-md"
                aria-label="YouTube"
              >
                <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.518 3.5 12 3.5 12 3.5s-7.518 0-9.388.553a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.87.553 9.388.553 9.388.553s7.518 0 9.388-.553a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="col-span-1 md:col-span-2 pt-2 md:pt-4">
            <h4 className="text-coral font-bold text-sm uppercase tracking-wider mb-5">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { name: "About Us", target: "about" },
                { name: "Services", target: "adopt" },
                { name: "Adoptions", target: "adopt" },
                { name: "Donation", target: "donate" },
                { name: "Our Team", target: "about" }
              ].map((link, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => handleNavClick(link.target)}
                    className="text-white/85 hover:text-coral transition-all duration-200 transform hover:translate-x-1 text-xs font-semibold block text-left cursor-pointer"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Help Center Column */}
          <div className="col-span-1 md:col-span-2 pt-2 md:pt-4">
            <h4 className="text-coral font-bold text-sm uppercase tracking-wider mb-5">Help Center</h4>
            <ul className="space-y-3">
              {[
                { name: "Contact Us", target: "volunteer" },
                { name: "Terms & Condition", target: "home" },
                { name: "Privacy Policy", target: "home" },
                { name: "Support", target: "volunteer" },
                { name: "FAQ's", target: "home" }
              ].map((link, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => handleNavClick(link.target)}
                    className="text-white/85 hover:text-coral transition-all duration-200 transform hover:translate-x-1 text-xs font-semibold block text-left cursor-pointer"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Get In Touch Column */}
          <div className="col-span-1 md:col-span-4 pt-2 md:pt-4 space-y-4">
            <h4 className="text-coral font-bold text-sm uppercase tracking-wider mb-5">Get In Touch</h4>
            <ul className="space-y-3.5 text-xs font-semibold text-white/85">
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-coral shrink-0" />
                <a href="tel:+919217377060" className="hover:text-coral transition-colors duration-200">
                  (+91) 92173 77060
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-coral shrink-0" />
                <a href="mailto:strayanimalsrescueandcare@gmail.com" className="hover:text-coral transition-colors duration-200">
                  strayanimalsrescueandcare@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-coral shrink-0 mt-0.5" />
                <span className="leading-relaxed">Tinsukia, Assam, India</span>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-coral shrink-0" />
                <span>24/7 Volunteer Emergency Help</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="bg-coral py-3 text-center flex items-center justify-center gap-1.5">
        <span className="text-white text-xs select-none">🐾</span>
        <p className="text-white text-[10px] md:text-xs font-bold tracking-wide">
          Copyright © 2024 S.A.R.C | Powered by S.A.R.C
        </p>
        <span className="text-white text-xs select-none">🐾</span>
      </div>
    </footer>
  );
}

