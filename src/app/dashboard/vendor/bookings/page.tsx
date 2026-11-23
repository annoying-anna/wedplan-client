"use client";

import React, { useEffect, useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Booking } from "@/types";
import { fetchApi } from "@/lib/api";
import { formatDate } from "@/lib/utils";
import { toast } from "sonner";
import {
  CalendarCheck,
  Clock,
  CheckCircle2,
  XCircle,
  Calendar,
  MapPin,
  MessageSquare,
  User,
  Check,
  X,
} from "lucide-react";

export default function VendorBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const loadBookings = async () => {
    setLoading(true);
    try {
      const res = await fetchApi<{ success: boolean; bookings: Booking[] }>(
        "/bookings/vendor-requests"
      );
      if (res.success) {
        setBookings(res.bookings || []);
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to load booking requests.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const handleUpdateStatus = async (id: string, newStatus: "Accepted" | "Rejected") => {
    setUpdatingId(id);
    try {
      const res = await fetchApi<{ success: boolean; message: string; booking: Booking }>(
        `/bookings/${id}/status`,
        {
          method: "PATCH",
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (res.success) {
        toast.success(res.message);
        setBookings((prev) =>
          prev.map((b) => (b._id === id ? { ...b, status: newStatus } : b))
        );
      }
    } catch (err: any) {
      toast.error(err.message || `Failed to mark booking as ${newStatus}.`);
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <DashboardLayout
      allowedRole="vendor"
      title="Client Booking Requests"
      subtitle="Review wedding event inquiries, accept reserved ceremony dates, or decline requests."
    >
      <div className="space-y-6">
        {loading ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-[#E8E2D9]">
            <div className="w-8 h-8 border-4 border-[#C59B6D] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-xs text-gray-400 uppercase tracking-widest">
              Loading Client Inquiries...
            </p>
          </div>
        ) : bookings.length > 0 ? (
          <div className="space-y-4">
            {bookings.map((booking) => {
              const isPending = booking.status === "Pending";
              const isProcessing = updatingId === booking._id;

              return (
                <div
                  key={booking._id}
                  className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E2D9] shadow-sm hover:shadow-md transition-all flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6"
                >
                  {/* Left Info */}
                  <div className="space-y-4 flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                      {/* Status Badge */}
                      {booking.status === "Accepted" ? (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-200">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          Accepted
                        </span>
                      ) : booking.status === "Rejected" ? (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-red-100 text-red-800 border border-red-200">
                          <XCircle className="w-3.5 h-3.5 text-red-600" />
                          Rejected
                        </span>
                      ) : booking.status === "Cancelled" ? (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-gray-100 text-gray-700 border border-gray-200">
                          Cancelled by Client
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-800 border border-amber-200">
                          <Clock className="w-3.5 h-3.5 text-amber-600" />
                          Action Required: Pending
                        </span>
                      )}

                      <span className="text-xs text-gray-400">
                        Inquiry Received: {formatDate(booking.createdAt)}
                      </span>
                    </div>

                    {/* Service & Customer Details */}
                    <div>
                      <h3 className="font-serif text-xl font-medium text-[#1C1917]">
                        {booking.serviceId?.serviceName || "Wedding Service"}
                      </h3>

                      <div className="flex flex-wrap items-center gap-6 mt-2 text-xs text-gray-600">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-[#C59B6D]" />
                          <span>
                            Client: <strong>{booking.customerId?.name || "Client"}</strong> (
                            {booking.customerId?.email})
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-[#C59B6D]" />
                          <span>
                            Event Date: <strong>{formatDate(booking.eventDate)}</strong>
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-[#C59B6D]" />
                          <span>Venue / City: {booking.eventLocation}</span>
                        </div>
                      </div>
                    </div>

                    {/* Customer Message */}
                    {booking.message && (
                      <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#E8E2D9] text-xs text-gray-600 space-y-1">
                        <div className="flex items-center gap-1.5 font-semibold text-[#8E7356]">
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>Client Notes / Vision:</span>
                        </div>
                        <p className="font-light italic pl-5">"{booking.message}"</p>
                      </div>
                    )}
                  </div>

                  {/* Right Actions: Accept / Reject (only if pending) */}
                  <div className="w-full lg:w-auto flex items-center justify-end gap-3 pt-4 lg:pt-0 border-t lg:border-t-0 border-[#E8E2D9]">
                    {isPending ? (
                      <>
                        <button
                          onClick={() => handleUpdateStatus(booking._id, "Rejected")}
                          disabled={isProcessing}
                          className="px-5 py-2.5 rounded-full border border-red-200 hover:border-red-400 text-red-600 hover:bg-red-50 text-xs uppercase tracking-wider font-semibold transition-all disabled:opacity-50"
                        >
                          Decline
                        </button>
                        <button
                          onClick={() => handleUpdateStatus(booking._id, "Accepted")}
                          disabled={isProcessing}
                          className="px-6 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs uppercase tracking-wider font-semibold transition-all shadow-sm hover:shadow-md disabled:opacity-50 flex items-center gap-1.5"
                        >
                          <Check className="w-4 h-4" />
                          <span>Accept Booking</span>
                        </button>
                      </>
                    ) : (
                      <span className="text-xs text-gray-400 font-medium italic">
                        Decision finalized ({booking.status})
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
            <h3 className="font-serif text-2xl text-[#1C1917] mb-2">No Booking Requests</h3>
            <p className="text-xs text-gray-500 font-light">
              Couples have not submitted any booking requests for your services yet. Ensure your
              services are marked Active and have captivating showcase images.
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
