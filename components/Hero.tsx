"use client";

import React from "react";
import Image from "next/image";
import { PawPrint } from "lucide-react";

interface HeroProps {
  scrollSmoothTo: (id: string) => void;
}

export default function Hero({ scrollSmoothTo }: HeroProps) {
  return (
    <section
      id="home"
      className="relative bg-gradient-to-b from-[#EBF0F6] via-[#FAF7F2] to-[#EBF0F6]/40 lg:h-[100vh] lg:min-h-[820px] pt-24 xs:pt-28 md:pt-36 lg:pt-44 pb-12 lg:pb-0 flex flex-col justify-between overflow-hidden"
    >
      {/* Mobile/Tablet: Clean background to keep text readable. Topographic line SVG overlay will display. */}

      {/* Topographic organic background styling */}
      <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none">
        <svg
          className="w-full h-full"
          viewBox="0 0 1440 900"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
        >
          <path d="M-100 100 C 300 150, 400 -50, 900 100 C 1400 250, 1200 400, 1600 500" stroke="#0B0E37" strokeWidth="2" />
          <path d="M-100 200 C 300 250, 400 50, 900 200 C 1400 350, 1200 500, 1600 600" stroke="#0B0E37" strokeWidth="2" />
          <path d="M-100 300 C 300 350, 400 150, 900 300 C 1400 450, 1200 600, 1600 700" stroke="#0B0E37" strokeWidth="2" />
          <path d="M-100 400 C 300 450, 400 250, 900 400 C 1400 550, 1200 700, 1600 800" stroke="#0B0E37" strokeWidth="2" />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center w-full z-10 relative flex-1 py-6 md:py-8 lg:py-0 pb-12 lg:pb-0">
        {/* Left Column: Heading & CTAs */}
        <div className="lg:col-span-6 space-y-6 md:space-y-8 text-center lg:text-left items-center lg:items-start flex flex-col animate-fade-in-up w-full order-2 lg:order-1">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[50px] font-serif font-black text-navy leading-[1.15] tracking-tight w-full">
            Helping Stray Animals,
            <br />
            Building Community
          </h1>

          <p className="text-xs sm:text-sm md:text-base text-charcoal/70 max-w-lg leading-relaxed text-center lg:text-left mx-auto lg:mx-0">
            Stray animals often live without reliable food, shelter, or medical care. Our mission is to promote
            awareness, encourage responsible coexistence, and inspire communities to take action for their well-being.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 w-full">
            <button
              onClick={() => scrollSmoothTo("donate")}
              className="px-6 py-3 sm:px-8 sm:py-4 bg-coral hover:bg-coral-light text-white font-bold tracking-wider text-xs rounded-full shadow-md shadow-coral/30 hover:shadow-lg hover:shadow-coral/45 transition-all cursor-pointer hover:translate-y-[-2px] active:translate-y-0 flex items-center gap-2"
            >
              <PawPrint className="w-4.5 h-4.5 fill-current" />
              <span>Donate Now</span>
            </button>
            {/* <button
              onClick={() => scrollSmoothTo("about")}
              className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-navy hover:bg-navy-dark text-white flex items-center justify-center shadow-md transition-all cursor-pointer hover:scale-105 active:scale-100"
              aria-label="About our mission"
            >
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current ml-0.5" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </button> */}
          </div>
        </div>

        {/* Right Column: Hero Dual-Frame Image Section */}
        <div className="flex lg:col-span-6 relative justify-center lg:justify-end items-center mt-8 lg:mt-0 w-full min-h-[320px] xs:min-h-[360px] sm:min-h-[460px] lg:min-h-[540px] order-1 lg:order-2">
          {/* Main Container for the overlapping frames */}
          <div className="relative w-full max-w-[280px] xs:max-w-[320px] sm:max-w-[420px] lg:max-w-[480px] h-[300px] xs:h-[340px] sm:h-[420px] lg:h-[480px] select-none flex items-center justify-center">

            {/* BACKGROUND DECORATIVE SHAPES */}
            {/* Top-Right: Solid coral dots & flat floating paw print */}
            <div className="absolute top-0 right-2 xs:right-4 lg:right-10 flex gap-2 items-center animate-float-slow z-0">
              <PawPrint className="w-8 h-8 xs:w-10 xs:h-10 text-coral fill-coral/10 opacity-70 rotate-[15deg] drop-shadow-sm" />
              <div className="w-5 h-5 xs:w-6 xs:h-6 rounded-full bg-coral/40 mt-4" />
              <div className="w-3 h-3 xs:w-3.5 xs:h-3.5 rounded-full bg-coral/25 mt-1" />
            </div>

            {/* Pink floating leaf-like sparks/paws on the left */}
            <div className="absolute left-[-15px] xs:left-[-25px] top-[18%] xs:top-[22%] flex flex-col items-center gap-3 animate-float-delayed z-20">
              <PawPrint className="w-8 h-8 xs:w-10 xs:h-10 text-coral fill-coral/10 opacity-75 rotate-[-20deg] drop-shadow-sm" />
              
              {/* Simple clean double-leaf sprout outline SVG in coral */}
              <svg className="w-7 h-7 xs:w-9 xs:h-9 text-coral/60 ml-2 animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 22C2 22 8 20 12 16C16 12 18 6 18 6" />
                <path d="M12 16C12 16 10 11 6 10C2 9 2 6 2 6C2 6 7 6 10 8C13 10 12 16 12 16Z" />
                <path d="M18 6C18 6 17 11 19 14C21 17 22 20 22 20C22 20 19 18 16 17C13 16 18 6 18 6Z" />
              </svg>
            </div>

            {/* Main Oval Frame (Egg Shape) - Clean clipped edge with soft shadow */}
            <div className="absolute w-[180px] h-[250px] xs:w-[210px] xs:h-[290px] sm:w-[270px] sm:h-[370px] lg:w-[320px] lg:h-[440px] overflow-hidden rounded-[160px_160px_100px_100px] shadow-[0_20px_50px_rgba(11,14,55,0.12)] z-10 transition-transform hover:scale-[1.02] duration-300">
              <Image
                src="/images/pet_hero.png"
                alt="Rescue Dog"
                fill
                priority
                sizes="(max-width: 480px) 180px, (max-width: 768px) 270px, 320px"
                className="object-cover object-center"
              />
            </div>

            {/* Smaller Overlapping Circular Frame */}
            <div className="absolute bottom-[5%] left-[2%] xs:left-[5%] lg:left-0 w-[100px] h-[100px] xs:w-[120px] xs:h-[120px] sm:w-[160px] sm:h-[160px] lg:w-[190px] lg:h-[190px] overflow-hidden rounded-full border-4 xs:border-[6px] border-white shadow-[0_25px_60px_rgba(11,14,55,0.18)] z-20 transition-transform hover:scale-[1.05] duration-300">
              <Image
                src="/images/volunteers_petting_beagle.png"
                alt="Volunteers petting a dog"
                fill
                sizes="(max-width: 480px) 100px, (max-width: 768px) 160px, 190px"
                className="object-cover object-center"
              />
            </div>

            {/* Extra floating paw at the bottom right */}
            <div className="absolute bottom-6 xs:bottom-8 right-4 xs:right-6 w-8 h-8 xs:w-9 xs:h-9 rounded-full bg-white/95 backdrop-blur-sm shadow-md flex items-center justify-center text-coral animate-float-fast z-20 border border-white/20">
              <PawPrint className="w-4 h-4 xs:w-4.5 xs:h-4.5 rotate-[15deg] fill-current" />
            </div>

          </div>
        </div>
      </div>

      {/* BOTTOM NAVY BENEFITS BAR */}

    </section>
  );
}
