"use client";

import React, { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Service } from "@/types";
import { fetchApi } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { formatCurrency, formatDate } from "@/lib/utils";
import { toast } from "sonner";
import {
  MapPin,
  Calendar,
  Sparkles,
  ShieldCheck,
  Building2,
  Mail,
  ArrowLeft,
  Send,
  Lock,
  AlertCircle,
  CheckCircle,
} from "lucide-react";

interface Props {
  params: Promise<{ id: string }>;
}

export default function ServiceDetailsPage({ params }: Props) {
  const resolvedParams = use(params);
  const serviceId = resolvedParams.id;

  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();

  const [service, setService] = useState<Service | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Booking Form State
  const [eventDate, setEventDate] = useState<string>("");
  const [eventLocation, setEventLocation] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [bookingSuccess, setBookingSuccess] = useState<boolean>(false);

  // Auth Protection Rule:
  // If unauthenticated, redirect to Sign In page
  useEffect(() => {
    if (!authLoading && !user) {
      toast.info("Please sign in to view full service details and request bookings.");
      router.push(`/login?redirect=/services/${serviceId}`);
    }
  }, [user, authLoading, serviceId, router]);

  useEffect(() => {
    const loadService = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetchApi<{ success: boolean; service: Service }>(
          `/services/${serviceId}`
        );
        if (res.success && res.service) {
          setService(res.service);
          if (res.service.images && res.service.images.length > 0) {
            setSelectedImage(res.service.images[0]);
          }
        } else {
          setError("Service not found.");
        }
      } catch (err: any) {
        setError(err.message || "Failed to load service details.");
      } finally {
        setLoading(false);
      }
    };

    if (serviceId) {
      loadService();
    }
  }, [serviceId]);

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast.error("You must be logged in to submit a booking request.");
      router.push(`/login?redirect=/services/${serviceId}`);
      return;
    }

    if (user.role === "admin") {
      toast.error("Admins cannot submit customer booking requests.");
      return;
    }

    if (service?.vendorId?._id === user._id) {
      toast.error("Vendors cannot book their own services.");
      return;
    }

    if (!eventDate || !eventLocation) {
      toast.error("Please provide both an event date and event location.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetchApi<{ success: boolean; message: string; booking: any }>(
        "/bookings",
        {
          method: "POST",
          body: JSON.stringify({
            serviceId,
            eventDate,
            eventLocation,
            message,
          }),
        }
      );

      if (res.success) {
        setBookingSuccess(true);
        toast.success(res.message || "Booking request submitted successfully!");
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to submit booking request.");
    } finally {
      setSubmitting(false);
    }
  };

  const isOwnService = user && service && service.vendorId?._id === user._id;
  const isAdmin = user && user.role === "admin";

  if (loading || authLoading) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-4 border-[#C59B6D] border-t-transparent rounded-full animate-spin" />
            <p className="text-xs uppercase tracking-widest text-gray-500 font-medium">
              Loading Atelier Details...
            </p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center px-6">
          <div className="bg-white rounded-3xl p-12 max-w-lg w-full text-center border border-[#E8E2D9] shadow-sm">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h2 className="font-serif text-3xl font-medium text-[#1C1917] mb-2">Service Unavailable</h2>
            <p className="text-xs text-gray-500 mb-6">{error || "The requested wedding service does not exist or has been removed."}</p>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#C59B6D] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#8E7356] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Catalog
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1C1917] flex flex-col">
      <Navbar />

      <main className="flex-1 pt-32 pb-24 max-w-7xl mx-auto px-6 sm:px-8 w-full">
        {/* Back navigation */}
        <div className="mb-8">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-gray-500 hover:text-[#C59B6D] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to All Wedding Services
          </Link>
        </div>

        {/* Main Grid: Left Gallery + Details, Right Booking Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Gallery & Description (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            {/* Main Featured Photo */}
            <div className="relative h-[440px] sm:h-[500px] w-full rounded-3xl overflow-hidden bg-[#F4EFEA] border border-[#E8E2D9] shadow-md">
              <img
                src={selectedImage || service.images[0]}
                alt={service.serviceName}
                className="w-full h-full object-cover transition-all duration-500"
              />
              <span className="absolute top-6 left-6 bg-white/95 backdrop-blur-md text-[#1C1917] text-xs font-semibold tracking-wider uppercase px-4 py-1.5 rounded-full shadow-sm">
                {service.category}
              </span>
            </div>

            {/* Thumbnail Gallery (Multiple Images) */}
            {service.images && service.images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {service.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`relative w-24 h-24 rounded-2xl overflow-hidden shrink-0 border-2 transition-all ${
                      selectedImage === img
                        ? "border-[#C59B6D] scale-95 shadow-md"
                        : "border-[#E8E2D9] opacity-75 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Service Details & Description */}
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#E8E2D9] shadow-sm space-y-6">
              <div>
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                  <MapPin className="w-4 h-4 text-[#C59B6D]" />
                  <span>{service.location}</span>
                </div>
                <h1 className="font-serif text-3xl sm:text-4xl font-normal text-[#1C1917]">
                  {service.serviceName}
                </h1>
              </div>

              <div className="pt-4 border-t border-[#E8E2D9]">
                <h3 className="text-xs uppercase tracking-widest font-semibold text-[#8E7356] mb-3">
                  Service Description
                </h3>
                <p className="text-sm text-gray-600 font-light leading-relaxed whitespace-pre-line">
                  {service.description}
                </p>
              </div>

              {/* Vendor Profile Badge Card */}
              <div className="pt-6 border-t border-[#E8E2D9]">
                <h3 className="text-xs uppercase tracking-widest font-semibold text-[#8E7356] mb-4">
                  Provided by Verified Atelier
                </h3>

                <div className="flex items-center justify-between p-4 bg-[#FAF8F5] rounded-2xl border border-[#E8E2D9]">
                  <div className="flex items-center gap-4">
                    <img
                      src={
                        service.vendorId?.image ||
                        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
                      }
                      alt={service.vendorId?.name || "Vendor"}
                      className="w-14 h-14 rounded-full object-cover border-2 border-[#C59B6D]"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-serif text-lg font-medium text-[#1C1917]">
                          {service.vendorId?.businessName || service.vendorId?.name}
                        </h4>
                        {service.vendorId?.subscriptionPlan === "premium" && (
                          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#C59B6D]/20 text-[#8E7356] border border-[#C59B6D]/40">
                            ★ Premium Atelier
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500">Contact: {service.vendorId?.email}</p>
                    </div>
                  </div>

                  <div className="hidden sm:flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Identity Verified</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Pricing & Booking Request Form (5 cols) */}
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#E8E2D9] shadow-xl space-y-6">
              {/* Price Header */}
              <div className="pb-6 border-b border-[#E8E2D9]">
                <span className="text-xs uppercase tracking-widest text-gray-400 font-medium block">
                  Service Investment
                </span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="font-serif text-4xl font-bold text-[#1C1917]">
                    {formatCurrency(service.price)}
                  </span>
                  <span className="text-xs text-gray-500 font-light">USD / complete engagement</span>
                </div>
              </div>

              {/* Booking Request Form */}
              {bookingSuccess ? (
                <div className="py-8 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif text-2xl font-normal text-[#1C1917]">Request Sent!</h3>
                  <p className="text-xs text-gray-500 leading-relaxed max-w-sm mx-auto">
                    Your wedding booking inquiry has been submitted to{" "}
                    <span className="font-semibold text-[#1C1917]">
                      {service.vendorId?.businessName || service.vendorId?.name}
                    </span>
                    . You can track this request in your Customer Dashboard.
                  </p>
                  <div className="pt-2">
                    <Link
                      href="/dashboard/customer"
                      className="inline-block px-6 py-2.5 rounded-full bg-[#1C1917] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#C59B6D] transition-colors"
                    >
                      View in My Bookings
                    </Link>
                  </div>
                </div>
              ) : isOwnService ? (
                <div className="p-6 bg-amber-50 rounded-2xl border border-amber-200 text-center space-y-2">
                  <Lock className="w-6 h-6 text-amber-700 mx-auto" />
                  <p className="text-xs font-semibold text-amber-800">This is your own service</p>
                  <p className="text-xs text-amber-700">
                    Vendors cannot book their own wedding services.
                  </p>
                </div>
              ) : isAdmin ? (
                <div className="p-6 bg-purple-50 rounded-2xl border border-purple-200 text-center space-y-2">
                  <ShieldCheck className="w-6 h-6 text-purple-700 mx-auto" />
                  <p className="text-xs font-semibold text-purple-800">Admin Account</p>
                  <p className="text-xs text-purple-700">
                    Admins cannot submit customer booking requests.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleBookingSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-[#1C1917] mb-1.5">
                      Target Event Date *
                    </label>
                    <div className="relative">
                      <Calendar className="w-4 h-4 text-[#C59B6D] absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="date"
                        required
                        value={eventDate}
                        onChange={(e) => setEventDate(e.target.value)}
                        min={new Date().toISOString().split("T")[0]}
                        className="w-full pl-10 pr-4 py-2.5 bg-[#FAF8F5] rounded-xl border border-[#E8E2D9] text-xs font-medium text-[#1C1917] focus:outline-none focus:border-[#C59B6D]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-[#1C1917] mb-1.5">
                      Event Location / Venue Address *
                    </label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-[#C59B6D] absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. The Plaza Hotel, NYC"
                        value={eventLocation}
                        onChange={(e) => setEventLocation(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-[#FAF8F5] rounded-xl border border-[#E8E2D9] text-xs font-medium text-[#1C1917] focus:outline-none focus:border-[#C59B6D]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-[#1C1917] mb-1.5">
                      Additional Message for Vendor (Optional)
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Share your wedding theme, estimated guests, or special requirements..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-4 py-2.5 bg-[#FAF8F5] rounded-xl border border-[#E8E2D9] text-xs font-medium text-[#1C1917] focus:outline-none focus:border-[#C59B6D] resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-4 rounded-full bg-[#C59B6D] hover:bg-[#8E7356] text-white text-xs uppercase tracking-[0.2em] font-semibold transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {submitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Sending Request...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Booking Request</span>
                      </>
                    )}
                  </button>

                  <p className="text-[11px] text-gray-400 text-center leading-relaxed">
                    Submitting an inquiry places a Pending request on the vendor's schedule. You
                    won't be charged until the booking is confirmed.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
