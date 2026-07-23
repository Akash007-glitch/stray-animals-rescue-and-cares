"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, PawPrint, Target, Eye, Heart } from "lucide-react";
import StatCounter from "./StatCounter";

interface AboutProps {
  scrollSmoothTo: (id: string) => void;
}

// Organic Leaf/Branch Twig SVG Component
const LeafTwig = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.2" className={className}>
    <path d="M10,90 Q40,75 55,20 Q65,10 70,5" strokeLinecap="round" />
    {/* Leaf pairs with light fill and opacity */}
    <path d="M30,80 Q20,65 15,68 Q18,72 30,80" fill="currentColor" className="opacity-15" />
    <path d="M30,80 Q45,70 52,73 Q48,78 30,80" fill="currentColor" className="opacity-15" />
    
    <path d="M40,60 Q28,48 22,50 Q26,56 40,60" fill="currentColor" className="opacity-15" />
    <path d="M40,60 Q55,50 62,53 Q58,58 40,60" fill="currentColor" className="opacity-15" />
    
    <path d="M48,42 Q38,32 32,35 Q35,40 48,42" fill="currentColor" className="opacity-15" />
    <path d="M48,42 Q60,32 68,35 Q64,40 48,42" fill="currentColor" className="opacity-15" />
    
    <path d="M54,25 Q46,18 42,20 Q44,24 54,25" fill="currentColor" className="opacity-15" />
    <path d="M54,25 Q64,18 70,20 Q67,24 54,25" fill="currentColor" className="opacity-15" />
  </svg>
);

// Floating Paw Print SVG Component
const FloatingPaw = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <circle cx="8" cy="6" r="2" />
    <circle cx="12" cy="4" r="2" />
    <circle cx="16" cy="6" r="2" />
    <circle cx="7" cy="11" r="1.8" />
    <circle cx="17" cy="11" r="1.8" />
    <path d="M12 9.5c-2.2 0-3.5 1.5-3.5 3.5 0 2 1.2 3 3.5 3s3.5-1 3.5-3c0-2-1.3-3.5-3.5-3.5z" />
  </svg>
);

// Underline accent that feels hand-drawn
const UnderlineAccent = () => (
  <svg viewBox="0 0 200 10" className="w-48 h-3 text-sage fill-none stroke-current stroke-[2] opacity-60 mt-2 select-none pointer-events-none">
    <path d="M5,5 Q100,8 195,5" strokeLinecap="round" />
  </svg>
);

