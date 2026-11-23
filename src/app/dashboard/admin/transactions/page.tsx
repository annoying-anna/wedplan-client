"use client";

import React, { useEffect, useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Transaction } from "@/types";
import { fetchApi } from "@/lib/api";
import { formatCurrency, formatDate } from "@/lib/utils";
import { toast } from "sonner";
import {
  CreditCard,
  CheckCircle2,
  Clock,
  DollarSign,
  ShieldCheck,
  Lock,
} from "lucide-react";

export default function AdminTransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTransactions = async () => {
      setLoading(true);
      try {
        const res = await fetchApi<{ success: boolean; transactions: Transaction[] }>(
          "/payments/transactions"
        );
        if (res.success) {
          setTransactions(res.transactions || []);
        }
      } catch (err: any) {
        toast.error(err.message || "Failed to load platform transactions.");
      } finally {
        setLoading(false);
      }
    };
    loadTransactions();
  }, []);

  const totalVolume = transactions.reduce((acc, curr) => acc + (curr.amount || 0), 0);

  return (
    <DashboardLayout
      allowedRole="admin"
      title="Platform Transactions & Revenue"
      subtitle="Immutable financial records from Stripe checkout subscriptions and vendor upgrades."
    >
      <div className="space-y-6">
        {/* Financial Overview Card */}
        <div className="bg-white rounded-3xl p-8 border border-[#E8E2D9] shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <span className="text-[11px] uppercase tracking-wider text-gray-400 font-semibold">
              Total Stripe Processed Volume
            </span>
            <div className="font-serif text-4xl font-bold text-[#1C1917]">
              {formatCurrency(totalVolume)}
            </div>
            <p className="text-xs text-gray-500 font-light">
              Across {transactions.length} verified atelier subscriptions
            </p>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-800 rounded-2xl border border-emerald-200 text-xs font-semibold">
            <Lock className="w-4 h-4 text-emerald-600" />
            <span>Immutable Ledger (Read-Only)</span>
          </div>
        </div>

        {/* Transactions Table (PDF Requirement) */}
        {loading ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-[#E8E2D9]">
            <div className="w-8 h-8 border-4 border-[#C59B6D] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-xs text-gray-400 uppercase tracking-widest">
              Loading Transaction Ledger...
            </p>
          </div>
        ) : transactions.length > 0 ? (
          <div className="bg-white rounded-3xl border border-[#E8E2D9] overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#E8E2D9] bg-[#FAF8F5] text-[11px] uppercase tracking-wider text-gray-500 font-semibold">
                    <th className="py-4 px-6">Vendor Atelier</th>
                    <th className="py-4 px-6">Subscription Plan</th>
                    <th className="py-4 px-6">Payment Amount</th>
                    <th className="py-4 px-6">Payment Status</th>
                    <th className="py-4 px-6">Stripe Reference</th>
                    <th className="py-4 px-6 text-right">Transaction Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8E2D9]/60 text-xs">
                  {transactions.map((tx) => (
                    <tr key={tx._id} className="hover:bg-[#FAF8F5]/60 transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <img
                            src={
                              tx.vendorId?.image ||
                              "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
                            }
                            alt={tx.vendorId?.name || "Vendor"}
                            className="w-9 h-9 rounded-full object-cover border border-[#E8E2D9]"
                          />
                          <div>
                            <p className="font-semibold text-sm text-[#1C1917]">
                              {tx.vendorId?.businessName || tx.vendorId?.name || "Vendor"}
                            </p>
                            <p className="text-gray-400 text-[11px]">{tx.vendorId?.email}</p>
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-6">
                        <span className="capitalize font-semibold text-[#8E7356] bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200 text-[10px] tracking-wider">
                          ★ {tx.plan}
                        </span>
                      </td>

                      <td className="py-4 px-6 font-serif font-bold text-sm text-[#1C1917]">
                        {formatCurrency(tx.amount)} {tx.currency}
                      </td>

                      <td className="py-4 px-6">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          {tx.status}
                        </span>
                      </td>

                      <td className="py-4 px-6 font-mono text-[11px] text-gray-500">
                        {tx.stripeSessionId ? tx.stripeSessionId.slice(0, 18) + "..." : "Direct"}
                      </td>

                      <td className="py-4 px-6 text-right text-gray-500 font-light">
                        {formatDate(tx.createdAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-16 text-center border border-[#E8E2D9] max-w-lg mx-auto">
            <CreditCard className="w-12 h-12 text-[#C59B6D] mx-auto mb-4" />
            <h3 className="font-serif text-2xl text-[#1C1917] mb-2">No Transactions Recorded</h3>
            <p className="text-xs text-gray-500 font-light">
              No vendors have upgraded their subscriptions via Stripe yet.
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
