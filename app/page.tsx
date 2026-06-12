"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import {
  MapPin,
  User,
  Mail,
  Phone,
  ArrowRight,
  Menu,
  X,
  CheckCircle2,
  Loader2,
  Lock,
  Sparkles,
  ChevronRight,
  Calendar
} from "lucide-react";

// Types
interface Animal {
  id: string;
  name: string;
  species: "dog" | "cat";
  age: "puppy-kitten" | "young" | "adult";
  ageText: string;
  breed: string;
  location: "Guwahati" | "Dibrugarh" | "Jorhat";
  locationTag: string;
  image: string;
  story: string;
}

interface VolunteerFormData {
  name: string;
  email: string;
  phone: string;
  age: number;
  role: string;
  reason: string;
}

interface DonateFormData {
  name: string;
  email: string;
  phone: string;
  amount: string;
  customAmount: string;
}

// Mock Animal Data
const animals: Animal[] = [
  {
    id: "1",
    name: "Kopili",
    species: "dog",
    age: "puppy-kitten",
    ageText: "3 Months",
    breed: "Indie Retriever Mix",
    location: "Guwahati",
    locationTag: "Zoo Road, Guwahati",
    image: "/images/dog_kopili.png",
    story: "Rescued from a flash flood near the Kopili River basin. She is extremely playful, loves swimming in small puddles, and is vaccinated."
  },
  {
    id: "2",
    name: "Luit",
    species: "dog",
    age: "young",
    ageText: "1.5 Years",
    breed: "Indie Shepherd Mix",
    location: "Guwahati",
    locationTag: "Kahilipara, Guwahati",
    image: "/images/dog_luit.png",
    story: "A gentle giant found with a fractured front paw. Fully recovered, Luit is incredibly loyal, protective, and walks beautifully on a leash."
  },
  {
    id: "3",
    name: "Jonti",
    species: "cat",
    age: "puppy-kitten",
    ageText: "2 Months",
    breed: "Indian Shorthair",
    location: "Jorhat",
    locationTag: "Teok Town, Jorhat",
    image: "/images/cat_jonti.png",
    story: "Found crying behind a wooden tea-leaf processing barn in Jorhat. He has gorgeous amber eyes, is litter-trained, and loves cuddles."
  },
  {
    id: "4",
    name: "Bhaiti",
    species: "dog",
    age: "adult",
    ageText: "3 Years",
    breed: "Indie Golden Chow Mix",
    location: "Dibrugarh",
    locationTag: "Bari Road, Dibrugarh",
    image: "/images/dog_bhaiti.png",
    story: "Bhaiti was a neighborhood favorite near a Dibrugarh tea shop until a vehicle clip injured him. He is quiet, calm, and looking for a lazy porch."
  }
];

