"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Booking } from "@/types";
import { fetchApi } from "@/lib/api";
import { formatDate, formatCurrency } from "@/lib/utils";
import { toast } from "sonner";
import {
  CalendarCheck,
  Calendar,
  MapPin,
  Clock,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  Eye,
  X,
  MessageSquare,
} from "lucide-react";

export default function CustomerBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState<string | null>(null);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  const loadMyBookings = async () => {
    setLoading(true);
    try {
      const res = await fetchApi<{ success: boolean; bookings: Booking[] }>(
        "/bookings/my-bookings"
      );
      if (res.success) {
        setBookings(res.bookings || []);
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to load bookings.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMyBookings();
  }, []);

  const handleCancel = async (id: string) => {
    if (!confirm("Are you sure you want to cancel this pending booking inquiry?")) {
      return;
    }

    setCancellingId(id);
    try {
      const res = await fetchApi<{ success: boolean; message: string; booking: Booking }>(
        `/bookings/${id}/cancel`,
        { method: "PATCH" }
      );
      if (res.success) {
        toast.success(res.message);
        setBookings((prev) =>
          prev.map((b) => (b._id === id ? { ...b, status: "Cancelled" } : b))
        );
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to cancel booking request.");
    } finally {
      setCancellingId(null);
    }
  };

  return (
    <DashboardLayout
      allowedRole="customer"
      title="My Wedding Bookings"
      subtitle="Track your wedding service inquiries, confirmed dates, and atelier communications."
    >
      <div className="space-y-6">
        {loading ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-[#E8E2D9]">
            <div className="w-8 h-8 border-4 border-[#C59B6D] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-xs text-gray-400 uppercase tracking-widest">
              Loading Your Wedding Bookings...
            </p>
          </div>
        ) : bookings.length > 0 ? (
          <div className="space-y-4">
            {bookings.map((booking) => {
              const isPending = booking.status === "Pending";
              const isCancelling = cancellingId === booking._id;

              return (
                <div
                  key={booking._id}
                  className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E2D9] shadow-sm hover:shadow-md transition-all flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 flex-1">
                    {/* Service Image */}
                    <img
                      src={
                        booking.serviceId?.images?.[0] ||
                        "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=300&q=80"
                      }
                      alt={booking.serviceId?.serviceName || "Service"}
                      className="w-24 h-24 rounded-2xl object-cover border border-[#E8E2D9] shrink-0"
                    />

                    {/* Service & Vendor Info */}
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        {booking.status === "Accepted" ? (
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-200">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            Confirmed Booking
                          </span>
                        ) : booking.status === "Rejected" ? (
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-red-100 text-red-800 border border-red-200">
                            <XCircle className="w-3.5 h-3.5 text-red-600" />
                            Declined by Atelier
                          </span>
                        ) : booking.status === "Cancelled" ? (
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-gray-100 text-gray-700 border border-gray-200">
                            Cancelled
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-800 border border-amber-200">
                            <Clock className="w-3.5 h-3.5 text-amber-600" />
                            Pending Vendor Review
                          </span>
                        )}

                        <span className="text-xs text-gray-400">
                          Requested: {formatDate(booking.createdAt)}
                        </span>
                      </div>

                      <h3 className="font-serif text-xl font-medium text-[#1C1917]">
                        {booking.serviceId?.serviceName || "Wedding Service"}
                      </h3>

                      <div className="flex flex-wrap items-center gap-6 text-xs text-gray-600">
                        <span>
                          Atelier:{" "}
                          <strong>
                            {booking.vendorId?.businessName || booking.vendorId?.name || "Vendor"}
                          </strong>
                        </span>

                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-[#C59B6D]" />
                          <span>Event Date: {formatDate(booking.eventDate)}</span>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-[#C59B6D]" />
                          <span>Venue: {booking.eventLocation}</span>
                        </div>
                      </div>

                      {booking.message && (
                        <p className="text-xs text-gray-500 font-light italic">
                          "{booking.message}"
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Actions: View details, cancel if pending */}
                  <div className="w-full lg:w-auto flex flex-wrap items-center justify-end gap-3 pt-4 lg:pt-0 border-t lg:border-t-0 border-[#E8E2D9]">
                    <button
                      onClick={() => setSelectedBooking(booking)}
                      className="px-4 py-2.5 rounded-full border border-[#E8E2D9] hover:border-[#C59B6D] text-[#8E7356] hover:bg-[#FAF8F5] text-xs uppercase tracking-wider font-semibold transition-all flex items-center gap-1.5"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Details</span>
                    </button>

                    {isPending ? (
                      <button
                        onClick={() => handleCancel(booking._id)}
                        disabled={isCancelling}
                        className="px-5 py-2.5 rounded-full border border-red-300 hover:border-red-500 text-red-600 hover:bg-red-50 text-xs uppercase tracking-wider font-semibold transition-all disabled:opacity-50"
                      >
                        {isCancelling ? "Cancelling..." : "Cancel Request"}
                      </button>
                    ) : (
                      <span className="text-xs text-gray-400 italic">
                        {booking.status === "Accepted"
                          ? "Date confirmed by atelier"
                          : `Status: ${booking.status}`}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-16 text-center border border-[#E8E2D9] max-w-lg mx-auto">
            <CalendarCheck className="w-12 h-12 text-[#C59B6D] mx-auto mb-4" />
            <h3 className="font-serif text-2xl text-[#1C1917] mb-2">No Bookings Yet</h3>
            <p className="text-xs text-gray-500 font-light mb-6">
              You haven't requested any wedding bookings yet. Browse our verified venues, master
              photographers, and luxury florists.
            </p>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#C59B6D] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#8E7356] transition-colors"
            >
              <span>Explore Wedding Catalog</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>

      {/* Booking Details Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedBooking(null)}
          />
          <div className="relative bg-white rounded-3xl border border-[#E8E2D9] shadow-2xl max-w-lg w-full p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="eyebrow-divider text-[10px]">Booking Record</span>
                <h3 className="font-serif text-2xl text-[#1C1917] mt-1">Booking Details</h3>
              </div>
              <button
                onClick={() => setSelectedBooking(null)}
                className="p-2 rounded-full hover:bg-[#FAF8F5] text-gray-500"
                aria-label="Close booking details"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center gap-4 p-4 bg-[#FAF8F5] rounded-2xl border border-[#E8E2D9]">
              <img
                src={
                  selectedBooking.serviceId?.images?.[0] ||
                  "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=300&q=80"
                }
                alt={selectedBooking.serviceId?.serviceName || "Service"}
                className="w-20 h-20 rounded-2xl object-cover border border-[#E8E2D9]"
              />
              <div className="min-w-0">
                <p className="font-serif text-xl text-[#1C1917] line-clamp-2">
                  {selectedBooking.serviceId?.serviceName || "Wedding Service"}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {selectedBooking.vendorId?.businessName ||
                    selectedBooking.vendorId?.name ||
                    "Vendor"}
                </p>
                <div className="mt-2">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                      selectedBooking.status === "Accepted"
                        ? "bg-emerald-100 text-emerald-800 border-emerald-200"
                        : selectedBooking.status === "Rejected"
                        ? "bg-red-100 text-red-800 border-red-200"
                        : selectedBooking.status === "Cancelled"
                        ? "bg-gray-100 text-gray-700 border-gray-200"
                        : "bg-amber-100 text-amber-800 border-amber-200"
                    }`}
                  >
                    {selectedBooking.status}
                  </span>
                </div>
              </div>
            </div>

            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl border border-[#E8E2D9]">
                <dt className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold mb-1">
                  Event Date
                </dt>
                <dd className="text-[#1C1917] font-medium flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#C59B6D]" />
                  {formatDate(selectedBooking.eventDate)}
                </dd>
              </div>
              <div className="p-4 rounded-2xl border border-[#E8E2D9]">
                <dt className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold mb-1">
                  Event Location
                </dt>
                <dd className="text-[#1C1917] font-medium flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#C59B6D]" />
                  {selectedBooking.eventLocation}
                </dd>
              </div>
              <div className="p-4 rounded-2xl border border-[#E8E2D9]">
                <dt className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold mb-1">
                  Requested On
                </dt>
                <dd className="text-[#1C1917] font-medium">
                  {formatDate(selectedBooking.createdAt)}
                </dd>
              </div>
              <div className="p-4 rounded-2xl border border-[#E8E2D9]">
                <dt className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold mb-1">
                  Service Price
                </dt>
                <dd className="text-[#1C1917] font-medium">
                  {formatCurrency(selectedBooking.serviceId?.price || 0)}
                </dd>
              </div>
            </dl>

            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D9]">
              <p className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold flex items-center gap-1.5 mb-1">
                <MessageSquare className="w-3.5 h-3.5 text-[#C59B6D]" />
                Your Message to Vendor
              </p>
              <p className="text-xs text-gray-600 font-light italic">
                {selectedBooking.message
                  ? `"${selectedBooking.message}"`
                  : "No additional message was included."}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#E8E2D9]">
              <p className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold">
                Booking ID
              </p>
              <p className="text-[11px] text-gray-600 break-all font-mono">
                {selectedBooking._id}
              </p>
            </div>

            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setSelectedBooking(null)}
                className="px-5 py-2.5 rounded-full border border-[#E8E2D9] text-xs uppercase tracking-wider font-semibold text-gray-600 hover:bg-[#FAF8F5]"
              >
                Close
              </button>
              {selectedBooking.status === "Pending" && (
                <button
                  onClick={() => {
                    handleCancel(selectedBooking._id);
                    setSelectedBooking(null);
                  }}
                  className="px-5 py-2.5 rounded-full bg-red-600 text-white text-xs uppercase tracking-wider font-semibold hover:bg-red-700"
                >
                  Cancel Request
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
