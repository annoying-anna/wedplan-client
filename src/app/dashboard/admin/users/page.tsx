"use client";

import React, { useEffect, useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { User } from "@/types";
import { fetchApi } from "@/lib/api";
import { formatDate } from "@/lib/utils";
import { toast } from "sonner";
import {
  Users,
  Search,
  Filter,
  ShieldAlert,
  ShieldCheck,
  Building2,
  Mail,
  Lock,
  Unlock,
  Sparkles,
} from "lucide-react";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.append("search", search);
      if (roleFilter && roleFilter !== "all") params.append("role", roleFilter);

      const res = await fetchApi<{ success: boolean; users: User[] }>(
        `/admin/users?${params.toString()}`
      );
      if (res.success) {
        setUsers(res.users || []);
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to load registered users.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      loadUsers();
    }, 250);
    return () => clearTimeout(timer);
  }, [search, roleFilter]);

  const handleToggleBlock = async (user: User) => {
    const actionText = user.isBlocked ? "unblock" : "block";
    if (!confirm(`Are you sure you want to ${actionText} ${user.name}?`)) {
      return;
    }

    setUpdatingId(user._id);
    try {
      const res = await fetchApi<{ success: boolean; message: string; isBlocked: boolean }>(
        `/admin/users/${user._id}/block`,
        { method: "PATCH" }
      );

      if (res.success) {
        toast.success(res.message);
        setUsers((prev) =>
          prev.map((u) => (u._id === user._id ? { ...u, isBlocked: res.isBlocked } : u))
        );
      }
    } catch (err: any) {
      toast.error(err.message || `Failed to ${actionText} user.`);
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <DashboardLayout
      allowedRole="admin"
      title="User Governance"
      subtitle="Inspect registered user credentials, filter by account type, and manage security block actions."
    >
      <div className="space-y-6">
        {/* Search & Filter Bar */}
        <div className="bg-white rounded-3xl p-6 border border-[#E8E2D9] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-[#C59B6D] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name, email, or atelier..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-[#FAF8F5] rounded-full border border-[#E8E2D9] text-xs font-medium text-[#1C1917] focus:outline-none focus:border-[#C59B6D]"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-xs uppercase tracking-wider text-gray-400 font-semibold mr-1">
              Role:
            </span>
            {["all", "vendor", "customer", "admin"].map((r) => (
              <button
                key={r}
                onClick={() => setRoleFilter(r)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold capitalize transition-all ${
                  roleFilter === r
                    ? "bg-[#C59B6D] text-white shadow-sm"
                    : "bg-[#FAF8F5] text-gray-600 hover:bg-[#E8E2D9] border border-[#E8E2D9]"
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* Users Table */}
        {loading ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-[#E8E2D9]">
            <div className="w-8 h-8 border-4 border-[#C59B6D] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-xs text-gray-400 uppercase tracking-widest">
              Loading Users Registry...
            </p>
          </div>
        ) : users.length > 0 ? (
          <div className="bg-white rounded-3xl border border-[#E8E2D9] overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#E8E2D9] bg-[#FAF8F5] text-[11px] uppercase tracking-wider text-gray-500 font-semibold">
                    <th className="py-4 px-6">User Identity</th>
                    <th className="py-4 px-6">Role</th>
                    <th className="py-4 px-6">Tier / Atelier</th>
                    <th className="py-4 px-6">Registered</th>
                    <th className="py-4 px-6">Security Status</th>
                    <th className="py-4 px-6 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8E2D9]/60 text-xs">
                  {users.map((u) => {
                    const isProcessing = updatingId === u._id;
                    const isSelfAdmin = u.role === "admin";

                    return (
                      <tr key={u._id} className="hover:bg-[#FAF8F5]/60 transition-colors">
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <img
                              src={
                                u.image ||
                                "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
                              }
                              alt={u.name}
                              className="w-10 h-10 rounded-full object-cover border border-[#E8E2D9]"
                            />
                            <div>
                              <p className="font-semibold text-sm text-[#1C1917]">{u.name}</p>
                              <p className="text-gray-400 text-[11px]">{u.email}</p>
                            </div>
                          </div>
                        </td>

                        <td className="py-4 px-6">
                          <span
                            className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                              u.role === "admin"
                                ? "bg-purple-100 text-purple-700 border border-purple-200"
                                : u.role === "vendor"
                                ? "bg-amber-100 text-amber-800 border border-amber-200"
                                : "bg-emerald-100 text-emerald-800 border border-emerald-200"
                            }`}
                          >
                            {u.role}
                          </span>
                        </td>

                        <td className="py-4 px-6">
                          {u.role === "vendor" ? (
                            <div>
                              <p className="font-medium text-[#1C1917]">
                                {u.businessName || "Unnamed Atelier"}
                              </p>
                              <span
                                className={`text-[10px] uppercase font-bold tracking-wider ${
                                  u.subscriptionPlan === "premium"
                                    ? "text-[#8E7356]"
                                    : "text-gray-400"
                                }`}
                              >
                                {u.subscriptionPlan === "premium" ? "★ Premium Plan" : "Free Plan"}
                              </span>
                            </div>
                          ) : (
                            <span className="text-gray-400">—</span>
                          )}
                        </td>

                        <td className="py-4 px-6 text-gray-500 font-light">
                          {formatDate(u.createdAt || "")}
                        </td>

                        <td className="py-4 px-6">
                          {u.isBlocked ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-red-100 text-red-800 border border-red-200">
                              <ShieldAlert className="w-3 h-3 text-red-600" />
                              Blocked
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-200">
                              <ShieldCheck className="w-3 h-3 text-emerald-600" />
                              Active
                            </span>
                          )}
                        </td>

                        <td className="py-4 px-6 text-right">
                          {isSelfAdmin ? (
                            <span className="text-[11px] text-gray-400 italic">Protected</span>
                          ) : (
                            <button
                              onClick={() => handleToggleBlock(u)}
                              disabled={isProcessing}
                              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all disabled:opacity-50 ${
                                u.isBlocked
                                  ? "bg-emerald-50 text-emerald-700 border border-emerald-300 hover:bg-emerald-100"
                                  : "bg-red-50 text-red-700 border border-red-300 hover:bg-red-100"
                              }`}
                            >
                              {u.isBlocked ? (
                                <>
                                  <Unlock className="w-3 h-3" />
                                  <span>Unblock</span>
                                </>
                              ) : (
                                <>
                                  <Lock className="w-3 h-3" />
                                  <span>Block User</span>
                                </>
                              )}
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-16 text-center border border-[#E8E2D9]">
            <Users className="w-12 h-12 text-[#C59B6D] mx-auto mb-3" />
            <h3 className="font-serif text-xl text-[#1C1917] mb-1">No Users Match Filter</h3>
            <p className="text-xs text-gray-500 font-light">
              Try adjusting your role selection or search query.
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
