"use client";

import React from "react";
import Image from "next/image";

interface IntroProps {
  scrollSmoothTo: (id: string) => void;
}

export default function Intro({ scrollSmoothTo }: IntroProps) {
  return (
    <section className="py-24 bg-white border-b border-charcoal/5">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Big Vet Image with Stars Overlay */}
          <div className="lg:col-span-4 relative group">
            <div className="relative h-[480px] w-full rounded-3xl overflow-hidden border-2 border-charcoal/10 shadow-md">
              <Image
                src="/images/vet_examining_cat.png"
                alt="Veterinarians examining a cat at Poofyco clinic in Guwahati"
                fill
                className="object-cover object-center group-hover:scale-[1.02] transition-transform duration-500"
              />
            </div>
            {/* Stars Overlay Badge */}
            <div className="absolute bottom-6 left-6 bg-white border border-charcoal/10 px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
              <div className="flex text-amber gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
              <span className="text-xs font-black text-navy leading-none">(5/5)</span>
            </div>
          </div>

          {/* Middle Column: Text, Bullets, and CTA Button */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <h2 className="text-3xl md:text-4xl font-serif font-black text-navy leading-tight">
              We&apos;re The Best Animal Rescue In Town
            </h2>
            <p className="text-sm text-charcoal/70 leading-relaxed">
              Poofyco is Guwahati&apos;s leading street animal rescue network, providing around-the-clock emergency
              field aid, foster circles, and local community sterilization camps to fill local municipal gaps.
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 bg-[#FAF7F2] border border-charcoal/5 rounded-2xl p-6">
              {/* Paw Bullets */}
              <div className="space-y-3 flex-1">
                {[
                  "Dedicated weekly flyover & street patrols",
                  "Partners with 12+ local veterinary clinics",
                  "24/7 volunteer emergency rescue helpline"
                ].map((bullet, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs font-semibold text-charcoal/85">
                    <span className="text-coral shrink-0">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <circle cx="8" cy="6" r="1.5" />
                        <circle cx="12" cy="4.5" r="1.5" />
                        <circle cx="16" cy="6" r="1.5" />
                        <circle cx="7" cy="10" r="1.5" />
                        <circle cx="17" cy="10" r="1.5" />
                        <path d="M12 9c-2 0-3.5 1.5-3.5 3.5s1.5 3 3.5 3 3.5-1 3.5-3-1.5-3.5-3-3.5z" />
                      </svg>
                    </span>
                    <span>{bullet}</span>
                  </div>
                ))}
              </div>

              {/* Learn More Button */}
              <button
                onClick={() => scrollSmoothTo("about")}
                className="px-6 py-3 bg-navy hover:bg-navy-dark text-white font-bold uppercase tracking-wider text-xs rounded-full shadow-md transition-colors cursor-pointer whitespace-nowrap"
              >
                Learn More
              </button>
            </div>
          </div>

          {/* Right Column: Smaller Happy Dog Image */}
          <div className="lg:col-span-3 relative">
            <div className="relative h-[280px] w-full rounded-3xl overflow-hidden border border-charcoal/10 shadow-sm">
              <Image
                src="/images/happy_family_dog.png"
                alt="A happy family with a rescued dog in Assam"
                fill
                className="object-cover object-center"
              />
            </div>
          </div>
        </div>

        {/* Thin Horizontal Dashed Divider & Bottom Stats Row */}
        <div className="border-t border-dashed border-charcoal/20 mt-16 pt-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "24+", label: "Years Experience" },
              { value: "40+", label: "Professional Vets" },
              { value: "120K+", label: "Positive Review" },
              { value: "78K+", label: "Happy Pets" }
            ].map((stat, idx) => (
              <div key={idx} className="text-center md:text-left space-y-1">
                <div className="text-4xl font-black text-coral leading-none">{stat.value}</div>
                <div className="text-xs font-bold text-charcoal/50 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
