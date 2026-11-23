"use client";

import React, { useEffect, useState, useMemo } from "react";
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
  Quote,
  Star,
  Check,
  Calendar,
  Compass,
  Heart,
  Send,
} from "lucide-react";

export default function HomePage() {
  const [featuredServices, setFeaturedServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [newsletterEmail, setNewsletterEmail] = useState<string>("");
  const [newsletterSuccess, setNewsletterSuccess] = useState<boolean>(false);

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
      image: "/wedding/photography-portfolio.jpg",
      description: "Timeless documentary & cinematic captures",
    },
    {
      name: "Wedding Venues",
      icon: Castle,
      image: "/wedding/citation-venue.jpg",
      description: "Historic Neoclassical estates, vineyards & private halls",
    },
    {
      name: "Decoration & Florist",
      icon: Flower2,
      image: "/wedding/florist-showcase.jpg",
      description: "Bespoke botanicals, ceremony arches & candlelight",
    },
    {
      name: "Catering Services",
      icon: UtensilsCrossed,
      image: "/wedding/wedding-cakes.jpg",
      description: "Artisanal gastronomy, plated feasts & custom cakes",
    },
    {
      name: "Makeup & Styling",
      icon: Sparkles,
      image: "/wedding/beauty-home.jpg",
      description: "High-definition bridal glam & bespoke hairstyling",
    },
    {
      name: "Wedding Fashion",
      icon: Shirt,
      image: "/wedding/bridal-store.jpg",
      description: "Haute couture gowns, tailored tuxedos & veils",
    },
  ];

  const categoryFilterTabs = [
    "All",
    "Wedding Venues",
    "Photography & Videography",
    "Decoration & Florist",
    "Catering Services",
    "Makeup & Styling",
    "Wedding Fashion",
  ];

  const filteredFeatured = useMemo(() => {
    if (selectedCategory === "All") return featuredServices;
    return featuredServices.filter((s) => s.category === selectedCategory);
  }, [featuredServices, selectedCategory]);

  const blogArticles = [
    {
      title: "Weddings Rings Guide: Find Your Dream Rings",
      category: "Jewelry & Rings",
      date: "Sep 18, 2026",
      image: "/wedding/jewelry-shop.jpg",
      readTime: "5 min read",
      summary:
        "How to select heirloom metals, conflict-free diamonds, and custom engraving for your eternal bands.",
    },
    {
      title: "How to Plan Your Wedding: An A-Z Guide",
      category: "Floral Design & Planning",
      date: "Oct 04, 2026",
      image: "/wedding/landing-cards-gallery-img-2.jpg",
      readTime: "8 min read",
      summary:
        "From palette exploration to day-of run-sheets, our master checklist ensures every detail unfolds seamlessly.",
    },
    {
      title: "Top 10 Secret Wedding Gown Boutiques",
      category: "Haute Couture",
      date: "Nov 12, 2026",
      image: "/wedding/tailor-home.jpg",
      readTime: "6 min read",
      summary:
        "Curated French lace ateliers, bespoke silhouettes, and sustainable bridal design houses.",
    },
  ];

  const instagramMoments = [
    {
      image: "/wedding/landing-cards-gallery-img-1.jpg",
      tag: "Romantic Ceremony",
    },
    {
      image: "/wedding/landing-cards-gallery-img-2.jpg",
      tag: "Bridal Bouquet",
    },
    {
      image: "/wedding/citation-venue.jpg",
      tag: "Neoclassical Architecture",
    },
    {
      image: "/wedding/wedding-cakes.jpg",
      tag: "Artisanal Confectionery",
    },
    {
      image: "/wedding/jewelry-shop.jpg",
      tag: "Heirloom Bands",
    },
    {
      image: "/wedding/bridal-store.jpg",
      tag: "Haute Couture Atelier",
    },
  ];

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterSuccess(true);
    setNewsletterEmail("");
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1C1917] selection:bg-[#C59B6D] selection:text-white">
      {/* Top Navbar with transparent style over hero */}
      <Navbar transparent={true} />

      {/* 1. HERO BANNER SECTION (Crisp, High-Res, ZERO Overlaps) */}
      <section className="relative min-h-[94vh] sm:min-h-screen flex items-center justify-center overflow-hidden">
        {/* Clean, high-resolution romantic wedding photo without baked-in text */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-105"
          style={{
            backgroundImage: "url('/wedding/hero-lights.jpg')",
          }}
        />

        {/* Sophisticated Luxury Dark Vignette Overlay for High Typography Contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/55 to-black/90" />

        {/* Vertical Left Brand Subtitle */}
        <div className="hidden xl:flex flex-col items-center gap-6 absolute left-10 top-1/2 -translate-y-1/2 z-20 text-white/50 text-[10px] uppercase tracking-[0.35em] [writing-mode:vertical-lr] rotate-180">
          <span>WedPlan Atelier · Haute Celebration</span>
          <div className="w-[1px] h-12 bg-white/30" />
        </div>

        {/* Vertical Social Links on the right (f, tw, ig) */}
        <div className="hidden lg:flex flex-col items-center gap-6 absolute right-8 top-1/2 -translate-y-1/2 z-20 text-white/70">
          <div className="w-[1px] h-12 bg-white/30" />
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#C59B6D] transition-colors text-xs font-semibold tracking-wider hover:scale-110"
            aria-label="Facebook"
          >
            FB
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#C59B6D] transition-colors text-xs font-semibold tracking-wider hover:scale-110"
            aria-label="Twitter"
          >
            TW
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#C59B6D] transition-colors text-xs font-semibold tracking-wider hover:scale-110"
            aria-label="Instagram"
          >
            IG
          </a>
          <div className="w-[1px] h-12 bg-white/30" />
        </div>

        {/* Hero Center Text Content */}
        <div className="relative z-20 max-w-5xl mx-auto px-6 text-center text-white pt-28 pb-36">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Eyebrow Label with flanking gold lines */}
            <div className="inline-flex items-center gap-3 text-xs md:text-sm font-semibold tracking-[0.35em] uppercase text-[#DFBF99] mb-6">
              <span className="w-8 h-[1px] bg-[#C59B6D]" />
              WEDDING PLANNER & ATELIER
              <span className="w-8 h-[1px] bg-[#C59B6D]" />
            </div>

            {/* Main Headline with delicate italic serif */}
            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal leading-[1.08] tracking-tight mb-8">
              Your Dream Wedding <br />
              <span className="italic font-normal text-[#E8DED8] drop-shadow-sm">
                Made Perfect
              </span>
            </h1>

            {/* Description */}
            <p className="max-w-2xl mx-auto text-base sm:text-lg text-white/90 font-light leading-relaxed mb-10">
              Discover legendary venues, world-class photographers, bespoke floral artists, and
              curated wedding designers to orchestrate an unforgettable celebration.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/services"
                className="w-full sm:w-auto px-9 py-4 rounded-full bg-[#C59B6D] hover:bg-[#8E7356] text-white text-xs uppercase tracking-[0.2em] font-semibold transition-all shadow-xl hover:shadow-2xl hover:scale-105"
              >
                Explore Wedding Services
              </Link>
              <a
                href="#venues"
                className="w-full sm:w-auto px-9 py-4 rounded-full border border-white/50 hover:border-white bg-black/20 hover:bg-white/10 text-white text-xs uppercase tracking-[0.2em] font-semibold transition-all backdrop-blur-sm"
              >
                Discover Venues
              </a>
            </div>
          </motion.div>
        </div>

        {/* Magazine / Press Logos Bar */}
        <div className="absolute bottom-0 left-0 right-0 z-20 py-7 bg-gradient-to-t from-black/95 to-transparent border-t border-white/15">
          <div className="max-w-6xl mx-auto px-6 flex flex-wrap items-center justify-around gap-8 text-white/60 text-xs font-serif tracking-[0.25em] uppercase">
            <span className="font-bold text-sm tracking-widest text-white/75">Forbes</span>
            <span className="font-serif italic text-sm text-white/75">The New York Times</span>
            <span className="font-serif text-sm tracking-wider text-white/75">The Guardian</span>
            <span className="font-bold text-sm tracking-widest text-white/75">TIME</span>
            <span className="font-semibold text-sm tracking-widest text-white/75">NBC NEWS</span>
          </div>
        </div>
      </section>

      {/* 2. ABOUT COMPANY (Directly from original-cec1da31e5f1a8be29d9da7d99f7da6a.webp) */}
      <section id="about" className="py-28 max-w-7xl mx-auto px-6 sm:px-8">
        <div className="text-center mb-16">
          <span className="eyebrow-divider mb-3">Our Company</span>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#1C1917] mt-2">
            About Company
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Romantic Wedding Bride in Car Image with Circular Rotating Stamp Badge */}
          <div className="relative">
            <div className="relative h-[480px] w-full rounded-2xl overflow-hidden shadow-2xl border border-[#E8E2D9]">
              <img
                src="/wedding/bride-car.jpg"
                alt="Bride in vintage convertible car"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Circular Terracotta Rotating Stamp Overlay Badge matching design: RECEPTION • RECEPTION */}
            <div className="absolute -bottom-7 -right-5 sm:right-6 w-36 h-36 rounded-full bg-[#C7795C] text-white flex items-center justify-center p-3 shadow-2xl border-4 border-[#FAF8F5]">
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
              experiences. We understand that every wedding is unique, and we work closely with
              our clients to ensure that their vision becomes a breathtaking reality.
            </p>

            <p className="text-gray-600 font-light leading-relaxed text-sm sm:text-base">
              Our approach is personal, friendly, and deeply professional. From historic Scottish
              manors to California wine country estates, we strive to make the planning process as
              effortless and stress-free as possible.
            </p>

            <div className="pt-4">
              <Link
                href="/services"
                className="inline-block px-9 py-4 rounded-full border border-[#1C1917] text-[#1C1917] hover:bg-[#1C1917] hover:text-white transition-all text-xs uppercase tracking-[0.2em] font-semibold"
              >
                Book Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. DYNAMIC SECTION 1: FEATURED WEDDING SERVICES (With Fleur-Style Category Filter Tabs) */}
      <section className="py-28 bg-[#F5EFEB] border-y border-[#E8E2D9]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="eyebrow-divider mb-3">Curated Collection</span>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#1C1917] mt-2 mb-4">
              Featured Wedding Services
            </h2>
            <p className="text-sm sm:text-base text-gray-500 font-light leading-relaxed">
              Hand-selected top rated wedding artisans and verified venues, vetted for luxury,
              impeccable reliability, and timeless excellence.
            </p>
          </div>

          {/* Fleur-inspired Interactive Category Filter Chips */}
          <div className="flex items-center justify-center gap-2 flex-wrap mb-14">
            {categoryFilterTabs.map((tab) => {
              const isActive = selectedCategory === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setSelectedCategory(tab)}
                  className={`px-5 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 ${
                    isActive
                      ? "bg-[#1C1917] text-white shadow-md scale-105"
                      : "bg-white text-gray-600 hover:text-[#1C1917] border border-[#E8E2D9] hover:border-[#1C1917]"
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="h-96 rounded-2xl bg-white animate-pulse border border-[#E8E2D9]"
                />
              ))}
            </div>
          ) : filteredFeatured.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredFeatured.map((service) => (
                <ServiceCard key={service._id} service={service} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-[#E8E2D9] max-w-lg mx-auto">
              <Sparkles className="w-8 h-8 text-[#C59B6D] mx-auto mb-3" />
              <p className="font-serif text-lg text-[#1C1917]">No services in this category yet</p>
              <button
                onClick={() => setSelectedCategory("All")}
                className="mt-4 px-6 py-2 rounded-full bg-[#C59B6D] text-white text-xs font-semibold uppercase tracking-widest"
              >
                Reset Filter
              </button>
            </div>
          )}

          <div className="text-center mt-16">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-9 py-4 rounded-full border border-[#1C1917] text-[#1C1917] hover:bg-[#1C1917] hover:text-white transition-all text-xs uppercase tracking-[0.2em] font-semibold shadow-sm hover:shadow-md"
            >
              <span>View All Wedding Services</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. ICONIC VENUES SPOTLIGHT (Directly from original-ec15bfe3357ec72c52afbfa013261102.webp) */}
      <section id="venues" className="py-28 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Column: Narrative, architectural details & CTA */}
            <div className="lg:col-span-7 space-y-6">
              <span className="eyebrow-divider mb-2">Iconic Venues</span>
              <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#1C1917] leading-tight">
                An unforgettable atmosphere away from the crowd, for your crowd
              </h2>
              <p className="text-gray-600 font-light leading-relaxed text-sm sm:text-base">
                Citation, situated in the heart of Glasgow&apos;s Merchant City, is a stunning
                Neoclassical landmark dating back to 1844. With Corinthian columns, grand stone
                staircases, and romantic candlelit chambers, it provides an exquisite backdrop for
                your vows and evening banquets.
              </p>

              {/* Architectural features list */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-[#E8E2D9]">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-widest text-[#C59B6D] font-bold block">
                    Architecture
                  </span>
                  <p className="font-serif text-base text-[#1C1917]">Neoclassical · 1844</p>
                  <p className="text-xs text-gray-500 font-light">Corinthian stone columns</p>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-widest text-[#C59B6D] font-bold block">
                    Capacity
                  </span>
                  <p className="font-serif text-base text-[#1C1917]">Up to 220 Guests</p>
                  <p className="text-xs text-gray-500 font-light">Ceremony & dining halls</p>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-widest text-[#C59B6D] font-bold block">
                    Exclusivity
                  </span>
                  <p className="font-serif text-base text-[#1C1917]">Private Floors</p>
                  <p className="text-xs text-gray-500 font-light">Dedicated terrace & lounge</p>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  href="/services?category=Wedding%20Venues"
                  className="inline-flex items-center gap-2 px-9 py-4 rounded-full bg-[#1C1917] text-white hover:bg-[#C59B6D] transition-all text-xs uppercase tracking-[0.2em] font-semibold shadow-lg"
                >
                  <span>Explore Iconic Venues</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right Column: High-fashion architectural photograph in arched frame */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-white aspect-[3/4] bg-[#E8E2D9]">
                <img
                  src="/wedding/citation-venue.jpg"
                  alt="Citation Glasgow Neoclassical Landmark"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[#DFBF99] block mb-1">
                    Landmark Spotlight
                  </span>
                  <h4 className="font-serif text-xl font-normal">Citation · Glasgow</h4>
                  <p className="text-xs text-white/80 font-light">
                    Merchant City Neoclassical Landmark · Est. 1844
                  </p>
                </div>
              </div>

              {/* Decorative Accent Ribbon */}
              <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full border border-[#C59B6D]/40 pointer-events-none -z-0 hidden sm:block" />
            </div>
          </div>
        </div>
      </section>

      {/* 5. DYNAMIC SECTION 2: WEDDING SERVICE CATEGORIES */}
      <section className="py-28 bg-[#F5EFEB] border-t border-[#E8E2D9]">
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {categories.map((cat, idx) => {
              const IconComp = cat.icon;
              return (
                <Link
                  key={idx}
                  href={`/services?category=${encodeURIComponent(cat.name)}`}
                  className="group relative h-84 rounded-2xl overflow-hidden border border-[#E8E2D9] shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col justify-end p-8"
                >
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10 group-hover:from-black/90 transition-all" />

                  <div className="relative z-10 text-white">
                    <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mb-4 text-[#C59B6D] border border-white/30 group-hover:bg-[#C59B6D] group-hover:text-white transition-colors">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <h3 className="font-serif text-2xl font-normal text-white group-hover:text-[#DFBF99] transition-colors mb-2">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-white/85 font-light leading-relaxed">
                      {cat.description}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-widest text-[#C59B6D] font-semibold mt-4 group-hover:translate-x-1.5 transition-transform">
                      Browse Category <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. HOW WEDPLAN WORKS (Assignment Requirement: Step-by-Step Concierge Flow) */}
      <section className="py-28 max-w-7xl mx-auto px-6 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="eyebrow-divider mb-3">Concierge Process</span>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#1C1917] mt-2 mb-4">
            How WedPlan Works
          </h2>
          <p className="text-sm text-gray-500 font-light leading-relaxed">
            From initial inspiration to your final vows, orchestrating your celebration has never
            been so effortless and refined.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative">
          {/* Step 1 */}
          <div className="bg-white rounded-3xl p-8 border border-[#E8E2D9] shadow-sm relative group hover:shadow-xl transition-all">
            <span className="font-serif text-5xl font-bold text-[#E8E2D9] group-hover:text-[#C59B6D] transition-colors block mb-4">
              01
            </span>
            <h3 className="font-serif text-2xl font-normal text-[#1C1917] mb-3">
              Curated Discovery
            </h3>
            <p className="text-xs text-gray-500 font-light leading-relaxed">
              Explore verified Neoclassical venues, boutique photographers, floral designers, and
              haute couture stylists with transparent pricing and portfolios.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-white rounded-3xl p-8 border border-[#E8E2D9] shadow-sm relative group hover:shadow-xl transition-all">
            <span className="font-serif text-5xl font-bold text-[#E8E2D9] group-hover:text-[#C59B6D] transition-colors block mb-4">
              02
            </span>
            <h3 className="font-serif text-2xl font-normal text-[#1C1917] mb-3">
              Direct Date Booking
            </h3>
            <p className="text-xs text-gray-500 font-light leading-relaxed">
              Select your wedding date, customize event requirements, and submit booking requests
              directly to verified vendor ateliers in one centralized dashboard.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-white rounded-3xl p-8 border border-[#E8E2D9] shadow-sm relative group hover:shadow-xl transition-all">
            <span className="font-serif text-5xl font-bold text-[#E8E2D9] group-hover:text-[#C59B6D] transition-colors block mb-4">
              03
            </span>
            <h3 className="font-serif text-2xl font-normal text-[#1C1917] mb-3">
              Flawless Celebration
            </h3>
            <p className="text-xs text-gray-500 font-light leading-relaxed">
              Coordinate contracts, track status updates, and relax knowing every vendor is backed
              by professional timelines and guaranteed care.
            </p>
          </div>
        </div>
      </section>

      {/* 7. BENEFITS SECTION (Matching original-5e2d8d13614a878c8884d531ffeb1ac2.webp) */}
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
              <h3 className="font-serif text-xl font-medium text-[#1C1917]">
                Efficient Coordination
              </h3>
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

      {/* 8. PRICING PLANS SECTION (Matching original-ec15bfe3357ec72c52afbfa013261102.webp) */}
      <section id="pricing" className="py-28 max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="eyebrow-divider mb-3">Plan</span>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#1C1917] mt-2">
              We&apos;ve got a pricing plan that&apos;s <br className="hidden sm:block" />
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
          <div className="bg-white rounded-2xl p-8 border border-[#E8E2D9] flex flex-col justify-between shadow-sm hover:shadow-xl transition-all">
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
              className="w-full text-center py-3.5 rounded-full border border-[#1C1917] text-[#1C1917] hover:bg-[#1C1917] hover:text-white transition-all text-xs uppercase tracking-widest font-semibold mt-4"
            >
              Get Started
            </Link>
          </div>

          {/* Card 2: Vendor Premium Plan (Highlighted in dark olive green #525D4F matching mockup) */}
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

          {/* Card 3: Grand Celebration */}
          <div className="bg-white rounded-2xl p-8 border border-[#E8E2D9] flex flex-col justify-between shadow-sm hover:shadow-xl transition-all">
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
              className="w-full text-center py-3.5 rounded-full border border-[#1C1917] text-[#1C1917] hover:bg-[#1C1917] hover:text-white transition-all text-xs uppercase tracking-widest font-semibold mt-4"
            >
              Contact Concierge
            </Link>
          </div>
        </div>
      </section>

      {/* 9. LATEST ARTICLES / PLANNING JOURNAL (Directly from original-ec15bfe3357ec72c52afbfa013261102.webp) */}
      <section className="py-28 bg-[#F5EFEB] border-t border-[#E8E2D9]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="eyebrow-divider mb-3">Article</span>
              <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#1C1917] mt-2">
                Latest articles
              </h2>
            </div>
            <Link
              href="/services"
              className="self-start md:self-auto px-7 py-3 rounded-full border border-[#1C1917] text-[#1C1917] hover:bg-[#1C1917] hover:text-white transition-all text-xs uppercase tracking-widest font-semibold"
            >
              See All Article
            </Link>
          </div>

          {/* 3 Blog Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogArticles.map((article, idx) => (
              <div
                key={idx}
                className="group bg-white rounded-2xl overflow-hidden border border-[#E8E2D9] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-[#E8E2D9]">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                  />
                  <span className="absolute top-4 left-4 bg-white/95 backdrop-blur-md text-[#1C1917] text-[10px] uppercase tracking-wider font-semibold px-3 py-1 rounded-full shadow-sm">
                    {article.category}
                  </span>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 text-xs text-gray-400 mb-3 font-medium">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-[#C59B6D]" />
                        {article.date}
                      </span>
                      <span>•</span>
                      <span>{article.readTime}</span>
                    </div>

                    <h3 className="font-serif text-xl font-normal text-[#1C1917] group-hover:text-[#C59B6D] transition-colors leading-snug">
                      {article.title}
                    </h3>

                    <p className="text-xs text-gray-500 font-light mt-3 leading-relaxed">
                      {article.summary}
                    </p>
                  </div>

                  <div className="pt-5 mt-5 border-t border-[#E8E2D9]/70 flex items-center justify-between text-xs font-semibold text-[#1C1917] group-hover:text-[#C59B6D] transition-colors">
                    <span className="uppercase tracking-widest text-[11px]">Read Full Story</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. EDITORIAL INSTAGRAM / MOMENTS GALLERY (Direct from Gretna Green & Fleur) */}
      <section className="py-24 bg-white border-t border-[#E8E2D9]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 mb-12 text-center">
          <span className="eyebrow-divider mb-3">Atelier Moments</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#1C1917] mt-2 mb-2">
            Follow Our Celebrations
          </h2>
          <p className="text-xs uppercase tracking-[0.25em] text-[#C59B6D] font-semibold">
            @WEDPLAN.ATELIER · INSTAGRAM MOMENTS
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 px-4 sm:px-8 max-w-7xl mx-auto">
          {instagramMoments.map((item, idx) => (
            <div
              key={idx}
              className="group relative aspect-square rounded-2xl overflow-hidden bg-gray-100 shadow-sm"
            >
              <img
                src={item.image}
                alt={item.tag}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-3 text-center text-white">
                <svg className="w-6 h-6 fill-[#DFBF99] mb-1" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                <span className="text-[11px] font-medium leading-tight">{item.tag}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 11. TESTIMONIALS SECTION (Matching original-ec15bfe3357ec72c52afbfa013261102.webp) */}
      <section className="py-28 bg-[#FAF8F5] relative overflow-hidden border-t border-[#E8E2D9]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="eyebrow-divider mb-3">Testimonials</span>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#1C1917] mt-2 mb-12">
            What our clients have to say...
          </h2>

          <div className="relative bg-white rounded-3xl p-10 sm:p-16 border border-[#E8E2D9] shadow-lg">
            <Quote className="w-12 h-12 text-[#C59B6D] mx-auto mb-6 fill-[#C59B6D]/20" />
            <p className="font-serif text-lg sm:text-2xl text-[#1C1917] font-normal leading-relaxed italic mb-8">
              &ldquo;Our special day on 26th September was just amazing in every way! From start to finish
              the day was full of love, laughter, and special memories created all day. WedPlan
              connected us with our dream venue and photographers who captured every pure moment.&rdquo;
            </p>
            <div className="flex items-center justify-center gap-1 text-[#C59B6D] mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#C59B6D]" />
              ))}
            </div>
            <p className="text-xs uppercase tracking-[0.25em] font-bold text-[#1C1917]">
              Maddie & Gabe — Glasgow Neoclassical Landmark
            </p>
          </div>
        </div>

        {/* Floating Rotating "LET'S TALK ↗" CTA Badge */}
        <div className="flex justify-center mt-14">
          <Link
            href="/services"
            className="group relative w-36 h-36 rounded-full bg-[#1C1917] text-white flex items-center justify-center shadow-2xl hover:bg-[#C59B6D] transition-all hover:scale-105"
          >
            <div className="relative w-full h-full rounded-full flex items-center justify-center animate-spin-slow">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <path
                  id="ctaCircle"
                  d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0"
                  fill="none"
                />
                <text className="text-[9px] font-bold uppercase tracking-[0.28em] fill-white">
                  <textPath xlinkHref="#ctaCircle" startOffset="0%">
                    LET&apos;S TALK • PLAN WEDDING •
                  </textPath>
                </text>
              </svg>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <ArrowRight className="w-6 h-6 text-white group-hover:rotate-45 transition-transform duration-300" />
            </div>
          </Link>
        </div>
      </section>

      {/* 12. VIP ATELIER CONCIERGE NEWSLETTER */}
      <section className="py-20 bg-[#1C1917] text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] font-semibold text-[#C59B6D] mb-3">
            ✦ VIP Concierge Circle ✦
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-normal text-white mt-1 mb-4">
            Join the WedPlan Atelier
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 font-light max-w-xl mx-auto leading-relaxed mb-8">
            Receive exclusive seasonal bridal lookbooks, private invitations to neoclassical venue
            tours, and curated wedding planning masterclasses.
          </p>

          {newsletterSuccess ? (
            <div className="bg-[#2D2927] border border-[#C59B6D] text-[#DFBF99] py-3.5 px-6 rounded-full inline-block text-xs uppercase tracking-wider font-semibold">
              Thank you for subscribing to our VIP Atelier Circle.
            </div>
          ) : (
            <form
              onSubmit={handleNewsletterSubmit}
              className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter your bridal email address..."
                className="w-full px-6 py-3.5 rounded-full bg-[#2A2624] border border-[#3E3936] text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#C59B6D] transition-colors"
              />
              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#C59B6D] hover:bg-[#8E7356] text-white text-xs uppercase tracking-widest font-semibold transition-all shrink-0 shadow-lg"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
