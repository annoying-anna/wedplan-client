"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { fetchApi } from "@/lib/api";
import { DashboardStats } from "@/types";
import { formatCurrency } from "@/lib/utils";
import {
  Users,
  Store,
  HeartHandshake,
  Layers,
  Clock,
  CreditCard,
  DollarSign,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
} from "lucide-react";

export default function AdminDashboardOverview() {
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
        console.error("Error loading admin stats:", err);
      } finally {
        setLoading(false);
      }
    };
    loadStats();
  }, []);

  return (
    <DashboardLayout
      allowedRole="admin"
      title="Platform Governance & Control"
      subtitle="Comprehensive overview of registered users, vendor catalog approval, and financial transactions."
    >
      <div className="space-y-8">
        {/* Pending Review Alert Banner */}
        {stats?.pendingServices && stats.pendingServices > 0 ? (
          <div className="bg-amber-50 border border-amber-300 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                <Clock className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="font-serif text-xl font-medium text-amber-900">
                  {stats.pendingServices} Services Awaiting Admin Approval
                </h3>
                <p className="text-xs text-amber-700 font-light">
                  Vendors have submitted new wedding services requiring verification before appearing
                  in the public marketplace.
                </p>
              </div>
            </div>

            <Link
              href="/dashboard/admin/services?status=pending"
              className="px-6 py-2.5 rounded-full bg-[#C59B6D] hover:bg-[#8E7356] text-white text-xs uppercase tracking-widest font-semibold transition-all shadow-md shrink-0"
            >
              Review Pending Services
            </Link>
          </div>
        ) : null}

        {/* 6 Statistics Cards (PDF Requirements) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {/* 1. Total Registered Users */}
          <div className="bg-white rounded-2xl p-6 border border-[#E8E2D9] shadow-sm space-y-2">
            <div className="flex items-center justify-between text-gray-500">
              <span className="text-[11px] uppercase tracking-wider font-semibold">
                Total Users
              </span>
              <Users className="w-4 h-4 text-[#C59B6D]" />
            </div>
            <div className="font-serif text-3xl font-bold text-[#1C1917]">
              {loading ? "..." : stats?.totalUsers || 0}
            </div>
            <p className="text-[11px] text-gray-400">All registered accounts</p>
          </div>

          {/* 2. Total Vendors */}
          <div className="bg-white rounded-2xl p-6 border border-[#E8E2D9] shadow-sm space-y-2">
            <div className="flex items-center justify-between text-gray-500">
              <span className="text-[11px] uppercase tracking-wider font-semibold">
                Vendors / Ateliers
              </span>
              <Store className="w-4 h-4 text-amber-600" />
            </div>
            <div className="font-serif text-3xl font-bold text-[#1C1917]">
              {loading ? "..." : stats?.totalVendors || 0}
            </div>
            <p className="text-[11px] text-gray-400">Service providers</p>
          </div>

          {/* 3. Total Customers */}
          <div className="bg-white rounded-2xl p-6 border border-[#E8E2D9] shadow-sm space-y-2">
            <div className="flex items-center justify-between text-gray-500">
              <span className="text-[11px] uppercase tracking-wider font-semibold">
                Couples & Clients
              </span>
              <HeartHandshake className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="font-serif text-3xl font-bold text-[#1C1917]">
              {loading ? "..." : stats?.totalCustomers || 0}
            </div>
            <p className="text-[11px] text-gray-400">Registered couples</p>
          </div>

          {/* 4. Total Services */}
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
            <p className="text-[11px] text-gray-400">Across 6 categories</p>
          </div>

          {/* 5. Pending Services */}
          <div className="bg-white rounded-2xl p-6 border border-[#E8E2D9] shadow-sm space-y-2">
            <div className="flex items-center justify-between text-gray-500">
              <span className="text-[11px] uppercase tracking-wider font-semibold">
                Pending Services
              </span>
              <Clock className="w-4 h-4 text-amber-600" />
            </div>
            <div className="font-serif text-3xl font-bold text-amber-700">
              {loading ? "..." : stats?.pendingServices || 0}
            </div>
            <p className="text-[11px] text-gray-400">Requires verification</p>
          </div>

          {/* 6. Total Transactions */}
          <div className="bg-white rounded-2xl p-6 border border-[#E8E2D9] shadow-sm space-y-2">
            <div className="flex items-center justify-between text-gray-500">
              <span className="text-[11px] uppercase tracking-wider font-semibold">
                Transactions
              </span>
              <CreditCard className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="font-serif text-3xl font-bold text-emerald-700">
              {loading ? "..." : stats?.totalTransactions || 0}
            </div>
            <p className="text-[11px] text-gray-400">
              Revenue: {formatCurrency(stats?.totalRevenue || 0)}
            </p>
          </div>
        </div>

        {/* Administration Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <Link
            href="/dashboard/admin/users"
            className="p-8 bg-white rounded-3xl border border-[#E8E2D9] hover:border-[#C59B6D] shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#FAF8F5] text-[#C59B6D] flex items-center justify-center group-hover:bg-[#C59B6D] group-hover:text-white transition-colors">
                <Users className="w-6 h-6" />
              </div>
              <h4 className="font-serif text-2xl font-normal text-[#1C1917]">Manage Users</h4>
              <p className="text-xs text-gray-500 font-light leading-relaxed">
                Inspect registered clients and vendors, search by email or name, filter by roles,
                and toggle platform block restrictions.
              </p>
            </div>
            <div className="pt-6 mt-4 border-t border-[#E8E2D9] flex items-center justify-between text-xs font-semibold text-[#C59B6D]">
              <span>Go to Users</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <Link
            href="/dashboard/admin/services"
            className="p-8 bg-white rounded-3xl border border-[#E8E2D9] hover:border-[#C59B6D] shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#FAF8F5] text-[#C59B6D] flex items-center justify-center group-hover:bg-[#C59B6D] group-hover:text-white transition-colors">
                <Layers className="w-6 h-6" />
              </div>
              <h4 className="font-serif text-2xl font-normal text-[#1C1917]">Manage Services</h4>
              <p className="text-xs text-gray-500 font-light leading-relaxed">
                Approve or reject vendor submissions, maintain quality standards, and remove
                inappropriate listings from the marketplace.
              </p>
            </div>
            <div className="pt-6 mt-4 border-t border-[#E8E2D9] flex items-center justify-between text-xs font-semibold text-[#C59B6D]">
              <span>Review Catalog</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <Link
            href="/dashboard/admin/transactions"
            className="p-8 bg-white rounded-3xl border border-[#E8E2D9] hover:border-[#C59B6D] shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#FAF8F5] text-[#C59B6D] flex items-center justify-center group-hover:bg-[#C59B6D] group-hover:text-white transition-colors">
                <CreditCard className="w-6 h-6" />
              </div>
              <h4 className="font-serif text-2xl font-normal text-[#1C1917]">
                Platform Transactions
              </h4>
              <p className="text-xs text-gray-500 font-light leading-relaxed">
                View immutable Stripe subscription transaction records, timestamps, vendor
                identities, and collected platform revenue.
              </p>
            </div>
            <div className="pt-6 mt-4 border-t border-[#E8E2D9] flex items-center justify-between text-xs font-semibold text-[#C59B6D]">
              <span>View Financials</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </div>
    </DashboardLayout>
  );
}
