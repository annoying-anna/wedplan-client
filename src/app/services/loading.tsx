import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ServicesLoading() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1C1917] flex flex-col justify-between">
      <Navbar />

      <main className="flex-1 pt-32 pb-24 max-w-7xl mx-auto px-6 sm:px-8 w-full">
        <div className="text-center max-w-3xl mx-auto mb-12 animate-pulse space-y-3">
          <div className="h-4 bg-gray-200 rounded w-1/4 mx-auto" />
          <div className="h-10 bg-gray-200 rounded w-2/3 mx-auto" />
          <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="bg-white rounded-3xl p-4 border border-[#E8E2D9] animate-pulse space-y-4"
            >
              <div className="h-56 bg-[#F4EFEA] rounded-2xl" />
              <div className="h-4 bg-gray-200 rounded w-1/3" />
              <div className="h-6 bg-gray-200 rounded w-3/4" />
              <div className="h-4 bg-gray-200 rounded w-full" />
              <div className="h-8 bg-gray-200 rounded w-1/2 mt-4" />
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
