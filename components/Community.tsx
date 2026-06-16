"use client";

import React from "react";
import Image from "next/image";

interface CommunityProps {
  scrollSmoothTo: (id: string) => void;
}

export default function Community({ scrollSmoothTo }: CommunityProps) {
  return (
    <section className="py-24 bg-white border-b border-charcoal/5">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end mb-16">
          <div className="md:col-span-7">
            <h2 className="text-4xl md:text-5xl lg:text-[50px] font-serif font-black text-navy leading-[1.15] tracking-tight">
              Helping Animals,
              <br />
              Building Community
            </h2>
          </div>
          <div className="md:col-span-5 flex flex-col items-start gap-5 md:pl-8">
            <p className="text-sm md:text-base text-charcoal/70 leading-relaxed">
              We believe that a compassionate community is the key to a sustainable animal welfare ecosystem. By uniting
              local volunteers, veterinarians, and animal lovers across Assam, we ensure every street animal receives
              care, shelter, and a chance at a better life.
            </p>
            <button
              id="see-more-community-btn"
              onClick={() => scrollSmoothTo("about")}
              className="px-8 py-3.5 bg-navy hover:bg-navy-dark text-white font-bold tracking-wider text-xs rounded-full shadow-md transition-all cursor-pointer hover:translate-y-[-2px] active:translate-y-0"
            >
              See More
            </button>
          </div>
        </div>

        {/* Three Images side-by-side */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] shadow-sm border border-charcoal/5 group">
            <Image
              src="/images/community_shelter_dog.png"
              alt="Volunteers playing with a dog at shelter"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] shadow-sm border border-charcoal/5 group">
            <Image
              src="/images/vets_examining_street_dog.png"
              alt="Veterinarians examining a street dog"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] shadow-sm border border-charcoal/5 group">
            <Image
              src="/images/volunteers_petting_beagle.png"
              alt="Diverse group petting a happy beagle dog"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
