"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { fetchApi } from "@/lib/api";
import { DashboardStats } from "@/types";
import {
  Layers,
  CheckCircle2,
  Clock,
  HeartHandshake,
  CreditCard,
  PlusCircle,
  Sparkles,
  ArrowRight,
} from "lucide-react";

export default function VendorDashboardOverview() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const res = await fetchApi<{ success: boolean; stats: DashboardStats }>(
          "/stats/dashboard"
        );
        if (res.success) {
          setStats(res.stats);
        }
      } catch (err) {
        console.error("Error loading vendor stats:", err);
      } finally {
        setLoading(false);
      }
    };
    loadStats();
  }, []);

  const isFreePlan = stats?.subscriptionPlan === "free";
  const activeCount = stats?.activeServices || 0;
  const freeLimitRemaining = Math.max(0, 3 - activeCount);

  return (
    <DashboardLayout
      allowedRole="vendor"
      title="Vendor Atelier Overview"
      subtitle="Monitor your published wedding services, client inquiries, and atelier subscription."
    >
      <div className="space-y-8">
        {/* Subscription Plan Notification Banner */}
        {isFreePlan ? (
          <div className="bg-gradient-to-r from-amber-500/10 via-[#C59B6D]/15 to-transparent border border-[#C59B6D]/40 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-[#8E7356]">
                <Sparkles className="w-5 h-5 text-[#C59B6D]" />
                <span className="text-xs uppercase font-bold tracking-widest">
                  Free Tier Vendor Account
                </span>
              </div>
              <h2 className="font-serif text-2xl font-normal text-[#1C1917]">
                Upgrade to Premium for Unlimited Listings
              </h2>
              <p className="text-xs text-gray-600 font-light max-w-xl">
                You have published{" "}
                <span className="font-semibold text-[#1C1917]">{activeCount} of 3</span> allowed
                services on the Free plan. Upgrade to publish unlimited bridal services, unlock the
                verified Atelier gold badge, and gain prioritized catalog placement.
              </p>
            </div>

            <Link
              href="/dashboard/vendor/subscription"
              className="px-6 py-3 rounded-full bg-[#C59B6D] hover:bg-[#8E7356] text-white text-xs uppercase tracking-widest font-semibold transition-all shadow-md hover:shadow-lg shrink-0"
            >
              Upgrade to Premium
            </Link>
          </div>
        ) : (
          <div className="bg-gradient-to-r from-emerald-500/10 to-transparent border border-emerald-300 rounded-3xl p-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                ★
              </div>
              <div>
                <h3 className="text-sm font-bold text-emerald-900">
                  Premium Atelier Membership Active
                </h3>
                <p className="text-xs text-emerald-700 font-light">
                  Enjoy unlimited service listings, featured catalog placement, and verified client
                  inquiries.
                </p>
              </div>
            </div>
            <span className="text-xs font-semibold px-3 py-1 bg-white text-emerald-800 rounded-full border border-emerald-200">
              Unlimited Access
            </span>
          </div>
        )}

        {/* 5 Statistics Cards (PDF Requirements) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* 1. Total Services */}
          <div className="bg-white rounded-2xl p-6 border border-[#E8E2D9] shadow-sm space-y-2">
            <div className="flex items-center justify-between text-gray-500">
              <span className="text-[11px] uppercase tracking-wider font-semibold">
                Total Services
              </span>
              <Layers className="w-4 h-4 text-[#C59B6D]" />
            </div>
            <div className="font-serif text-3xl font-bold text-[#1C1917]">
              {loading ? "..." : stats?.totalServices || 0}
            </div>
            <p className="text-[11px] text-gray-400">Created by your atelier</p>
          </div>

          {/* 2. Active Services */}
          <div className="bg-white rounded-2xl p-6 border border-[#E8E2D9] shadow-sm space-y-2">
            <div className="flex items-center justify-between text-gray-500">
              <span className="text-[11px] uppercase tracking-wider font-semibold">
                Active Services
              </span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="font-serif text-3xl font-bold text-[#1C1917]">
              {loading ? "..." : stats?.activeServices || 0}
            </div>
            <p className="text-[11px] text-gray-400">
              {isFreePlan ? `${freeLimitRemaining} slots remaining` : "Unlimited tier"}
            </p>
          </div>

          {/* 3. Pending Booking Requests */}
          <div className="bg-white rounded-2xl p-6 border border-[#E8E2D9] shadow-sm space-y-2">
            <div className="flex items-center justify-between text-gray-500">
              <span className="text-[11px] uppercase tracking-wider font-semibold">
                Pending Requests
              </span>
              <Clock className="w-4 h-4 text-amber-600" />
            </div>
            <div className="font-serif text-3xl font-bold text-amber-700">
              {loading ? "..." : stats?.pendingBookings || 0}
            </div>
            <p className="text-[11px] text-gray-400">Awaiting your review</p>
          </div>

          {/* 4. Accepted Bookings */}
          <div className="bg-white rounded-2xl p-6 border border-[#E8E2D9] shadow-sm space-y-2">
            <div className="flex items-center justify-between text-gray-500">
              <span className="text-[11px] uppercase tracking-wider font-semibold">
                Accepted Bookings
              </span>
              <HeartHandshake className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="font-serif text-3xl font-bold text-emerald-700">
              {loading ? "..." : stats?.acceptedBookings || 0}
            </div>
            <p className="text-[11px] text-gray-400">Confirmed ceremonies</p>
          </div>

          {/* 5. Subscription Plan */}
          <div className="bg-white rounded-2xl p-6 border border-[#E8E2D9] shadow-sm space-y-2">
            <div className="flex items-center justify-between text-gray-500">
              <span className="text-[11px] uppercase tracking-wider font-semibold">
                Current Plan
              </span>
              <CreditCard className="w-4 h-4 text-[#C59B6D]" />
            </div>
            <div className="font-serif text-2xl font-bold text-[#1C1917] capitalize">
              {loading ? "..." : stats?.subscriptionPlan || "Free"}
            </div>
            <p className="text-[11px] text-[#C59B6D] font-semibold">
              <Link href="/dashboard/vendor/subscription" className="hover:underline">
                Manage Plan →
              </Link>
            </p>
          </div>
        </div>

        {/* Quick Action Shortcuts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <Link
            href="/dashboard/vendor/add-service"
            className="p-6 bg-white rounded-2xl border border-[#E8E2D9] hover:border-[#C59B6D] shadow-sm hover:shadow-md transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#FAF8F5] text-[#C59B6D] flex items-center justify-center group-hover:bg-[#C59B6D] group-hover:text-white transition-colors">
                <PlusCircle className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-serif text-lg font-medium text-[#1C1917]">
                  Publish New Service
                </h4>
                <p className="text-xs text-gray-500">Add a new photography, venue, or decor listing</p>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-[#C59B6D] group-hover:translate-x-1 transition-all" />
          </Link>

          <Link
            href="/dashboard/vendor/bookings"
            className="p-6 bg-white rounded-2xl border border-[#E8E2D9] hover:border-[#C59B6D] shadow-sm hover:shadow-md transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#FAF8F5] text-[#C59B6D] flex items-center justify-center group-hover:bg-[#C59B6D] group-hover:text-white transition-colors">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-serif text-lg font-medium text-[#1C1917]">
                  Review Booking Inquiries
                </h4>
                <p className="text-xs text-gray-500">Accept or decline pending client wedding dates</p>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-[#C59B6D] group-hover:translate-x-1 transition-all" />
          </Link>

          <Link
            href="/dashboard/vendor/services"
            className="p-6 bg-white rounded-2xl border border-[#E8E2D9] hover:border-[#C59B6D] shadow-sm hover:shadow-md transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#FAF8F5] text-[#C59B6D] flex items-center justify-center group-hover:bg-[#C59B6D] group-hover:text-white transition-colors">
                <Layers className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-serif text-lg font-medium text-[#1C1917]">
                  Manage Catalog
                </h4>
                <p className="text-xs text-gray-500">Edit prices, photos, and toggles</p>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-[#C59B6D] group-hover:translate-x-1 transition-all" />
          </Link>
        </div>
      </div>
    </DashboardLayout>
  );
}
