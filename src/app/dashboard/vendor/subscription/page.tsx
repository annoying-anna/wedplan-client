"use client";

import React, { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { useAuth } from "@/context/AuthContext";
import { fetchApi } from "@/lib/api";
import { formatDate } from "@/lib/utils";
import { toast } from "sonner";
import {
  Sparkles,
  Check,
  CreditCard,
  ShieldCheck,
  ArrowRight,
  Zap,
} from "lucide-react";

export default function VendorSubscriptionPage() {
  const { user, refreshUser } = useAuth();
  const [loading, setLoading] = useState(false);

  const isPremium = user?.subscriptionPlan === "premium";

  const handleUpgrade = async () => {
    setLoading(true);
    try {
      const res = await fetchApi<{
        success: boolean;
        sessionId?: string;
        url?: string;
        isMock?: boolean;
      }>("/payments/create-checkout-session", {
        method: "POST",
      });

      if (res.success && res.url) {
        toast.info("Redirecting to secure Stripe Checkout...");
        window.location.href = res.url;
      } else {
        toast.error("Failed to generate checkout session.");
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to initialize Stripe payment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout
      allowedRole="vendor"
      title="Atelier Subscription"
      subtitle="Manage your platform tier, publish unlimited wedding services, and display verified badges."
    >
      <div className="space-y-10 max-w-5xl">
        {/* Current Plan Status Box */}
        <div className="bg-white rounded-3xl p-8 border border-[#E8E2D9] shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <span className="text-[11px] uppercase tracking-wider text-gray-400 font-semibold">
              Current Membership Level
            </span>
            <div className="flex items-center gap-3">
              <h2 className="font-serif text-3xl font-medium text-[#1C1917] capitalize">
                {user?.subscriptionPlan || "Free"} Atelier Tier
              </h2>
              {isPremium && (
                <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-800 border border-amber-200 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-600" />
                  Premium Verified
                </span>
              )}
            </div>
            {isPremium && user?.subscriptionExpiresAt && (
              <p className="text-xs text-gray-500 font-light">
                Renewal Date: {formatDate(user.subscriptionExpiresAt)}
              </p>
            )}
          </div>

          {!isPremium ? (
            <button
              onClick={handleUpgrade}
              disabled={loading}
              className="px-8 py-3.5 rounded-full bg-[#C59B6D] hover:bg-[#8E7356] text-white text-xs uppercase tracking-widest font-semibold transition-all shadow-md hover:shadow-lg flex items-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Zap className="w-4 h-4 fill-white" />
                  <span>Upgrade to Premium ($49)</span>
                </>
              )}
            </button>
          ) : (
            <div className="px-4 py-2 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-2xl text-xs font-semibold flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" />
              <span>Full Atelier Benefits Active</span>
            </div>
          )}
        </div>

        {/* Plans Comparison Grid (PDF Requirements) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Free Plan */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#E8E2D9] shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs uppercase tracking-widest font-bold text-gray-400">
                  Starter Tier
                </span>
                {!isPremium && (
                  <span className="text-[10px] uppercase font-bold tracking-wider px-3 py-1 bg-gray-100 text-gray-700 rounded-full">
                    Current Plan
                  </span>
                )}
              </div>

              <h3 className="font-serif text-3xl text-[#1C1917] mb-2">Free Plan</h3>
              <div className="text-3xl font-serif font-bold text-[#1C1917] mb-6">$ 0.00 USD</div>
              <p className="text-xs text-gray-500 font-light pb-6 border-b border-[#E8E2D9]">
                Essential features to list up to 3 services and receive customer inquiries.
              </p>

              <ul className="space-y-4 my-6 text-xs text-gray-600">
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-[#C59B6D]" />
                  <span>Maximum 3 Active Services</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-[#C59B6D]" />
                  <span>Basic Vendor Dashboard</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-[#C59B6D]" />
                  <span>Booking Request Management</span>
                </li>
              </ul>
            </div>

            <button
              disabled
              className="w-full py-3.5 rounded-full border border-gray-300 text-gray-400 text-xs uppercase tracking-widest font-semibold cursor-not-allowed text-center"
            >
              {!isPremium ? "Active Plan" : "Downgrade Unavailable"}
            </button>
          </div>

          {/* Premium Plan (Highlighted) */}
          <div className="bg-[#525D4F] text-white rounded-3xl p-8 sm:p-10 border border-[#525D4F] shadow-2xl flex flex-col justify-between relative">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#C59B6D] text-white text-[10px] uppercase font-bold tracking-widest px-5 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 fill-white" />
              <span>Recommended for Top Ateliers</span>
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs uppercase tracking-widest font-bold text-white/70">
                  Unlimited Master Tier
                </span>
                {isPremium && (
                  <span className="text-[10px] uppercase font-bold tracking-wider px-3 py-1 bg-white text-[#525D4F] rounded-full">
                    Active Plan
                  </span>
                )}
              </div>

              <h3 className="font-serif text-3xl text-white mb-2">Premium Plan</h3>
              <div className="text-3xl font-serif font-bold text-white mb-6">$ 49.00 USD</div>
              <p className="text-xs text-white/80 font-light pb-6 border-b border-white/20">
                Unlimited service listings, featured catalog ranking, and official gold badge.
              </p>

              <ul className="space-y-4 my-6 text-xs text-white/90">
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-[#DFBF99]" />
                  <span className="font-semibold text-[#DFBF99]">Unlimited Active Services</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-[#DFBF99]" />
                  <span>Premium Vendor Gold Badge</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-[#DFBF99]" />
                  <span>All Free Plan Features</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-[#DFBF99]" />
                  <span>Featured Visibility on Homepage & Catalog</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-[#DFBF99]" />
                  <span>Priority Client Inquiries & Notifications</span>
                </li>
              </ul>
            </div>

            {isPremium ? (
              <div className="w-full py-3.5 rounded-full bg-white/20 text-white text-xs uppercase tracking-widest font-semibold text-center backdrop-blur-sm">
                Current Active Subscription
              </div>
            ) : (
              <button
                onClick={handleUpgrade}
                disabled={loading}
                className="w-full py-4 rounded-full bg-white text-[#525D4F] hover:bg-[#C59B6D] hover:text-white transition-all text-xs uppercase tracking-widest font-semibold shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-[#525D4F] border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Upgrade to Premium ($49)</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
