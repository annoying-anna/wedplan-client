"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServiceCard from "@/components/ServiceCard";
import { Service } from "@/types";
import { fetchApi } from "@/lib/api";
import { motion } from "framer-motion";
import {
  Camera,
  Castle,
  Flower2,
  UtensilsCrossed,
  Sparkles,
  Shirt,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Users2,
  ArrowRight,
  Heart,
  Quote,
  Star,
  Check,
} from "lucide-react";

export default function HomePage() {
  const [featuredServices, setFeaturedServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadFeatured = async () => {
      try {
        const data = await fetchApi<{ success: boolean; services: Service[] }>(
          "/services/featured"
        );
        if (data.success && data.services) {
          setFeaturedServices(data.services);
        }
      } catch (err) {
        console.error("Error loading featured services:", err);
      } finally {
        setLoading(false);
      }
    };
    loadFeatured();
  }, []);

  const categories = [
    {
      name: "Photography & Videography",
      icon: Camera,
      image:
        "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=600&q=80",
      description: "Timeless documentary & cinematic captures",
    },
    {
      name: "Wedding Venues",
      icon: Castle,
      image:
        "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=600&q=80",
      description: "Historic estates, ballrooms & romantic vineyards",
    },
    {
      name: "Decoration & Florist",
      icon: Flower2,
      image:
        "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=600&q=80",
      description: "Bespoke botanicals, ceremony arches & candlelight",
    },
    {
      name: "Catering Services",
      icon: UtensilsCrossed,
      image:
        "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=600&q=80",
      description: "Artisanal gastronomy, plated feasts & custom cakes",
    },
    {
      name: "Makeup & Styling",
      icon: Sparkles,
      image:
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=600&q=80",
      description: "High-definition bridal glam & bespoke hairstyling",
    },
    {
      name: "Wedding Fashion",
      icon: Shirt,
      image:
        "https://images.unsplash.com/photo-1594552072238-b8a33785b261?auto=format&fit=crop&w=600&q=80",
      description: "Haute couture gowns, tailored tuxedos & veils",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1C1917] selection:bg-[#C59B6D] selection:text-white">
      {/* Top Navbar with transparent style over hero */}
      <Navbar transparent={true} />

      {/* 1. HERO BANNER SECTION (Matching provided UI/UX reference) */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Wedding Image with romantic lighting */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-105"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2000&q=85')",
          }}
        />

        {/* Sophisticated Luxury Dark Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />

        {/* Vertical Social Links on the right (as seen in the design reference) */}
        <div className="hidden lg:flex flex-col items-center gap-6 absolute right-8 top-1/2 -translate-y-1/2 z-20 text-white/70">
          <div className="w-[1px] h-12 bg-white/30" />
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#C59B6D] transition-colors text-xs font-semibold tracking-wider hover:scale-110"
          >
            FB
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#C59B6D] transition-colors text-xs font-semibold tracking-wider hover:scale-110"
          >
            TW
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#C59B6D] transition-colors text-xs font-semibold tracking-wider hover:scale-110"
          >
            IG
          </a>
          <div className="w-[1px] h-12 bg-white/30" />
        </div>

        {/* Hero Center Text Content */}
        <div className="relative z-20 max-w-5xl mx-auto px-6 text-center text-white pt-24 pb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Eyebrow Label with flanking gold lines */}
            <div className="inline-flex items-center gap-3 text-xs md:text-sm font-semibold tracking-[0.3em] uppercase text-[#C59B6D] mb-6">
              <span className="w-8 h-[1px] bg-[#C59B6D]" />
              WEDDING PLANNER & ATELIER
              <span className="w-8 h-[1px] bg-[#C59B6D]" />
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal leading-[1.08] tracking-tight mb-8">
              Your Dream Wedding <br />
              <span className="italic font-normal text-[#E8DED8]">Made Perfect</span>
            </h1>

            {/* Description */}
            <p className="max-w-2xl mx-auto text-base sm:text-lg text-white/80 font-light leading-relaxed mb-10">
              Discover legendary venues, world-class photographers, bespoke floral artists, and
              curated wedding designers to orchestrate an unforgettable celebration.
            </p>

            {/* CTA Button */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/services"
                className="w-full sm:w-auto px-9 py-4 rounded-full bg-[#C59B6D] hover:bg-[#8E7356] text-white text-xs uppercase tracking-[0.2em] font-semibold transition-all shadow-xl hover:shadow-2xl hover:scale-105"
              >
                Explore Wedding Services
              </Link>
              <a
                href="#about"
                className="w-full sm:w-auto px-9 py-4 rounded-full border border-white/50 hover:border-white bg-black/20 hover:bg-white/10 text-white text-xs uppercase tracking-[0.2em] font-semibold transition-all backdrop-blur-sm"
              >
                Learn More
              </a>
            </div>
          </motion.div>
        </div>

        {/* Magazine / Press Logos Bar */}
        <div className="absolute bottom-0 left-0 right-0 z-20 py-8 bg-gradient-to-t from-black/90 to-transparent border-t border-white/10">
          <div className="max-w-6xl mx-auto px-6 flex flex-wrap items-center justify-around gap-8 text-white/50 text-xs font-serif tracking-[0.25em] uppercase">
            <span className="font-bold text-sm tracking-widest text-white/60">Forbes</span>
            <span className="font-serif italic text-sm text-white/60">The New York Times</span>
            <span className="font-serif text-sm tracking-wider text-white/60">The Guardian</span>
            <span className="font-bold text-sm tracking-widest text-white/60">TIME</span>
            <span className="font-semibold text-sm tracking-widest text-white/60">NBC NEWS</span>
          </div>
        </div>
      </section>

      {/* 2. DYNAMIC SECTION 1: FEATURED WEDDING SERVICES (At least 6 services) */}
      <section className="py-28 px-6 sm:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="eyebrow-divider mb-3">Curated Collection</span>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#1C1917] mt-2 mb-4">
            Featured Wedding Services
          </h2>
          <p className="text-sm sm:text-base text-gray-500 font-light leading-relaxed">
            Hand-selected top rated wedding artisans and verified venues, vetted for luxury,
            impeccable reliability, and timeless excellence.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="h-96 rounded-2xl bg-gray-100 animate-pulse border border-[#E8E2D9]"
              />
            ))}
          </div>
        ) : featuredServices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredServices.map((service) => (
              <ServiceCard key={service._id} service={service} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-[#E8E2D9]">
            <p className="text-gray-500">No services found in database yet.</p>
          </div>
        )}

        <div className="text-center mt-16">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-[#1C1917] text-[#1C1917] hover:bg-[#1C1917] hover:text-white transition-all text-xs uppercase tracking-[0.2em] font-semibold"
          >
            <span>View All Wedding Services</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 3. DYNAMIC SECTION 2: WEDDING SERVICE CATEGORIES */}
      <section className="py-24 bg-[#F5EFEB] border-y border-[#E8E2D9]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="eyebrow-divider mb-3">Explore by Discipline</span>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#1C1917] mt-2 mb-4">
              Wedding Service Categories
            </h2>
            <p className="text-sm text-gray-500 font-light leading-relaxed">
              Explore your celebration essentials by category, curated with the highest standards of
              craftsmanship and luxury.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat, idx) => {
              const IconComp = cat.icon;
              return (
                <Link
                  key={idx}
                  href={`/services?category=${encodeURIComponent(cat.name)}`}
                  className="group relative h-80 rounded-2xl overflow-hidden border border-[#E8E2D9] shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col justify-end p-8"
                >
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10 group-hover:from-black/90 transition-all" />

                  <div className="relative z-10 text-white">
                    <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mb-4 text-[#C59B6D] border border-white/30 group-hover:bg-[#C59B6D] group-hover:text-white transition-colors">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <h3 className="font-serif text-2xl font-normal text-white group-hover:text-[#C59B6D] transition-colors mb-2">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-white/80 font-light leading-relaxed">
                      {cat.description}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-widest text-[#C59B6D] font-semibold mt-4 group-hover:translate-x-1 transition-transform">
                      Browse Category <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. "ABOUT COMPANY" / "WHY CHOOSE WEDPLAN?" (Exact match to design reference) */}
      <section id="about" className="py-28 max-w-7xl mx-auto px-6 sm:px-8">
        <div className="text-center mb-16">
          <span className="eyebrow-divider mb-3">Our Company</span>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#1C1917] mt-2">
            About Company
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Romantic Wedding Bride in Car Image with Circular Stamp Badge */}
          <div className="relative">
            <div className="relative h-[480px] w-full rounded-2xl overflow-hidden shadow-2xl border border-[#E8E2D9]">
              <img
                src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80"
                alt="Bride in vintage convertible car"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Circular Stamp Overlay Badge matching design: RECEPTION • RECEPTION in warm terracotta */}
            <div className="absolute -bottom-8 -right-6 sm:right-6 w-36 h-36 rounded-full bg-[#C7795C] text-white flex items-center justify-center p-3 shadow-2xl border-4 border-[#FAF8F5]">
              <div className="relative w-full h-full rounded-full border border-dashed border-white/60 flex items-center justify-center animate-spin-slow">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <path
                    id="stampCircle"
                    d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                    fill="none"
                  />
                  <text className="text-[9px] font-bold uppercase tracking-[0.25em] fill-white">
                    <textPath xlinkHref="#stampCircle" startOffset="0%">
                      WEDPLAN • RECEPTION • ATELIER •
                    </textPath>
                  </text>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Right: Narrative text and pill button */}
          <div className="space-y-6">
            <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1C1917] leading-tight">
              We are a team of passionate and experienced wedding planners
            </h3>

            <p className="text-gray-600 font-light leading-relaxed text-sm sm:text-base">
              Our team of wedding planners is passionate about creating unforgettable wedding
              experiences. We understand that every wedding is unique, and we work closely with our
              clients to ensure that their vision becomes a breathtaking reality.
            </p>

            <p className="text-gray-600 font-light leading-relaxed text-sm sm:text-base">
              Our approach is personal, friendly, and deeply professional. From historic Scottish
              manors to California wine country estates, we strive to make the planning process as
              effortless and stress-free as possible.
            </p>

            <div className="pt-4">
              <Link
                href="/services"
                className="inline-block px-9 py-3.5 rounded-full border border-[#1C1917] text-[#1C1917] hover:bg-[#1C1917] hover:text-white transition-all text-xs uppercase tracking-[0.2em] font-semibold"
              >
                Book Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. BENEFITS SECTION (Matching original-5e2d8d13614a878c8884d531ffeb1ac2.webp) */}
      <section className="py-24 bg-white border-y border-[#E8E2D9]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <span className="eyebrow-divider mb-3">Benefit</span>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#1C1917] mt-2 mb-4">
              Perfect moments simply reveal themselves
            </h2>
            <p className="text-sm text-gray-500 font-light">
              Elevate every facet of your celebration with structured ease, financial transparency,
              and master coordination.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Benefit 1 */}
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D9] flex items-center justify-center text-[#C59B6D]">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-medium text-[#1C1917]">Saves Time & Energy</h3>
              <p className="text-xs text-gray-500 font-light leading-relaxed">
                By using our curated wedding planning platform, you no longer need to worry about
                every single detail of your celebration alone.
              </p>
            </div>

            {/* Benefit 2 */}
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D9] flex items-center justify-center text-[#C59B6D]">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-medium text-[#1C1917]">Budget Management</h3>
              <p className="text-xs text-gray-500 font-light leading-relaxed">
                WedPlan helps you manage your wedding budget and provides clear advice on how to save
                without sacrificing the quality or wonder of your wedding.
              </p>
            </div>

            {/* Benefit 3 */}
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D9] flex items-center justify-center text-[#C59B6D]">
                <Users2 className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-medium text-[#1C1917]">Efficient Coordination</h3>
              <p className="text-xs text-gray-500 font-light leading-relaxed">
                Coordinate all artisans involved in your wedding in one centralized place, from
                bespoke catering and decor to photographers.
              </p>
            </div>

            {/* Benefit 4 */}
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D9] flex items-center justify-center text-[#C59B6D]">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-medium text-[#1C1917]">
                Handling Unexpected Situations
              </h3>
              <p className="text-xs text-gray-500 font-light leading-relaxed">
                Feel at ease and confident that every detail is backed by verified vendor contracts,
                guaranteed timelines, and professional care.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. PRICING PLANS SECTION (Matching original-ec15bfe3357ec72c52afbfa013261102.webp) */}
      <section id="pricing" className="py-28 max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="eyebrow-divider mb-3">Plan</span>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#1C1917] mt-2">
              We've got a pricing plan that's <br className="hidden sm:block" />
              perfect for you
            </h2>
          </div>
          <Link
            href="/services"
            className="self-start md:self-auto px-6 py-2.5 rounded-full border border-[#1C1917]/20 text-[#1C1917] hover:border-[#1C1917] text-xs uppercase tracking-widest font-semibold transition-colors"
          >
            See All Services
          </Link>
        </div>

        {/* 3 Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {/* Card 1: Local Event */}
          <div className="bg-white rounded-2xl p-8 border border-[#E8E2D9] flex flex-col justify-between shadow-sm hover:shadow-lg transition-all">
            <div>
              <span className="text-xs uppercase tracking-widest font-medium text-gray-400">
                Couples Package
              </span>
              <h3 className="font-serif text-2xl text-[#1C1917] mt-1 mb-4">Local Event</h3>
              <div className="text-3xl font-serif font-bold text-[#1C1917] mb-2">$ 999.00 USD</div>
              <p className="text-xs text-gray-500 font-light pb-6 border-b border-[#E8E2D9]">
                Ideal for intimate celebrations and micro-weddings.
              </p>

              <ul className="space-y-4 my-6 text-xs text-gray-600">
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-[#C59B6D]" />
                  <span>2 Curated Vendor Recommendations</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-[#C59B6D]" />
                  <span>Up to 50 Wedding Guests</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-[#C59B6D]" />
                  <span>Personalised Event Timelines</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-[#C59B6D]" />
                  <span>Digital RSVP & Seating System</span>
                </li>
              </ul>
            </div>

            <Link
              href="/register"
              className="w-full text-center py-3 rounded-full border border-[#1C1917] text-[#1C1917] hover:bg-[#1C1917] hover:text-white transition-all text-xs uppercase tracking-widest font-semibold mt-4"
            >
              Get Started
            </Link>
          </div>

          {/* Card 2: Standard Event (Highlighted in dark olive green #525D4F matching mockup) */}
          <div className="bg-[#525D4F] text-white rounded-2xl p-8 border border-[#525D4F] flex flex-col justify-between shadow-2xl relative md:-translate-y-4">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#C59B6D] text-white text-[10px] uppercase font-bold tracking-widest px-4 py-1 rounded-full shadow-md">
              Most Popular
            </div>
            <div>
              <span className="text-xs uppercase tracking-widest font-medium text-white/70">
                Vendor Atelier Upgrade
              </span>
              <h3 className="font-serif text-2xl text-white mt-1 mb-4">Vendor Premium Plan</h3>
              <div className="text-3xl font-serif font-bold text-white mb-2">$ 49.00 USD</div>
              <p className="text-xs text-white/80 font-light pb-6 border-b border-white/20">
                Unlock unlimited wedding service listings and verified badges.
              </p>

              <ul className="space-y-4 my-6 text-xs text-white/90">
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-[#DFBF99]" />
                  <span className="font-semibold text-[#DFBF99]">Unlimited Active Services</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-[#DFBF99]" />
                  <span>Premium Gold Atelier Badge</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-[#DFBF99]" />
                  <span>Priority Placement on Homepage & Browse</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-[#DFBF99]" />
                  <span>Direct Customer Booking Management</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-[#DFBF99]" />
                  <span>Stripe Secure Payment Processing</span>
                </li>
              </ul>
            </div>

            <Link
              href="/register?role=vendor"
              className="w-full text-center py-3.5 rounded-full bg-white text-[#525D4F] hover:bg-[#C59B6D] hover:text-white transition-all text-xs uppercase tracking-widest font-semibold mt-4 shadow-lg"
            >
              Choose Plan
            </Link>
          </div>

          {/* Card 3: International Event */}
          <div className="bg-white rounded-2xl p-8 border border-[#E8E2D9] flex flex-col justify-between shadow-sm hover:shadow-lg transition-all">
            <div>
              <span className="text-xs uppercase tracking-widest font-medium text-gray-400">
                Destination Grand
              </span>
              <h3 className="font-serif text-2xl text-[#1C1917] mt-1 mb-4">Grand Celebration</h3>
              <div className="text-3xl font-serif font-bold text-[#1C1917] mb-2">$ 2,999.00 USD</div>
              <p className="text-xs text-gray-500 font-light pb-6 border-b border-[#E8E2D9]">
                Full concierge orchestration for multi-day weddings.
              </p>

              <ul className="space-y-4 my-6 text-xs text-gray-600">
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-[#C59B6D]" />
                  <span>Exclusive Destination Venue Access</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-[#C59B6D]" />
                  <span>180+ Guests Full Coordination</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-[#C59B6D]" />
                  <span>Personalised Tasting & Couture Menus</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-[#C59B6D]" />
                  <span>Dedicated On-Site Events Coordinator</span>
                </li>
              </ul>
            </div>

            <Link
              href="/services"
              className="w-full text-center py-3 rounded-full border border-[#1C1917] text-[#1C1917] hover:bg-[#1C1917] hover:text-white transition-all text-xs uppercase tracking-widest font-semibold mt-4"
            >
              Contact Concierge
            </Link>
          </div>
        </div>
      </section>

      {/* 7. TESTIMONIALS SECTION (Matching original-ec15bfe3357ec72c52afbfa013261102.webp) */}
      <section className="py-24 bg-[#FAF8F5] border-t border-[#E8E2D9]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="eyebrow-divider mb-3">Testimonials</span>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#1C1917] mt-2 mb-10">
            What our clients have to say...
          </h2>

          <div className="relative bg-white rounded-3xl p-10 sm:p-14 border border-[#E8E2D9] shadow-md">
            <Quote className="w-12 h-12 text-[#C59B6D] mx-auto mb-6 fill-[#C59B6D]/20" />
            <p className="font-serif text-lg sm:text-2xl text-[#1C1917] font-normal leading-relaxed italic mb-8">
              "Our special day on 26th September was just amazing in every way! From start to finish
              the day was full of love, laughter, and special memories created all day. WedPlan
              connected us with our dream venue and photographers who captured every pure moment."
            </p>
            <div className="flex items-center justify-center gap-1 text-[#C59B6D] mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#C59B6D]" />
              ))}
            </div>
            <p className="text-xs uppercase tracking-[0.25em] font-bold text-[#1C1917]">
              Maddie & Gabe — Glasgow Neoclassical Landmark
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
