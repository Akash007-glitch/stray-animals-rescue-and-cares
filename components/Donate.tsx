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
                We operate with complete financial transparency. SARC does not receive government funding. Every vial
                of vaccine, surgical suture, and bowl of meal is funded directly by citizens like you.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-amber/15 p-2 rounded-lg text-terracotta font-bold text-sm shrink-0">₹500</div>
                  <div>
                    <h4 className="font-bold text-sm text-charcoal">Feeds a Recuperating Stray</h4>
                    <p className="text-xs text-charcoal/60">
                      Provides nutritious food, calcium supplements, and fresh water to one foster dog for two weeks.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-amber/15 p-2 rounded-lg text-terracotta font-bold text-sm shrink-0">₹1,000</div>
                  <div>
                    <h4 className="font-bold text-sm text-charcoal">Core Vaccinations Package</h4>
                    <p className="text-xs text-charcoal/60">
                      Covers DHPPi + Rabies vaccinations and deworming treatments for one stray puppy.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-amber/15 p-2 rounded-lg text-terracotta font-bold text-sm shrink-0">₹2,500</div>
                  <div>
                    <h4 className="font-bold text-sm text-charcoal">Sterilisation & Post-Op Boarding</h4>
                    <p className="text-xs text-charcoal/60">
                      Funds one complete Animal Birth Control (ABC) keyhole surgery, antibiotics, and 5 days of shelter
                      recovery.
                    </p>
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
                  <span className="relative bg-[#FAF7F2] px-3 text-xs font-bold text-charcoal/40 uppercase">
                    Or Choose Custom
                  </span>
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
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#93c5fd]">
                  Razorpay Secure Checkout
                </span>
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
              <form onSubmit={handleSubmit(onSubmitDonate)} className="p-6 space-y-5">
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
                    <span className="text-xl font-extrabold text-[#172554]">
                      ₹{Number(selectedAmount).toLocaleString()}
                    </span>
                  )}
                </div>

                <div className="space-y-4">
                  {/* Name */}
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-extrabold text-slate-500 tracking-wider block">
                      Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="Your Name"
                      className={`w-full px-3 py-2 border rounded-md text-xs focus:outline-none focus:border-[#172554] text-charcoal ${
                        errors.name ? "border-red-500" : "border-slate-200"
                      }`}
                      {...register("name", { required: "Name is required" })}
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-extrabold text-slate-500 tracking-wider block">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="your.email@domain.com"
                      className={`w-full px-3 py-2 border rounded-md text-xs focus:outline-none focus:border-[#172554] text-charcoal ${
                        errors.email ? "border-red-500" : "border-slate-200"
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
                    <label className="text-[10px] uppercase font-extrabold text-slate-500 tracking-wider block">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      placeholder="10-digit number"
                      className={`w-full px-3 py-2 border rounded-md text-xs focus:outline-none focus:border-[#172554] text-charcoal ${
                        errors.phone ? "border-red-500" : "border-slate-200"
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
                    Thank you. Your contribution has been credited to our rescue fund. A tax-exempt receipt has been
                    sent to your email.
                  </p>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-md p-3.5 w-full text-left space-y-1.5 text-xs text-slate-600">
                  <div>
                    <strong>Transaction ID:</strong>{" "}
                    <code className="text-[#1e40af] font-mono text-[11px]">{transactionId}</code>
                  </div>
                  <div>
                    <strong>Recipient:</strong> <span>Street Animal Rescue Collective (Assam)</span>
                  </div>
                  <div>
                    <strong>Amount:</strong>{" "}
                    <span>
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
                  className="w-full py-3 bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs uppercase tracking-widest rounded-md cursor-pointer"
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
