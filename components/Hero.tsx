"use client";

import React from "react";
import Image from "next/image";

interface HeroProps {
  scrollSmoothTo: (id: string) => void;
}

export default function Hero({ scrollSmoothTo }: HeroProps) {
  return (
    <section
      id="home"
      className="relative bg-[#EBF0F6] lg:h-[100vh] lg:min-h-[880px] pt-36 md:pt-40 lg:pt-48 pb-12 lg:pb-0 flex flex-col justify-between overflow-hidden"
    >
      {/* Topographic organic background styling */}
      <div className="absolute inset-0 z-0 opacity-15 pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 1440 900" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M-100 100 C 300 150, 400 -50, 900 100 C 1400 250, 1200 400, 1600 500" stroke="#0B0E37" strokeWidth="2" />
          <path d="M-100 200 C 300 250, 400 50, 900 200 C 1400 350, 1200 500, 1600 600" stroke="#0B0E37" strokeWidth="2" />
          <path d="M-100 300 C 300 350, 400 150, 900 300 C 1400 450, 1200 600, 1600 700" stroke="#0B0E37" strokeWidth="2" />
          <path d="M-100 400 C 300 450, 400 250, 900 400 C 1400 550, 1200 700, 1600 800" stroke="#0B0E37" strokeWidth="2" />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center w-full z-10 relative flex-1 py-8 lg:py-0">
        {/* Left Column: Heading & CTAs */}
        <div className="lg:col-span-6 space-y-6 md:space-y-8 text-left animate-fade-in-up">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[50px] font-serif font-black text-navy leading-[1.15] tracking-tight">
            Helping Stray Animals,
            <br />
            Building Community
          </h1>

          <p className="text-xs sm:text-sm md:text-base text-charcoal/70 max-w-lg leading-relaxed">
            Stray animals often live without reliable food, shelter, or medical care. Our mission is to promote
            awareness, encourage responsible coexistence, and inspire communities to take action for their well-being.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => scrollSmoothTo("donate")}
              className="px-6 py-3 sm:px-8 sm:py-4 bg-coral hover:bg-coral-light text-white font-bold tracking-wider text-xs rounded-full shadow-lg transition-all cursor-pointer hover:translate-y-[-2px] active:translate-y-0"
            >
              Donate Now
            </button>
            <button
              onClick={() => scrollSmoothTo("about")}
              className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-navy hover:bg-navy-dark text-white flex items-center justify-center shadow-md transition-all cursor-pointer hover:scale-105 active:scale-100"
              aria-label="About our mission"
            >
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current ml-0.5" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Right Column: Hero Cutout Image */}
        <div className="lg:col-span-6 relative flex justify-center lg:justify-end items-end mt-8 lg:mt-0 h-[280px] sm:h-[380px] lg:h-[520px]">
          <div className="relative w-full h-full max-w-md lg:max-w-none select-none">
            <Image
              src="/images/H2.jpg"
              alt="Tabby cat and long-eared brown puppy side-by-side"
              fill
              priority
              className="object-contain object-bottom z-10 filter drop-shadow-lg"
            />
          </div>
        </div>
      </div>

      {/* BOTTOM NAVY BENEFITS BAR */}
      <div className="bg-navy text-white py-8 md:py-10 z-20 border-t border-white/5 relative">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left thumbnail card */}
          <div className="lg:col-span-3 flex items-center justify-between bg-white/5 border border-white/10 rounded-2xl p-3 shadow-md relative group overflow-hidden w-full max-w-md mx-auto lg:max-w-none">
            <div className="relative h-20 w-32 rounded-xl overflow-hidden bg-white/10">
              <Image
                src="/images/cat_jonti.png"
                alt="preview cat"
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <button
              onClick={() => scrollSmoothTo("adopt")}
              className="absolute top-2 right-2 h-7 w-7 rounded-full bg-white text-navy flex items-center justify-center shadow-md hover:scale-105 active:scale-95 transition-transform cursor-pointer"
            >
              <svg className="w-3.5 h-3.5 text-coral stroke-[3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
            <div className="flex-1 pl-3 text-left">
              <div className="text-xs font-bold text-white/90">Adopt Today</div>
              <div className="text-[10px] text-white/50 mt-0.5">Meet Jonti & friends</div>
            </div>
          </div>

          {/* Three key benefits columns */}
          <div className="lg:col-span-9 grid grid-cols-1 sm:grid-cols-3 gap-6 lg:pl-6">
            {/* Benefit 1 */}
            <div className="flex items-start gap-4 border-l border-white/10 sm:border-l-0 sm:pl-0 sm:border-r sm:border-dashed sm:border-white/20 pr-4">
              <div className="bg-white/10 p-2.5 rounded-full text-coral shrink-0">
                <svg className="w-5 h-5 stroke-current fill-none" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <div>
                <h4 className="text-xs uppercase font-extrabold text-coral tracking-wider mb-1">Rescue Animal</h4>
                <p className="text-[10.5px] text-white/60 leading-relaxed">
                  Weekly street rescue and flyover patrols in Guwahati city zones.
                </p>
              </div>
            </div>

            {/* Benefit 2 */}
            <div className="flex items-start gap-4 sm:pl-4 sm:border-r sm:border-dashed sm:border-white/20 pr-4">
              <div className="bg-white/10 p-2.5 rounded-full text-coral shrink-0">
                <svg className="w-5 h-5 stroke-current fill-none" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 11c0-1.1.9-2 2-2h1a3 3 0 013 3v2a3 3 0 01-3 3h-1m-4-6a3 3 0 00-3-3H4a3 3 0 00-3 3v2a3 3 0 003 3h1m4 3v1a3 3 0 01-3 3H4M9 15h6"
                  />
                </svg>
              </div>
              <div>
                <h4 className="text-xs uppercase font-extrabold text-coral tracking-wider mb-1">Rehabilitation</h4>
                <p className="text-[10.5px] text-white/60 leading-relaxed">
                  Medical clinics, boarding, vaccines, and keyhole sterilization drives.
                </p>
              </div>
            </div>

            {/* Benefit 3 */}
            <div className="flex items-start gap-4 sm:pl-4">
              <div className="bg-white/10 p-2.5 rounded-full text-coral shrink-0">
                <svg className="w-5 h-5 stroke-current fill-none" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
              </div>
              <div>
                <h4 className="text-xs uppercase font-extrabold text-coral tracking-wider mb-1">Pet Adoption</h4>
                <p className="text-[10.5px] text-white/60 leading-relaxed">
                  Matching our recovered rescues with loving and warm families.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
