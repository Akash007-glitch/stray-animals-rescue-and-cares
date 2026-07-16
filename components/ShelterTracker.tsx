"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { CheckCircle2, IndianRupee, Loader2, Sparkles, X } from "lucide-react";

interface Campaign {
  id: string;
  category: string;
  title: string;
  description: string;
  raised: number;
  goal: number;
  initialPercentage: number;
}

const campaigns: Campaign[] = [
  {
    id: "cat",
    category: "Homeless Street Cat",
    title: "Catch The Purr-Fection In Rescues",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
    raised: 135000,
    goal: 150000,
    initialPercentage: 90
  },
  {
    id: "dog",
    category: "Injured Flyover Dog",
    title: "Heal The Paws on Tinsukia Bypass",
    description: "Emergency support for dogs injured in road and flyover accidents on Tinsukia Bypass. Funding orthopedic surgeries and specialized vet care.",
    raised: 45000,
    goal: 60000,
    initialPercentage: 75
  },
  {
    id: "flood",
    category: "Flood Recovery Hub",
    title: "Rescue Strays Displacement Support",
    description: "Emergency rescue shelters and medical camps during the Brahmaputra monsoon floods, providing dry shelter and clean drinking water.",
    raised: 179000,
    goal: 150000,
    initialPercentage: 119
  }
];

