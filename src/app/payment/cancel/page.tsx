"use client";

import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AlertCircle, ArrowLeft, RefreshCw } from "lucide-react";

export default function PaymentCancelPage() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1C1917] flex flex-col justify-between">
      <Navbar />

      <main className="flex-1 flex items-center justify-center py-32 px-6">
        <div className="bg-white rounded-3xl p-10 sm:p-14 border border-[#E8E2D9] shadow-xl max-w-lg w-full text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto">
            <AlertCircle className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="eyebrow-divider text-[10px]">Payment Interrupted</span>
            <h1 className="font-serif text-3xl font-normal text-[#1C1917]">
              Checkout Session Cancelled
            </h1>
            <p className="text-xs text-gray-500 font-light leading-relaxed">
              No charges were made to your account. Your current subscription tier remains active.
              You can upgrade at any time to enjoy unlimited wedding service listings.
            </p>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/dashboard/vendor/subscription"
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#C59B6D] hover:bg-[#8E7356] text-white text-xs uppercase tracking-widest font-semibold transition-all shadow-md flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Retry Upgrade</span>
            </Link>
            <Link
              href="/dashboard/vendor"
              className="w-full sm:w-auto px-6 py-3 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-50 transition-all text-xs uppercase tracking-widest font-semibold"
            >
              Return to Dashboard
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
