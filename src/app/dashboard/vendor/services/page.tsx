"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Service } from "@/types";
import { fetchApi } from "@/lib/api";
import { formatCurrency } from "@/lib/utils";
import { toast } from "sonner";
import {
  Layers,
  PlusCircle,
  Edit3,
  Trash2,
  Power,
  Clock,
  CheckCircle,
  XCircle,
  Sparkles,
  MapPin,
  X,
} from "lucide-react";

export default function VendorServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  // Edit Modal State
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [editName, setEditName] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [editLocation, setEditLocation] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const [savingEdit, setSavingEdit] = useState(false);

  const loadVendorServices = async () => {
    setLoading(true);
    try {
      const res = await fetchApi<{ success: boolean; services: Service[] }>(
        "/services/vendor/my-services"
      );
      if (res.success) {
        setServices(res.services || []);
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to load services.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadVendorServices();
  }, []);

  const handleToggleActive = async (id: string) => {
    try {
      const res = await fetchApi<{ success: boolean; message: string; isActive: boolean }>(
        `/services/${id}/availability`,
        { method: "PATCH" }
      );
      if (res.success) {
        toast.success(res.message);
        setServices((prev) =>
          prev.map((s) => (s._id === id ? { ...s, isActive: res.isActive } : s))
        );
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to change availability.");
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"? This cannot be undone.`)) {
      return;
    }

    try {
      const res = await fetchApi<{ success: boolean; message: string }>(
        `/services/${id}`,
        { method: "DELETE" }
      );
      if (res.success) {
        toast.success("Service deleted successfully.");
        setServices((prev) => prev.filter((s) => s._id !== id));
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to delete service.");
    }
  };

  const handleOpenEdit = (service: Service) => {
    setEditingService(service);
    setEditName(service.serviceName);
    setEditPrice(service.price.toString());
    setEditLocation(service.location);
    setEditDesc(service.description);
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService) return;

    setSavingEdit(true);
    try {
      const res = await fetchApi<{ success: boolean; message: string; service: Service }>(
        `/services/${editingService._id}`,
        {
          method: "PUT",
          body: JSON.stringify({
            serviceName: editName,
            price: Number(editPrice),
            location: editLocation,
            description: editDesc,
          }),
        }
      );

      if (res.success) {
        toast.success("Service updated successfully.");
        setServices((prev) =>
          prev.map((s) => (s._id === editingService._id ? res.service : s))
        );
        setEditingService(null);
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to update service.");
    } finally {
      setSavingEdit(false);
    }
  };

  return (
    <DashboardLayout
      allowedRole="vendor"
      title="My Wedding Services"
      subtitle="Manage your catalog listings, update pricing, and monitor administrative approval."
    >
      <div className="space-y-6">
        {/* Header Action */}
        <div className="flex items-center justify-between">
          <p className="text-xs uppercase tracking-wider text-gray-500 font-semibold">
            {services.length} Total Services in Your Catalog
          </p>

          <Link
            href="/dashboard/vendor/add-service"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#C59B6D] hover:bg-[#8E7356] text-white text-xs uppercase tracking-wider font-semibold transition-all shadow-sm"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add New Service</span>
          </Link>
        </div>

        {/* Table / Grid */}
        {loading ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-[#E8E2D9]">
            <div className="w-8 h-8 border-4 border-[#C59B6D] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-xs text-gray-400 uppercase tracking-widest">
              Loading Atelier Catalog...
            </p>
          </div>
        ) : services.length > 0 ? (
          <div className="bg-white rounded-3xl border border-[#E8E2D9] overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#E8E2D9] bg-[#FAF8F5] text-[11px] uppercase tracking-wider text-gray-500 font-semibold">
                    <th className="py-4 px-6">Service</th>
                    <th className="py-4 px-6">Category</th>
                    <th className="py-4 px-6">Price</th>
                    <th className="py-4 px-6">Approval Status</th>
                    <th className="py-4 px-6">Availability</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8E2D9]/60 text-xs">
                  {services.map((item) => (
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
                            <p className="text-gray-400 flex items-center gap-1 text-[11px]">
                              <MapPin className="w-3 h-3 text-[#C59B6D]" />
                              {item.location}
                            </p>
                          </div>
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
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-800 border border-amber-200">
                            <Clock className="w-3 h-3 text-amber-600" />
                            Pending Review
                          </span>
                        )}
                      </td>

                      <td className="py-4 px-6">
                        <button
                          onClick={() => handleToggleActive(item._id)}
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold transition-all ${
                            item.isActive
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-300 hover:bg-emerald-100"
                              : "bg-gray-100 text-gray-500 border border-gray-300 hover:bg-gray-200"
                          }`}
                        >
                          <Power className="w-3 h-3" />
                          <span>{item.isActive ? "Active / Visible" : "Inactive"}</span>
                        </button>
                      </td>

                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleOpenEdit(item)}
                            className="p-2 rounded-lg text-gray-600 hover:text-[#C59B6D] hover:bg-[#FAF8F5] transition-colors"
                            title="Edit Service"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(item._id, item.serviceName)}
                            className="p-2 rounded-lg text-gray-600 hover:text-red-600 hover:bg-red-50 transition-colors"
                            title="Delete Service"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-16 text-center border border-[#E8E2D9] max-w-lg mx-auto">
            <Layers className="w-12 h-12 text-[#C59B6D] mx-auto mb-4" />
            <h3 className="font-serif text-2xl text-[#1C1917] mb-2">No Services Yet</h3>
            <p className="text-xs text-gray-500 font-light mb-6">
              You have not created any wedding services yet. Add your photography packages, venues,
              or floral designs to start receiving client booking requests.
            </p>
            <Link
              href="/dashboard/vendor/add-service"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#C59B6D] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#8E7356] transition-colors"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Add Your First Service</span>
            </Link>
          </div>
        )}

        {/* Edit Modal */}
        {editingService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl max-w-lg w-full p-8 border border-[#E8E2D9] shadow-2xl relative">
              <div className="flex items-center justify-between pb-4 border-b border-[#E8E2D9] mb-6">
                <h3 className="font-serif text-xl text-[#1C1917]">Edit Wedding Service</h3>
                <button onClick={() => setEditingService(null)} className="text-gray-400 hover:text-gray-600">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveEdit} className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#1C1917] mb-1">
                    Service Name
                  </label>
                  <input
                    type="text"
                    required
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#FAF8F5] rounded-xl border border-[#E8E2D9] text-xs font-medium text-[#1C1917] focus:outline-none focus:border-[#C59B6D]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-[#1C1917] mb-1">
                      Price (USD)
                    </label>
                    <input
                      type="number"
                      required
                      value={editPrice}
                      onChange={(e) => setEditPrice(e.target.value)}
                      className="w-full px-4 py-2.5 bg-[#FAF8F5] rounded-xl border border-[#E8E2D9] text-xs font-medium text-[#1C1917] focus:outline-none focus:border-[#C59B6D]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-[#1C1917] mb-1">
                      Location
                    </label>
                    <input
                      type="text"
                      required
                      value={editLocation}
                      onChange={(e) => setEditLocation(e.target.value)}
                      className="w-full px-4 py-2.5 bg-[#FAF8F5] rounded-xl border border-[#E8E2D9] text-xs font-medium text-[#1C1917] focus:outline-none focus:border-[#C59B6D]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#1C1917] mb-1">
                    Description
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={editDesc}
                    onChange={(e) => setEditDesc(e.target.value)}
                    className="w-full p-4 bg-[#FAF8F5] rounded-xl border border-[#E8E2D9] text-xs font-medium text-[#1C1917] focus:outline-none focus:border-[#C59B6D] resize-none"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E8E2D9]">
                  <button
                    type="button"
                    onClick={() => setEditingService(null)}
                    className="px-5 py-2.5 rounded-full border border-gray-300 text-xs font-semibold text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={savingEdit}
                    className="px-6 py-2.5 rounded-full bg-[#C59B6D] text-white text-xs font-semibold hover:bg-[#8E7356] transition-colors shadow-sm disabled:opacity-50"
                  >
                    {savingEdit ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
