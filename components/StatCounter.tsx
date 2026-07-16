"use client";

import React, { useState, useEffect, useRef } from "react";

interface StatCounterProps {
  target: number;
  label: string;
  suffix?: string;
}

export default function StatCounter({ target, label, suffix = "" }: StatCounterProps) {
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
    <div
      ref={elementRef}
      className="flex flex-col items-center justify-center p-6 bg-white border border-beige-dark/65 rounded-2xl shadow-sm transition-all duration-300 hover:border-sage hover:shadow-md"
    >
      <span className="text-4xl md:text-5xl font-serif font-bold text-forest mb-2">
        {count.toLocaleString()}{suffix}
      </span>
      <span className="text-sm md:text-base text-charcoal font-medium text-center">{label}</span>
    </div>
  );
}
