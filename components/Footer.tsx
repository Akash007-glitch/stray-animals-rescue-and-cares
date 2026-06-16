"use client";

import React from "react";

interface FooterProps {
  scrollSmoothTo: (id: string) => void;
}

export default function Footer({ scrollSmoothTo }: FooterProps) {
  return (
    <footer className="bg-charcoal text-cream pt-16 pb-8 border-t-2 border-terracotta mt-auto">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 mb-12">
        {/* Logo & Description */}
        <div className="md:col-span-5 space-y-4">
          <div className="flex items-center gap-2">
            <span className="bg-coral/20 text-coral p-1.5 rounded-full inline-flex items-center justify-center">
              <svg className="w-4 h-4 fill-current text-coral" viewBox="0 0 24 24">
                <circle cx="8" cy="6" r="2" />
                <circle cx="12" cy="4" r="2" />
                <circle cx="16" cy="6" r="2" />
                <circle cx="7" cy="11" r="2" />
                <circle cx="17" cy="11" r="2" />
                <path d="M12 10c-3 0-5 2-5 5s2 4 5 4 5-1 5-4-2-5-5-5z" />
              </svg>
            </span>
            <span className="font-sans text-2xl font-black tracking-tight text-cream">Poofyco</span>
            <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 border border-cream/30 text-cream/70 rounded-sm">
              Assam
            </span>
          </div>
          <p className="text-xs text-[#EEDFD2]/75 max-w-sm leading-relaxed">
            Street Animal Rescue Collective is a grassroots organization based in Northeast India. We fill critical
            local municipal welfare gaps through community foster networks, vaccination patrols, and medical treatment.
          </p>
        </div>

        {/* District Chapters */}
        <div className="md:col-span-4 space-y-3">
          <h4 className="text-xs uppercase font-extrabold text-amber tracking-wider">Local Chapters</h4>
          <ul className="space-y-1.5 text-xs text-[#EEDFD2]/70">
            <li>📍 <strong>Guwahati:</strong> Zoo Road Patrols & Kahilipara Clinic Hub</li>
            <li>📍 <strong>Dibrugarh:</strong> Bari Road Rescue Team</li>
            <li>📍 <strong>Jorhat:</strong> Teok Town Volunteers</li>
          </ul>
        </div>

        {/* Contact Details */}
        <div className="md:col-span-3 space-y-3">
          <h4 className="text-xs uppercase font-extrabold text-amber tracking-wider">Contact Info</h4>
          <div className="space-y-1.5 text-xs text-[#EEDFD2]/70">
            <div>✉️ rescue@sarc-assam.org</div>
            <div>📞 +91 98640 12345 (24/7 Helpline)</div>
            <div className="text-[10px] text-amber/80 font-bold pt-1 uppercase">Guwahati Chapter, Assam, India</div>
          </div>
        </div>
      </div>

      {/* Legal & Footer Bottom */}
      <div className="max-w-6xl mx-auto px-6 border-t border-cream/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] text-cream/50 uppercase tracking-widest">
        <div>&copy; {new Date().getFullYear()} Poofyco (Street Animal Rescue Collective). All rights reserved.</div>
        <div className="flex gap-6">
          <a onClick={() => scrollSmoothTo("home")} className="hover:underline cursor-pointer">
            Back to Top
          </a>
          <span>•</span>
          <span className="text-[#EEDFD2]/70 font-semibold">Guwahati Municipal Animal Welfare Gap Response</span>
        </div>
      </div>
    </footer>
  );
}
