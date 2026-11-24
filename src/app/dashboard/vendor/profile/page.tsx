"use client";

import React, { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { useAuth } from "@/context/AuthContext";
import { fetchApi } from "@/lib/api";
import { uploadImageToImgBB } from "@/lib/upload";
import { toast } from "sonner";
import { User, Building2, Mail, Upload, Save, Check } from "lucide-react";

export default function VendorProfilePage() {
  const { user, updateUser } = useAuth();

  const [name, setName] = useState(user?.name || "");
  const [businessName, setBusinessName] = useState(user?.businessName || "");
  const [image, setImage] = useState(user?.image || "");
  const [imagePreview, setImagePreview] = useState(user?.image || "");
  const [saving, setSaving] = useState(false);

  const [uploadingImage, setUploadingImage] = useState(false);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      setUploadingImage(true);

      try {
        toast.info("Uploading profile photo to ImgBB hosting...");
        const hostedUrl = await uploadImageToImgBB(file);
        setImage(hostedUrl);
        toast.success("Photo uploaded successfully!");
      } catch (err) {
        const reader = new FileReader();
        reader.onloadend = () => setImage(reader.result as string);
        reader.readAsDataURL(file);
      } finally {
        setUploadingImage(false);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Name is required.");
      return;
    }

    setSaving(true);
    try {
      const res = await fetchApi<{ success: boolean; message: string; user: any }>(
        "/auth/profile",
        {
          method: "PATCH",
          body: JSON.stringify({
            name,
            businessName,
            image,
          }),
        }
      );

      if (res.success && res.user) {
        updateUser(res.user);
        toast.success("Profile updated successfully!");
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <DashboardLayout
      allowedRole="vendor"
      title="Profile Settings"
      subtitle="Update your personal details, atelier name, and public profile photo."
    >
      <div className="max-w-2xl bg-white rounded-3xl p-8 sm:p-10 border border-[#E8E2D9] shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Avatar Preview & Upload */}
          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-[#1C1917] mb-3">
              Profile Avatar
            </label>
            <div className="flex items-center gap-6">
              <img
                src={
                  imagePreview ||
                  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
                }
                alt="Profile Preview"
                className="w-20 h-20 rounded-full object-cover border-2 border-[#C59B6D] shadow-sm"
              />
              <div className="space-y-2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="text-xs text-gray-500 file:mr-3 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-[#C59B6D] file:text-white hover:file:bg-[#8E7356] cursor-pointer"
                />
                <p className="text-[11px] text-gray-400">
                  Recommended size: 400x400 JPG or PNG.
                </p>
              </div>
            </div>
          </div>

          {/* Full Name */}
          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-[#1C1917] mb-1.5">
              Full Name *
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-[#C59B6D] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-[#FAF8F5] rounded-xl border border-[#E8E2D9] text-xs font-medium text-[#1C1917] focus:outline-none focus:border-[#C59B6D]"
              />
            </div>
          </div>

          {/* Atelier / Business Name */}
          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-[#1C1917] mb-1.5">
              Atelier / Business Name
            </label>
            <div className="relative">
              <Building2 className="w-4 h-4 text-[#C59B6D] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-[#FAF8F5] rounded-xl border border-[#E8E2D9] text-xs font-medium text-[#1C1917] focus:outline-none focus:border-[#C59B6D]"
              />
            </div>
          </div>

          {/* Email (Read-only) */}
          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-[#1C1917] mb-1.5">
              Registered Email (Account Identity)
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                disabled
                value={user?.email || ""}
                className="w-full pl-10 pr-4 py-3 bg-gray-100 rounded-xl border border-gray-200 text-xs font-medium text-gray-500 cursor-not-allowed"
              />
            </div>
            <p className="text-[10px] text-gray-400 mt-1">
              Account identity email cannot be altered. Contact support for assistance.
            </p>
          </div>

          <div className="pt-4 border-t border-[#E8E2D9]">
            <button
              type="submit"
              disabled={saving}
              className="px-8 py-3 rounded-full bg-[#C59B6D] hover:bg-[#8E7356] text-white text-xs uppercase tracking-widest font-semibold transition-all shadow-md flex items-center gap-2 disabled:opacity-50"
            >
              {saving ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Save Profile</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
