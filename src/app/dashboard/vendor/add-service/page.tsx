"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { fetchApi } from "@/lib/api";
import { uploadImageToImgBB } from "@/lib/upload";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import {
  Sparkles,
  Upload,
  ArrowRight,
  AlertTriangle,
  Building2,
  DollarSign,
  MapPin,
  CheckCircle,
} from "lucide-react";

export default function AddServicePage() {
  const { user } = useAuth();
  const router = useRouter();

  const [serviceName, setServiceName] = useState("");
  const [category, setCategory] = useState("Photography & Videography");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [limitReached, setLimitReached] = useState(false);

  const categories = [
    "Photography & Videography",
    "Wedding Venues",
    "Decoration & Florist",
    "Catering Services",
    "Makeup & Styling",
    "Wedding Fashion",
  ];

  // Check vendor's current services count vs plan
  useEffect(() => {
    const checkLimit = async () => {
      if (user?.subscriptionPlan === "premium") {
        setLimitReached(false);
        return;
      }

      try {
        const res = await fetchApi<{ success: boolean; services: any[] }>(
          "/services/vendor/my-services"
        );
        if (res.success && res.services) {
          const activeOrPending = res.services.filter((s) => s.status !== "rejected");
          if (activeOrPending.length >= 3) {
            setLimitReached(true);
          }
        }
      } catch (err) {
        console.error("Check limit error:", err);
      }
    };
    checkLimit();
  }, [user]);

  const [uploadingImage, setUploadingImage] = useState(false);

  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      setUploadingImage(true);

      try {
        toast.info("Uploading image to ImgBB hosting...");
        const hostedUrl = await uploadImageToImgBB(file);
        setImageUrl(hostedUrl);
        toast.success("Image uploaded successfully!");
      } catch (err: any) {
        toast.error("Image upload failed. Using local preview.");
        const reader = new FileReader();
        reader.onloadend = () => setImageUrl(reader.result as string);
        reader.readAsDataURL(file);
      } finally {
        setUploadingImage(false);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (limitReached) {
      toast.error(
        "Free Plan limit reached (maximum 3 active services). Please upgrade to Premium."
      );
      router.push("/dashboard/vendor/subscription");
      return;
    }

    if (!serviceName || !category || !description || !price || !location) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const imagesToSubmit = imageUrl
      ? [imageUrl]
      : [
          "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
        ];

    setSubmitting(true);
    try {
      const res = await fetchApi<{ success: boolean; message: string; limitReached?: boolean }>(
        "/services",
        {
          method: "POST",
          body: JSON.stringify({
            serviceName,
            category,
            description,
            price: Number(price),
            location,
            images: imagesToSubmit,
          }),
        }
      );

      if (res.success) {
        toast.success(
          "Service submitted successfully! It is now pending Admin approval."
        );
        router.push("/dashboard/vendor/services");
      }
    } catch (err: any) {
      if (err.message?.toLowerCase().includes("free plan limit")) {
        setLimitReached(true);
      }
      toast.error(err.message || "Failed to publish service.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <DashboardLayout
      allowedRole="vendor"
      title="Add Wedding Service"
      subtitle="Publish a new bridal service or venue to the WedPlan luxury marketplace."
    >
      <div className="max-w-3xl space-y-8">
        {/* Free Plan Limitation Alert */}
        {limitReached && (
          <div className="bg-amber-50 border border-amber-300 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h3 className="font-serif text-lg font-medium text-amber-900">
                  Free Plan Service Limit Reached (3 of 3)
                </h3>
                <p className="text-xs text-amber-700 leading-relaxed font-light">
                  Vendors on the Free Plan can publish up to 3 active services. Upgrade to our
                  Premium Atelier Plan for unlimited listings, featured placement, and priority
                  client visibility.
                </p>
              </div>
            </div>

            <Link
              href="/dashboard/vendor/subscription"
              className="px-6 py-2.5 rounded-full bg-[#C59B6D] hover:bg-[#8E7356] text-white text-xs uppercase tracking-widest font-semibold transition-all shadow-md shrink-0"
            >
              Upgrade Now
            </Link>
          </div>
        )}

        {/* Add Service Form */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#E8E2D9] shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Service Name */}
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-[#1C1917] mb-2">
                Service or Venue Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Fine Art Documentary Wedding Photography"
                value={serviceName}
                onChange={(e) => setServiceName(e.target.value)}
                className="w-full px-4 py-3 bg-[#FAF8F5] rounded-xl border border-[#E8E2D9] text-xs font-medium text-[#1C1917] focus:outline-none focus:border-[#C59B6D]"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-[#1C1917] mb-2">
                Service Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 bg-[#FAF8F5] rounded-xl border border-[#E8E2D9] text-xs font-medium text-[#1C1917] focus:outline-none focus:border-[#C59B6D] cursor-pointer"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Price & Location in 2 Columns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#1C1917] mb-2">
                  Price (USD) *
                </label>
                <div className="relative">
                  <DollarSign className="w-4 h-4 text-[#C59B6D] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="number"
                    min="0"
                    step="1"
                    required
                    placeholder="e.g. 2400"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-[#FAF8F5] rounded-xl border border-[#E8E2D9] text-xs font-medium text-[#1C1917] focus:outline-none focus:border-[#C59B6D]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#1C1917] mb-2">
                  Location (City, State / Region) *
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-[#C59B6D] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Manhattan, New York"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-[#FAF8F5] rounded-xl border border-[#E8E2D9] text-xs font-medium text-[#1C1917] focus:outline-none focus:border-[#C59B6D]"
                  />
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-[#1C1917] mb-2">
                Detailed Service Description *
              </label>
              <textarea
                rows={5}
                required
                placeholder="Describe your bridal packages, inclusions, deliverables, equipment, or venue guest capacity..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-4 bg-[#FAF8F5] rounded-xl border border-[#E8E2D9] text-xs font-medium text-[#1C1917] focus:outline-none focus:border-[#C59B6D] resize-none"
              />
            </div>

            {/* Service Image Upload (PDF requirement: uploaded as file using ImgBB or suitable image hosting) */}
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-[#1C1917] mb-2">
                Service Showcase Image *
              </label>

              <div className="flex flex-col sm:flex-row items-center gap-6 p-6 bg-[#FAF8F5] rounded-2xl border border-dashed border-[#E8E2D9]">
                {imagePreview ? (
                  <div className="relative w-32 h-32 rounded-2xl overflow-hidden border border-[#C59B6D] shadow-md shrink-0">
                    <img
                      src={imagePreview}
                      alt="Uploaded Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-32 h-32 rounded-2xl bg-white border border-[#E8E2D9] flex flex-col items-center justify-center text-gray-400 shrink-0">
                    <Upload className="w-6 h-6 mb-1 text-[#C59B6D]" />
                    <span className="text-[10px] uppercase font-semibold">Upload Photo</span>
                  </div>
                )}

                <div className="space-y-2 flex-1">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageFileChange}
                    className="text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-[#C59B6D] file:text-white hover:file:bg-[#8E7356] cursor-pointer"
                  />
                  <p className="text-[11px] text-gray-400">
                    Or optionally paste a high-resolution direct image URL below:
                  </p>
                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/..."
                    value={imageUrl}
                    onChange={(e) => {
                      setImageUrl(e.target.value);
                      setImagePreview(e.target.value);
                    }}
                    className="w-full px-3 py-2 bg-white rounded-lg border border-[#E8E2D9] text-xs font-medium text-[#1C1917] focus:outline-none focus:border-[#C59B6D]"
                  />
                </div>
              </div>
            </div>

            {/* Default Status Notice */}
            <div className="p-4 bg-[#FAF8F5] rounded-xl border border-[#E8E2D9] text-xs text-gray-500 flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-[#C59B6D] shrink-0" />
              <span>
                New submissions default to <strong className="text-[#1C1917]">Pending</strong> status
                until reviewed and approved by an Admin.
              </span>
            </div>

            <button
              type="submit"
              disabled={submitting || limitReached}
              className="w-full py-4 rounded-full bg-[#C59B6D] hover:bg-[#8E7356] text-white text-xs uppercase tracking-[0.2em] font-semibold transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {submitting ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Submit Service for Admin Approval</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}
