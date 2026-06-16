"use client";

import React from "react";
import Image from "next/image";
import { X, MapPin, Calendar } from "lucide-react";
import { Animal } from "@/types";

interface AnimalModalProps {
  selectedAnimal: Animal;
  setSelectedAnimal: (animal: Animal | null) => void;
  scrollSmoothTo: (id: string) => void;
}

export default function AnimalModal({ selectedAnimal, setSelectedAnimal, scrollSmoothTo }: AnimalModalProps) {
  return (
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
          <Image src={selectedAnimal.image} alt={selectedAnimal.name} fill className="object-cover object-center" />
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
                <span>
                  <strong>Location:</strong> {selectedAnimal.locationTag}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-terracotta" />
                <span>
                  <strong>Age Group:</strong> {selectedAnimal.ageText} ({selectedAnimal.age})
                </span>
              </div>
            </div>

            <div className="border-t border-charcoal/10 pt-4">
              <h4 className="text-xs uppercase font-extrabold text-charcoal/50 mb-1">Rescue Story</h4>
              <p className="text-xs text-charcoal/80 leading-relaxed italic">&ldquo;{selectedAnimal.story}&rdquo;</p>
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
  );
}
