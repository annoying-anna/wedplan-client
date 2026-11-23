"use client";

import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowLeft, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1C1917] flex flex-col justify-between">
      <Navbar />

      <main className="flex-1 flex items-center justify-center py-32 px-6">
        <div className="text-center max-w-md mx-auto space-y-6">
          <span className="eyebrow-divider text-[10px]">Error 404</span>
          <h1 className="font-serif text-6xl font-normal text-[#1C1917]">Page Not Found</h1>
          <p className="text-xs text-gray-500 font-light leading-relaxed">
            The wedding page, atelier service, or ceremony resource you are looking for has been
            moved or does not exist.
          </p>

          <div className="pt-4 flex items-center justify-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#C59B6D] hover:bg-[#8E7356] text-white text-xs uppercase tracking-widest font-semibold transition-all shadow-md"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Return Home</span>
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#1C1917] text-[#1C1917] hover:bg-[#1C1917] hover:text-white transition-all text-xs uppercase tracking-widest font-semibold"
            >
              <Compass className="w-4 h-4" />
              <span>Browse Services</span>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
