"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { User, Mail, Phone, Loader2, ArrowRight, CheckCircle2 } from "lucide-react";
import { VolunteerFormData } from "@/types";

export default function Volunteer() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<VolunteerFormData>();
  const [volunteerSubmitted, setVolunteerSubmitted] = useState(false);
  const [volunteerLoading, setVolunteerLoading] = useState(false);

  const onSubmitVolunteer = (data: VolunteerFormData) => {
    setVolunteerLoading(true);
    console.log("Volunteer application submitted:", data);
    setTimeout(() => {
      setVolunteerLoading(false);
      setVolunteerSubmitted(true);
      reset();
    }, 1500);
  };

  return (
    <section id="volunteer" className="py-16 md:py-24 bg-[#FAF7F2] relative border-b border-charcoal/5">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest text-coral font-extrabold block mb-2">
            Join the Movement
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-serif font-bold text-charcoal mb-4">Become a SARC Volunteer</h2>
          <p className="text-charcoal/70 text-sm md:text-base leading-relaxed">
            We need people on the ground. Whether you want to assist in weekly sterilisation camp transport, coordinate
            rescue calls, or temporarily foster recovery cases in your backyard in Tinsukia, we have a place for you.
          </p>
        </div>

        <div className="bg-white border border-charcoal/10 rounded-2xl p-8 md:p-12 shadow-lg">
          {volunteerSubmitted ? (
            <div className="text-center py-12 space-y-5 animate-fade-in-up">
              <div className="bg-coral/10 h-16 w-16 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="h-10 w-10 text-coral" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-charcoal">Application Received!</h3>
              <p className="text-charcoal/75 max-w-md mx-auto leading-relaxed text-sm">
                Thank you for stepping forward. A coordinator from SARC&apos;s Tinsukia chapter will reach out to you on
                WhatsApp or via email within 48 hours to discuss our current active patrols.
              </p>
              <button
                onClick={() => setVolunteerSubmitted(false)}
                className="mt-6 text-xs uppercase tracking-wider font-bold text-coral hover:text-coral-light transition-colors cursor-pointer"
              >
                Submit Another Form
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmitVolunteer)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div className="space-y-1.5">
                  <label className="text-xs uppercase font-extrabold text-charcoal tracking-wide flex items-center gap-1.5">
                    <User className="h-3.5 w-3.5 text-coral" /> Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Priyanuj Borah"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-1 focus:ring-coral focus:border-coral bg-[#FAF7F2]/50 text-charcoal text-sm transition-all ${
                      errors.name ? "border-red-500" : "border-charcoal/15"
                    }`}
                    {...register("name", { required: "Name is required" })}
                  />
                  {errors.name && <span className="text-xs text-red-500">{errors.name.message}</span>}
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label className="text-xs uppercase font-extrabold text-charcoal tracking-wide flex items-center gap-1.5">
                    <Mail className="h-3.5 w-3.5 text-coral" /> Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. priyanuj@gmail.com"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-1 focus:ring-coral focus:border-coral bg-[#FAF7F2]/50 text-charcoal text-sm transition-all ${
                      errors.email ? "border-red-500" : "border-charcoal/15"
                    }`}
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                        message: "Please enter a valid email address"
                      }
                    })}
                  />
                  {errors.email && <span className="text-xs text-red-500">{errors.email.message}</span>}
                </div>

                {/* Phone */}
                <div className="space-y-1.5">
                  <label className="text-xs uppercase font-extrabold text-charcoal tracking-wide flex items-center gap-1.5">
                    <Phone className="h-3.5 w-3.5 text-coral" /> WhatsApp Number{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. +91 98765 43210"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-1 focus:ring-coral focus:border-coral bg-[#FAF7F2]/50 text-charcoal text-sm transition-all ${
                      errors.phone ? "border-red-500" : "border-charcoal/15"
                    }`}
                    {...register("phone", {
                      required: "Phone number is required",
                      pattern: {
                        value: /^[+0-9\s-]{10,15}$/,
                        message: "Please enter a valid phone number"
                      }
                    })}
                  />
                  {errors.phone && <span className="text-xs text-red-500">{errors.phone.message}</span>}
                </div>

                {/* Age */}
                <div className="space-y-1.5">
                  <label className="text-xs uppercase font-extrabold text-charcoal tracking-wide">
                    Age <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. 21"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-1 focus:ring-coral focus:border-coral bg-[#FAF7F2]/50 text-charcoal text-sm transition-all ${
                      errors.age ? "border-red-500" : "border-charcoal/15"
                    }`}
                    {...register("age", {
                      required: "Age is required",
                      min: { value: 18, message: "Must be 18 or older to patrol" },
                      max: { value: 100, message: "Please enter a valid age" }
                    })}
                  />
                  {errors.age && <span className="text-xs text-red-500">{errors.age.message}</span>}
                </div>
              </div>

              {/* Role */}
              <div className="space-y-1.5">
                <label className="text-xs uppercase font-extrabold text-charcoal tracking-wide block">
                  Preferred Role / Focus Area <span className="text-red-500">*</span>
                </label>
                <select
                  className="w-full px-4 py-3 border border-charcoal/15 rounded-lg focus:outline-none focus:ring-1 focus:ring-coral focus:border-coral bg-[#FAF7F2]/50 text-charcoal text-sm cursor-pointer transition-all"
                  {...register("role", { required: "Please select a role" })}
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
                  Why do you want to volunteer? Tell us briefly about your experience with street animals.{" "}
                  <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={4}
                  placeholder="Describe your motivation..."
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-1 focus:ring-coral focus:border-coral bg-[#FAF7F2]/50 text-charcoal text-sm transition-all ${
                    errors.reason ? "border-red-500" : "border-charcoal/15"
                  }`}
                  {...register("reason", {
                    required: "Motivation statement is required",
                    minLength: { value: 20, message: "Please provide a little more detail (at least 20 characters)" }
                  })}
                />
                {errors.reason && <span className="text-xs text-red-500">{errors.reason.message}</span>}
              </div>

              <div className="pt-2 text-right">
                <button
                  type="submit"
                  disabled={volunteerLoading}
                  className="px-8 py-3.5 bg-coral hover:bg-coral-light disabled:bg-coral/50 text-white font-bold uppercase tracking-wider text-xs rounded-lg shadow-md flex items-center justify-center gap-2 ml-auto cursor-pointer transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5 shadow-coral/20 hover:shadow-coral/40"
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
  );
}
