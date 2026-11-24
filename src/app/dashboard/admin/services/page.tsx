"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Service } from "@/types";
import { fetchApi } from "@/lib/api";
import { formatCurrency, formatDate } from "@/lib/utils";
import { toast } from "sonner";
import {
  Layers,
  Search,
  Filter,
  CheckCircle,
  XCircle,
  Clock,
  Trash2,
  MapPin,
  Check,
  X,
  AlertTriangle,
} from "lucide-react";

function AdminServicesContent() {
  const searchParams = useSearchParams();
  const initialStatus = searchParams.get("status") || "all";

  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState(initialStatus);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const categories = [
    "all",
    "Photography & Videography",
    "Wedding Venues",
    "Decoration & Florist",
    "Catering Services",
    "Makeup & Styling",
    "Wedding Fashion",
  ];

  const loadAdminServices = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.append("search", search);
      if (statusFilter && statusFilter !== "all") params.append("status", statusFilter);
      if (categoryFilter && categoryFilter !== "all") params.append("category", categoryFilter);

      const res = await fetchApi<{ success: boolean; services: Service[] }>(
        `/services/admin/all?${params.toString()}`
      );
      if (res.success) {
        setServices(res.services || []);
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to load services for moderation.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      loadAdminServices();
    }, 250);
    return () => clearTimeout(timer);
  }, [search, statusFilter, categoryFilter]);

  const handleUpdateStatus = async (id: string, newStatus: "approved" | "rejected" | "pending") => {
    setUpdatingId(id);
    try {
      const res = await fetchApi<{ success: boolean; message: string; service: Service }>(
        `/services/${id}/status`,
        {
          method: "PATCH",
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (res.success) {
        toast.success(res.message);
        setServices((prev) =>
          prev.map((s) => (s._id === id ? { ...s, status: newStatus } : s))
        );
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to update service status.");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to permanently delete service "${name}"?`)) {
      return;
    }

    try {
      const res = await fetchApi<{ success: boolean; message: string }>(
        `/services/admin/${id}`,
        { method: "DELETE" }
      );
      if (res.success) {
        toast.success(res.message);
        setServices((prev) => prev.filter((s) => s._id !== id));
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to delete service.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Search & Filters */}
      <div className="bg-white rounded-3xl p-6 border border-[#E8E2D9] shadow-sm space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="w-4 h-4 text-[#C59B6D] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search service or location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-[#FAF8F5] rounded-full border border-[#E8E2D9] text-xs font-medium text-[#1C1917] focus:outline-none focus:border-[#C59B6D]"
            />
          </div>

          <div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full px-4 py-2.5 bg-[#FAF8F5] rounded-full border border-[#E8E2D9] text-xs font-medium text-[#1C1917] focus:outline-none focus:border-[#C59B6D] cursor-pointer"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  Category: {c === "all" ? "All Categories" : c}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {["all", "pending", "approved", "rejected"].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold capitalize shrink-0 transition-all ${
                  statusFilter === st
                    ? "bg-[#C59B6D] text-white shadow-sm"
                    : "bg-[#FAF8F5] text-gray-600 hover:bg-[#E8E2D9] border border-[#E8E2D9]"
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Services Table */}
      {loading ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-[#E8E2D9]">
          <div className="w-8 h-8 border-4 border-[#C59B6D] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-xs text-gray-400 uppercase tracking-widest">
            Loading Submitted Services...
          </p>
        </div>
      ) : services.length > 0 ? (
        <div className="bg-white rounded-3xl border border-[#E8E2D9] overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#E8E2D9] bg-[#FAF8F5] text-[11px] uppercase tracking-wider text-gray-500 font-semibold">
                  <th className="py-4 px-6">Service</th>
                  <th className="py-4 px-6">Vendor Atelier</th>
                  <th className="py-4 px-6">Category</th>
                  <th className="py-4 px-6">Price</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6 text-right">Moderation Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8E2D9]/60 text-xs">
                {services.map((item) => {
                  const isProcessing = updatingId === item._id;

                  return (
                    <tr key={item._id} className="hover:bg-[#FAF8F5]/60 transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <img
                            src={
                              item.images?.[0] ||
                              "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=150&q=80"
                            }
                            alt={item.serviceName}
                            className="w-12 h-12 rounded-xl object-cover border border-[#E8E2D9]"
                          />
                          <div>
                            <p className="font-serif font-medium text-sm text-[#1C1917] line-clamp-1">
                              {item.serviceName}
                            </p>
                            <p className="text-gray-400 text-[11px] flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-[#C59B6D]" />
                              {item.location}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-6">
                        <div>
                          <p className="font-semibold text-[#1C1917]">
                            {item.vendorId?.businessName || item.vendorId?.name || "Vendor"}
                          </p>
                          <p className="text-gray-400 text-[11px]">{item.vendorId?.email}</p>
                        </div>
                      </td>

                      <td className="py-4 px-6 font-medium text-gray-600">{item.category}</td>

                      <td className="py-4 px-6 font-serif font-bold text-sm text-[#1C1917]">
                        {formatCurrency(item.price)}
                      </td>

                      <td className="py-4 px-6">
                        {item.status === "approved" ? (
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-200">
                            <CheckCircle className="w-3 h-3 text-emerald-600" />
                            Approved
                          </span>
                        ) : item.status === "rejected" ? (
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-red-100 text-red-800 border border-red-200">
                            <XCircle className="w-3 h-3 text-red-600" />
                            Rejected
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-800 border border-amber-200 animate-pulse">
                            <Clock className="w-3 h-3 text-amber-600" />
                            Pending Review
                          </span>
                        )}
                      </td>

                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {item.status !== "approved" && (
                            <button
                              onClick={() => handleUpdateStatus(item._id, "approved")}
                              disabled={isProcessing}
                              className="px-3 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-semibold transition-all shadow-sm flex items-center gap-1 disabled:opacity-50"
                              title="Approve Service"
                            >
                              <Check className="w-3 h-3" />
                              <span>Approve</span>
                            </button>
                          )}

                          {item.status !== "rejected" && (
                            <button
                              onClick={() => handleUpdateStatus(item._id, "rejected")}
                              disabled={isProcessing}
                              className="px-3 py-1.5 rounded-full bg-amber-500 hover:bg-amber-600 text-white text-[11px] font-semibold transition-all shadow-sm flex items-center gap-1 disabled:opacity-50"
                              title="Reject Service"
                            >
                              <X className="w-3 h-3" />
                              <span>Reject</span>
                            </button>
                          )}

                          {item.status !== "pending" && (
                            <button
                              onClick={() => handleUpdateStatus(item._id, "pending")}
                              disabled={isProcessing}
                              className="px-3 py-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 text-[11px] font-semibold transition-all border border-gray-200 flex items-center gap-1 disabled:opacity-50"
                              title="Reset to Pending Review"
                            >
                              <Clock className="w-3 h-3" />
                              <span>Reset</span>
                            </button>
                          )}

                          <button
                            onClick={() => handleDelete(item._id, item.serviceName)}
                            className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                            title="Delete Inappropriate Service"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
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
          <Layers className="w-12 h-12 text-[#C59B6D] mx-auto mb-3" />
          <h3 className="font-serif text-xl text-[#1C1917] mb-1">No Services Found</h3>
          <p className="text-xs text-gray-500 font-light">
            No wedding services match your current filter settings.
          </p>
        </div>
      )}
    </div>
  );
}

export default function AdminServicesPage() {
  return (
    <DashboardLayout
      allowedRole="admin"
      title="Manage Wedding Services"
      subtitle="Review pending vendor submissions, approve verified listings, or remove inappropriate content."
    >
      <Suspense fallback={<div className="py-12 text-center text-xs">Loading services...</div>}>
        <AdminServicesContent />
      </Suspense>
    </DashboardLayout>
  );
}
