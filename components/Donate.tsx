"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Lock, X, Loader2, CheckCircle2 } from "lucide-react";
import { DonateFormData } from "@/types";

export default function Donate() {
  // Encapsulated states
  const [donateModalOpen, setDonateModalOpen] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState<string>("1000");
  const [customAmountVal, setCustomAmountVal] = useState<string>("");
  const [paymentStep, setPaymentStep] = useState<"details" | "processing" | "success">("details");
  const [transactionId, setTransactionId] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<DonateFormData>();

  const onSubmitDonate = (data: DonateFormData) => {
    setPaymentStep("processing");
    const finalAmount = selectedAmount === "custom" ? customAmountVal : selectedAmount;
    console.log("Donation details submitted:", data, "Amount:", finalAmount);
    setTimeout(() => {
      setTransactionId(`pay_SARC${Math.random().toString(36).substr(2, 9).toUpperCase()}`);
      setPaymentStep("success");
      reset();
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

  return (
    <>
      {/* DONATE (Razorpay UI mock) */}
      <section id="donate" className="py-24 bg-white border-b border-charcoal/5">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            {/* Left side: Context */}
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs uppercase tracking-widest text-coral font-extrabold block mb-2">
                Support Our Missions
              </span>
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-charcoal leading-tight">
                Fuel a Rescue Operation
              </h2>
              <p className="text-charcoal/75 text-base leading-relaxed">
                We operate with complete financial transparency. SARC does not receive government funding. Every vial
                of vaccine, surgical suture, and bowl of meal is funded directly by citizens like you.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-coral/10 p-2.5 rounded-lg text-coral font-extrabold text-sm shrink-0 flex items-center justify-center min-w-[70px]">
                    ₹500
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-charcoal">Feeds a Recuperating Stray</h4>
                    <p className="text-xs text-charcoal/60 leading-relaxed">
                      Provides nutritious food, calcium supplements, and fresh water to one foster dog for two weeks.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-coral/10 p-2.5 rounded-lg text-coral font-extrabold text-sm shrink-0 flex items-center justify-center min-w-[70px]">
                    ₹1,000
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-charcoal">Core Vaccinations Package</h4>
                    <p className="text-xs text-charcoal/60 leading-relaxed">
                      Covers DHPPi + Rabies vaccinations and deworming treatments for one stray puppy.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-coral/10 p-2.5 rounded-lg text-coral font-extrabold text-sm shrink-0 flex items-center justify-center min-w-[70px]">
                    ₹2,500
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-charcoal">Sterilisation & Post-Op Boarding</h4>
                    <p className="text-xs text-charcoal/60 leading-relaxed">
                      Funds one complete Animal Birth Control (ABC) keyhole surgery, antibiotics, and 5 days of shelter
                      recovery.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side: Donate Box */}
            <div className="lg:col-span-6">
              <div className="bg-[#FAF7F2]/45 border border-charcoal/10 rounded-2xl p-8 shadow-lg space-y-6">
                <h3 className="text-xl font-serif font-bold text-charcoal text-center">Select Contribution Amount</h3>

                <div className="grid grid-cols-3 gap-3">
                  <button
                    onClick={() => handleOpenDonateModal("500")}
                    className="py-4 border border-charcoal/15 bg-white text-charcoal font-bold rounded-lg hover:border-coral hover:bg-coral/5 transition-all text-sm cursor-pointer hover:shadow-sm"
                  >
                    ₹500
                  </button>
                  <button
                    onClick={() => handleOpenDonateModal("1000")}
                    className="py-4 border border-charcoal/15 bg-white text-charcoal font-bold rounded-lg hover:border-coral hover:bg-coral/5 transition-all text-sm cursor-pointer hover:shadow-sm"
                  >
                    ₹1,000
                  </button>
                  <button
                    onClick={() => handleOpenDonateModal("2500")}
                    className="py-4 border border-charcoal/15 bg-white text-charcoal font-bold rounded-lg hover:border-coral hover:bg-coral/5 transition-all text-sm cursor-pointer hover:shadow-sm"
                  >
                    ₹2,500
                  </button>
                </div>

                <div className="relative flex items-center justify-center">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-charcoal/10"></div>
                  </div>
                  <span className="relative bg-[#FAF7F2] px-3 text-xs font-bold text-charcoal/40 uppercase">
                    Or Choose Custom
                  </span>
                </div>

                <button
                  onClick={() => handleOpenDonateModal("custom")}
                  className="w-full py-3.5 bg-navy hover:bg-navy-dark text-white font-bold uppercase tracking-wider text-xs rounded-lg transition-all duration-300 transform hover:-translate-y-0.5 shadow-md hover:shadow-lg cursor-pointer text-center block"
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
          <div className="bg-white border border-charcoal/10 rounded-xl max-w-md w-full overflow-hidden shadow-2xl relative">
            {/* Header: Razorpay Theme (SARC Cohesive Navy & Coral styling) */}
            <div className="bg-navy text-white px-6 py-5 flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold tracking-widest text-coral">
                  Razorpay Secure Checkout
                </span>
                <h3 className="text-base font-bold tracking-tight">Street Animal Rescue Collective</h3>
              </div>
              <button
                onClick={() => setDonateModalOpen(false)}
                className="text-white/70 hover:text-white p-1 hover:bg-white/10 rounded-full cursor-pointer transition-colors"
                aria-label="Close Payment"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Steps Rendering */}
            {paymentStep === "details" && (
              <form onSubmit={handleSubmit(onSubmitDonate)} className="p-6 space-y-5">
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
                      className={`w-full px-3 py-2 border rounded-md text-xs focus:outline-none focus:border-coral focus:ring-1 focus:ring-coral bg-[#FAF7F2]/30 text-charcoal transition-all ${
                        errors.name ? "border-red-500" : "border-charcoal/15"
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
                      className={`w-full px-3 py-2 border rounded-md text-xs focus:outline-none focus:border-coral focus:ring-1 focus:ring-coral bg-[#FAF7F2]/30 text-charcoal transition-all ${
                        errors.email ? "border-red-500" : "border-charcoal/15"
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
                      className={`w-full px-3 py-2 border rounded-md text-xs focus:outline-none focus:border-coral focus:ring-1 focus:ring-coral bg-[#FAF7F2]/30 text-charcoal transition-all ${
                        errors.phone ? "border-red-500" : "border-charcoal/15"
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
                    Pay Securely with Razorpay
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
                    <span className="font-bold text-navy">
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
                  className="w-full py-3 bg-navy hover:bg-navy-dark text-white font-bold text-xs uppercase tracking-widest rounded-md cursor-pointer transition-colors shadow-sm"
                >
                  Close Receipt
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
