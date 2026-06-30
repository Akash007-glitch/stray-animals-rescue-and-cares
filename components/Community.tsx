"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface CommunityProps {
  scrollSmoothTo: (id: string) => void;
}

export default function Community({ scrollSmoothTo }: CommunityProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll mobile slides every 3 seconds
  useEffect(() => {
    const handleAutoScroll = () => {
      if (window.innerWidth >= 768) return; // Only auto-scroll on mobile

      const nextIndex = (activeIndex + 1) % 3;
      if (scrollContainerRef.current) {
        const container = scrollContainerRef.current;
        const slideWidth = container.clientWidth;
        container.scrollTo({
          left: slideWidth * nextIndex,
          behavior: "smooth",
        });
      }
    };

    const interval = setInterval(handleAutoScroll, 3000);
    return () => clearInterval(interval);
  }, [activeIndex]);

  // Sync index on manual scroll / swipe
  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollPosition = container.scrollLeft;
      const slideWidth = container.clientWidth;
      if (slideWidth > 0) {
        const newIndex = Math.round(scrollPosition / slideWidth);
        if (newIndex !== activeIndex) {
          setActiveIndex(newIndex);
        }
      }
    }
  };

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
              className="px-8 py-3.5 bg-navy hover:bg-navy-dark text-white font-bold tracking-wider text-xs rounded-full shadow-lg transition-all cursor-pointer hover:translate-y-[-2px] active:translate-y-0"
            >
              See More
            </button>
          </div>
        </div>

        {/* Desktop Layout: Three Images side-by-side */}
        <div className="hidden md:grid md:grid-cols-3 gap-8">
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

        {/* Mobile Layout: Horizontal Auto-Scrollable and Manual Swipe Slider */}
        <div className="block md:hidden relative">
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory gap-4 pb-4 [&::-webkit-scrollbar]:hidden"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {/* Slide 1 */}
            <div className="min-w-full snap-center px-1">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] shadow-sm border border-charcoal/5 group">
                <Image
                  src="/images/community_shelter_dog.png"
                  alt="Volunteers playing with a dog at shelter"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            {/* Slide 2 */}
            <div className="min-w-full snap-center px-1">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] shadow-sm border border-charcoal/5 group">
                <Image
                  src="/images/vets_examining_street_dog.png"
                  alt="Veterinarians examining a street dog"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            {/* Slide 3 */}
            <div className="min-w-full snap-center px-1">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] shadow-sm border border-charcoal/5 group">
                <Image
                  src="/images/volunteers_petting_beagle.png"
                  alt="Diverse group petting a happy beagle dog"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-4">
            {[0, 1, 2].map((idx) => (
              <button
                key={idx}
                onClick={() => {
                  setActiveIndex(idx);
                  if (scrollContainerRef.current) {
                    const container = scrollContainerRef.current;
                    const slideWidth = container.clientWidth;
                    container.scrollTo({
                      left: slideWidth * idx,
                      behavior: "smooth",
                    });
                  }
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  activeIndex === idx ? "w-6 bg-coral" : "w-2 bg-charcoal/20"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
