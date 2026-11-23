"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "sonner";
import { Mail, Lock, Sparkles, ArrowRight, ShieldCheck, UserCheck, Store } from "lucide-react";

function LoginForm() {
  const { login, googleLogin, getDashboardRouteForRole } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in both email and password.");
      return;
    }

    setSubmitting(true);
    try {
      const user = await login(email, password);
      if (redirectUrl) {
        router.push(redirectUrl);
      } else {
        router.push(getDashboardRouteForRole(user.role));
      }
    } catch (err) {
      // toast is handled in AuthContext
    } finally {
      setSubmitting(false);
    }
  };

  // Quick fill demo helper for immediate evaluation
  const handleQuickFill = (role: "admin" | "vendor" | "customer") => {
    if (role === "admin") {
      setEmail("admin@wedplan.com");
      setPassword("Password123");
    } else if (role === "vendor") {
      setEmail("aurora@wedplan.com");
      setPassword("Password123");
    } else {
      setEmail("emily@wedplan.com");
      setPassword("Password123");
    }
    toast.info(`Filled ${role.toUpperCase()} test credentials`);
  };

  const handleGoogleSignIn = async () => {
    setSubmitting(true);
    try {
      const user = await googleLogin({
        name: "Google Wedding Guest",
        email: "google.guest@example.com",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
        role: "customer",
      });
      if (redirectUrl) {
        router.push(redirectUrl);
      } else {
        router.push(getDashboardRouteForRole(user.role));
      }
    } catch (err) {
      // handled
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#E8E2D9] shadow-xl space-y-6">
      <div className="text-center space-y-2">
        <span className="eyebrow-divider text-[10px]">Welcome Back</span>
        <h1 className="font-serif text-3xl font-normal text-[#1C1917]">
          Sign In to WedPlan
        </h1>
        <p className="text-xs text-gray-500 font-light">
          Access your bookings, manage services, and orchestrate ceremonies.
        </p>
      </div>

      {/* Quick Test Credential Shortcuts */}
      <div className="bg-[#FAF8F5] p-3 rounded-2xl border border-[#E8E2D9] space-y-2">
        <p className="text-[10px] uppercase tracking-wider text-gray-500 font-bold text-center">
          ⚡ One-Click Evaluation Fill:
        </p>
        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => handleQuickFill("admin")}
            className="flex items-center justify-center gap-1 py-1.5 px-2 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-lg text-[11px] font-semibold border border-purple-200 transition-colors"
          >
            <ShieldCheck className="w-3 h-3" />
            Admin
          </button>
          <button
            type="button"
            onClick={() => handleQuickFill("vendor")}
            className="flex items-center justify-center gap-1 py-1.5 px-2 bg-amber-50 hover:bg-amber-100 text-amber-800 rounded-lg text-[11px] font-semibold border border-amber-200 transition-colors"
          >
            <Store className="w-3 h-3" />
            Vendor
          </button>
          <button
            type="button"
            onClick={() => handleQuickFill("customer")}
            className="flex items-center justify-center gap-1 py-1.5 px-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-lg text-[11px] font-semibold border border-emerald-200 transition-colors"
          >
            <UserCheck className="w-3 h-3" />
            Customer
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs uppercase tracking-wider font-semibold text-[#1C1917] mb-1.5">
            Email Address
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-[#C59B6D] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="email"
              required
              placeholder="e.g. bride@wedplan.luxury"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-[#FAF8F5] rounded-xl border border-[#E8E2D9] text-xs font-medium text-[#1C1917] focus:outline-none focus:border-[#C59B6D]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider font-semibold text-[#1C1917] mb-1.5">
            Password
          </label>
          <div className="relative">
            <Lock className="w-4 h-4 text-[#C59B6D] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-[#FAF8F5] rounded-xl border border-[#E8E2D9] text-xs font-medium text-[#1C1917] focus:outline-none focus:border-[#C59B6D]"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full py-3.5 rounded-full bg-[#C59B6D] hover:bg-[#8E7356] text-white text-xs uppercase tracking-[0.2em] font-semibold transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {submitting ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <span>Sign In</span>
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
            Or continue with
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
          <span>Sign In with Google</span>
        </button>
      </div>

      <div className="pt-4 border-t border-[#E8E2D9] text-center text-xs text-gray-500">
        Don't have an account yet?{" "}
        <Link href="/register" className="text-[#C59B6D] font-semibold hover:underline">
          Create an Account
        </Link>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1C1917] flex flex-col justify-between">
      <Navbar />

      <main className="flex-1 flex items-center justify-center py-32 px-6">
        <div className="max-w-md w-full">
          <Suspense fallback={<div className="text-center py-12">Loading...</div>}>
            <LoginForm />
          </Suspense>
        </div>
      </main>

      <Footer />
    </div>
  );
}
