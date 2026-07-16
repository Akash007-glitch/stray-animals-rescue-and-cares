"use client";

import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Lock, X, Loader2, CheckCircle2, IndianRupee, PawPrint } from "lucide-react";
import { DonateFormData } from "@/types";

export default function Donate() {
  // Encapsulated states
  const [donateModalOpen, setDonateModalOpen] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState<string>("50");
  const [customAmountVal, setCustomAmountVal] = useState<string>("");
  const [paymentStep, setPaymentStep] = useState<"details" | "processing" | "success">("details");
  const [transactionId, setTransactionId] = useState("");
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<DonateFormData>();

  // Cleanup timeout when modal closes or component unmounts
  useEffect(() => {
    if (!donateModalOpen && timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
      setPaymentStep("details"); // Reset state
    }
  }, [donateModalOpen]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const onSubmitDonate = (data: DonateFormData) => {
    setPaymentStep("processing");
    const finalAmount = selectedAmount === "custom" ? customAmountVal : selectedAmount;
    console.log("Donation details submitted:", data, "Amount:", finalAmount);
    timeoutRef.current = setTimeout(() => {
      setTransactionId(`pay_SARC${Math.random().toString(36).slice(2, 11).toUpperCase()}`);
      setPaymentStep("success");
      reset();
      timeoutRef.current = null;
    }, 2000);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit(onSubmitDonate)(e);
  };

  const handleDonateClick = () => {
    const finalAmount = selectedAmount === "custom" ? customAmountVal : selectedAmount;
    if (!finalAmount || isNaN(Number(finalAmount)) || Number(finalAmount) <= 0) {
      alert("Please enter or select a valid donation amount.");
      return;
    }
    setPaymentStep("details");
    setDonateModalOpen(true);
  };

  return (
    <>
      {/* Donation Section */}
      <section id="donate" className="py-16 md:py-24 bg-[#FAF7F2]/50 border-b border-charcoal/5 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          {/* Header Area */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-charcoal mb-4">Support Our Mission</h2>
            <p className="text-charcoal/75 text-base md:text-lg max-w-2xl mx-auto">
              Your generous contribution directly translates to meals, medical care, and safe shelters for animals in urgent need. Be the hero they are waiting for.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
            {/* Left Column: Donation Card */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-8 shadow-sm border border-charcoal/5 flex flex-col justify-between gap-8">
              <div>
                <h3 className="text-xl font-serif font-bold text-charcoal mb-2">Make a Donation</h3>
                <p className="text-sm text-charcoal/65">Choose an amount to give today.</p>
              </div>

              {/* Amounts Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {["25", "50", "100", "250"].map((amount) => {
                  const isSelected = selectedAmount === amount;
                  return (
                    <button
                      key={amount}
                      type="button"
                      onClick={() => {
                        setSelectedAmount(amount);
                        setCustomAmountVal("");
                      }}
                      className={`py-3 px-4 rounded-xl border-2 font-bold text-sm transition-all cursor-pointer text-center ${isSelected
                          ? "border-coral bg-coral/5 text-coral font-bold"
                          : "border-charcoal/10 text-charcoal hover:border-coral hover:text-coral"
                        }`}
                    >
                      ₹{amount}
                    </button>
                  );
                })}
              </div>

              {/* Custom Amount Input */}
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/40 font-semibold text-lg flex items-center">
                  <IndianRupee className="w-5 h-5 text-charcoal/40" />
                </span>
                <input
                  type="number"
                  placeholder="Custom Amount"
                  className="w-full py-4 pl-12 pr-4 rounded-xl border border-charcoal/15 bg-[#FAF7F2]/30 focus:outline-none focus:ring-2 focus:ring-coral focus:border-coral text-charcoal font-bold placeholder:text-charcoal/40 transition-shadow"
                  value={customAmountVal}
                  onChange={(e) => {
                    setSelectedAmount("custom");
                    setCustomAmountVal(e.target.value);
                  }}
                  onFocus={() => {
                    setSelectedAmount("custom");
                  }}
                />
              </div>

              {/* CTA & Security */}
              <div className="flex flex-col gap-4">
                <button
                  type="button"
                  onClick={handleDonateClick}
                  className="w-full py-4 bg-coral hover:bg-coral-light text-white font-bold text-base rounded-full shadow-md shadow-coral/20 hover:shadow-lg hover:shadow-coral/40 cursor-pointer flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5"
                >
                  <span>Donate Now</span>
                  {/* <Heart className="w-4 h-4 fill-current text-white/90" /> */}
                  <PawPrint className="w-4.5 h-4.5 fill-current" />
                </button>
                <div className="flex items-center justify-center gap-2 text-charcoal/50 text-xs font-medium">
                  <Lock className="h-4 w-4 text-emerald-600" />
                  <span>Secure 256-bit SSL Encryption</span>
                </div>
              </div>
            </div>

            {/* Right Column: Progress & Recent Contributions */}
            <div className="lg:col-span-5 flex flex-col gap-8">
              {/* Fundraising Progress Card */}
              <div className="bg-white rounded-3xl p-8 border border-charcoal/5 shadow-sm">
                <h3 className="text-xs font-bold tracking-wider text-charcoal/50 uppercase mb-6">Fundraising Progress</h3>
                <div className="flex justify-between items-end mb-4">
                  <div>
                    <span className="text-3xl font-extrabold text-terracotta block leading-none">₹39,000</span>
                    <span className="text-xs text-charcoal/50 font-medium">Raised so far</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xl font-bold text-charcoal block leading-none">₹50,000</span>
                    <span className="text-xs text-charcoal/50 font-medium">Goal</span>
                  </div>
                </div>
                <div className="w-full bg-charcoal/5 rounded-full h-3 mb-2 overflow-hidden">
                  <div className="bg-[#8B3A2A] h-full rounded-full transition-all duration-1000" style={{ width: "78%" }}></div>
                </div>
                <p className="text-right text-xs font-bold text-terracotta">78% Funded</p>
              </div>

              {/* Recent Contributions Card */}
              <div className="bg-white rounded-3xl p-8 border border-charcoal/5 shadow-sm flex-1 flex flex-col">
                <h3 className="text-xs font-bold tracking-wider text-charcoal/50 uppercase mb-6">Recent Contributions</h3>
                <div className="flex flex-col gap-4 overflow-y-auto pr-2 max-h-[220px]">
                  {/* Contributor 1 */}
                  <div className="flex items-center justify-between py-2 border-b border-charcoal/5 last:border-0">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-coral/10 flex items-center justify-center text-coral font-bold text-sm">
                        S
                      </div>
                      <div>
                        <p className="text-sm font-bold text-charcoal">Sarah Jenkins</p>
                        <p className="text-xs text-charcoal/50 font-medium">2 mins ago</p>
                      </div>
                    </div>
                    <span className="text-sm font-bold text-coral">₹100</span>
                  </div>

                  {/* Contributor 2 */}
                  <div className="flex items-center justify-between py-2 border-b border-charcoal/5 last:border-0">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-sage-bg text-forest font-bold text-sm flex items-center justify-center">
                        M
                      </div>
                      <div>
                        <p className="text-sm font-bold text-charcoal">Michael T.</p>
                        <p className="text-xs text-charcoal/50 font-medium">15 mins ago</p>
                      </div>
                    </div>
                    <span className="text-sm font-bold text-coral">₹50</span>
                  </div>

                  {/* Contributor 3 */}
                  <div className="flex items-center justify-between py-2 border-b border-charcoal/5 last:border-0">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-charcoal/5 text-charcoal/70 font-bold text-sm flex items-center justify-center">
                        A
                      </div>
                      <div>
                        <p className="text-sm font-bold text-charcoal">Anonymous</p>
                        <p className="text-xs text-charcoal/50 font-medium">1 hour ago</p>
                      </div>
                    </div>
                    <span className="text-sm font-bold text-coral">₹250</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECURE MODAL MOCK */}
      {donateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/70 backdrop-blur-xs animate-fade-in-up">
          <div className="bg-white border border-charcoal/10 rounded-xl max-w-md w-full overflow-hidden shadow-2xl relative">
            {/* Header: SARC Cohesive Navy & Coral styling */}
            <div className="bg-navy text-white px-6 py-5 flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold tracking-widest text-coral">
                  Secure Checkout
                </span>
                <h3 className="text-base font-bold tracking-tight">Street Animal Rescue Collective</h3>
              </div>
              <button
                type="button"
                onClick={() => setDonateModalOpen(false)}
                className="text-white/70 hover:text-white p-1 hover:bg-white/10 rounded-full cursor-pointer transition-colors"
                aria-label="Close Payment"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Steps Rendering */}
            {paymentStep === "details" && (
              <form onSubmit={handleFormSubmit} className="p-6 space-y-5">
                {/* Selected Amount / Custom Amount Input */}
                <div className="bg-coral/10 border border-coral/20 rounded-lg p-4 flex items-center justify-between">
                  <span className="text-xs font-bold text-coral uppercase tracking-wide">Donation Amount</span>

                  {selectedAmount === "custom" ? (
                    <div className="flex items-center gap-1.5">
                      <span className="text-lg font-bold text-navy">₹</span>
                      <input
                        type="number"
                        placeholder="Amount"
                        required
                        className="w-24 px-2 py-1 text-sm font-bold border border-coral/30 rounded-md focus:outline-none focus:border-coral text-navy bg-white"
                        value={customAmountVal}
                        onChange={(e) => setCustomAmountVal(e.target.value)}
                      />
                    </div>
                  ) : (
                    <span className="text-xl font-extrabold text-navy">
                      ₹{Number(selectedAmount).toLocaleString()}
                    </span>
                  )}
                </div>

                <div className="space-y-4">
                  {/* Name */}
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-extrabold text-charcoal/70 tracking-wider block">
                      Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="Your Name"
                      className={`w-full px-3 py-2 border rounded-md text-xs focus:outline-none focus:border-coral focus:ring-1 focus:ring-coral bg-[#FAF7F2]/30 text-charcoal transition-all ${errors.name ? "border-red-500" : "border-charcoal/15"
                        }`}
                      {...register("name", { required: "Name is required" })}
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-extrabold text-charcoal/70 tracking-wider block">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="your.email@domain.com"
                      className={`w-full px-3 py-2 border rounded-md text-xs focus:outline-none focus:border-coral focus:ring-1 focus:ring-coral bg-[#FAF7F2]/30 text-charcoal transition-all ${errors.email ? "border-red-500" : "border-charcoal/15"
                        }`}
                      {...register("email", {
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
                    <label className="text-[10px] uppercase font-extrabold text-charcoal/70 tracking-wider block">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      placeholder="10-digit number"
                      className={`w-full px-3 py-2 border rounded-md text-xs focus:outline-none focus:border-coral focus:ring-1 focus:ring-coral bg-[#FAF7F2]/30 text-charcoal transition-all ${errors.phone ? "border-red-500" : "border-charcoal/15"
                        }`}
                      {...register("phone", {
                        required: "Phone is required",
                        pattern: { value: /^[0-9]{10}$/, message: "Must be 10 digits" }
                      })}
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 bg-coral hover:bg-coral-light text-white font-bold text-xs uppercase tracking-widest rounded-md flex items-center justify-center gap-1.5 cursor-pointer shadow-md transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg"
                  >
                    <span>Pay Securely</span>
                    <PawPrint className="w-4 h-4 fill-current" />
                  </button>
                </div>

                <div className="text-center text-[9px] text-charcoal/40 font-semibold">
                  By clicking, you agree to our terms. SARC is a registered non-profit network.
                </div>
              </form>
            )}

            {paymentStep === "processing" && (
              <div className="p-12 text-center space-y-6 flex flex-col items-center justify-center animate-fade-in-up">
                <Loader2 className="h-12 w-12 animate-spin text-coral" />
                <div className="space-y-1.5">
                  <h4 className="font-bold text-charcoal text-lg">Authorizing Payment...</h4>
                  <p className="text-xs text-charcoal/55 max-w-xs leading-relaxed">
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
                  <h4 className="font-bold text-charcoal text-xl">Payment Successful!</h4>
                  <p className="text-xs text-charcoal/60 max-w-xs leading-relaxed">
                    Thank you. Your contribution has been credited to our rescue fund. A tax-exempt receipt has been
                    sent to your email.
                  </p>
                </div>

                <div className="bg-[#FAF7F2] border border-charcoal/10 rounded-md p-4 w-full text-left space-y-2 text-xs text-charcoal/80">
                  <div>
                    <strong>Transaction ID:</strong>{" "}
                    <code className="text-coral font-mono text-[11px] font-bold">{transactionId}</code>
                  </div>
                  <div>
                    <strong>Recipient:</strong> <span>Street Animal Rescue Collective (Assam)</span>
                  </div>
                  <div>
                    <strong>Amount:</strong>{" "}
                    <span className="font-bold text-navy font-sans">
                      ₹
                      {selectedAmount === "custom"
                        ? Number(customAmountVal).toLocaleString()
                        : Number(selectedAmount).toLocaleString()}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setDonateModalOpen(false)}
                  className="w-full py-3 bg-coral hover:bg-coral-light text-white font-bold text-xs uppercase tracking-widest rounded-md cursor-pointer transition-colors shadow-sm hover:shadow-md flex items-center justify-center gap-1.5"
                >
                  <span>Close Receipt</span>
                  <PawPrint className="w-3.5 h-3.5 fill-current" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}


