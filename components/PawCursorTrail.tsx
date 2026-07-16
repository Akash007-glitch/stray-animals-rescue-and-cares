"use client";

import React, { useEffect, useState } from "react";

interface PawPoint {
  id: number;
  x: number;
  y: number;
  angle: number;
  side: "left" | "right";
}

export default function PawCursorTrail() {
  const [paws, setPaws] = useState<PawPoint[]>([]);
  const [lastPos, setLastPos] = useState({ x: 0, y: 0 });
  const [leftSide, setLeftSide] = useState(true);

  useEffect(() => {
    // Only enable trail on devices with mouse/pointer capabilities
    const isTouchDevice = () => {
      if (typeof window === "undefined") return true;
      return (
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        (navigator as any).msMaxTouchPoints > 0
      );
    };

    if (isTouchDevice()) return;

    let idCounter = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const scrollX = window.scrollX;
      const scrollY = window.scrollY;
      
      const pageX = e.pageX;
      const pageY = e.pageY;

      // Distance from last paw
      const dx = pageX - lastPos.x;
      const dy = pageY - lastPos.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Only drop a paw if we moved enough (e.g. 50px) to simulate steps
      if (distance > 50) {
        // Calculate angle of movement
        const angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90; // +90 because default paw faces up
        
        // Alternate sides to simulate walking
        const side = leftSide ? "left" : "right";
        setLeftSide(!leftSide);

        // Apply a small offset perpendicular to the direction of movement
        const perpAngle = (angle - 90) * (Math.PI / 180);
        const offsetDist = 8; // Offset distance from center line
        const offsetX = Math.cos(perpAngle + Math.PI / 2) * offsetDist * (side === "left" ? -1 : 1);
        const offsetY = Math.sin(perpAngle + Math.PI / 2) * offsetDist * (side === "left" ? -1 : 1);

        const newPaw: PawPoint = {
          id: idCounter++,
          x: pageX + offsetX,
          y: pageY + offsetY,
          angle,
          side,
        };

        setPaws((prev) => [...prev.slice(-15), newPaw]); // limit trail length to 15 paws
        setLastPos({ x: pageX, y: pageY });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [lastPos, leftSide]);

  // Clean up old paws periodically
  useEffect(() => {
    const timer = setInterval(() => {
      setPaws((prev) => prev.slice(1));
    }, 150);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 z-50 overflow-hidden select-none">
      {paws.map((paw) => (
        <div
          key={paw.id}
          className="absolute pointer-events-none text-coral/25"
          style={{
            left: paw.x,
            top: paw.y,
            transform: `translate(-50%, -50%) rotate(${paw.angle}deg) scale(${paw.side === "left" ? 0.75 : 0.8})`,
            animation: "fadeAway 1.2s forwards ease-out",
          }}
        >
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <circle cx="8" cy="6" r="2" />
            <circle cx="12" cy="4.5" r="2" />
            <circle cx="16" cy="6" r="2" />
            <circle cx="7" cy="11" r="1.8" />
            <circle cx="17" cy="11" r="1.8" />
            <path d="M12 9.5c-2.2 0-3.5 1.5-3.5 3.5 0 2 1.2 3 3.5 3s3.5-1 3.5-3c0-2-1.3-3.5-3.5-3.5z" />
          </svg>
        </div>
      ))}
      <style jsx global>{`
        @keyframes fadeAway {
          0% {
            opacity: 0.8;
            transform: scale(0.9);
          }
          100% {
            opacity: 0;
            transform: scale(0.5);
          }
        }
      `}</style>
    </div>
  );
}