export default function ShelterTracker() {
  const [selectedTab, setSelectedTab] = useState<string>("cat");
  const [currentCampaign, setCurrentCampaign] = useState<Campaign>(campaigns[0]);
  
  // Tracking live changes
  const [liveRaised, setLiveRaised] = useState<number>(currentCampaign.raised);
  const [showDonateForm, setShowDonateForm] = useState<boolean>(false);
  const [donationAmount, setDonationAmount] = useState<string>("1000");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const timeoutRef = useRef<NodeJS.Timeout[]>([]);

  // Sync state when tab changes
  useEffect(() => {
    const campaign = campaigns.find(c => c.id === selectedTab) || campaigns[0];
    setCurrentCampaign(campaign);
    setLiveRaised(campaign.raised);
    setShowDonateForm(false);
    setIsSuccess(false);
  }, [selectedTab]);

  // Cleanup timeouts on unmount or tab change
  useEffect(() => {
    return () => {
      timeoutRef.current.forEach(clearTimeout);
      timeoutRef.current = [];
    };
  }, [selectedTab]);

  // Calculations
  const percentage = Math.min(Math.round((liveRaised / currentCampaign.goal) * 100), 100);
  const visualPercentage = Math.round((liveRaised / currentCampaign.goal) * 100);

  const handleDonateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amountNum = parseFloat(donationAmount);
    if (isNaN(amountNum) || amountNum <= 0) return;

    // Capture campaign ID at submit time to prevent stale closure
    const submittedCampaignId = currentCampaign.id;
    setIsSubmitting(true);

    const timer1 = setTimeout(() => {
      if (selectedTab !== submittedCampaignId) return; // Guard against tab switch
      setIsSubmitting(false);
      setIsSuccess(true);
      setLiveRaised(prev => prev + amountNum);

      const timer2 = setTimeout(() => {
        if (selectedTab !== submittedCampaignId) return;
        setIsSuccess(false);
        setShowDonateForm(false);
      }, 3000);
      timeoutRef.current.push(timer2);
    }, 1500);
    timeoutRef.current.push(timer1);
  };

  return (
    <section id="tracker" className="py-16 md:py-24 bg-[#FCF8F5] relative overflow-hidden border-b border-charcoal/5">
      {/* Topographic Lines Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none z-0">
        <svg className="w-full h-full" viewBox="0 0 1440 600" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M50 100 C 350 120, 500 50, 950 150 C 1300 250, 1200 400, 1500 450" stroke="#0B0E37" strokeWidth="1.5" />
          <path d="M50 180 C 350 200, 500 130, 950 230 C 1300 330, 1200 480, 1500 530" stroke="#0B0E37" strokeWidth="1.5" />
          <path d="M50 260 C 350 280, 500 210, 950 310 C 1300 410, 1200 560, 1500 610" stroke="#0B0E37" strokeWidth="1.5" />
          <path d="M50 340 C 350 360, 500 290, 950 390 C 1300 490, 1200 640, 1500 690" stroke="#0B0E37" strokeWidth="1.5" />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {campaigns.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedTab(c.id)}
              className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm transition-all cursor-pointer ${
                selectedTab === c.id
                  ? "bg-navy text-white scale-105"
                  : "bg-white text-charcoal/70 border border-charcoal/10 hover:border-navy/35"
              }`}
            >
              {c.id === "cat" && "🐱 Cat Shelter"}
              {c.id === "dog" && "🐶 Dog Rescue"}
              {c.id === "flood" && "🌊 Flood Rescue"}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Image with overlay Logo pill */}
          <div className="lg:col-span-6 relative">
            {/* Logo overlay pill */}
            <div className="absolute top-6 left-6 z-20 bg-navy text-white px-6 py-3 rounded-full flex items-center gap-6 shadow-lg border border-white/5">
              {/* Logo 1 */}
              <div className="flex items-center gap-1.5 select-none text-white/90">
                <svg className="h-4 w-4 text-coral fill-current" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
                </svg>
                <span className="font-sans font-black text-[10px] uppercase tracking-widest">logoipsum</span>
              </div>
              {/* Divider */}
              <div className="h-4 w-[1px] bg-white/20" />
              {/* Logo 2 */}
              <div className="flex items-center gap-1.5 select-none text-white/90">
                <svg className="h-4 w-4 text-coral fill-current" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
                </svg>
                <span className="font-sans font-black text-[10px] uppercase tracking-widest">logoipsum</span>
              </div>
            </div>

            {/* Main Cat Image */}
            <div className="relative aspect-[4/3] md:aspect-[16/10] lg:aspect-[4/3] w-full overflow-hidden rounded-[2.5rem] shadow-xl border border-charcoal/5">
              <Image
                src="/images/petting_calico_cat.png"
                alt="Person petting a friendly calico cat on a stone ledge"
                fill
                priority
                className="object-cover object-center"
              />
            </div>
          </div>

          {/* Right Column: Title, description, and white live tracker card */}
          <div className="lg:col-span-6 space-y-8 text-left">
            <div className="space-y-4">
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-serif font-black text-navy leading-[1.15] tracking-tight">
                {currentCampaign.title}
              </h2>
              <p className="text-sm md:text-base text-charcoal/70 leading-relaxed max-w-xl">
                {currentCampaign.description}
              </p>
            </div>

            {/* White Tracker Card Container */}
            <div className="bg-white border-2 border-charcoal/5 rounded-[2rem] p-8 shadow-lg relative overflow-hidden transition-all duration-300">
              
              {/* Success Overlay Panel */}
              {isSuccess && (
                <div className="absolute inset-0 bg-white/95 z-20 flex flex-col items-center justify-center space-y-3 animate-fade-in-up">
                  <div className="bg-emerald-50 h-14 w-14 rounded-full flex items-center justify-center border border-emerald-500">
                    <CheckCircle2 className="h-8 w-8 text-emerald-500" />
                  </div>
                  <h4 className="font-serif font-bold text-charcoal text-xl">Thank You for Supporting!</h4>
                  <p className="text-xs text-charcoal/60">Your simulated live donation has been added to the tracker.</p>
                </div>
              )}

              {/* Simulated Donation Form Panel */}
              {showDonateForm && !isSuccess ? (
                <form onSubmit={handleDonateSubmit} className="space-y-6 animate-fade-in-up">
                  <div className="flex items-center justify-between border-b border-charcoal/10 pb-3">
                    <h4 className="font-serif font-bold text-navy text-lg">Quick Donation (INR)</h4>
                    <button
                      type="button"
                      onClick={() => setShowDonateForm(false)}
                      className="text-charcoal/40 hover:text-charcoal cursor-pointer"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] uppercase font-extrabold text-charcoal/60 tracking-wider block">
                      Select Simulated Amount
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {["500", "1000", "2500", "5000"].map((amount) => (
                        <button
                          key={amount}
                          type="button"
                          onClick={() => setDonationAmount(amount)}
                          className={`py-2 text-[10px] font-bold border rounded-lg transition-all cursor-pointer ${
                            donationAmount === amount
                              ? "bg-navy text-white border-navy"
                              : "bg-[#FAF7F2] text-charcoal border-charcoal/15 hover:bg-slate-100"
                          }`}
                        >
                          ₹{amount}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-charcoal/50 font-bold text-sm">₹</span>
                    <input
                      type="number"
                      required
                      placeholder="Other Amount"
                      className="w-full pl-8 pr-4 py-3 border border-charcoal/15 rounded-lg focus:outline-none focus:ring-1 focus:ring-navy focus:border-navy text-charcoal text-sm"
                      value={donationAmount}
                      onChange={(e) => setDonationAmount(e.target.value)}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 bg-navy hover:bg-navy-dark text-white font-bold uppercase tracking-wider text-xs rounded-full shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:bg-navy/60"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" /> Processing Payment...
                      </>
                    ) : (
                      <>
                        Confirm simulated Payment
                      </>
                    )}
                  </button>
                </form>
              ) : (
                /* Main Tracker Screen */
                <div className="space-y-6">
                  {/* Header Subtitle */}
                  <div>
                    <h3 className="text-[#E5837A] font-sans font-black text-sm uppercase tracking-widest flex items-center gap-1.5">
                      <Sparkles className="h-4 w-4" /> {currentCampaign.category}
                    </h3>
                    <p className="text-xs text-charcoal/50 mt-1 leading-relaxed">
                      Active community funding tracker for Tinsukia chapter rescue operations.
                    </p>
                  </div>

                  {/* Progress Bar with Indicator flag */}
                  <div className="pt-6 pb-2">
                    <div className="relative w-full h-2.5 bg-slate-100 rounded-full">
                      {/* Active progress fill */}
                      <div
                        className="h-full bg-navy rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${percentage}%` }}
                      />
                      
                      {/* Flag Indicator */}
                      <div
                        className="absolute bg-navy text-white text-[10px] font-black px-2 py-1 rounded-md transition-all duration-1000 ease-out -top-8 -translate-x-1/2 after:content-[''] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-4 after:border-transparent after:border-t-navy shadow-sm"
                        style={{ left: `${percentage}%` }}
                      >
                        {visualPercentage}%
                      </div>
                    </div>
                  </div>

                  {/* Metrics: Raised & Goal */}
                  <div className="grid grid-cols-2 gap-4 py-2 text-sm border-y border-charcoal/10">
                    <div className="text-left space-y-1">
                      <span className="text-xs text-charcoal/50 font-semibold uppercase tracking-wider block">Raised</span>
                      <span className="text-lg md:text-xl font-sans font-black text-navy flex items-center">
                        <IndianRupee className="h-4 w-4 shrink-0 text-navy" />
                        {liveRaised.toLocaleString()}
                      </span>
                    </div>

                    <div className="text-right space-y-1 border-l border-charcoal/10 pl-4">
                      <span className="text-xs text-charcoal/50 font-semibold uppercase tracking-wider block">Goal</span>
                      <span className="text-lg md:text-xl font-sans font-black text-navy flex items-center justify-end">
                        <IndianRupee className="h-4 w-4 shrink-0 text-navy" />
                        {currentCampaign.goal.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Donate CTA button */}
                  <div>
                    <button
                      onClick={() => setShowDonateForm(true)}
                      className="w-full py-4 bg-navy hover:bg-navy-dark text-white font-bold uppercase tracking-wider text-xs rounded-full shadow-md transition-all cursor-pointer hover:translate-y-[-2px] active:translate-y-0 text-center"
                    >
                      Donate Now
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
