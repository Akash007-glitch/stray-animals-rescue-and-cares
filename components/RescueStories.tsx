"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";

const stories = [
  {
    id: 1,
    tag: "TRANSFORMATION",
    title: "Bella's Journey",
    description: "Found abandoned near the highway, Bella is now a certified therapy dog bringing joy to local hospitals.",
    image: "/images/rescue_bella.png",
    tagColor: "bg-coral/10 text-coral border-coral/25"
  },
  {
    id: 2,
    tag: "HAPPY TAIL",
    title: "Max Found a Family",
    description: "After 6 months in rehabilitation, Max finally met his perfect match and now lives on a 5-acre farm.",
    image: "/images/rescue_max.png",
    tagColor: "bg-forest-light/10 text-forest-light border-forest-light/25"
  },
  {
    id: 3,
    tag: "UPDATE",
    title: "Luna's Recovery",
    description: "Overcoming severe malnutrition, Luna's spirit never broke. She's now fully recovered and looking for a home.",
    image: "/images/rescue_luna.png",
    tagColor: "bg-amber/10 text-amber border-amber/25"
  }
];

export default function RescueStories() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.firstElementChild
        ? (scrollRef.current.firstElementChild as HTMLElement).offsetWidth + 32 // card width + gap
        : 380;
      
      const scrollAmount = direction === "left" ? -cardWidth : cardWidth;
      scrollRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth"
      });
    }
  };

  return (
    <section id="stories" className="py-16 md:py-24 bg-[#FAF7F2] border-b border-charcoal/5">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-charcoal">
              Rescue Stories
            </h2>
            <p className="text-charcoal/70 text-sm md:text-base max-w-xl font-sans leading-relaxed">
              Witness the incredible transformations made possible by your support.
            </p>
          </div>
          
          {/* Slider Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleScroll("left")}
              className="w-12 h-12 rounded-full border border-charcoal/15 bg-white text-charcoal hover:bg-coral hover:text-white hover:border-coral flex items-center justify-center transition-all duration-300 shadow-xs hover:shadow-md cursor-pointer active:scale-95"
              aria-label="Previous story"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => handleScroll("right")}
              className="w-12 h-12 rounded-full border border-charcoal/15 bg-white text-charcoal hover:bg-coral hover:text-white hover:border-coral flex items-center justify-center transition-all duration-300 shadow-xs hover:shadow-md cursor-pointer active:scale-95"
              aria-label="Next story"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Scroll Area */}
        <div 
          ref={scrollRef}
          className="flex gap-8 overflow-x-auto pb-6 scrollbar-none snap-x snap-mandatory touch-pan-x"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {stories.map((story) => (
            <div 
              key={story.id} 
              className="flex-shrink-0 w-full sm:w-[360px] md:w-[380px] bg-white border border-beige-dark/50 rounded-[32px] shadow-xs hover:shadow-md transition-all duration-500 ease-out snap-start flex flex-col group overflow-hidden"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src={story.image}
                  alt={story.title}
                  fill
                  sizes="(max-w-768px) 100vw, 380px"
                  className="object-cover group-hover:scale-[1.03] transition-transform duration-700"
                />
                {/* Tag Badge */}
                <div className={`absolute top-5 left-5 px-3.5 py-1.5 border rounded-full text-[10px] font-sans font-bold tracking-wider uppercase backdrop-blur-xs select-none z-10 ${story.tagColor}`}>
                  {story.tag}
                </div>
              </div>

              {/* Text Content */}
              <div className="p-6 md:p-8 flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="text-xl md:text-2xl font-serif font-bold text-charcoal mb-3 group-hover:text-forest transition-colors duration-300">
                    {story.title}
                  </h3>
                  <p className="text-charcoal/70 text-xs md:text-sm font-sans leading-relaxed">
                    {story.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