// Animated Counter Component
const StatCounter = ({ target, label, suffix = "" }: { target: number; label: string; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const duration = 1500; // 1.5s
          const startTime = performance.now();

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Ease out quad
            const easeProgress = progress * (2 - progress);
            const currentCount = Math.floor(easeProgress * target);

            setCount(currentCount);

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCount(target);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [target, hasAnimated]);

  return (
    <div ref={elementRef} className="flex flex-col items-center justify-center p-6 bg-[#FAF7F2] border-2 border-terracotta/20 rounded-xl shadow-md transition-all duration-300 hover:border-terracotta/50">
      <span className="text-4xl md:text-5xl font-serif font-bold text-terracotta mb-2">
        {count.toLocaleString()}{suffix}
      </span>
      <span className="text-sm md:text-base text-charcoal font-medium text-center">{label}</span>
    </div>
  );
};

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

  // Volunteer form state
  const { register: registerVolunteer, handleSubmit: handleVolunteerSubmit, formState: { errors: volunteerErrors }, reset: resetVolunteer } = useForm<VolunteerFormData>();
  const [volunteerSubmitted, setVolunteerSubmitted] = useState(false);
  const [volunteerLoading, setVolunteerLoading] = useState(false);

  // Donate modal state
  const [donateModalOpen, setDonateModalOpen] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState<string>("1000");
  const [customAmountVal, setCustomAmountVal] = useState<string>("");
  const { register: registerDonate, handleSubmit: handleDonateSubmit, formState: { errors: donateErrors } } = useForm<DonateFormData>();
  const [paymentStep, setPaymentStep] = useState<"details" | "processing" | "success">("details");
  const [transactionId, setTransactionId] = useState("");

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
      const sections = ["home", "about", "adopt", "volunteer", "donate"];
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

  // Volunteer Submission handler (Mock)
  const onSubmitVolunteer = (data: VolunteerFormData) => {
    setVolunteerLoading(true);
    console.log("Volunteer application submitted:", data);
    setTimeout(() => {
      setVolunteerLoading(false);
      setVolunteerSubmitted(true);
      resetVolunteer();
    }, 1500);
  };

  // Donate Payment handler (Mock Razorpay)
  const onSubmitDonate = (data: DonateFormData) => {
    setPaymentStep("processing");
    const finalAmount = selectedAmount === "custom" ? customAmountVal : selectedAmount;
    console.log("Donation details submitted:", data, "Amount:", finalAmount);
    setTimeout(() => {
      setTransactionId(`pay_SARC${Math.random().toString(36).substr(2, 9).toUpperCase()}`);
      setPaymentStep("success");
    }, 2000);
  };

  const handleOpenDonateModal = (amount: string) => {
    if (amount !== "custom") {
      setSelectedAmount(amount);
    } else {
      setSelectedAmount("custom");
    }
    setPaymentStep("details");
    setDonateModalOpen(true);
  };

  const filteredAnimals = animals.filter((animal) => {
    const matchesSpecies = speciesFilter === "all" || animal.species === speciesFilter;
    const matchesAge = ageFilter === "all" || animal.age === ageFilter;
    const matchesLocation = locationFilter === "all" || animal.location === locationFilter;
    return matchesSpecies && matchesAge && matchesLocation;
  });

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
      {/* STICKY NAV */}
      <header className="fixed top-0 left-0 right-0 z-40 transition-all duration-300 w-full">
        {/* Topbar: Contact & Social Info */}
        {!scrolled && (
          <div className="bg-navy-dark text-[#FAF7F2]/70 text-xs py-2.5 px-6 border-b border-white/5 hidden md:block">
            <div className="max-w-6xl mx-auto flex items-center justify-between">
              <div className="flex items-center gap-6 font-medium">
                <span className="flex items-center gap-1.5">
                  <Phone className="h-3.5 w-3.5 text-coral" /> (+91) 98640 12345
                </span>
                <span className="flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5 text-coral" /> rescue@sarc-assam.org
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-coral" /> Zoo Road, Guwahati, Assam
                </span>
              </div>
              <div className="flex items-center gap-3">
                {['facebook', 'twitter', 'youtube', 'instagram'].map((social) => (
                  <a key={social} href="#" className="h-6 w-6 rounded-full bg-white/10 hover:bg-coral hover:text-white flex items-center justify-center transition-colors text-white font-bold text-[10px]">
                    {social === 'facebook' && 'f'}
                    {social === 'twitter' && 't'}
                    {social === 'youtube' && 'y'}
                    {social === 'instagram' && 'i'}
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Main Floating Capsule Navbar */}
        <div className={`w-full transition-all duration-300 ${scrolled ? "py-2" : "py-4 md:py-6"}`}>
          <div className="max-w-6xl mx-auto px-6">
            <div className={`transition-all duration-300 bg-white/95 backdrop-blur-md rounded-full border border-charcoal/5 flex items-center justify-between w-full max-w-6xl mx-auto ${
              scrolled ? "py-2.5 px-6 shadow-md" : "py-4 px-8 shadow-lg"
            }`}>
              {/* Brand Logo */}
              <a onClick={() => scrollSmoothTo("home")} className="cursor-pointer flex items-center gap-2">
                <span className="bg-coral/10 text-coral p-2 rounded-full inline-flex items-center justify-center">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <circle cx="8" cy="6" r="2" />
                    <circle cx="12" cy="4" r="2" />
                    <circle cx="16" cy="6" r="2" />
                    <circle cx="7" cy="11" r="2" />
                    <circle cx="17" cy="11" r="2" />
                    <path d="M12 10c-3 0-5 2-5 5s2 4 5 4 5-1 5-4-2-5-5-5z" />
                  </svg>
                </span>
                <div className="font-sans text-2xl font-black tracking-tight text-charcoal">
                  Poofyco
                </div>
                <span className="text-[9px] uppercase font-bold tracking-widest px-1.5 py-0.5 border border-charcoal/20 text-charcoal/60 rounded-xs">
                  Assam
                </span>
              </a>

              {/* Desktop Navigation Links */}
              <nav className="hidden md:flex items-center gap-8 font-semibold">
                {[
                  { label: "Home", target: "home" },
                  { label: "About Us", target: "about" },
                  { label: "Service", target: "adopt" },
                  { label: "Features", target: "volunteer" },
                  { label: "Pages", target: "donate" }
                ].map((item) => (
                  <button
                    key={item.label}
                    onClick={() => scrollSmoothTo(item.target)}
                    className={`text-sm tracking-wide transition-colors hover:text-coral cursor-pointer ${activeSection === item.target
                      ? "text-coral font-bold border-b-2 border-coral pb-0.5"
                      : "text-charcoal/80"
                      }`}
                  >
                    {item.label}
                  </button>
                ))}
              </nav>

              {/* Contact Us Nav Button */}
              <div className="hidden md:block">
                <button
                  onClick={() => scrollSmoothTo("volunteer")}
                  className="text-xs uppercase tracking-widest font-black px-6 py-3 rounded-full border-2 border-navy text-navy hover:bg-[#0B0E37] hover:text-white transition-all cursor-pointer"
                >
                  Contact Us
                </button>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-1 cursor-pointer text-charcoal"
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-x-0 top-[68px] bg-[#FAF7F2] border-b border-terracotta/20 shadow-xl py-6 px-6 flex flex-col gap-4 animate-fade-in-up">
            {[
              { label: "Home", target: "home" },
              { label: "About Us", target: "about" },
              { label: "Service", target: "adopt" },
              { label: "Features", target: "volunteer" },
              { label: "Pages", target: "donate" }
            ].map((item) => (
              <button
                key={item.label}
                onClick={() => scrollSmoothTo(item.target)}
                className={`text-left text-lg font-serif font-bold py-2 border-b border-terracotta/10 cursor-pointer ${activeSection === item.target ? "text-coral" : "text-charcoal"
                  }`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => scrollSmoothTo("volunteer")}
              className="mt-2 w-full py-3 text-center uppercase tracking-widest text-sm font-bold bg-coral text-white rounded-lg hover:bg-coral-light cursor-pointer"
            >
              Contact Us
            </button>
          </div>
        )}
      </header>

      {/* HERO SECTION */}
      <section id="home" className="relative bg-[#EBF0F6] lg:h-[100vh] min-h-[900px] pt-40 lg:pt-48 pb-0 flex flex-col justify-between overflow-hidden">
        {/* Topographic organic background styling */}
        <div className="absolute inset-0 z-0 opacity-15 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 1440 900" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M-100 100 C 300 150, 400 -50, 900 100 C 1400 250, 1200 400, 1600 500" stroke="#0B0E37" strokeWidth="2" />
            <path d="M-100 200 C 300 250, 400 50, 900 200 C 1400 350, 1200 500, 1600 600" stroke="#0B0E37" strokeWidth="2" />
            <path d="M-100 300 C 300 350, 400 150, 900 300 C 1400 450, 1200 600, 1600 700" stroke="#0B0E37" strokeWidth="2" />
            <path d="M-100 400 C 300 450, 400 250, 900 400 C 1400 550, 1200 700, 1600 800" stroke="#0B0E37" strokeWidth="2" />
          </svg>
        </div>

        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full z-10 relative flex-1">
          {/* Left Column: Heading & CTAs */}
          <div className="lg:col-span-6 space-y-8 text-left animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl lg:text-[50px] font-serif font-black text-navy leading-[1.15] tracking-tight">
              Helping Stray Animals,<br />
              Building{" "}
              {/* <span className="inline-flex items-center align-middle bg-[#D3E3F1] border border-charcoal/10 rounded-full px-2 py-0.5 mx-1 h-[45px] w-[90px] overflow-hidden relative shadow-inner">
                <Image src="/images/dog_kopili.png" alt="small dog inline" fill className="object-cover object-center scale-110" />
              </span><br /> */}
              Community
            </h1>

            <p className="text-sm md:text-base text-charcoal/70 max-w-lg leading-relaxed">
              Guwahati&apos;s street animals endure high-speed bypasses, monsoon floods, and GMC animal welfare gaps. We aren&apos;t just a charity; we are a community-led network delivering real rescue, foster circles, and local care.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => scrollSmoothTo("donate")}
                className="px-8 py-4 bg-coral hover:bg-coral-light text-white font-bold tracking-wider text-xs rounded-full shadow-lg transition-all cursor-pointer hover:translate-y-[-2px] active:translate-y-0"
              >
                Donate Now
              </button>
              <button
                onClick={() => scrollSmoothTo("about")}
                className="h-12 w-12 rounded-full bg-navy hover:bg-navy-dark text-white flex items-center justify-center shadow-md transition-all cursor-pointer hover:scale-105 active:scale-100"
                aria-label="About our mission"
              >
                <svg className="w-4 h-4 fill-current ml-0.5" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
            </div>

            {/* 3.5K+ Community Stat */}
            {/* <div className="flex items-center gap-4 pt-4 border-t border-charcoal/5">
              <div className="text-3xl font-black text-navy">3.5K+</div>
              <div className="flex -space-x-3">
                <div className="h-9 w-9 rounded-full border-2 border-[#EBF0F6] bg-amber text-xs font-bold text-white flex items-center justify-center shadow-sm">PB</div>
                <div className="h-9 w-9 rounded-full border-2 border-[#EBF0F6] bg-terracotta text-xs font-bold text-white flex items-center justify-center shadow-sm">DK</div>
                <div className="h-9 w-9 rounded-full border-2 border-[#EBF0F6] bg-navy text-xs font-bold text-white flex items-center justify-center shadow-sm">HS</div>
                <button 
                  onClick={() => scrollSmoothTo("volunteer")}
                  className="h-9 w-9 rounded-full border-2 border-[#EBF0F6] bg-coral hover:bg-coral-light text-white text-sm font-bold flex items-center justify-center shadow-sm transition-transform hover:scale-105 active:scale-100 cursor-pointer"
                >
                  +
                </button>
              </div>
              <span className="text-xs font-bold text-charcoal/50 uppercase tracking-wider">People Join Us</span>
            </div> */}
          </div>

          {/* Right Column: Hero Cutout Image */}
          <div className="lg:col-span-6 relative flex justify-end h-full items-end mt-8 lg:mt-0">
            <div className="relative w-full max-w-lg aspect-square lg:aspect-auto lg:h-[520px] lg:w-[480px] select-none">
              <Image
                src="/images/H2.jpg"
                alt="Tabby cat and long-eared brown puppy side-by-side"
                fill
                priority
                className="object-contain object-bottom z-10 filter drop-shadow-lg"
              />
            </div>
          </div>
        </div>

        {/* BOTTOM NAVY BENEFITS BAR */}
        <div className="bg-navy text-white py-10 z-20 border-t border-white/5 relative">
          <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">

            {/* Left thumbnail card */}
            <div className="md:col-span-3 flex items-center justify-between bg-white/5 border border-white/10 rounded-2xl p-3 shadow-md relative group overflow-hidden">
              <div className="relative h-20 w-32 rounded-xl overflow-hidden bg-white/10">
                <Image src="/images/cat_jonti.png" alt="preview cat" fill className="object-cover object-center group-hover:scale-105 transition-transform duration-300" />
              </div>
              <button
                onClick={() => scrollSmoothTo("adopt")}
                className="absolute top-2 right-2 h-7 w-7 rounded-full bg-white text-navy flex items-center justify-center shadow-md hover:scale-105 active:scale-95 transition-transform cursor-pointer"
              >
                <svg className="w-3.5 h-3.5 text-coral stroke-[3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
              <div className="flex-1 pl-3 text-left">
                <div className="text-xs font-bold text-white/90">Adopt Today</div>
                <div className="text-[10px] text-white/50 mt-0.5">Meet Jonti & friends</div>
              </div>
            </div>

            {/* Three key benefits columns */}
            <div className="md:col-span-9 grid grid-cols-1 sm:grid-cols-3 gap-6 md:pl-6">

              {/* Benefit 1 */}
              <div className="flex items-start gap-4 border-l border-white/10 sm:border-l-0 sm:pl-0 sm:border-r sm:border-dashed sm:border-white/20 pr-4">
                <div className="bg-white/10 p-2.5 rounded-full text-coral shrink-0">
                  <svg className="w-5 h-5 stroke-current fill-none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-xs uppercase font-extrabold text-coral tracking-wider mb-1">Rescue Animal</h4>
                  <p className="text-[10.5px] text-white/60 leading-relaxed">Weekly street rescue and flyover patrols in Guwahati city zones.</p>
                </div>
              </div>

              {/* Benefit 2 */}
              <div className="flex items-start gap-4 sm:pl-4 sm:border-r sm:border-dashed sm:border-white/20 pr-4">
                <div className="bg-white/10 p-2.5 rounded-full text-coral shrink-0">
                  <svg className="w-5 h-5 stroke-current fill-none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0-1.1.9-2 2-2h1a3 3 0 013 3v2a3 3 0 01-3 3h-1m-4-6a3 3 0 00-3-3H4a3 3 0 00-3 3v2a3 3 0 003 3h1m4 3v1a3 3 0 01-3 3H4M9 15h6" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-xs uppercase font-extrabold text-coral tracking-wider mb-1">Rehabilitation</h4>
                  <p className="text-[10.5px] text-white/60 leading-relaxed">Medical clinics, boarding, vaccines, and keyhole sterilization drives.</p>
                </div>
              </div>

              {/* Benefit 3 */}
              <div className="flex items-start gap-4 sm:pl-4">
                <div className="bg-white/10 p-2.5 rounded-full text-coral shrink-0">
                  <svg className="w-5 h-5 stroke-current fill-none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-xs uppercase font-extrabold text-coral tracking-wider mb-1">Pet Adoption</h4>
                  <p className="text-[10.5px] text-white/60 leading-relaxed">Matching our recovered rescues with loving and warm families.</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* INTRO/BEST ANIMAL RESCUE SECTION */}
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
                Poofyco is Guwahati&apos;s leading street animal rescue network, providing around-the-clock emergency field aid, foster circles, and local community sterilization camps to fill local municipal gaps.
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

      {/* ABOUT & MISSION (Local Gap) */}
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
                  As Guwahati rapidly expands, transforming wetlands into high-rises and single lanes into bypass flyovers, our non-human residents have been squeezed out. Currently, the <strong className="text-terracotta">Guwahati Municipal Corporation (GMC) lacks any dedicated public animal shelter</strong> or structured, year-round Animal Birth Control (ABC) services.
                </p>
                <p>
                  Without municipal infrastructure, injured street dogs, run-over pups, and sick strays are left to struggle alone against heavy urban traffic, monsoon deluge, and escalating human-animal conflicts.
                </p>
                <blockquote className="border-l-4 border-amber pl-4 italic text-charcoal/70 bg-amber/5 py-3 pr-2 rounded-r-md">
                  &ldquo;Our rescue calls peak during the June-September monsoon season, when waterlogged streets force street animals onto dry, high-speed flyovers, resulting in severe vehicular accidents.&rdquo;
                </blockquote>
                <p>
                  SARC was born to bridge this welfare gap. We operate a citizen-funded network of foster homes, coordinate on-site first aid, and run localized sterilization drives in neighborhoods from Kahilipara to Zoo Road and Uzan Bazar.
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
                    <p className="text-xs text-charcoal/60 mt-1">Started as a group of Cotton University and Gauhati University students feeding strays displaced during flyover construction on G.S. Road.</p>
                  </div>

                  {/* Step 2 */}
                  <div className="relative">
                    <div className="absolute -left-[31px] top-1.5 bg-amber w-4 h-4 rounded-full border-4 border-white" />
                    <span className="text-xs font-bold text-terracotta block">2024 - Localized Foster Circles</span>
                    <h4 className="font-semibold text-charcoal text-sm mt-0.5">Grassroots Treatment Network</h4>
                    <p className="text-xs text-charcoal/60 mt-1">Formed a loose network of home fosters and partnered with local veterinary clinics to treat maggot wounds, distemper cases, and run road safety reflective collar drives.</p>
                  </div>

                  {/* Step 3 */}
                  <div className="relative">
                    <div className="absolute -left-[31px] top-1.5 bg-terracotta w-4 h-4 rounded-full border-4 border-white" />
                    <span className="text-xs font-bold text-terracotta block">Present - Structured Collective</span>
                    <h4 className="font-semibold text-charcoal text-sm mt-0.5">Full-Scale Rescue & Sterilization</h4>
                    <p className="text-xs text-charcoal/60 mt-1">Organizing community-wide ABC drives, mobile vaccination camps, and active animal adoption campaigns in Guwahati, Dibrugarh, and Jorhat.</p>
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

      {/* ADOPT (Animal Card Grid with Filter) */}
      <section id="adopt" className="py-24 bg-white border-y border-terracotta/10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest text-terracotta font-extrabold block mb-2">
              Find Your Companion
            </span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-charcoal mb-4">
              Animals Waiting for You
            </h2>
            <p className="text-charcoal/70">
              Every animal we rescue is nurtured back to physical and emotional health in our local foster homes. Check our current list, filter by your preferences, and meet your next family member.
            </p>
          </div>

          {/* FILTERS PANEL */}
          <div className="bg-[#FAF7F2] border-2 border-charcoal/10 rounded-2xl p-6 mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex flex-wrap items-center gap-6">

              {/* Species Filter */}
              <div className="space-y-1.5">
                <label className="text-xs uppercase font-bold text-charcoal/60 tracking-wider block">Species</label>
                <div className="flex bg-white rounded-lg p-1 border border-charcoal/15">
                  <button
                    onClick={() => setSpeciesFilter("all")}
                    className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${speciesFilter === "all" ? "bg-terracotta text-cream" : "text-charcoal/80 hover:text-charcoal"}`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setSpeciesFilter("dog")}
                    className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${speciesFilter === "dog" ? "bg-terracotta text-cream" : "text-charcoal/80 hover:text-charcoal"}`}
                  >
                    Dogs
                  </button>
                  <button
                    onClick={() => setSpeciesFilter("cat")}
                    className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${speciesFilter === "cat" ? "bg-terracotta text-cream" : "text-charcoal/80 hover:text-charcoal"}`}
                  >
                    Cats
                  </button>
                </div>
              </div>

              {/* Age Filter */}
              <div className="space-y-1.5">
                <label className="text-xs uppercase font-bold text-charcoal/60 tracking-wider block">Age Group</label>
                <div className="flex bg-white rounded-lg p-1 border border-charcoal/15">
                  <button
                    onClick={() => setAgeFilter("all")}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${ageFilter === "all" ? "bg-terracotta text-cream" : "text-charcoal/80 hover:text-charcoal"}`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setAgeFilter("puppy-kitten")}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${ageFilter === "puppy-kitten" ? "bg-terracotta text-cream" : "text-charcoal/80 hover:text-charcoal"}`}
                  >
                    Baby
                  </button>
                  <button
                    onClick={() => setAgeFilter("young")}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${ageFilter === "young" ? "bg-terracotta text-cream" : "text-charcoal/80 hover:text-charcoal"}`}
                  >
                    Young
                  </button>
                  <button
                    onClick={() => setAgeFilter("adult")}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${ageFilter === "adult" ? "bg-terracotta text-cream" : "text-charcoal/80 hover:text-charcoal"}`}
                  >
                    Adult
                  </button>
                </div>
              </div>

              {/* Location Filter */}
              <div className="space-y-1.5">
                <label className="text-xs uppercase font-bold text-charcoal/60 tracking-wider block">District / Town</label>
                <div className="flex bg-white rounded-lg p-1 border border-charcoal/15">
                  <button
                    onClick={() => setLocationFilter("all")}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${locationFilter === "all" ? "bg-terracotta text-cream" : "text-charcoal/80 hover:text-charcoal"}`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setLocationFilter("Guwahati")}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${locationFilter === "Guwahati" ? "bg-terracotta text-cream" : "text-charcoal/80 hover:text-charcoal"}`}
                  >
                    Guwahati
                  </button>
                  <button
                    onClick={() => setLocationFilter("Dibrugarh")}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${locationFilter === "Dibrugarh" ? "bg-terracotta text-cream" : "text-charcoal/80 hover:text-charcoal"}`}
                  >
                    Dibrugarh
                  </button>
                  <button
                    onClick={() => setLocationFilter("Jorhat")}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${locationFilter === "Jorhat" ? "bg-terracotta text-cream" : "text-charcoal/80 hover:text-charcoal"}`}
                  >
                    Jorhat
                  </button>
                </div>
              </div>

            </div>

            {/* Total Results */}
            <div className="text-right">
              <span className="text-xs font-bold text-charcoal/50 uppercase block">Available for Fostering/Adoption</span>
              <span className="text-lg font-serif font-bold text-terracotta">{filteredAnimals.length} Match{filteredAnimals.length !== 1 ? "es" : ""} Found</span>
            </div>
          </div>

          {/* GRID OF ADOPTION CARDS */}
          {filteredAnimals.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {filteredAnimals.map((animal) => (
                <div
                  key={animal.id}
                  className="group bg-[#FAF7F2] rounded-2xl overflow-hidden border-2 border-charcoal/10 shadow-xs hover:shadow-md transition-all duration-300 hover:border-terracotta/40 hover:-translate-y-1 flex flex-col h-full"
                >
                  <div className="relative h-56 w-full bg-charcoal/10 overflow-hidden">
                    <Image
                      src={animal.image}
                      alt={`Photo of ${animal.name}, a street rescue waiting for adoption in Assam`}
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-terracotta text-cream text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full shadow-sm">
                      {animal.ageText}
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-serif font-bold text-charcoal group-hover:text-terracotta transition-colors">
                          {animal.name}
                        </h3>
                        <span className="text-xs font-semibold text-amber bg-amber/10 px-2 py-0.5 rounded-sm">
                          {animal.breed}
                        </span>
                      </div>

                      <div className="flex items-center gap-1 text-xs text-charcoal/60">
                        <MapPin className="h-3.5 w-3.5 text-terracotta" />
                        <span>{animal.locationTag}</span>
                      </div>

                      <p className="text-xs text-charcoal/75 line-clamp-3 leading-relaxed pt-2">
                        {animal.story}
                      </p>
                    </div>

                    <div className="pt-6">
                      <button
                        onClick={() => setSelectedAnimal(animal)}
                        className="w-full py-2.5 text-center text-xs uppercase tracking-wider font-bold border-2 border-terracotta text-terracotta bg-transparent rounded-lg hover:bg-terracotta hover:text-white transition-colors cursor-pointer"
                      >
                        Meet Me
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-[#FAF7F2] border-2 border-dashed border-charcoal/20 rounded-2xl">
              <span className="text-sm font-medium text-charcoal/60 block">No matching animal rescues at this moment.</span>
              <button
                onClick={() => { setSpeciesFilter("all"); setAgeFilter("all"); setLocationFilter("all"); }}
                className="mt-4 text-xs uppercase tracking-wider font-bold text-terracotta hover:underline cursor-pointer"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ANIMAL PROFILE MODAL */}
      {selectedAnimal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/70 backdrop-blur-xs animate-fade-in-up">
          <div className="bg-[#FAF7F2] border-2 border-charcoal rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl flex flex-col md:flex-row relative">
            <button
              onClick={() => setSelectedAnimal(null)}
              className="absolute top-4 right-4 z-10 bg-charcoal/80 text-cream p-1.5 rounded-full hover:bg-charcoal transition-colors cursor-pointer"
              aria-label="Close Profile"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="relative h-60 md:h-auto md:w-1/2 min-h-[300px] bg-charcoal/10">
              <Image
                src={selectedAnimal.image}
                alt={selectedAnimal.name}
                fill
                className="object-cover object-center"
              />
            </div>

            <div className="p-8 md:w-1/2 flex flex-col justify-between">
              <div className="space-y-4">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-terracotta bg-terracotta/10 px-2.5 py-1 rounded-full">
                    {selectedAnimal.breed}
                  </span>
                  <h3 className="text-3xl font-serif font-bold text-charcoal mt-2">{selectedAnimal.name}</h3>
                </div>

                <div className="space-y-2 text-sm text-charcoal/80">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-terracotta" />
                    <span><strong>Location:</strong> {selectedAnimal.locationTag}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-terracotta" />
                    <span><strong>Age Group:</strong> {selectedAnimal.ageText} ({selectedAnimal.age})</span>
                  </div>
                </div>

                <div className="border-t border-charcoal/10 pt-4">
                  <h4 className="text-xs uppercase font-extrabold text-charcoal/50 mb-1">Rescue Story</h4>
                  <p className="text-xs text-charcoal/80 leading-relaxed italic">
                    &ldquo;{selectedAnimal.story}&rdquo;
                  </p>
                </div>
              </div>

              <div className="pt-8">
                <button
                  onClick={() => {
                    setSelectedAnimal(null);
                    scrollSmoothTo("volunteer");
                  }}
                  className="w-full py-3 bg-terracotta hover:bg-terracotta-dark text-white text-xs uppercase tracking-widest font-bold rounded-lg transition-colors cursor-pointer text-center"
                >
                  Schedule A Visit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VOLUNTEER SECTION (React Hook Form) */}
      <section id="volunteer" className="py-24 bg-[#FAF7F2] relative border-b border-terracotta/10">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest text-terracotta font-extrabold block mb-2">
              Join the Movement
            </span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-charcoal mb-4">
              Become a SARC Volunteer
            </h2>
            <p className="text-charcoal/70">
              We need people on the ground. Whether you want to assist in weekly sterilisation camp transport, coordinate rescue calls, or temporarily foster recovery cases in your backyard in Guwahati, we have a place for you.
            </p>
          </div>

          <div className="bg-white border-2 border-charcoal/10 rounded-2xl p-8 md:p-12 shadow-sm">
            {volunteerSubmitted ? (
              <div className="text-center py-12 space-y-4 animate-fade-in-up">
                <div className="bg-amber/15 h-16 w-16 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="h-10 w-10 text-terracotta" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-charcoal">Application Received!</h3>
                <p className="text-charcoal/75 max-w-md mx-auto leading-relaxed">
                  Thank you for stepping forward. A coordinator from SARC&apos;s Guwahati chapter will reach out to you on WhatsApp or via email within 48 hours to discuss our current active patrols.
                </p>
                <button
                  onClick={() => setVolunteerSubmitted(false)}
                  className="mt-6 text-xs uppercase tracking-wider font-bold text-terracotta hover:underline cursor-pointer"
                >
                  Submit Another Form
                </button>
              </div>
            ) : (
              <form onSubmit={handleVolunteerSubmit(onSubmitVolunteer)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                  {/* Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs uppercase font-extrabold text-charcoal tracking-wide flex items-center gap-1.5">
                      <User className="h-3.5 w-3.5 text-terracotta" /> Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Priyanuj Borah"
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-1 focus:ring-terracotta focus:border-terracotta bg-[#FAF7F2]/50 text-charcoal text-sm ${volunteerErrors.name ? "border-red-500" : "border-charcoal/15"
                        }`}
                      {...registerVolunteer("name", { required: "Name is required" })}
                    />
                    {volunteerErrors.name && (
                      <span className="text-xs text-red-500">{volunteerErrors.name.message}</span>
                    )}
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="text-xs uppercase font-extrabold text-charcoal tracking-wide flex items-center gap-1.5">
                      <Mail className="h-3.5 w-3.5 text-terracotta" /> Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. priyanuj@gmail.com"
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-1 focus:ring-terracotta focus:border-terracotta bg-[#FAF7F2]/50 text-charcoal text-sm ${volunteerErrors.email ? "border-red-500" : "border-charcoal/15"
                        }`}
                      {...registerVolunteer("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                          message: "Please enter a valid email address"
                        }
                      })}
                    />
                    {volunteerErrors.email && (
                      <span className="text-xs text-red-500">{volunteerErrors.email.message}</span>
                    )}
                  </div>

                  {/* Phone */}
                  <div className="space-y-1.5">
                    <label className="text-xs uppercase font-extrabold text-charcoal tracking-wide flex items-center gap-1.5">
                      <Phone className="h-3.5 w-3.5 text-terracotta" /> WhatsApp Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. +91 98765 43210"
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-1 focus:ring-terracotta focus:border-terracotta bg-[#FAF7F2]/50 text-charcoal text-sm ${volunteerErrors.phone ? "border-red-500" : "border-charcoal/15"
                        }`}
                      {...registerVolunteer("phone", {
                        required: "Phone number is required",
                        pattern: {
                          value: /^[+0-9\s-]{10,15}$/,
                          message: "Please enter a valid phone number"
                        }
                      })}
                    />
                    {volunteerErrors.phone && (
                      <span className="text-xs text-red-500">{volunteerErrors.phone.message}</span>
                    )}
                  </div>

                  {/* Age */}
                  <div className="space-y-1.5">
                    <label className="text-xs uppercase font-extrabold text-charcoal tracking-wide">
                      Age <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      placeholder="e.g. 21"
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-1 focus:ring-terracotta focus:border-terracotta bg-[#FAF7F2]/50 text-charcoal text-sm ${volunteerErrors.age ? "border-red-500" : "border-charcoal/15"
                        }`}
                      {...registerVolunteer("age", {
                        required: "Age is required",
                        min: { value: 18, message: "Must be 18 or older to patrol" },
                        max: { value: 100, message: "Please enter a valid age" }
                      })}
                    />
                    {volunteerErrors.age && (
                      <span className="text-xs text-red-500">{volunteerErrors.age.message}</span>
                    )}
                  </div>
                </div>

                {/* Role */}
                <div className="space-y-1.5">
                  <label className="text-xs uppercase font-extrabold text-charcoal tracking-wide block">
                    Preferred Role / Focus Area <span className="text-red-500">*</span>
                  </label>
                  <select
                    className="w-full px-4 py-3 border border-charcoal/15 rounded-lg focus:outline-none focus:ring-1 focus:ring-terracotta focus:border-terracotta bg-[#FAF7F2]/50 text-charcoal text-sm cursor-pointer"
                    {...registerVolunteer("role", { required: "Please select a role" })}
                  >
                    <option value="foster">Temporary Foster Care (Housing an animal during rehab)</option>
                    <option value="rescue">Rescue Patrol (Field first-aid and transportation)</option>
                    <option value="abc">Sterilization Drive Volunteer (Camp logistics and feeding)</option>
                    <option value="admin">Digital Support (Helpline coordination & photography)</option>
                  </select>
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label className="text-xs uppercase font-extrabold text-charcoal tracking-wide block">
                    Why do you want to volunteer? Tell us briefly about your experience with street animals. <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Describe your motivation..."
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-1 focus:ring-terracotta focus:border-terracotta bg-[#FAF7F2]/50 text-charcoal text-sm ${volunteerErrors.reason ? "border-red-500" : "border-charcoal/15"
                      }`}
                    {...registerVolunteer("reason", {
                      required: "Motivation statement is required",
                      minLength: { value: 20, message: "Please provide a little more detail (at least 20 characters)" }
                    })}
                  />
                  {volunteerErrors.reason && (
                    <span className="text-xs text-red-500">{volunteerErrors.reason.message}</span>
                  )}
                </div>

                <div className="pt-2 text-right">
                  <button
                    type="submit"
                    disabled={volunteerLoading}
                    className="px-8 py-3.5 bg-terracotta hover:bg-terracotta-dark disabled:bg-terracotta/50 text-white font-bold uppercase tracking-wider text-xs rounded-lg shadow-md flex items-center justify-center gap-2 ml-auto cursor-pointer"
                  >
                    {volunteerLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" /> Processing...
                      </>
                    ) : (
                      <>
                        Submit Application <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* DONATE (Razorpay UI mock) */}
      <section id="donate" className="py-24 bg-white border-b border-terracotta/10">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

            {/* Left side: Context */}
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs uppercase tracking-widest text-terracotta font-extrabold block mb-2">
                Support Our Missions
              </span>
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-charcoal leading-tight">
                Fuel a Rescue Operation
              </h2>
              <p className="text-charcoal/75 text-base md:text-lg leading-relaxed">
                We operate with complete financial transparency. SARC does not receive government funding. Every vial of vaccine, surgical suture, and bowl of meal is funded directly by citizens like you.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-amber/15 p-2 rounded-lg text-terracotta font-bold text-sm shrink-0">₹500</div>
                  <div>
                    <h4 className="font-bold text-sm text-charcoal">Feeds a Recuperating Stray</h4>
                    <p className="text-xs text-charcoal/60">Provides nutritious food, calcium supplements, and fresh water to one foster dog for two weeks.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-amber/15 p-2 rounded-lg text-terracotta font-bold text-sm shrink-0">₹1,000</div>
                  <div>
                    <h4 className="font-bold text-sm text-charcoal">Core Vaccinations Package</h4>
                    <p className="text-xs text-charcoal/60">Covers DHPPi + Rabies vaccinations and deworming treatments for one stray puppy.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-amber/15 p-2 rounded-lg text-terracotta font-bold text-sm shrink-0">₹2,500</div>
                  <div>
                    <h4 className="font-bold text-sm text-charcoal">Sterilisation & Post-Op Boarding</h4>
                    <p className="text-xs text-charcoal/60">Funds one complete Animal Birth Control (ABC) keyhole surgery, antibiotics, and 5 days of shelter recovery.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side: Donate Box */}
            <div className="lg:col-span-6">
              <div className="bg-[#FAF7F2] border-2 border-charcoal/10 rounded-2xl p-8 shadow-md space-y-6">
                <h3 className="text-xl font-serif font-bold text-charcoal text-center">Select Contribution Amount</h3>

                <div className="grid grid-cols-3 gap-3">
                  <button
                    onClick={() => handleOpenDonateModal("500")}
                    className="py-4 border-2 border-charcoal/15 bg-white text-charcoal font-bold rounded-lg hover:border-terracotta hover:bg-terracotta/5 transition-all text-sm cursor-pointer"
                  >
                    ₹500
                  </button>
                  <button
                    onClick={() => handleOpenDonateModal("1000")}
                    className="py-4 border-2 border-charcoal/15 bg-white text-charcoal font-bold rounded-lg hover:border-terracotta hover:bg-terracotta/5 transition-all text-sm cursor-pointer"
                  >
                    ₹1,000
                  </button>
                  <button
                    onClick={() => handleOpenDonateModal("2500")}
                    className="py-4 border-2 border-charcoal/15 bg-white text-charcoal font-bold rounded-lg hover:border-terracotta hover:bg-terracotta/5 transition-all text-sm cursor-pointer"
                  >
                    ₹2,500
                  </button>
                </div>

                <div className="relative flex items-center justify-center">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-charcoal/10"></div>
                  </div>
                  <span className="relative bg-[#FAF7F2] px-3 text-xs font-bold text-charcoal/40 uppercase">Or Choose Custom</span>
                </div>

                <button
                  onClick={() => handleOpenDonateModal("custom")}
                  className="w-full py-3 bg-terracotta hover:bg-terracotta-dark text-white font-bold uppercase tracking-wider text-xs rounded-lg transition-colors cursor-pointer text-center block"
                >
                  Contribute A Custom Amount
                </button>

                <div className="flex items-center justify-center gap-1.5 text-[10px] text-charcoal/50 font-semibold uppercase text-center pt-2">
                  <Lock className="h-3 w-3 text-emerald-600" /> Secure Payments processed via Razorpay
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* RAZORPAY MODAL MOCK */}
      {donateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/70 backdrop-blur-xs animate-fade-in-up">
          <div className="bg-white border border-slate-200 rounded-xl max-w-md w-full overflow-hidden shadow-2xl relative">

            {/* Header: Razorpay Theme (Blue/Indigo styling) */}
            <div className="bg-[#172554] text-white px-6 py-5 flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#93c5fd]">Razorpay Secure Checkout</span>
                <h3 className="text-lg font-bold">Street Animal Rescue Collective</h3>
              </div>
              <button
                onClick={() => setDonateModalOpen(false)}
                className="text-white/70 hover:text-white p-1 hover:bg-white/10 rounded-full cursor-pointer"
                aria-label="Close Payment"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Steps Rendering */}
            {paymentStep === "details" && (
              <form onSubmit={handleDonateSubmit(onSubmitDonate)} className="p-6 space-y-5">

                {/* Selected Amount / Custom Amount Input */}
                <div className="bg-[#eff6ff] border border-[#bfdbfe] rounded-lg p-4 flex items-center justify-between">
                  <span className="text-xs font-bold text-[#1e3a8a] uppercase">Donation Amount</span>

                  {selectedAmount === "custom" ? (
                    <div className="flex items-center gap-1.5">
                      <span className="text-lg font-bold text-[#172554]">₹</span>
                      <input
                        type="number"
                        placeholder="Amount"
                        required
                        className="w-24 px-2 py-1 text-sm font-bold border border-blue-300 rounded-md focus:outline-none focus:border-blue-600 text-[#172554]"
                        value={customAmountVal}
                        onChange={(e) => setCustomAmountVal(e.target.value)}
                      />
                    </div>
                  ) : (
                    <span className="text-xl font-extrabold text-[#172554]">₹{Number(selectedAmount).toLocaleString()}</span>
                  )}
                </div>

                <div className="space-y-4">
                  {/* Name */}
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-extrabold text-slate-500 tracking-wider block">Full Name</label>
                    <input
                      type="text"
                      placeholder="Your Name"
                      className={`w-full px-3 py-2 border rounded-md text-xs focus:outline-none focus:border-[#172554] text-charcoal ${donateErrors.name ? "border-red-500" : "border-slate-200"
                        }`}
                      {...registerDonate("name", { required: "Name is required" })}
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-extrabold text-slate-500 tracking-wider block">Email Address</label>
                    <input
                      type="email"
                      placeholder="your.email@domain.com"
                      className={`w-full px-3 py-2 border rounded-md text-xs focus:outline-none focus:border-[#172554] text-charcoal ${donateErrors.email ? "border-red-500" : "border-slate-200"
                        }`}
                      {...registerDonate("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                          message: "Valid email required"
                        }
                      })}
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-extrabold text-slate-500 tracking-wider block">Phone Number</label>
                    <input
                      type="text"
                      placeholder="10-digit number"
                      className={`w-full px-3 py-2 border rounded-md text-xs focus:outline-none focus:border-[#172554] text-charcoal ${donateErrors.phone ? "border-red-500" : "border-slate-200"
                        }`}
                      {...registerDonate("phone", {
                        required: "Phone is required",
                        pattern: { value: /^[0-9]{10}$/, message: "Must be 10 digits" }
                      })}
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 bg-[#1e40af] hover:bg-[#1e3a8a] text-white font-bold text-xs uppercase tracking-widest rounded-md flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                  >
                    Pay Securely with Razorpay
                  </button>
                </div>

                <div className="text-center text-[9px] text-slate-400">
                  By clicking, you agree to our terms. SARC is a registered non-profit network.
                </div>
              </form>
            )}

            {paymentStep === "processing" && (
              <div className="p-12 text-center space-y-6 flex flex-col items-center justify-center animate-fade-in-up">
                <Loader2 className="h-12 w-12 animate-spin text-[#1e40af]" />
                <div className="space-y-1.5">
                  <h4 className="font-bold text-slate-700 text-lg">Authorizing Payment...</h4>
                  <p className="text-xs text-slate-400 max-w-xs leading-relaxed">
                    Please do not close this window or refresh. Connecting to your bank secure gate.
                  </p>
                </div>
              </div>
            )}

            {paymentStep === "success" && (
              <div className="p-8 text-center space-y-6 flex flex-col items-center justify-center animate-fade-in-up">
                <div className="bg-emerald-50 h-16 w-16 rounded-full flex items-center justify-center border-2 border-emerald-500">
                  <CheckCircle2 className="h-10 w-10 text-emerald-500" />
                </div>

                <div className="space-y-1.5">
                  <h4 className="font-bold text-slate-800 text-xl">Payment Successful!</h4>
                  <p className="text-xs text-slate-500 max-w-xs leading-relaxed">
                    Thank you. Your contribution has been credited to our rescue fund. A tax-exempt receipt has been sent to your email.
                  </p>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-md p-3.5 w-full text-left space-y-1.5 text-xs text-slate-600">
                  <div><strong>Transaction ID:</strong> <code className="text-[#1e40af] font-mono text-[11px]">{transactionId}</code></div>
                  <div><strong>Recipient:</strong> <span>Street Animal Rescue Collective (Assam)</span></div>
                  <div><strong>Amount:</strong> <span>₹{selectedAmount === "custom" ? Number(customAmountVal).toLocaleString() : Number(selectedAmount).toLocaleString()}</span></div>
                </div>

                <button
                  type="button"
                  onClick={() => setDonateModalOpen(false)}
                  className="w-full py-3 bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs uppercase tracking-widest rounded-md cursor-pointer"
                >
                  Close Receipt
                </button>
              </div>
            )}

          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="bg-charcoal text-cream pt-16 pb-8 border-t-2 border-terracotta mt-auto">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 mb-12">

          {/* Logo & Description */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <span className="bg-coral/20 text-coral p-1.5 rounded-full inline-flex items-center justify-center">
                <svg className="w-4 h-4 fill-current text-coral" viewBox="0 0 24 24">
                  <circle cx="8" cy="6" r="2" />
                  <circle cx="12" cy="4" r="2" />
                  <circle cx="16" cy="6" r="2" />
                  <circle cx="7" cy="11" r="2" />
                  <circle cx="17" cy="11" r="2" />
                  <path d="M12 10c-3 0-5 2-5 5s2 4 5 4 5-1 5-4-2-5-5-5z" />
                </svg>
              </span>
              <span className="font-sans text-2xl font-black tracking-tight text-cream">Poofyco</span>
              <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 border border-cream/30 text-cream/70 rounded-sm">
                Assam
              </span>
            </div>
            <p className="text-xs text-[#EEDFD2]/75 max-w-sm leading-relaxed">
              Street Animal Rescue Collective is a grassroots organization based in Northeast India. We fill critical local municipal welfare gaps through community foster networks, vaccination patrols, and medical treatment.
            </p>
          </div>

          {/* District Chapters */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs uppercase font-extrabold text-amber tracking-wider">Local Chapters</h4>
            <ul className="space-y-1.5 text-xs text-[#EEDFD2]/70">
              <li>📍 <strong>Guwahati:</strong> Zoo Road Patrols & Kahilipara Clinic Hub</li>
              <li>📍 <strong>Dibrugarh:</strong> Bari Road Rescue Team</li>
              <li>📍 <strong>Jorhat:</strong> Teok Town Volunteers</li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs uppercase font-extrabold text-amber tracking-wider">Contact Info</h4>
            <div className="space-y-1.5 text-xs text-[#EEDFD2]/70">
              <div>✉️ rescue@sarc-assam.org</div>
              <div>📞 +91 98640 12345 (24/7 Helpline)</div>
              <div className="text-[10px] text-amber/80 font-bold pt-1 uppercase">Guwahati Chapter, Assam, India</div>
            </div>
          </div>
        </div>

        {/* Legal & Footer Bottom */}
        <div className="max-w-6xl mx-auto px-6 border-t border-cream/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] text-cream/50 uppercase tracking-widest">
          <div>
            &copy; {new Date().getFullYear()} Poofyco (Street Animal Rescue Collective). All rights reserved.
          </div>
          <div className="flex gap-6">
            <a onClick={() => scrollSmoothTo("home")} className="hover:underline cursor-pointer">Back to Top</a>
            <span>•</span>
            <span className="text-[#EEDFD2]/70 font-semibold">Guwahati Municipal Animal Welfare Gap Response</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
