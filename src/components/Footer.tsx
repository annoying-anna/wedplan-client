"use client";

import React from "react";
import Link from "next/link";
import {
  Instagram,
  Facebook,
  Twitter,
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
                Let's Talk
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
                className="w-9 h-9 rounded-full border border-[#3E3936] hover:border-[#C59B6D] hover:text-[#C59B6D] flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full border border-[#3E3936] hover:border-[#C59B6D] hover:text-[#C59B6D] flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full border border-[#3E3936] hover:border-[#C59B6D] hover:text-[#C59B6D] flex items-center justify-center transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
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
