"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1C1917] flex flex-col justify-between">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-6 pt-36 pb-24 w-full">
        <span className="eyebrow-divider mb-3">Terms of Engagement</span>
        <h1 className="font-serif text-4xl sm:text-5xl font-normal text-[#1C1917] mt-2 mb-8">
          Terms & Conditions
        </h1>

        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#E8E2D9] shadow-sm space-y-6 text-sm text-gray-600 font-light leading-relaxed">
          <p>
            Welcome to <strong>WedPlan Atelier</strong>. By accessing our platform, couples, event
            planners, and vendors agree to abide by these Terms of Service.
          </p>

          <h3 className="font-serif text-xl font-medium text-[#1C1917] pt-4">
            1. Vendor Submissions & Content Accuracy
          </h3>
          <p>
            Vendors warrant that all published photography, venue specifications, pricing tiers,
            and service descriptions represent authentic, professional work. Inappropriate or
            misleading listings are subject to immediate admin removal.
          </p>

          <h3 className="font-serif text-xl font-medium text-[#1C1917] pt-4">
            2. Free Tier Limitation & Premium Subscriptions
          </h3>
          <p>
            Free tier vendors may maintain up to 3 active services simultaneously. Premium atelier
            subscribers unlock unlimited service listings and premium marketplace badges.
          </p>

          <h3 className="font-serif text-xl font-medium text-[#1C1917] pt-4">
            3. Booking Inquiries & Cancellations
          </h3>
          <p>
            Couples may cancel pending booking requests at any time prior to vendor acceptance.
            Confirmed ceremony bookings are subject to individual vendor atelier terms.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
