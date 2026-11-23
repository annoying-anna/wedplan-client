"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { fetchApi } from "@/lib/api";
import { DashboardStats } from "@/types";
import {
  CalendarCheck,
  Clock,
  CheckCircle2,
  XCircle,
  Sparkles,
  ArrowRight,
  Compass,
} from "lucide-react";

export default function CustomerDashboardOverview() {
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
        console.error("Error loading customer stats:", err);
      } finally {
        setLoading(false);
      }
    };
    loadStats();
  }, []);

  return (
    <DashboardLayout
      allowedRole="customer"
      title="Wedding Planning Concierge"
      subtitle="Track your wedding booking requests, ceremony timelines, and atelier communications."
    >
      <div className="space-y-8">
        {/* Welcome Card */}
        <div className="bg-gradient-to-r from-[#C59B6D]/20 via-[#FAF8F5] to-white rounded-3xl p-8 border border-[#E8E2D9] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="eyebrow-divider text-[10px]">Your Special Day</span>
            <h2 className="font-serif text-3xl font-normal text-[#1C1917]">
              Orchestrate Your Dream Wedding
            </h2>
            <p className="text-xs text-gray-600 font-light max-w-xl">
              Manage your confirmed wedding venues, photographers, florists, and stylists in one
              curated dashboard.
            </p>
          </div>

          <Link
            href="/services"
            className="px-6 py-3 rounded-full bg-[#C59B6D] hover:bg-[#8E7356] text-white text-xs uppercase tracking-widest font-semibold transition-all shadow-md shrink-0 flex items-center gap-2"
          >
            <Compass className="w-4 h-4" />
            <span>Discover More Services</span>
          </Link>
        </div>

        {/* 4 Statistics Cards (PDF Requirements) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* 1. Total Booking Requests */}
          <div className="bg-white rounded-2xl p-6 border border-[#E8E2D9] shadow-sm space-y-2">
            <div className="flex items-center justify-between text-gray-500">
              <span className="text-[11px] uppercase tracking-wider font-semibold">
                Total Requests
              </span>
              <CalendarCheck className="w-4 h-4 text-[#C59B6D]" />
            </div>
            <div className="font-serif text-3xl font-bold text-[#1C1917]">
              {loading ? "..." : stats?.totalBookings || 0}
            </div>
            <p className="text-[11px] text-gray-400">Total wedding inquiries</p>
          </div>

          {/* 2. Pending Bookings */}
          <div className="bg-white rounded-2xl p-6 border border-[#E8E2D9] shadow-sm space-y-2">
            <div className="flex items-center justify-between text-gray-500">
              <span className="text-[11px] uppercase tracking-wider font-semibold">
                Pending Bookings
              </span>
              <Clock className="w-4 h-4 text-amber-600" />
            </div>
            <div className="font-serif text-3xl font-bold text-amber-700">
              {loading ? "..." : stats?.pendingBookings || 0}
            </div>
            <p className="text-[11px] text-gray-400">Awaiting vendor confirmation</p>
          </div>

          {/* 3. Accepted Bookings */}
          <div className="bg-white rounded-2xl p-6 border border-[#E8E2D9] shadow-sm space-y-2">
            <div className="flex items-center justify-between text-gray-500">
              <span className="text-[11px] uppercase tracking-wider font-semibold">
                Accepted Bookings
              </span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="font-serif text-3xl font-bold text-emerald-700">
              {loading ? "..." : stats?.acceptedBookings || 0}
            </div>
            <p className="text-[11px] text-gray-400">Confirmed ceremony artisans</p>
          </div>

          {/* 4. Rejected Bookings */}
          <div className="bg-white rounded-2xl p-6 border border-[#E8E2D9] shadow-sm space-y-2">
            <div className="flex items-center justify-between text-gray-500">
              <span className="text-[11px] uppercase tracking-wider font-semibold">
                Declined Bookings
              </span>
              <XCircle className="w-4 h-4 text-red-600" />
            </div>
            <div className="font-serif text-3xl font-bold text-red-700">
              {loading ? "..." : stats?.rejectedBookings || 0}
            </div>
            <p className="text-[11px] text-gray-400">Unavailable wedding dates</p>
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          <Link
            href="/dashboard/customer/bookings"
            className="p-6 bg-white rounded-2xl border border-[#E8E2D9] hover:border-[#C59B6D] shadow-sm hover:shadow-md transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#FAF8F5] text-[#C59B6D] flex items-center justify-center group-hover:bg-[#C59B6D] group-hover:text-white transition-colors">
                <CalendarCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-serif text-lg font-medium text-[#1C1917]">
                  View My Wedding Inquiries
                </h4>
                <p className="text-xs text-gray-500">Check status or cancel pending inquiries</p>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-[#C59B6D] group-hover:translate-x-1 transition-all" />
          </Link>

          <Link
            href="/services"
            className="p-6 bg-white rounded-2xl border border-[#E8E2D9] hover:border-[#C59B6D] shadow-sm hover:shadow-md transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#FAF8F5] text-[#C59B6D] flex items-center justify-center group-hover:bg-[#C59B6D] group-hover:text-white transition-colors">
                <Compass className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-serif text-lg font-medium text-[#1C1917]">
                  Browse Wedding Directory
                </h4>
                <p className="text-xs text-gray-500">Venues, photographers, caterers, couture & decor</p>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-[#C59B6D] group-hover:translate-x-1 transition-all" />
          </Link>
        </div>
      </div>
    </DashboardLayout>
  );
}
