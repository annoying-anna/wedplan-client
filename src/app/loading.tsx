import React from "react";

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="relative">
          <div className="w-16 h-16 rounded-full border-4 border-[#E8E2D9] border-t-[#C59B6D] animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center font-serif text-sm font-bold text-[#C59B6D]">
            W
          </div>
        </div>
        <p className="font-serif text-lg text-[#1C1917] tracking-wider">WedPlan Atelier</p>
        <p className="text-xs uppercase tracking-[0.25em] text-gray-400 font-semibold -mt-2">
          Loading Luxury Wedding Experience...
        </p>
      </div>
    </div>
  );
}
