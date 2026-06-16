"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Intro from "@/components/Intro";
import Community from "@/components/Community";
import About from "@/components/About";
import Adopt from "@/components/Adopt";
import AnimalModal from "@/components/AnimalModal";
import Volunteer from "@/components/Volunteer";
import Donate from "@/components/Donate";
import Footer from "@/components/Footer";
import ShelterTracker from "@/components/ShelterTracker";

import { animals } from "@/data/animals";
import { Animal } from "@/types";

export default function Home() {
  // Navigation State
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  // Adoption Filters State
  const [speciesFilter, setSpeciesFilter] = useState<string>("all");
  const [ageFilter, setAgeFilter] = useState<string>("all");
  const [locationFilter, setLocationFilter] = useState<string>("all");
  const [selectedAnimal, setSelectedAnimal] = useState<Animal | null>(null);

  // Scroll spy & solid navbar shift
  useEffect(() => {
    const handleScroll = () => {
      // Navbar bg change
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Scroll Spy
      const sections = ["home", "tracker", "about", "adopt", "volunteer", "donate"];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollSmoothTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of sticky header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col font-sans selection:bg-terracotta selection:text-cream">
      {/* Navigation Capsule Navbar */}
      <Navbar
        scrolled={scrolled}
        activeSection={activeSection}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        scrollSmoothTo={scrollSmoothTo}
      />

      {/* Hero Section */}
      <Hero scrollSmoothTo={scrollSmoothTo} />

      {/* Intro section */}
      <Intro scrollSmoothTo={scrollSmoothTo} />

      {/* Helping Animals, Building Community Section */}
      <Community scrollSmoothTo={scrollSmoothTo} />

      {/* Live Rescue Tracker & Shelter Donation */}
      <ShelterTracker />

      {/* About & Mission (Timeline & context) */}
      <About scrollSmoothTo={scrollSmoothTo} />

      {/* Adopt Section */}
      <Adopt
        animals={animals}
        speciesFilter={speciesFilter}
        setSpeciesFilter={setSpeciesFilter}
        ageFilter={ageFilter}
        setAgeFilter={setAgeFilter}
        locationFilter={locationFilter}
        setLocationFilter={setLocationFilter}
        setSelectedAnimal={setSelectedAnimal}
      />

      {/* Animal profile detail modal overlay */}
      {selectedAnimal && (
        <AnimalModal
          selectedAnimal={selectedAnimal}
          setSelectedAnimal={setSelectedAnimal}
          scrollSmoothTo={scrollSmoothTo}
        />
      )}

      {/* Volunteer Registration Form */}
      <Volunteer />

      {/* Donate pricing grid & mock Razorpay payment flow */}
      <Donate />

      {/* Sticky Footer */}
      <Footer scrollSmoothTo={scrollSmoothTo} />
    </div>
  );
}