export default function About({ scrollSmoothTo }: AboutProps) {
  return (
    <section id="about" className="py-16 md:py-24 bg-beige-light relative overflow-hidden">
      {/* Background Soft Curved Wave Top and Bottom */}
      <div className="absolute top-0 left-0 right-0 h-10 overflow-hidden leading-[0] select-none pointer-events-none opacity-40">
        <svg className="relative block w-full h-full" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M985.66,92.83C906.67,72,823.78,31,741.82,14.58c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,0V120H1200V95.83C1123.7,112.8,1051,104.7,985.66,92.83Z" fill="#FAF7F2"></path>
        </svg>
      </div>

      {/* Floating Low-Opacity Paw Prints scattered in the background */}
      <FloatingPaw className="absolute top-24 left-1/10 w-8 h-8 text-coral/10 animate-float-slow select-none pointer-events-none" />
      <FloatingPaw className="absolute top-1/2 left-[3%] w-10 h-10 text-coral/8 animate-float-delayed select-none pointer-events-none" />
      <FloatingPaw className="absolute bottom-20 left-[20%] w-6 h-6 text-coral/12 animate-float-fast select-none pointer-events-none" />
      <FloatingPaw className="absolute top-40 right-[5%] w-12 h-12 text-coral/8 animate-float-delayed select-none pointer-events-none" />
      <FloatingPaw className="absolute bottom-32 right-1/10 w-9 h-9 text-coral/10 animate-float-slow select-none pointer-events-none" />

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Asymmetric 3-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center">
          
          {/* LEFT SIDE: Street rescue context with floating badge */}
          <div className="lg:col-span-3 flex justify-center order-1 lg:order-1 relative pb-8 lg:pb-0">
            <div className="relative w-full max-w-[280px] sm:max-w-[320px] lg:max-w-full">
              {/* Organic blob background */}
              <div className="absolute -z-10 -top-8 -left-8 w-72 h-72 bg-sage/20 rounded-full filter blur-3xl opacity-60 animate-float-slow" />
              <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="absolute -z-10 w-[130%] h-[130%] -top-12 -left-12 text-sage-light/30 fill-current select-none pointer-events-none">
                <path d="M39.9,-54.6C51.7,-48.5,61.1,-36.8,66.1,-23.1C71.1,-9.4,71.7,6.3,67,20.4C62.3,34.5,52.3,47,39.6,55.8C26.9,64.6,11.5,69.8,-3.4,74.5C-18.4,79.2,-36.8,83.4,-49.6,76.5C-62.4,69.6,-69.6,51.6,-73.2,34.7C-76.8,17.8,-76.8,2,-72.7,-12.3C-68.6,-26.6,-60.4,-39.3,-49.1,-45.7C-37.8,-52.1,-23.4,-52.2,-8.9,-53.2C5.6,-54.2,28.1,-60.7,39.9,-54.6Z" transform="translate(100 100)" />
              </svg>

              {/* Twig illustration */}
              <LeafTwig className="absolute -top-10 -left-6 w-16 h-16 text-sage/40 rotate-12 select-none pointer-events-none z-20" />

              {/* Card Container */}
              <div className="relative aspect-[3/4] w-full rounded-3xl overflow-hidden shadow-xl border border-beige-dark/50 bg-beige group">
                <Image
                  src="/images/vets_examining_street_dog.png"
                  alt="SARC volunteers rescuing and examining a stray dog on the streets of Tinsukia"
                  fill
                  sizes="(max-w-780px) 100vw, 300px"
                  className="object-cover object-center group-hover:scale-[1.03] transition-transform duration-700"
                />
              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-6 -right-4 bg-white/90 backdrop-blur-md rounded-2xl py-3 px-4 shadow-xl border border-sage-light/40 max-w-[190px] z-20 hover:scale-105 transition-transform duration-300">
                <div className="flex items-start gap-2.5">
                  <span className="text-xl mt-0.5 leading-none select-none">🐾</span>
                  <div>
                    <p className="font-sans font-bold text-[11px] text-forest tracking-wide uppercase leading-tight">Every Life Matters</p>
                    <p className="font-sans text-[10px] text-charcoal/70 mt-1 leading-none">Serving Tinsukia Since 2021</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CENTER CONTENT: Storytelling & Core Features */}
          <div className="lg:col-span-6 flex flex-col text-left px-2 md:px-6 order-2 lg:order-2 space-y-6">
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-widest text-forest-light font-extrabold block">
                Our Story & Commitment
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-[42px] font-serif font-bold text-forest leading-tight">
                Together We Can Give Every Stray a Safer Tomorrow
              </h2>
              <UnderlineAccent />
            </div>

            <div className="text-charcoal/80 space-y-4 font-sans text-sm md:text-base leading-relaxed">
              <p>
                Every day, hundreds of stray dogs and cats in Tinsukia struggle to find food, medical care, and safe shelter. Our volunteers work tirelessly to rescue injured animals, provide emergency treatment, organize vaccination and sterilization drives, and help abandoned animals find loving forever homes.
              </p>
              <p className="font-medium text-forest-light/95">
                We believe lasting change happens when the entire community comes together to protect the voiceless.
              </p>
            </div>

            {/* Premium Information Card */}
            <div className="bg-white border border-beige-dark/65 rounded-3xl p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                
                {/* Feature Items List */}
                <ul className="space-y-3.5 text-left flex-grow">
                  {[
                    { emoji: "🐶", text: "Daily feeding drives across Tinsukia" },
                    { emoji: "🏥", text: "Rescue, treatment & rehabilitation" },
                    { emoji: "💉", text: "Vaccination & sterilization campaigns" },
                    { emoji: "🏠", text: "Foster care & adoption support" },
                    { emoji: "🤝", text: "Volunteer & community awareness programs" }
                  ].map((item, i) => (
                    <li 
                      key={i} 
                      className={`flex items-center gap-3 text-charcoal/90 font-sans text-xs md:text-sm font-medium hover:text-forest transition-colors duration-200 animate-fade-in-up`}
                      style={{ animationDelay: `${i * 100}ms` }}
                    >
                      <span className="flex-shrink-0 w-8 h-8 rounded-full bg-sage-bg flex items-center justify-center text-sm shadow-sm">
                        {item.emoji}
                      </span>
                      <span>{item.text}</span>
                    </li>
                  ))}
                </ul>

                {/* Primary Action Button */}
                <div className="w-full md:w-auto flex-shrink-0">
                  <button
                    onClick={() => scrollSmoothTo("volunteer")}
                    className="group w-full md:w-auto inline-flex items-center justify-center gap-2 bg-coral text-white hover:bg-coral-light font-sans font-bold px-7 py-4 rounded-full shadow-md hover:shadow-lg hover:shadow-coral/30 hover:hover:shadow-coral/45 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 text-sm tracking-wide cursor-pointer"
                  >
                    <span>Join Our Mission</span>
                    <PawPrint className="h-4 w-4 fill-current" />
                  </button>
                </div>

              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Hearts and home outcome image */}
          <div className="lg:col-span-3 flex justify-center order-3 relative">
            <div className="relative w-full max-w-[280px] sm:max-w-[320px] lg:max-w-full lg:translate-y-4">
              {/* Organic blob background */}
              <div className="absolute -z-10 -bottom-8 -right-8 w-72 h-72 bg-beige-dark/30 rounded-full filter blur-3xl opacity-60 animate-float-delayed" />
              <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="absolute -z-10 w-[130%] h-[130%] -bottom-12 -right-12 text-beige-dark/40 fill-current select-none pointer-events-none">
                <path d="M42.2,-61.7C54.7,-53.4,65,-40.2,71.2,-25.1C77.4,-10,79.5,7,75.9,22.9C72.3,38.8,63,53.5,50,62.8C37,72.1,20.3,76,3.4,71.3C-13.4,66.6,-30.3,53.3,-44.6,41.9C-58.8,30.5,-70.3,21.1,-75,8.1C-79.6,-4.9,-77.3,-21.5,-69.5,-34.5C-61.7,-47.5,-48.5,-57,-35.1,-64.8C-21.7,-72.6,-8.1,-78.7,3.5,-83.5C15.1,-88.4,30.2,-72,42.2,-61.7Z" transform="translate(100 100)" />
              </svg>

              {/* Twig illustration */}
              <LeafTwig className="absolute -bottom-8 -right-6 w-16 h-16 text-sage/40 -rotate-45 select-none pointer-events-none z-20" />

              {/* Card Container */}
              <div className="relative aspect-[3/4] w-full rounded-3xl overflow-hidden shadow-xl border border-beige-dark/50 bg-beige group">
                <Image
                  src="/images/happy_family_dog.png"
                  alt="A rescued SARC dog living happily with a local family in Tinsukia"
                  fill
                  sizes="(max-w-780px) 100vw, 300px"
                  className="object-cover object-center group-hover:scale-[1.03] transition-transform duration-700"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Mission, Vision & Values Section */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Mission Card */}
          <div className="bg-white border border-beige-dark/50 rounded-3xl p-8 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col items-center text-center group">
            <div className="w-12 h-12 rounded-full bg-forest/10 flex items-center justify-center mb-6 text-forest group-hover:scale-110 transition-transform duration-300">
              <Target className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-serif font-bold text-forest mb-3">Our Mission</h3>
            <p className="text-charcoal/80 text-sm leading-relaxed font-sans">
              Rescue, treat, rehabilitate, vaccinate, sterilize, and promote responsible animal welfare.
            </p>
          </div>

          {/* Vision Card */}
          <div className="bg-white border border-beige-dark/50 rounded-3xl p-8 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col items-center text-center group">
            <div className="w-12 h-12 rounded-full bg-coral/10 flex items-center justify-center mb-6 text-coral group-hover:scale-110 transition-transform duration-300">
              <Eye className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-serif font-bold text-forest mb-3">Our Vision</h3>
            <p className="text-charcoal/80 text-sm leading-relaxed font-sans">
              A future where no stray animal suffers from neglect, abuse, or lack of medical care.
            </p>
          </div>

          {/* Values Card */}
          <div className="bg-white border border-beige-dark/50 rounded-3xl p-8 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col items-center text-center group">
            <div className="w-12 h-12 rounded-full bg-amber/10 flex items-center justify-center mb-6 text-amber group-hover:scale-110 transition-transform duration-300">
              <Heart className="h-6 w-6 fill-current" />
            </div>
            <h3 className="text-xl font-serif font-bold text-forest mb-3">Our Values</h3>
            <p className="text-charcoal/80 text-sm leading-relaxed font-sans">
              Compassion, Transparency, Dedication, Community, and Respect for all life.
            </p>
          </div>
        </div>

        {/* Our Journey Timeline */}
        <div className="mt-28 bg-white/40 border border-beige-dark/40 rounded-[32px] p-8 md:p-12 shadow-sm">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest text-forest-light font-extrabold block mb-2">
              Our Journey
            </span>
            <h3 className="text-3xl font-serif font-bold text-forest">Growing Step by Step</h3>
            <div className="w-24 h-1 bg-coral/60 mx-auto mt-3 rounded-full" />
          </div>
          
          <div className="relative border-l-2 border-sage/30 ml-4 md:ml-0 md:border-l-0 md:flex md:justify-between md:items-start gap-4">
            {/* Horizontal Line for Desktop */}
            <div className="hidden md:block absolute top-6 left-0 right-0 h-0.5 bg-sage/30 z-0" />
            
            {[
              { year: "2020", title: "Started by Students", desc: "A simple group of students coming together to feed and care for strays in their neighborhoods." },
              { year: "2021", title: "Registered Trust", desc: "Formalizing our mission to scale operations, build structure, and coordinate rescue efforts." },
              { year: "2022", title: "Hundreds of Rescues", desc: "Expanding medical aid, tackling critical street surgeries, and coordinating emergency rescues." },
              { year: "2023", title: "Awareness Programs", desc: "Conducting community outreach, school visits, and promoting responsible animal welfare." },
              { year: "2024+", title: "Growing Network", desc: "Expanding volunteer network and fostering community-wide stray advocacy." }
            ].map((step, idx) => (
              <div key={idx} className="relative z-10 flex md:flex-col items-start md:items-center text-left md:text-center mb-10 last:mb-0 md:mb-0 md:flex-1 group">
                {/* Timeline node */}
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-beige border-2 border-sage text-forest flex items-center justify-center shadow-xs group-hover:bg-forest group-hover:text-white transition-all duration-300 mb-4 md:mx-auto">
                  <PawPrint className="w-5 h-5 fill-current" />
                </div>
                <div className="ml-4 md:ml-0">
                  <span className="text-xs font-bold text-coral uppercase tracking-wide block">{step.year}</span>
                  <h4 className="font-serif font-bold text-forest text-base mt-0.5">{step.title}</h4>
                  <p className="text-charcoal/70 text-xs mt-1.5 max-w-[200px] md:mx-auto leading-relaxed font-sans">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* IMPACT COUNTERS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-24">
          <StatCounter target={1200} label="Street Rescues Administered" suffix="+" />
          <StatCounter target={340} label="Animals Placed in Homes" suffix="+" />
          <StatCounter target={15} label="Free Vaccination Camps" suffix="+" />
          <StatCounter target={90} label="Target Area Sterilization Rate" suffix="%" />
        </div>
      </div>

      {/* Bottom Soft Curved Divider */}
      <div className="absolute bottom-0 left-0 right-0 h-10 overflow-hidden leading-[0] select-none pointer-events-none opacity-40">
        <svg className="relative block w-full h-full rotate-180" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M985.66,92.83C906.67,72,823.78,31,741.82,14.58c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,0V120H1200V95.83C1123.7,112.8,1051,104.7,985.66,92.83Z" fill="#FAF7F2"></path>
        </svg>
      </div>
    </section>
  );
}

