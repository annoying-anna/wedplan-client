"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  Sparkles,
  User as UserIcon,
  LayoutDashboard,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronDown,
  Shield,
  Store,
  HeartHandshake,
} from "lucide-react";

interface NavbarProps {
  transparent?: boolean;
}

export default function Navbar({ transparent = false }: NavbarProps) {
  const { user, logout, getDashboardRouteForRole } = useAuth();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile menu when pathname changes
  useEffect(() => {
    setMobileMenuOpen(false);
    setDropdownOpen(false);
  }, [pathname]);

  const isHome = pathname === "/";
  const shouldBeDarkText = !transparent || isScrolled || !isHome;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "glass-header shadow-sm py-4 border-b border-[#E8E2D9]/80"
          : transparent && isHome
          ? "bg-gradient-to-b from-black/60 via-black/20 to-transparent py-6 text-white"
          : "bg-[#FAF8F5]/90 backdrop-blur-md py-6 border-b border-[#E8E2D9]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-full bg-[#C59B6D] flex items-center justify-center text-white font-serif text-lg font-bold shadow-sm transition-transform duration-300 group-hover:scale-105">
            W
          </div>
          <div className="flex flex-col">
            <span
              className={`font-serif text-2xl tracking-[0.12em] font-medium uppercase transition-colors ${
                shouldBeDarkText ? "text-[#1C1917]" : "text-white"
              }`}
            >
              WedPlan
            </span>
            <span
              className={`text-[9px] uppercase tracking-[0.3em] font-sans -mt-1 font-semibold ${
                shouldBeDarkText ? "text-[#C59B6D]" : "text-white/85"
              }`}
            >
              Wedding Atelier
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-7 text-[12px] tracking-[0.2em] uppercase font-medium">
          <Link
            href="/"
            className={`transition-colors duration-200 relative py-1 hover:text-[#C59B6D] ${
              pathname === "/"
                ? "text-[#C59B6D] font-semibold after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#C59B6D]"
                : shouldBeDarkText
                ? "text-[#1C1917]/80"
                : "text-white/90"
            }`}
          >
            Home
          </Link>
          <Link
            href="/services"
            className={`transition-colors duration-200 relative py-1 hover:text-[#C59B6D] ${
              pathname.startsWith("/services")
                ? "text-[#C59B6D] font-semibold after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#C59B6D]"
                : shouldBeDarkText
                ? "text-[#1C1917]/80"
                : "text-white/90"
            }`}
          >
            Browse Services
          </Link>
          <a
            href="/#venues"
            className={`transition-colors duration-200 hover:text-[#C59B6D] ${
              shouldBeDarkText ? "text-[#1C1917]/80" : "text-white/90"
            }`}
          >
            Venues
          </a>
          <a
            href="/#how-it-works"
            className={`transition-colors duration-200 hover:text-[#C59B6D] ${
              shouldBeDarkText ? "text-[#1C1917]/80" : "text-white/90"
            }`}
          >
            How It Works
          </a>
          <a
            href="/#pricing"
            className={`transition-colors duration-200 hover:text-[#C59B6D] ${
              shouldBeDarkText ? "text-[#1C1917]/80" : "text-white/90"
            }`}
          >
            Pricing
          </a>
          <a
            href="/#about"
            className={`transition-colors duration-200 hover:text-[#C59B6D] ${
              shouldBeDarkText ? "text-[#1C1917]/80" : "text-white/90"
            }`}
          >
            About Us
          </a>
          <a
            href="/#contact"
            className={`transition-colors duration-200 hover:text-[#C59B6D] ${
              shouldBeDarkText ? "text-[#1C1917]/80" : "text-white/90"
            }`}
          >
            Contact
          </a>
        </nav>

        {/* Right CTA / Auth Status */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className={`flex items-center gap-3 px-3 py-1.5 rounded-full border transition-all duration-200 ${
                  shouldBeDarkText
                    ? "border-[#E8E2D9] hover:border-[#C59B6D] bg-white/70"
                    : "border-white/30 hover:border-white bg-black/20 text-white"
                }`}
              >
                <img
                  src={user.image || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"}
                  alt={user.name}
                  className="w-7 h-7 rounded-full object-cover border border-[#C59B6D]"
                />
                <span
                  className={`text-xs font-medium max-w-[120px] truncate ${
                    shouldBeDarkText ? "text-[#1C1917]" : "text-white"
                  }`}
                >
                  {user.name}
                </span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform ${
                    dropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-white shadow-xl border border-[#E8E2D9] py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200 text-[#1C1917]">
                  <div className="px-4 py-3 border-b border-[#E8E2D9]/60">
                    <p className="text-xs text-[#8E7356] font-medium uppercase tracking-wider">
                      Signed in as
                    </p>
                    <p className="text-sm font-semibold text-[#1C1917] truncate">{user.name}</p>
                    <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <span
                        className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${
                          user.role === "admin"
                            ? "bg-purple-100 text-purple-700 border border-purple-200"
                            : user.role === "vendor"
                            ? "bg-amber-100 text-amber-800 border border-amber-200"
                            : "bg-emerald-100 text-emerald-800 border border-emerald-200"
                        }`}
                      >
                        {user.role}
                      </span>
                      {user.subscriptionPlan === "premium" && (
                        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#C59B6D]/15 text-[#8E7356] border border-[#C59B6D]/40">
                          ★ Premium
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="py-1">
                    <Link
                      href={getDashboardRouteForRole(user.role)}
                      className="flex items-center gap-3 px-4 py-2.5 text-xs tracking-wider uppercase font-medium hover:bg-[#FAF8F5] hover:text-[#C59B6D] transition-colors"
                    >
                      <LayoutDashboard className="w-4 h-4 text-[#C59B6D]" />
                      Dashboard
                    </Link>

                    <Link
                      href={`${getDashboardRouteForRole(user.role)}/profile`}
                      className="flex items-center gap-3 px-4 py-2.5 text-xs tracking-wider uppercase font-medium hover:bg-[#FAF8F5] hover:text-[#C59B6D] transition-colors"
                    >
                      <Settings className="w-4 h-4 text-gray-500" />
                      Profile Settings
                    </Link>
                  </div>

                  <div className="border-t border-[#E8E2D9]/60 pt-1">
                    <button
                      onClick={logout}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-xs tracking-wider uppercase font-medium text-red-600 hover:bg-red-50 transition-colors text-left"
                    >
                      <LogOut className="w-4 h-4 text-red-500" />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className={`text-xs tracking-[0.15em] uppercase font-medium px-4 py-2 rounded-full transition-colors ${
                  shouldBeDarkText
                    ? "text-[#1C1917] hover:text-[#C59B6D]"
                    : "text-white/90 hover:text-white"
                }`}
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="text-xs tracking-[0.15em] uppercase font-medium px-5 py-2.5 rounded-full border border-[#C59B6D] bg-[#C59B6D] text-white hover:bg-[#8E7356] hover:border-[#8E7356] transition-all shadow-sm"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={`md:hidden p-2 rounded-lg transition-colors ${
            shouldBeDarkText ? "text-[#1C1917]" : "text-white"
          }`}
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-[#E8E2D9] px-6 py-6 animate-in slide-in-from-top-4 duration-300 shadow-xl text-[#1C1917]">
          <div className="flex flex-col gap-4 text-xs uppercase tracking-widest font-medium">
            <Link href="/" className="py-2 border-b border-gray-100 hover:text-[#C59B6D]">
              Home
            </Link>
            <Link
              href="/services"
              className="py-2 border-b border-gray-100 hover:text-[#C59B6D]"
            >
              Browse Services
            </Link>
            <a href="/#venues" className="py-2 border-b border-gray-100 hover:text-[#C59B6D]">
              Venues
            </a>
            <a href="/#how-it-works" className="py-2 border-b border-gray-100 hover:text-[#C59B6D]">
              How It Works
            </a>
            <a href="/#pricing" className="py-2 border-b border-gray-100 hover:text-[#C59B6D]">
              Pricing
            </a>
            <a href="/#about" className="py-2 border-b border-gray-100 hover:text-[#C59B6D]">
              About Us
            </a>
            <a href="/#contact" className="py-2 border-b border-gray-100 hover:text-[#C59B6D]">
              Contact
            </a>

            {user ? (
              <div className="pt-2 border-t border-gray-100 flex flex-col gap-3">
                <div className="flex items-center gap-3 py-2">
                  <img
                    src={user.image || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"}
                    alt={user.name}
                    className="w-10 h-10 rounded-full object-cover border"
                  />
                  <div>
                    <p className="font-semibold text-sm">{user.name}</p>
                    <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                  </div>
                </div>

                <Link
                  href={getDashboardRouteForRole(user.role)}
                  className="py-2 flex items-center gap-2 text-[#C59B6D]"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Go to Dashboard
                </Link>

                <button
                  onClick={logout}
                  className="py-2 flex items-center gap-2 text-red-600 text-left"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            ) : (
              <div className="pt-4 flex flex-col gap-2">
                <Link
                  href="/login"
                  className="w-full text-center py-2.5 border border-[#1C1917] rounded-full text-xs font-semibold"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="w-full text-center py-2.5 bg-[#C59B6D] text-white rounded-full text-xs font-semibold"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
