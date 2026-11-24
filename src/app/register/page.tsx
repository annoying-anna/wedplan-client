"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { authClient } from "@/lib/auth-client";
import { uploadImageToImgBB } from "@/lib/upload";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "sonner";
import {
  User,
  Mail,
  Lock,
  Building2,
  Store,
  HeartHandshake,
  ArrowRight,
  Upload,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

function RegisterForm() {
  const { register, googleLogin, getDashboardRouteForRole } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialRoleParam = searchParams.get("role") === "vendor" ? "vendor" : "customer";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"customer" | "vendor">(initialRoleParam);
  const [businessName, setBusinessName] = useState("");
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);

  // Password Validation Checklist
  const hasMinLength = password.length >= 6;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const isPasswordValid = hasMinLength && hasUppercase && hasLowercase;

  const [uploadingImage, setUploadingImage] = useState(false);

  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      setUploadingImage(true);

      try {
        toast.info("Uploading profile photo to ImgBB hosting...");
        const hostedUrl = await uploadImageToImgBB(file);
        setImage(hostedUrl);
        toast.success("Profile photo uploaded successfully!");
      } catch (err: any) {
        toast.error("Photo upload failed. Using local preview.");
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

    if (!name || !email || !password) {
      toast.error("Please fill in all required fields.");
      return;
    }

    if (!isPasswordValid) {
      toast.error(
        "Password must be at least 6 characters with at least one uppercase and one lowercase letter."
      );
      return;
    }

    if (role === "vendor" && !businessName.trim()) {
      toast.error("Please provide your Atelier / Business Name.");
      return;
    }

    setSubmitting(true);
    try {
      const user = await register({
        name,
        email,
        password,
        role,
        image: image || undefined,
        businessName: role === "vendor" ? businessName : undefined,
      });

      router.push(getDashboardRouteForRole(user.role));
    } catch (err) {
      // Handled in AuthContext
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setSubmitting(true);
    try {
      // A new Google attempt should override a previous explicit logout.
      localStorage.removeItem("wedplan_explicit_logout");

      // First attempt Better Auth social Google sign in
      try {
        const result = await authClient.signIn.social({
          provider: "google",
          callbackURL: "/",
        });
        const socialUrl = result?.data?.url;

        // A placeholder client id means Google OAuth is not configured on this
        // deployment. Fall through to the demo account instead of sending the
        // visitor to a broken Google consent screen.
        if (socialUrl && !socialUrl.includes("mock_google_client_id")) {
          window.location.assign(socialUrl);
          return;
        }

        if (socialUrl) {
          toast.info("Google OAuth is not configured; using the demo Google sign-in.");
        }
      } catch (betterAuthErr) {
        // Fallback to direct Google authentication endpoint
      }

      const user = await googleLogin({
        name: "Google Wedding Guest",
        email: "google.guest@example.com",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
        role,
      });
      router.push(getDashboardRouteForRole(user.role));
    } catch (err) {
      // handled
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#E8E2D9] shadow-xl space-y-6">
      <div className="text-center space-y-2">
        <span className="eyebrow-divider text-[10px]">Create Your Account</span>
        <h1 className="font-serif text-3xl font-normal text-[#1C1917]">
          Join WedPlan Atelier
        </h1>
        <p className="text-xs text-gray-500 font-light">
          Connect with world-class wedding creators or book bespoke bridal services.
        </p>
      </div>

      {/* Role Selector: Customer vs Vendor */}
      <div className="grid grid-cols-2 gap-3 pt-2">
        <button
          type="button"
          onClick={() => setRole("customer")}
          className={`flex flex-col items-center gap-2 p-4 rounded-2xl border text-center transition-all ${
            role === "customer"
              ? "border-[#C59B6D] bg-[#C59B6D]/10 text-[#8E7356] shadow-sm"
              : "border-[#E8E2D9] bg-[#FAF8F5] text-gray-600 hover:border-gray-400"
          }`}
        >
          <HeartHandshake className="w-5 h-5 text-[#C59B6D]" />
          <span className="text-xs uppercase font-bold tracking-wider">I am a Couple / Host</span>
          <span className="text-[10px] text-gray-500 font-normal">
            Looking to browse & book services
          </span>
        </button>

        <button
          type="button"
          onClick={() => setRole("vendor")}
          className={`flex flex-col items-center gap-2 p-4 rounded-2xl border text-center transition-all ${
            role === "vendor"
              ? "border-[#C59B6D] bg-[#C59B6D]/10 text-[#8E7356] shadow-sm"
              : "border-[#E8E2D9] bg-[#FAF8F5] text-gray-600 hover:border-gray-400"
          }`}
        >
          <Store className="w-5 h-5 text-[#C59B6D]" />
          <span className="text-xs uppercase font-bold tracking-wider">I am a Vendor / Atelier</span>
          <span className="text-[10px] text-gray-500 font-normal">
            Publish services & receive bookings
          </span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
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
              placeholder="e.g. Eleanor Rigby"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-[#FAF8F5] rounded-xl border border-[#E8E2D9] text-xs font-medium text-[#1C1917] focus:outline-none focus:border-[#C59B6D]"
            />
          </div>
        </div>

        {/* Business Name (for Vendor) */}
        {role === "vendor" && (
          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-[#1C1917] mb-1.5">
              Atelier / Business Name *
            </label>
            <div className="relative">
              <Building2 className="w-4 h-4 text-[#C59B6D] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                placeholder="e.g. Versailles Floral & Venue Co."
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-[#FAF8F5] rounded-xl border border-[#E8E2D9] text-xs font-medium text-[#1C1917] focus:outline-none focus:border-[#C59B6D]"
              />
            </div>
          </div>
        )}

        {/* Email */}
        <div>
          <label className="block text-xs uppercase tracking-wider font-semibold text-[#1C1917] mb-1.5">
            Email Address *
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-[#C59B6D] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="email"
              required
              placeholder="e.g. eleanor@wedplan.luxury"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-[#FAF8F5] rounded-xl border border-[#E8E2D9] text-xs font-medium text-[#1C1917] focus:outline-none focus:border-[#C59B6D]"
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="block text-xs uppercase tracking-wider font-semibold text-[#1C1917] mb-1.5">
            Password *
          </label>
          <div className="relative">
            <Lock className="w-4 h-4 text-[#C59B6D] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="password"
              required
              placeholder="Min 6 chars with upper & lower case"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-[#FAF8F5] rounded-xl border border-[#E8E2D9] text-xs font-medium text-[#1C1917] focus:outline-none focus:border-[#C59B6D]"
            />
          </div>

          {/* Password Checklist Rules (PDF requirement) */}
          <div className="mt-2.5 p-3 bg-[#FAF8F5] rounded-xl border border-[#E8E2D9] text-[11px] space-y-1">
            <p className="font-semibold text-gray-500 mb-1">Password Requirements:</p>
            <div className="flex items-center gap-2">
              {hasMinLength ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              ) : (
                <AlertCircle className="w-3.5 h-3.5 text-gray-400" />
              )}
              <span className={hasMinLength ? "text-emerald-700" : "text-gray-500"}>
                Minimum 6 characters
              </span>
            </div>
            <div className="flex items-center gap-2">
              {hasUppercase ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              ) : (
                <AlertCircle className="w-3.5 h-3.5 text-gray-400" />
              )}
              <span className={hasUppercase ? "text-emerald-700" : "text-gray-500"}>
                At least one uppercase letter (A-Z)
              </span>
            </div>
            <div className="flex items-center gap-2">
              {hasLowercase ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              ) : (
                <AlertCircle className="w-3.5 h-3.5 text-gray-400" />
              )}
              <span className={hasLowercase ? "text-emerald-700" : "text-gray-500"}>
                At least one lowercase letter (a-z)
              </span>
            </div>
          </div>
        </div>

        {/* Profile Image Upload (Optional) */}
        <div>
          <label className="block text-xs uppercase tracking-wider font-semibold text-[#1C1917] mb-1.5">
            Profile Photo (Optional)
          </label>
          <div className="flex items-center gap-4">
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Profile Preview"
                className="w-14 h-14 rounded-full object-cover border-2 border-[#C59B6D]"
              />
            ) : (
              <div className="w-14 h-14 rounded-full bg-[#FAF8F5] border border-dashed border-[#E8E2D9] flex items-center justify-center text-gray-400">
                <Upload className="w-5 h-5" />
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageFileChange}
              className="text-xs text-gray-500 file:mr-3 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-[#C59B6D]/10 file:text-[#8E7356] hover:file:bg-[#C59B6D]/20 cursor-pointer"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={submitting || !isPasswordValid}
          className="w-full py-3.5 rounded-full bg-[#C59B6D] hover:bg-[#8E7356] text-white text-xs uppercase tracking-[0.2em] font-semibold transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 mt-4"
        >
          {submitting ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <span>Create {role === "vendor" ? "Vendor Atelier" : "Customer"} Account</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      {/* Google OAuth Option */}
      <div className="pt-2">
        <div className="relative flex items-center justify-center mb-4">
          <div className="border-t border-[#E8E2D9] w-full" />
          <span className="bg-white px-3 text-[10px] uppercase tracking-widest text-gray-400 font-semibold absolute">
            Or register with
          </span>
        </div>

        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={submitting}
          className="w-full py-3 rounded-full border border-[#E8E2D9] hover:border-[#1C1917] bg-[#FAF8F5] text-[#1C1917] text-xs font-medium flex items-center justify-center gap-2 transition-all hover:bg-white"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span>Continue with Google</span>
        </button>
      </div>

      <div className="pt-4 border-t border-[#E8E2D9] text-center text-xs text-gray-500">
        Already have an account?{" "}
        <Link href="/login" className="text-[#C59B6D] font-semibold hover:underline">
          Sign In Here
        </Link>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1C1917] flex flex-col justify-between">
      <Navbar />

      <main className="flex-1 flex items-center justify-center py-32 px-6">
        <div className="max-w-xl w-full">
          <Suspense fallback={<div className="text-center py-12">Loading...</div>}>
            <RegisterForm />
          </Suspense>
        </div>
      </main>

      <Footer />
    </div>
  );
}
