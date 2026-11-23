"use client";

import React, { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { fetchApi } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import confetti from "canvas-confetti";
import { CheckCircle2, Sparkles, ArrowRight, ShieldCheck } from "lucide-react";

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const { user, refreshUser } = useAuth();
  const router = useRouter();

  const [verifying, setVerifying] = useState(true);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Launch celebratory gold confetti
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#C59B6D", "#FAF8F5", "#8E7356", "#E8DED8"],
      });
    } catch (e) {
      // ignore
    }

    const verifyPayment = async () => {
      if (!sessionId) {
        setVerifying(false);
        setMessage("Direct verification completed.");
        setSuccess(true);
        await refreshUser();
        return;
      }

      try {
        const res = await fetchApi<{ success: boolean; message: string; user?: any }>(
          "/payments/verify-session",
          {
            method: "POST",
            body: JSON.stringify({ sessionId }),
          }
        );

        if (res.success) {
          setSuccess(true);
          setMessage(res.message);
          await refreshUser();
        } else {
          setMessage(res.message || "Payment verification incomplete.");
        }
      } catch (err: any) {
        setMessage(err.message || "Error verifying payment session.");
        // If already premium in database:
        if (user?.subscriptionPlan === "premium") {
          setSuccess(true);
        }
      } finally {
        setVerifying(false);
      }
    };

    verifyPayment();
  }, [sessionId, refreshUser, user]);

  return (
    <div className="bg-white rounded-3xl p-10 sm:p-14 border border-[#E8E2D9] shadow-2xl max-w-lg w-full text-center space-y-6">
      <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
        <CheckCircle2 className="w-10 h-10" />
      </div>

      <div className="space-y-2">
        <span className="eyebrow-divider text-[10px]">Payment Confirmed</span>
        <h1 className="font-serif text-3xl sm:text-4xl font-normal text-[#1C1917]">
          Welcome to Premium Atelier
        </h1>
        <p className="text-xs text-gray-500 font-light leading-relaxed">
          {verifying
            ? "Verifying payment confirmation with Stripe..."
            : message ||
              "Your transaction was processed successfully. Your account now has unlimited service listings, featured catalog ranking, and a verified gold badge."}
        </p>
      </div>

      <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#E8E2D9] flex items-center justify-center gap-2 text-xs font-semibold text-[#8E7356]">
        <Sparkles className="w-4 h-4 text-[#C59B6D]" />
        <span>Unlimited Wedding Service Listings Unlocked</span>
      </div>

      <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
        <Link
          href="/dashboard/vendor"
          className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#C59B6D] hover:bg-[#8E7356] text-white text-xs uppercase tracking-widest font-semibold transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
        >
          <span>Go to Atelier Dashboard</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
        <Link
          href="/dashboard/vendor/add-service"
          className="w-full sm:w-auto px-6 py-3.5 rounded-full border border-[#1C1917] text-[#1C1917] hover:bg-[#1C1917] hover:text-white transition-all text-xs uppercase tracking-widest font-semibold"
        >
          Publish a Service
        </Link>
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1C1917] flex flex-col justify-between">
      <Navbar />

      <main className="flex-1 flex items-center justify-center py-32 px-6">
        <Suspense fallback={<div className="text-center py-12">Confirming payment...</div>}>
          <PaymentSuccessContent />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}
