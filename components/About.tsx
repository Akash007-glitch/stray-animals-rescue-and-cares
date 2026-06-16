"use client";

import React from "react";
import { Sparkles, ChevronRight } from "lucide-react";
import StatCounter from "./StatCounter";

interface AboutProps {
  scrollSmoothTo: (id: string) => void;
}

export default function About({ scrollSmoothTo }: AboutProps) {
  return (
    <section id="about" className="py-24 bg-[#FAF7F2] relative overflow-hidden">
      {/* Abstract terracotta organic side blob */}
      <div className="hidden lg:block absolute -left-64 top-1/4 w-96 h-96 rounded-full bg-terracotta/5 blur-3xl" />
      <div className="hidden lg:block absolute -right-64 bottom-1/4 w-96 h-96 rounded-full bg-amber/5 blur-3xl" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Left side: Context and GMC Gap */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <span className="text-xs uppercase tracking-widest text-terracotta font-extrabold block mb-2">
                The Reality on the Ground
              </span>
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-charcoal leading-tight">
                Guwahati&apos;s Municipal Gap
              </h2>
            </div>

            <div className="prose text-charcoal/85 space-y-6 text-base md:text-lg leading-relaxed">
              <p>
                As Guwahati rapidly expands, transforming wetlands into high-rises and single lanes into bypass
                flyovers, our non-human residents have been squeezed out. Currently, the{" "}
                <strong className="text-terracotta">Guwahati Municipal Corporation (GMC) lacks any dedicated public animal shelter</strong> or
                structured, year-round Animal Birth Control (ABC) services.
              </p>
              <p>
                Without municipal infrastructure, injured street dogs, run-over pups, and sick strays are left to
                struggle alone against heavy urban traffic, monsoon deluge, and escalating human-animal conflicts.
              </p>
              <blockquote className="border-l-4 border-amber pl-4 italic text-charcoal/70 bg-amber/5 py-3 pr-2 rounded-r-md">
                &ldquo;Our rescue calls peak during the June-September monsoon season, when waterlogged streets force
                street animals onto dry, high-speed flyovers, resulting in severe vehicular accidents.&rdquo;
              </blockquote>
              <p>
                SARC was born to bridge this welfare gap. We operate a citizen-funded network of foster homes,
                coordinate on-site first aid, and run localized sterilization drives in neighborhoods from Kahilipara to
                Zoo Road and Uzan Bazar.
              </p>
            </div>

            {/* Dynamic CTA */}
            <div className="pt-4">
              <button
                onClick={() => scrollSmoothTo("volunteer")}
                className="group inline-flex items-center gap-2 text-terracotta font-bold hover:text-terracotta-light transition-colors cursor-pointer"
              >
                Learn how you can help on your block
                <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Right side: Core Team & Timeline */}
          <div className="lg:col-span-5 space-y-10">
            <div className="bg-white border-2 border-charcoal/10 rounded-2xl p-8 shadow-sm">
              <h3 className="text-xl font-serif font-bold text-charcoal mb-6 flex items-center gap-2">
                <Sparkles className="text-amber h-5 w-5" /> SARC Journey
              </h3>

              {/* Timeline */}
              <div className="relative border-l-2 border-amber/30 pl-6 space-y-8 ml-2">
                {/* Step 1 */}
                <div className="relative">
                  <div className="absolute -left-[31px] top-1.5 bg-amber w-4 h-4 rounded-full border-4 border-white" />
                  <span className="text-xs font-bold text-terracotta block">2023 - Student Feeding Drives</span>
                  <h4 className="font-semibold text-charcoal text-sm mt-0.5">Feeding Guwahati&apos;s Flyover Strays</h4>
                  <p className="text-xs text-charcoal/60 mt-1">
                    Started as a group of Cotton University and Gauhati University students feeding strays displaced
                    during flyover construction on G.S. Road.
                  </p>
                </div>

                {/* Step 2 */}
                <div className="relative">
                  <div className="absolute -left-[31px] top-1.5 bg-amber w-4 h-4 rounded-full border-4 border-white" />
                  <span className="text-xs font-bold text-terracotta block">2024 - Localized Foster Circles</span>
                  <h4 className="font-semibold text-charcoal text-sm mt-0.5">Grassroots Treatment Network</h4>
                  <p className="text-xs text-charcoal/60 mt-1">
                    Formed a loose network of home fosters and partnered with local veterinary clinics to treat maggot
                    wounds, distemper cases, and run road safety reflective collar drives.
                  </p>
                </div>

                {/* Step 3 */}
                <div className="relative">
                  <div className="absolute -left-[31px] top-1.5 bg-terracotta w-4 h-4 rounded-full border-4 border-white" />
                  <span className="text-xs font-bold text-terracotta block">Present - Structured Collective</span>
                  <h4 className="font-semibold text-charcoal text-sm mt-0.5">Full-Scale Rescue & Sterilization</h4>
                  <p className="text-xs text-charcoal/60 mt-1">
                    Organizing community-wide ABC drives, mobile vaccination camps, and active animal adoption
                    campaigns in Guwahati, Dibrugarh, and Jorhat.
                  </p>
                </div>
              </div>
            </div>

            {/* Team Showcase */}
            <div className="bg-white border-2 border-charcoal/10 rounded-2xl p-6 shadow-sm space-y-4">
              <h3 className="text-lg font-serif font-bold text-charcoal">The People Behind SARC</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <div className="bg-amber/20 h-10 w-10 rounded-full flex items-center justify-center font-bold text-terracotta text-sm">
                    PB
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-charcoal">Pranjal Baruah</h5>
                    <span className="text-[10px] text-charcoal/60">Rescue Coordinator</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-terracotta/15 h-10 w-10 rounded-full flex items-center justify-center font-bold text-terracotta text-sm">
                    DK
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-charcoal">Dr. Deepa Kalita</h5>
                    <span className="text-[10px] text-charcoal/60">Lead Veterinarian</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* IMPACT COUNTERS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-20">
          <StatCounter target={1200} label="Street Rescues Administered" suffix="+" />
          <StatCounter target={340} label="Animals Placed in Homes" suffix="+" />
          <StatCounter target={15} label="Free Vaccination Camps" suffix="+" />
          <StatCounter target={90} label="Target Area Sterilization Rate" suffix="%" />
        </div>
      </div>
    </section>
  );
}
