"use client";

import React from "react";
import Link from "next/link";
import {
  Mail,
  MapPin,
  Phone,
  ArrowUpRight,
  Heart,
} from "lucide-react";

export default function Footer() {
  return (
    <footer id="contact" className="bg-[#181615] text-[#D8D2C9] pt-20 pb-12 border-t border-[#2A2624]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Top Call To Action Banner */}
        <div className="pb-16 border-b border-[#2D2927] flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <span className="eyebrow-divider text-xs mb-3 text-[#C59B6D]">
              Ready to collaborate
            </span>
            <h3 className="font-serif text-3xl md:text-5xl text-white font-normal leading-tight mt-2">
              Ready to book a consultation or <br className="hidden md:block" />
              have a question for our team?
            </h3>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/services"
              className="group relative w-32 h-32 rounded-full border border-[#C59B6D]/40 hover:border-[#C59B6D] flex flex-col items-center justify-center transition-all duration-300 hover:scale-105 bg-[#231F1D]"
            >
              <div className="w-10 h-10 rounded-full bg-[#C59B6D] text-white flex items-center justify-center transition-transform group-hover:rotate-45">
                <ArrowUpRight className="w-5 h-5" />
              </div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#C59B6D] font-bold mt-2">
                Let&apos;s Talk
              </span>
            </Link>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 py-16 border-b border-[#2D2927]">
          {/* Col 1: About */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#C59B6D] flex items-center justify-center text-white font-serif font-bold text-sm">
                W
              </div>
              <span className="font-serif text-2xl tracking-widest text-white uppercase">
                WedPlan
              </span>
            </div>
            <p className="text-sm text-[#A8A199] leading-relaxed font-light pr-4">
              WedPlan is the world’s premier curated bridal & event platform. We connect couples
              with legendary venues, master photographers, haute couture stylists, and bespoke
              wedding artisans.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full border border-[#3E3936] hover:border-[#C59B6D] hover:text-[#C59B6D] flex items-center justify-center transition-colors text-white"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full border border-[#3E3936] hover:border-[#C59B6D] hover:text-[#C59B6D] flex items-center justify-center transition-colors text-white"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.597 0 9 1.583 9 4.615V8z"/>
                </svg>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full border border-[#3E3936] hover:border-[#C59B6D] hover:text-[#C59B6D] flex items-center justify-center transition-colors text-white"
                aria-label="Twitter"
              >
                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.25em] font-semibold text-white mb-6">
              Navigation
            </h4>
            <ul className="space-y-3 text-sm text-[#A8A199] font-light">
              <li>
                <Link href="/" className="hover:text-[#C59B6D] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-[#C59B6D] transition-colors">
                  Explore Wedding Services
                </Link>
              </li>
              <li>
                <Link href="/register" className="hover:text-[#C59B6D] transition-colors">
                  Become a WedPlan Vendor
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-[#C59B6D] transition-colors">
                  Client & Vendor Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Wedding Categories */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.25em] font-semibold text-white mb-6">
              Service Categories
            </h4>
            <ul className="space-y-3 text-sm text-[#A8A199] font-light">
              <li>
                <Link
                  href="/services?category=Photography%20%26%20Videography"
                  className="hover:text-[#C59B6D] transition-colors"
                >
                  Photography & Videography
                </Link>
              </li>
              <li>
                <Link
                  href="/services?category=Wedding%20Venues"
                  className="hover:text-[#C59B6D] transition-colors"
                >
                  Wedding Venues & Ballrooms
                </Link>
              </li>
              <li>
                <Link
                  href="/services?category=Decoration%20%26%20Florist"
                  className="hover:text-[#C59B6D] transition-colors"
                >
                  Decoration & Floral Design
                </Link>
              </li>
              <li>
                <Link
                  href="/services?category=Catering%20Services"
                  className="hover:text-[#C59B6D] transition-colors"
                >
                  Gourmet Catering & Cakes
                </Link>
              </li>
              <li>
                <Link
                  href="/services?category=Makeup%20%26%20Styling"
                  className="hover:text-[#C59B6D] transition-colors"
                >
                  Bridal Hair & Makeup Styling
                </Link>
              </li>
              <li>
                <Link
                  href="/services?category=Wedding%20Fashion"
                  className="hover:text-[#C59B6D] transition-colors"
                >
                  Haute Couture Gowns & Suits
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Concierge */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.25em] font-semibold text-white mb-6">
              Concierge Desk
            </h4>
            <ul className="space-y-4 text-sm text-[#A8A199] font-light">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#C59B6D] mt-0.5 shrink-0" />
                <span>450 Madison Avenue, 18th Floor, New York, NY 10022</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#C59B6D] shrink-0" />
                <span>+1 (800) 420-9337</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#C59B6D] shrink-0" />
                <span>concierge@wedplan.luxury</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#7A736B] gap-4">
          <p>© {new Date().getFullYear()} WedPlan Atelier Platform. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-[#C59B6D] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-[#C59B6D] transition-colors">
              Terms & Conditions
            </Link>
            <span className="flex items-center gap-1 text-[#9E958C]">
              Crafted with <Heart className="w-3 h-3 text-[#C59B6D] fill-[#C59B6D]" /> for unforgettable celebrations
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
