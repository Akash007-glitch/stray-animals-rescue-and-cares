"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import About from "@/components/About";
import Footer from "@/components/Footer";

export default function AboutPage() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Scroll listener for sticky navbar effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollSmoothTo = (id: string) => {
    router.push(`/#${id}`);
  };

  return (
    <div className="relative min-h-screen flex flex-col font-sans selection:bg-terracotta selection:text-cream bg-[#FAF7F2]">
      {/* Capsule Navigation Navbar */}
      <Navbar
        scrolled={scrolled}
        activeSection="about"
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        scrollSmoothTo={scrollSmoothTo}
      />

      {/* Spacer to push content below the sticky navbar */}
      <div className="h-20 md:h-28" />

      {/* Main Content Area */}
      <main className="flex-grow">
        <About scrollSmoothTo={scrollSmoothTo} />
      </main>

      {/* Modern Footer */}
      <Footer scrollSmoothTo={scrollSmoothTo} />
    </div>
  );
}
