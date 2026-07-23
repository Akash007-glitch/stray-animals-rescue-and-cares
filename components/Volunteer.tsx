"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  User,
  Mail,
  Phone,
  Loader2,
  CheckCircle2,
  PawPrint,
  Asterisk,
  PartyPopper,
  Clipboard,
  X,
  ArrowRight,
  ShieldCheck,
  HeartHandshake
} from "lucide-react";
import { VolunteerFormData } from "@/types";

export default function Volunteer() {
  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    watch,
    formState: { errors },
    reset
  } = useForm<VolunteerFormData>({
    defaultValues: {
      role: "foster",
      name: "",
      email: "",
      phone: "",
      reason: ""
    }
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [volunteerSubmitted, setVolunteerSubmitted] = useState(false);
  const [volunteerLoading, setVolunteerLoading] = useState(false);

  const watchRole = watch("role");

  const onSubmitVolunteer = (data: VolunteerFormData) => {
    setVolunteerLoading(true);
    console.log("Volunteer application submitted:", data);
    setTimeout(() => {
      setVolunteerLoading(false);
      setVolunteerSubmitted(true);
      reset();
      setCurrentStep(1);
    }, 1500);
  };

  const openApplication = (role: "foster" | "rescue" | "abc" | "admin" | "") => {
    if (role) {
      setValue("role", role);
    }
    setIsModalOpen(true);
    setCurrentStep(1);
    setVolunteerSubmitted(false);
  };

  const closeApplication = () => {
    setIsModalOpen(false);
    setVolunteerSubmitted(false);
    setCurrentStep(1);
  };

  const nextStep = async () => {
    if (currentStep === 1) {
      const isValid = await trigger(["name", "email", "phone", "reason"]);
      if (isValid) setCurrentStep(2);
    } else if (currentStep === 2) {
      const isValid = await trigger(["role", "age"]);
      if (isValid) setCurrentStep(3);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
  };

  const cards = [
    {
      title: "Rescue Team",
      description:
        "Be on the front lines of emergency extraction and provide immediate care to animals in distress.",
      icon: (className: string) => (
        <Asterisk className={className} strokeWidth={2.5} />
      ),
      role: "rescue" as const,
      delay: "delay-100",
    },
    {
      title: "Foster Hero",
      description:
        "Provide a temporary loving home for recovery, giving animals the space they need to heal and trust again.",
      icon: (className: string) => (
        <svg className={className} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 10v6M9 13h6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      role: "foster" as const,
      delay: "delay-200",
    },
    {
      title: "Event Advocate",
      description:
        "Help organize adoption drives and community education workshops to spread awareness and find homes.",
      icon: (className: string) => (
        <PartyPopper className={className} strokeWidth={2} />
      ),
      role: "abc" as const,
      delay: "delay-300",
    },
  ];

  const rolesList = [
    {
      value: "rescue",
      title: "Rescue Patrol",
      desc: "First-aid patroller & transport helper",
      icon: Asterisk
    },
    {
      value: "foster",
      title: "Temporary Foster Care",
      desc: "Provide recovery space in your backyard",
      icon: (props: any) => (
        <svg {...props} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 10v6M9 13h6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    },
    {
      value: "abc",
      title: "Sterilization & Feeding",
      desc: "Camp logistic helper & daily feeder",
      icon: PartyPopper
    },
    {
      value: "admin",
      title: "Digital Support",
      desc: "Helpline, photography & design support",
      icon: Clipboard
    }
  ];

  const availabilityOptions = [
    { label: "Available on weekends for emergency rescue patrol", key: "weekends" },
    { label: "Have my own vehicle (two-wheeler/car) for transportation", key: "vehicle" },
    { label: "Have prior experience handling or fostering street animals", key: "experience" },
    { label: "Can assist in weekly feeding drives in Tinsukia", key: "feeding" }
  ];

  return (
    <section id="volunteer" className="py-20 md:py-24 bg-[#FAF7F2] relative border-b border-charcoal/5 overflow-hidden">
      {/* Background soft gradients */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-sage-light/10 rounded-full filter blur-3xl opacity-40 -translate-y-1/2 -translate-x-1/2 pointer-events-none select-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10 text-center">
        {/* Header content */}
        <div className="max-w-3xl mx-auto mb-16 md:mb-20 space-y-4">
          <h2 className="text-3xl md:text-4xl lg:text-[40px] font-bold text-forest leading-tight font-sans tracking-tight animate-fade-in-up">
            Join the Heart of the Rescue
          </h2>
          <p className="text-charcoal/80 text-sm md:text-[16px] leading-relaxed font-sans max-w-2xl mx-auto animate-fade-in-up delay-100">
            Every paw deserves a helping hand. Your time and skills can change a life today.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {cards.map((card, index) => (
            <div
              key={index}
              className={`bg-white rounded-[32px] p-8 md:p-10 border border-charcoal/[0.04] shadow-[0_8px_30px_rgb(0,0,0,0.015)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.04)] hover:-translate-y-1.5 transition-all duration-500 ease-out group text-left flex flex-col justify-between animate-fade-in-up ${card.delay}`}
            >
              <div>
                {/* Icon Circle */}
                <div className="w-14 h-14 rounded-full bg-[#FAF0E6] flex items-center justify-center mb-8 group-hover:scale-105 transition-transform duration-500">
                  {card.icon("h-6 w-6 text-[#8B4513]")}
                </div>

                {/* Card Title */}
                <h3 className="text-xl md:text-2xl font-bold text-forest mb-4 tracking-tight leading-snug group-hover:text-charcoal transition-colors duration-300">
                  {card.title}
                </h3>

                {/* Card Description */}
                <p className="text-charcoal/70 text-sm md:text-[15px] leading-relaxed font-sans font-normal">
                  {card.description}
                </p>
              </div>

              {/* Learn More Link */}
              <button
                onClick={() => openApplication(card.role)}
                className="text-xs md:text-sm font-bold text-coral hover:text-terracotta transition-colors mt-6 inline-flex items-center gap-1 cursor-pointer self-start"
              >
                <span>Learn More</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>

        {/* Start Your Application Button */}
        <div className="animate-fade-in-up delay-400">
          <button
            onClick={() => openApplication("")}
            className="bg-coral hover:bg-coral-light text-white font-bold px-8 py-4 rounded-2xl shadow-lg shadow-coral/20 hover:shadow-xl hover:shadow-coral/35 transition-all duration-300 text-sm tracking-wide inline-flex items-center gap-2.5 cursor-pointer hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>Start Your Application</span>
            <Clipboard className="h-4.5 w-4.5" />
          </button>
        </div>
      </div>

      {/* Application Form Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/40 backdrop-blur-sm animate-fade-in overflow-y-auto">
          <div className="bg-white border border-charcoal/10 rounded-[32px] shadow-2xl max-w-3xl w-full relative my-8 animate-scale-up overflow-hidden flex flex-col">
            
            {/* Title Bar / Header */}
            <div className="bg-[#FAF9F6] px-6 md:px-10 py-5 flex items-center justify-between border-b border-charcoal/5">
              <div className="flex items-center gap-2">
                <HeartHandshake className="h-6 w-6 text-coral" />
                <h3 className="text-xl font-bold text-forest tracking-tight font-sans">
                  Start Your Application
                </h3>
              </div>
              <button
                type="button"
                onClick={closeApplication}
                className="text-charcoal/40 hover:text-charcoal p-1.5 rounded-full hover:bg-charcoal/5 transition-all cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Steps Progress Indicator */}
            {!volunteerSubmitted && (
              <div className="bg-[#FAF9F6] border-b border-charcoal/5 px-6 md:px-10 py-5">
                <div className="max-w-md mx-auto flex items-center justify-between relative">
                  {/* Background line */}
                  <div className="absolute left-0 right-0 top-5 h-[3px] bg-charcoal/5 -z-0" />
                  
                  {/* Filled orange progress line */}
                  <div 
                    className="absolute left-0 top-5 h-[3px] bg-coral transition-all duration-500 -z-0"
                    style={{ 
                      width: currentStep === 1 ? "0%" : currentStep === 2 ? "50%" : "100%" 
                    }} 
                  />

                  {/* Step 1 Circle & Label */}
                  <div className="flex flex-col items-center z-10 relative">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-500 ${
                      currentStep >= 1 ? "bg-coral text-white" : "bg-[#E5E5EA] text-charcoal/40"
                    }`}>
                      1
                    </div>
                    <span className="text-[10px] font-bold text-charcoal/60 mt-2 tracking-wide uppercase font-sans">Basic Info</span>
                  </div>

                  {/* Step 2 Circle & Label */}
                  <div className="flex flex-col items-center z-10 relative">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-500 ${
                      currentStep >= 2 ? "bg-coral text-white" : "bg-[#E5E5EA] text-charcoal/40"
                    }`}>
                      2
                    </div>
                    <span className="text-[10px] font-bold text-charcoal/60 mt-2 tracking-wide uppercase font-sans">Role Selection</span>
                  </div>

                  {/* Step 3 Circle & Label */}
                  <div className="flex flex-col items-center z-10 relative">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-500 ${
                      currentStep >= 3 ? "bg-coral text-white" : "bg-[#E5E5EA] text-charcoal/40"
                    }`}>
                      3
                    </div>
                    <span className="text-[10px] font-bold text-charcoal/60 mt-2 tracking-wide uppercase font-sans">Availability & Skills</span>
                  </div>
                </div>
              </div>
            )}

            {/* Modal Body content */}
            <div className="px-6 md:px-10 py-8 bg-[#FAF9F6] overflow-y-auto max-h-[50vh] min-h-[350px]">
              {volunteerSubmitted ? (
                <div className="text-center py-12 space-y-5 animate-fade-in-up">
                  <div className="bg-coral/10 h-16 w-16 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="h-10 w-10 text-coral" />
                  </div>
                  <h3 className="text-2xl font-bold text-forest">Application Received!</h3>
                  <p className="text-charcoal/75 max-w-md mx-auto leading-relaxed text-sm font-sans">
                    Thank you for stepping forward. A coordinator from SARC&apos;s Tinsukia chapter will reach out to you on
                    WhatsApp or via email within 48 hours to discuss our current active patrols.
                  </p>
                  <button
                    onClick={() => {
                      setVolunteerSubmitted(false);
                      setCurrentStep(1);
                    }}
                    className="mt-6 text-xs uppercase tracking-wider font-bold text-coral hover:text-terracotta transition-colors cursor-pointer flex items-center justify-center gap-1.5 mx-auto"
                  >
                    <span>Submit Another Form</span>
                    <PawPrint className="h-3.5 w-3.5 fill-current" />
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmitVolunteer)} className="space-y-6">
                  
                  {/* STEP 1: Basic Info */}
                  {currentStep === 1 && (
                    <div className="space-y-5 animate-fade-in text-left">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {/* Name */}
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-charcoal/80 pl-1 font-sans">
                            Full Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            placeholder="Jane Doe"
                            className={`w-full px-6 py-3.5 bg-white border rounded-[20px] shadow-[0_2px_10px_rgba(0,0,0,0.01)] focus:outline-none focus:ring-2 focus:ring-coral/20 focus:border-coral text-charcoal text-sm transition-all ${
                              errors.name ? "border-red-500" : "border-charcoal/10"
                            }`}
                            {...register("name", { required: "Name is required" })}
                          />
                          {errors.name && <span className="text-xs text-red-500 pl-1 block">{errors.name.message}</span>}
                        </div>

                        {/* Email */}
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-charcoal/80 pl-1 font-sans">
                            Email Address <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="email"
                            placeholder="jane@example.com"
                            className={`w-full px-6 py-3.5 bg-white border rounded-[20px] shadow-[0_2px_10px_rgba(0,0,0,0.01)] focus:outline-none focus:ring-2 focus:ring-coral/20 focus:border-coral text-charcoal text-sm transition-all ${
                              errors.email ? "border-red-500" : "border-charcoal/10"
                            }`}
                            {...register("email", {
                              required: "Email is required",
                              pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                message: "Please enter a valid email address"
                              }
                            })}
                          />
                          {errors.email && <span className="text-xs text-red-500 pl-1 block">{errors.email.message}</span>}
                        </div>
                      </div>

                      {/* Phone */}
                      <div className="space-y-1.5 max-w-md">
                        <label className="text-xs font-bold text-charcoal/80 pl-1 font-sans">
                          Phone Number <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="(555) 123-4567"
                          className={`w-full px-6 py-3.5 bg-white border rounded-[20px] shadow-[0_2px_10px_rgba(0,0,0,0.01)] focus:outline-none focus:ring-2 focus:ring-coral/20 focus:border-coral text-charcoal text-sm transition-all ${
                            errors.phone ? "border-red-500" : "border-charcoal/10"
                          }`}
                          {...register("phone", {
                            required: "Phone number is required",
                            pattern: {
                              value: /^[+0-9\s-()]{8,18}$/,
                              message: "Please enter a valid phone number"
                            }
                          })}
                        />
                        {errors.phone && <span className="text-xs text-red-500 pl-1 block">{errors.phone.message}</span>}
                      </div>

                      {/* Reason */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-charcoal/80 pl-1 font-sans">
                          Why do you want to join? <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          rows={4}
                          placeholder="Tell us a little about your passion for animal welfare..."
                          className={`w-full px-6 py-4 bg-white border rounded-[24px] shadow-[0_2px_10px_rgba(0,0,0,0.01)] focus:outline-none focus:ring-2 focus:ring-coral/20 focus:border-coral text-charcoal text-sm transition-all resize-none ${
                            errors.reason ? "border-red-500" : "border-charcoal/10"
                          }`}
                          {...register("reason", {
                            required: "Motivation statement is required",
                            minLength: { value: 20, message: "Please provide a little more detail (at least 20 characters)" }
                          })}
                        />
                        {errors.reason && <span className="text-xs text-red-500 pl-1 block">{errors.reason.message}</span>}
                      </div>
                    </div>
                  )}

                  {/* STEP 2: Role Selection & Age */}
                  {currentStep === 2 && (
                    <div className="space-y-5 animate-fade text-left">
                      <div className="space-y-2">
                        <label className="text-xs uppercase font-extrabold text-charcoal tracking-wide pl-1 font-sans">
                          Select Preferred Role / Focus Area <span className="text-red-500">*</span>
                        </label>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {rolesList.map((r) => {
                            const Icon = r.icon;
                            const isSelected = watchRole === r.value;
                            return (
                              <button
                                key={r.value}
                                type="button"
                                onClick={() => setValue("role", r.value)}
                                className={`p-5 rounded-2xl border text-left flex items-start gap-4 transition-all duration-300 cursor-pointer ${
                                  isSelected 
                                    ? "border-coral bg-coral/5 shadow-[0_4px_12px_rgba(224,122,95,0.08)]" 
                                    : "border-charcoal/10 bg-white hover:border-charcoal/20"
                                }`}
                              >
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                                  isSelected ? "bg-coral/10 text-coral" : "bg-[#FAF7F2] text-charcoal/60"
                                }`}>
                                  <Icon className="h-5 w-5" />
                                </div>
                                <div>
                                  <h4 className="font-bold text-forest text-sm">{r.title}</h4>
                                  <p className="text-xs text-charcoal/60 mt-1 leading-snug">{r.desc}</p>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Age */}
                      <div className="space-y-1.5 max-w-xs mt-6">
                        <label className="text-xs font-bold text-charcoal/80 pl-1 font-sans">
                          Your Age <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="number"
                          placeholder="e.g. 21"
                          className={`w-full px-6 py-3 bg-white border rounded-[20px] shadow-[0_2px_10px_rgba(0,0,0,0.01)] focus:outline-none focus:ring-2 focus:ring-coral/20 focus:border-coral text-charcoal text-sm transition-all ${
                            errors.age ? "border-red-500" : "border-charcoal/10"
                          }`}
                          {...register("age", {
                            required: "Age is required",
                            min: { value: 18, message: "Must be 18 or older to patrol" },
                            max: { value: 100, message: "Please enter a valid age" }
                          })}
                        />
                        {errors.age && <span className="text-xs text-red-500 pl-1 block">{errors.age.message}</span>}
                      </div>
                    </div>
                  )}

                  {/* STEP 3: Availability & Skills */}
                  {currentStep === 3 && (
                    <div className="space-y-5 animate-fade text-left">
                      <div className="bg-coral/5 border border-coral/10 p-5 rounded-2xl">
                        <h4 className="font-bold text-forest text-sm mb-1 font-sans">Availability & Skills</h4>
                        <p className="text-xs text-charcoal/60 leading-relaxed font-sans">
                          Let us know more about your capacity (these items are optional and help with squad deployment in Tinsukia).
                        </p>
                      </div>
                      <div className="space-y-3">
                        {availabilityOptions.map((opt) => (
                          <label
                            key={opt.key}
                            className="flex items-start gap-3 p-4 rounded-[20px] border border-charcoal/5 bg-white hover:bg-charcoal/[0.01] transition-all duration-300 cursor-pointer text-left shadow-[0_2px_8px_rgba(0,0,0,0.005)]"
                          >
                            <input
                              type="checkbox"
                              className="mt-0.5 accent-coral h-4.5 w-4.5 rounded border-charcoal/20 text-coral"
                            />
                            <span className="text-sm font-medium text-charcoal/80 leading-tight font-sans">{opt.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                </form>
              )}
            </div>

            {/* Footer Bar */}
            {!volunteerSubmitted && (
              <div className="bg-white border-t border-charcoal/5 px-6 md:px-10 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                
                {/* Left Side: NGO/Security Badges */}
                <div className="flex items-center text-xs font-semibold text-charcoal/50">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="h-4.5 w-4.5 text-green-600" />
                    <span className="font-sans">Your data is secure</span>
                  </div>
                  <div className="h-4 w-[1px] bg-charcoal/20 mx-3" />
                  <div className="flex items-center gap-1.5">
                    <HeartHandshake className="h-4.5 w-4.5 text-coral" />
                    <span className="font-sans">Registered NGO</span>
                  </div>
                </div>

                {/* Right Side: Step actions */}
                <div className="flex items-center gap-4">
                  {currentStep > 1 && (
                    <button
                      type="button"
                      onClick={prevStep}
                      className="text-xs md:text-sm font-bold text-charcoal/60 hover:text-charcoal uppercase tracking-wider transition-colors cursor-pointer font-sans"
                    >
                      Back
                    </button>
                  )}
                  {currentStep === 1 && (
                    <button
                      type="button"
                      onClick={closeApplication}
                      className="text-xs md:text-sm font-bold text-charcoal/60 hover:text-charcoal uppercase tracking-wider transition-colors cursor-pointer font-sans"
                    >
                      Cancel
                    </button>
                  )}
                  
                  {currentStep < 3 ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      className="bg-coral hover:bg-coral-light text-white font-bold px-6 py-3 rounded-full flex items-center gap-2 shadow-md hover:shadow-lg transition-all duration-300 text-xs md:text-sm cursor-pointer font-sans"
                    >
                      <span>Next Step</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleSubmit(onSubmitVolunteer)}
                      disabled={volunteerLoading}
                      className="bg-coral hover:bg-coral-light disabled:bg-coral/50 text-white font-bold px-6 py-3 rounded-full flex items-center gap-2 shadow-md hover:shadow-lg transition-all duration-300 text-xs md:text-sm cursor-pointer font-sans"
                    >
                      {volunteerLoading ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span>Processing...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Application</span>
                          <PawPrint className="h-4 w-4 fill-current" />
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
