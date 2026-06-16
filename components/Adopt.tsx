"use client";

import React from "react";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { Animal } from "@/types";

interface AdoptProps {
  animals: Animal[];
  speciesFilter: string;
  setSpeciesFilter: (val: string) => void;
  ageFilter: string;
  setAgeFilter: (val: string) => void;
  locationFilter: string;
  setLocationFilter: (val: string) => void;
  setSelectedAnimal: (animal: Animal) => void;
}

export default function Adopt({
  animals,
  speciesFilter,
  setSpeciesFilter,
  ageFilter,
  setAgeFilter,
  locationFilter,
  setLocationFilter,
  setSelectedAnimal
}: AdoptProps) {
  // Local filtering logic based on passed state props
  const filteredAnimals = animals.filter((animal) => {
    const matchesSpecies = speciesFilter === "all" || animal.species === speciesFilter;
    const matchesAge = ageFilter === "all" || animal.age === ageFilter;
    const matchesLocation = locationFilter === "all" || animal.location === locationFilter;
    return matchesSpecies && matchesAge && matchesLocation;
  });

  return (
    <section id="adopt" className="py-24 bg-white border-y border-terracotta/10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest text-terracotta font-extrabold block mb-2">
            Find Your Companion
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-charcoal mb-4">Animals Waiting for You</h2>
          <p className="text-charcoal/70">
            Every animal we rescue is nurtured back to physical and emotional health in our local foster homes. Check
            our current list, filter by your preferences, and meet your next family member.
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
                  className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                    speciesFilter === "all" ? "bg-terracotta text-cream" : "text-charcoal/80 hover:text-charcoal"
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setSpeciesFilter("dog")}
                  className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                    speciesFilter === "dog" ? "bg-terracotta text-cream" : "text-charcoal/80 hover:text-charcoal"
                  }`}
                >
                  Dogs
                </button>
                <button
                  onClick={() => setSpeciesFilter("cat")}
                  className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                    speciesFilter === "cat" ? "bg-terracotta text-cream" : "text-charcoal/80 hover:text-charcoal"
                  }`}
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
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                    ageFilter === "all" ? "bg-terracotta text-cream" : "text-charcoal/80 hover:text-charcoal"
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setAgeFilter("puppy-kitten")}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                    ageFilter === "puppy-kitten" ? "bg-terracotta text-cream" : "text-charcoal/80 hover:text-charcoal"
                  }`}
                >
                  Baby
                </button>
                <button
                  onClick={() => setAgeFilter("young")}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                    ageFilter === "young" ? "bg-terracotta text-cream" : "text-charcoal/80 hover:text-charcoal"
                  }`}
                >
                  Young
                </button>
                <button
                  onClick={() => setAgeFilter("adult")}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                    ageFilter === "adult" ? "bg-terracotta text-cream" : "text-charcoal/80 hover:text-charcoal"
                  }`}
                >
                  Adult
                </button>
              </div>
            </div>

            {/* Location Filter */}
            <div className="space-y-1.5">
              <label className="text-xs uppercase font-bold text-charcoal/60 tracking-wider block">
                District / Town
              </label>
              <div className="flex bg-white rounded-lg p-1 border border-charcoal/15">
                <button
                  onClick={() => setLocationFilter("all")}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                    locationFilter === "all" ? "bg-terracotta text-cream" : "text-charcoal/80 hover:text-charcoal"
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setLocationFilter("Guwahati")}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                    locationFilter === "Guwahati" ? "bg-terracotta text-cream" : "text-charcoal/80 hover:text-charcoal"
                  }`}
                >
                  Guwahati
                </button>
                <button
                  onClick={() => setLocationFilter("Dibrugarh")}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                    locationFilter === "Dibrugarh" ? "bg-terracotta text-cream" : "text-charcoal/80 hover:text-charcoal"
                  }`}
                >
                  Dibrugarh
                </button>
                <button
                  onClick={() => setLocationFilter("Jorhat")}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                    locationFilter === "Jorhat" ? "bg-terracotta text-cream" : "text-charcoal/80 hover:text-charcoal"
                  }`}
                >
                  Jorhat
                </button>
              </div>
            </div>
          </div>

          {/* Total Results */}
          <div className="text-right">
            <span className="text-xs font-bold text-charcoal/50 uppercase block">Available for Fostering/Adoption</span>
            <span className="text-lg font-serif font-bold text-terracotta">
              {filteredAnimals.length} Match{filteredAnimals.length !== 1 ? "es" : ""} Found
            </span>
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

                    <p className="text-xs text-charcoal/75 line-clamp-3 leading-relaxed pt-2">{animal.story}</p>
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
            <span className="text-sm font-medium text-charcoal/60 block">
              No matching animal rescues at this moment.
            </span>
            <button
              onClick={() => {
                setSpeciesFilter("all");
                setAgeFilter("all");
                setLocationFilter("all");
              }}
              className="mt-4 text-xs uppercase tracking-wider font-bold text-terracotta hover:underline cursor-pointer"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
