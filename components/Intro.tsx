"use client";

import React from "react";
import Image from "next/image";
import { BriefcaseMedical, HeartHandshake, Globe, Megaphone } from "lucide-react";

interface IntroProps {
  scrollSmoothTo?: (id: string) => void;
}

export default function Intro({ scrollSmoothTo }: IntroProps) {
  const cards = [
    {
      title: "Premium Care",
      badge: "850+ Medical Rescues",
      description:
        "Providing top-tier veterinary care, nutritious food, and comfortable rehabilitation facilities for every rescued animal.",
      icon: BriefcaseMedical,
      image: "/images/mission_medical_care.png",
      alt: "Veterinarian inspecting dog in clinic",
    },
    {
      title: "Forever Homes",
      badge: "1,200+ Placements",
      description:
        "Our rigorous but loving adoption process ensures each animal finds a safe, permanent family that matches their unique needs.",
      icon: HeartHandshake,
      image: "/images/mission_forever_homes.png",
      alt: "Family enjoying time with adopted dog",
    },
    {
      title: "Community Education",
      badge: "50+ Monthly Workshops",
      description:
        "We run ongoing workshops and awareness campaigns to foster a culture of empathy and responsible pet ownership.",
      icon: Globe,
      image: "/images/mission_community_education.png",
      alt: "Volunteers conducting animal welfare workshop",
    },
    {
      title: "Rescue Awareness",
      badge: "25K+ People Reached",
      description:
        "Spreading compassion through street outreach and digital advocacy to prevent abandonment before it starts.",
      icon: Megaphone,
      image: "/images/mission_rescue_awareness.png",
      alt: "Volunteer handing out outreach flyers",
    },
  ];

  return (
    <section id="mission" className="py-16 md:py-24 bg-[#FAF7F2] relative overflow-hidden">
      {/* Background decoration - subtle organic shapes */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-sage-light/10 rounded-full filter blur-3xl opacity-40 -translate-y-1/2 translate-x-1/3 pointer-events-none select-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber/5 rounded-full filter blur-3xl opacity-30 translate-y-1/3 -translate-x-1/3 pointer-events-none select-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header content */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16 space-y-3">
          <h2 className="text-3xl md:text-4xl lg:text-[40px] font-bold text-[#1E293B] leading-tight font-sans tracking-tight">
            Our Mission & Impact
          </h2>
          <p className="text-[#64748B] text-sm md:text-[15px] leading-relaxed font-sans max-w-2xl mx-auto">
            Driven by compassion, guided by transparency. We believe in creating a world where every stray animal receives the care, dignity, and loving home they deserve.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, index) => {
            const IconComponent = card.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-3xl p-4 shadow-xs border border-charcoal/5 hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group text-left"
              >
                <div>
                  {/* Image Container with Badge */}
                  <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden mb-5 bg-beige">
                    <Image
                      src={card.image}
                      alt={card.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Badge Overlay */}
                    <div className="absolute bottom-3 left-3 bg-[#FFF5EE]/90 backdrop-blur-md px-3 py-1 rounded-full border border-white/60 shadow-xs">
                      <span className="text-[11px] sm:text-xs font-semibold text-[#6E4B32] tracking-tight">
                        {card.badge}
                      </span>
                    </div>
                  </div>

                  {/* Icon Circle */}
                  <div className="w-10 h-10 rounded-full bg-[#FFEFE7] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-300">
                    <IconComponent className="h-5 w-5 text-[#E07A5F]" strokeWidth={2} />
                  </div>

                  {/* Card Title */}
                  <h3 className="text-xl font-bold text-[#1E293B] mb-2 tracking-tight leading-snug font-sans">
                    {card.title}
                  </h3>

                  {/* Card Description */}
                  <p className="text-[#64748B] text-xs sm:text-sm leading-relaxed font-sans font-normal">
                    {card.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

