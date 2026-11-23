"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1C1917] flex flex-col justify-between">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-6 pt-36 pb-24 w-full">
        <span className="eyebrow-divider mb-3">Legal & Confidentiality</span>
        <h1 className="font-serif text-4xl sm:text-5xl font-normal text-[#1C1917] mt-2 mb-8">
          Privacy Policy
        </h1>

        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#E8E2D9] shadow-sm space-y-6 text-sm text-gray-600 font-light leading-relaxed">
          <p>
            At <strong>WedPlan Atelier</strong>, we honor the intimacy and sanctity of wedding
            planning. This Privacy Policy outlines how your personal data, ceremony schedules, and
            billing details are safeguarded.
          </p>

          <h3 className="font-serif text-xl font-medium text-[#1C1917] pt-4">
            1. Data Collection & Usage
          </h3>
          <p>
            We collect information provided directly by you when registering as a couple or wedding
            vendor, including names, contact numbers, event dates, venue locations, and billing
            addresses.
          </p>

          <h3 className="font-serif text-xl font-medium text-[#1C1917] pt-4">
            2. Payment Security & Stripe
          </h3>
          <p>
            Payment transactions for Vendor Premium Subscriptions are processed via Stripe test/live
            infrastructure. WedPlan never stores raw credit card numbers or sensitive CVV codes on
            our servers.
          </p>

          <h3 className="font-serif text-xl font-medium text-[#1C1917] pt-4">
            3. Vendor Inquiries & Communications
          </h3>
          <p>
            When a customer submits a booking inquiry, ceremony details are transmitted directly to
            the selected vendor atelier to facilitate contract quotes and date reservations.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
