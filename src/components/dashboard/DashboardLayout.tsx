"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { UserRole } from "@/types";
import {
  LayoutDashboard,
  Layers,
  PlusCircle,
  CalendarCheck,
  CreditCard,
  UserCheck,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronRight,
  ShieldCheck,
  Sparkles,
  ArrowLeft,
} from "lucide-react";
import { toast } from "sonner";

interface DashboardLayoutProps {
  children: React.ReactNode;
  allowedRole: UserRole;
  title: string;
  subtitle?: string;
}

export default function DashboardLayout({
  children,
  allowedRole,
  title,
  subtitle,
}: DashboardLayoutProps) {
  const { user, isLoading, logout, getDashboardRouteForRole } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Enforce Role-Based Access Control and Authentication
  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        toast.error("Please sign in to access the dashboard.");
        router.push("/login");
        return;
      }

      if (user.isBlocked) {
        toast.error("Your account has been blocked. Access is restricted.");
        logout();
        return;
      }

      // If user attempts to access another role's dashboard URL:
      if (user.role !== allowedRole) {
        toast.error(`Forbidden: You cannot access the ${allowedRole} dashboard.`);
        router.push(getDashboardRouteForRole(user.role));
      }
    }
  }, [user, isLoading, allowedRole, router, logout, getDashboardRouteForRole]);

  if (isLoading || !user || user.role !== allowedRole) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-[#C59B6D] border-t-transparent rounded-full animate-spin" />
          <p className="text-xs uppercase tracking-widest text-gray-500 font-medium">
            Verifying Atelier Security Credentials...
          </p>
        </div>
      </div>
    );
  }

  // Navigation Links tailored to Role
  const vendorLinks = [
    { href: "/dashboard/vendor", label: "Overview", icon: LayoutDashboard },
    { href: "/dashboard/vendor/services", label: "My Services", icon: Layers },
    { href: "/dashboard/vendor/add-service", label: "Add Service", icon: PlusCircle },
    { href: "/dashboard/vendor/bookings", label: "Booking Requests", icon: CalendarCheck },
    { href: "/dashboard/vendor/subscription", label: "Subscription", icon: CreditCard },
    { href: "/dashboard/vendor/profile", label: "Profile Settings", icon: Settings },
  ];

  const customerLinks = [
    { href: "/dashboard/customer", label: "Overview", icon: LayoutDashboard },
    { href: "/dashboard/customer/bookings", label: "My Bookings", icon: CalendarCheck },
    { href: "/dashboard/customer/profile", label: "Profile Settings", icon: Settings },
  ];

  const adminLinks = [
    { href: "/dashboard/admin", label: "Overview", icon: LayoutDashboard },
    { href: "/dashboard/admin/users", label: "Manage Users", icon: Users },
    { href: "/dashboard/admin/services", label: "Manage Services", icon: Layers },
    { href: "/dashboard/admin/transactions", label: "Transactions", icon: CreditCard },
    { href: "/dashboard/admin/profile", label: "Profile Settings", icon: Settings },
  ];

  const links =
    allowedRole === "admin"
      ? adminLinks
      : allowedRole === "vendor"
      ? vendorLinks
      : customerLinks;

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1C1917] flex">
      {/* Desktop Fixed Sidebar */}
      <aside className="hidden lg:flex flex-col w-72 bg-white border-r border-[#E8E2D9] fixed inset-y-0 left-0 z-40">
        {/* Brand Header */}
        <div className="p-6 border-b border-[#E8E2D9] flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#C59B6D] flex items-center justify-center text-white font-serif font-bold text-base shadow-sm">
              W
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl tracking-wider font-semibold uppercase text-[#1C1917]">
                WedPlan
              </span>
              <span className="text-[9px] uppercase tracking-widest text-[#C59B6D] font-bold">
                {allowedRole} Portal
              </span>
            </div>
          </Link>
        </div>

        {/* User Card */}
        <div className="p-5 mx-4 my-4 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D9]">
          <div className="flex items-center gap-3">
            <img
              src={
                user.image ||
                "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
              }
              alt={user.name}
              className="w-11 h-11 rounded-full object-cover border-2 border-[#C59B6D]"
            />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-[#1C1917] truncate">{user.name}</p>
              <p className="text-[11px] text-gray-500 truncate">{user.email}</p>
              <div className="mt-1 flex items-center gap-1.5">
                <span className="text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#C59B6D]/15 text-[#8E7356]">
                  {user.role}
                </span>
                {user.subscriptionPlan === "premium" && (
                  <span className="text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                    ★ Premium
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
          {links.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between px-4 py-3 rounded-xl text-xs uppercase tracking-wider font-semibold transition-all ${
                  isActive
                    ? "bg-[#C59B6D] text-white shadow-sm"
                    : "text-gray-600 hover:bg-[#FAF8F5] hover:text-[#C59B6D]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
                {isActive && <ChevronRight className="w-4 h-4 text-white" />}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-[#E8E2D9] space-y-2">
          <Link
            href="/"
            className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-semibold text-gray-600 hover:bg-[#FAF8F5] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-gray-400" />
            <span>Return to Public Site</span>
          </Link>

          <button
            onClick={logout}
            className="w-full flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-72 flex flex-col min-w-0">
        {/* Top Navbar */}
        <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-[#E8E2D9] px-6 sm:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div>
              <h1 className="font-serif text-2xl font-normal text-[#1C1917]">{title}</h1>
              {subtitle && <p className="text-xs text-gray-500 font-light">{subtitle}</p>}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/services"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#E8E2D9] text-xs font-semibold text-gray-700 hover:border-[#C59B6D] hover:text-[#C59B6D] transition-colors"
            >
              <span>Explore Marketplace</span>
              <Sparkles className="w-3.5 h-3.5 text-[#C59B6D]" />
            </Link>

            <img
              src={
                user.image ||
                "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
              }
              alt={user.name}
              className="w-9 h-9 rounded-full object-cover border border-[#C59B6D]"
            />
          </div>
        </header>

        {/* Page Children Content */}
        <main className="p-6 sm:p-8 flex-1">{children}</main>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <div className="relative w-72 bg-white h-full flex flex-col z-10 p-6 animate-in slide-in-from-left duration-300">
            <div className="flex items-center justify-between pb-4 border-b border-[#E8E2D9]">
              <span className="font-serif text-xl font-bold uppercase text-[#1C1917]">
                WedPlan
              </span>
              <button onClick={() => setMobileSidebarOpen(false)}>
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <nav className="flex-1 py-6 space-y-1">
              {links.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileSidebarOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs uppercase tracking-wider font-semibold transition-all ${
                      isActive
                        ? "bg-[#C59B6D] text-white"
                        : "text-gray-600 hover:bg-[#FAF8F5]"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="pt-4 border-t border-[#E8E2D9]">
              <button
                onClick={logout}
                className="w-full flex items-center gap-2 text-xs font-semibold text-red-600"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
