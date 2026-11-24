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
  Heart,
  Send,
  Award,
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
    { image: "/wedding/landing-cards-gallery-img-1.jpg", tag: "Romantic Ceremony" },
    { image: "/wedding/landing-cards-gallery-img-2.jpg", tag: "Bridal Bouquet" },
    { image: "/wedding/citation-venue.jpg", tag: "Neoclassical Venue" },
    { image: "/wedding/wedding-cakes.jpg", tag: "Artisanal Cake" },
    { image: "/wedding/jewelry-shop.jpg", tag: "Heirloom Bands" },
    { image: "/wedding/bridal-store.jpg", tag: "Haute Couture" },
  ];

  const testimonials = [
    {
      text: "Our special day was just amazing in every way! From start to finish the day was full of love, laughter, and special memories. WedPlan connected us with our dream venue and photographers who captured every pure moment.",
      name: "Maddie & Gabe",
      location: "Glasgow Neoclassical Landmark",
      image: "/wedding/landing-section1-img-1.jpg",
    },
    {
      text: "The WedPlan concierge team went above and beyond our expectations. Every vendor they recommended was professional, punctual, and passionate. We couldn't have asked for a more perfect celebration.",
      name: "Sophie & James",
      location: "Edinburgh Heritage Estate",
      image: "/wedding/landing-section1-img-3.jpg",
    },
    {
      text: "Planning a destination wedding felt impossible until we found WedPlan. They curated every detail from floral arrangements to catering with exquisite taste. Truly a magical experience.",
      name: "Elena & Marco",
      location: "Florence Villa, Tuscany",
      image: "/wedding/landing-section1-img-5.jpg",
    },
  ];

  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterSuccess(true);
    setNewsletterEmail("");
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1C1917] selection:bg-[#C59B6D] selection:text-white">
      <Navbar transparent={true} />

      {/* ============================================================
          1. HERO SECTION — Cinematic Full-Screen
      ============================================================ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background: Dark bokeh/petal shower — no baked text */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 transition-transform duration-1000"
          style={{ backgroundImage: "url('/wedding/hero-veil-clean.jpg')" }}
        />
        {/* Multi-layer luxury vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/55 to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />

        {/* Vertical left brand label */}
        <div className="hidden xl:flex flex-col items-center gap-6 absolute left-10 top-1/2 -translate-y-1/2 z-20 text-white/40 text-[9px] uppercase tracking-[0.4em] [writing-mode:vertical-lr] rotate-180 select-none">
          <span>WedPlan Atelier · Est. 2024</span>
          <div className="w-px h-16 bg-white/20" />
        </div>

        {/* Vertical social links — right */}
        <div className="hidden lg:flex flex-col items-center gap-5 absolute right-8 top-1/2 -translate-y-1/2 z-20 text-white/60">
          <div className="w-px h-10 bg-white/25" />
          {["FB", "TW", "IG"].map((s) => (
            <a
              key={s}
              href="#"
              className="text-[11px] font-semibold tracking-wider hover:text-[#C59B6D] transition-colors"
            >
              {s}
            </a>
          ))}
          <div className="w-px h-10 bg-white/25" />
        </div>

        {/* Hero Content */}
        <div className="relative z-20 max-w-5xl mx-auto px-6 text-center text-white py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-4 text-[11px] sm:text-xs font-semibold tracking-[0.4em] uppercase text-[#DFBF99] mb-8">
              <span className="w-10 h-px bg-[#C59B6D]/70" />
              Wedding Planner & Atelier
              <span className="w-10 h-px bg-[#C59B6D]/70" />
            </div>

            {/* Main headline — clean, no overlap */}
            <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-normal leading-[1.0] tracking-tight mb-6">
              Your Dream
              <br />
              <span className="font-serif italic text-[#DFBF99]">Wedding</span>
            </h1>

            {/* Script sub-headline */}
            <p className="font-script text-3xl sm:text-4xl md:text-5xl text-white/80 mb-8 leading-relaxed">
              Made Perfect & Unforgettable
            </p>

            {/* Description */}
            <p className="max-w-xl mx-auto text-sm sm:text-base text-white/75 font-light leading-relaxed mb-12">
              Discover legendary venues, world-class photographers, bespoke floral artists,
              and curated wedding designers to orchestrate an unforgettable celebration.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <Link
                href="/services"
                className="group w-full sm:w-auto px-10 py-4 rounded-full bg-[#C59B6D] hover:bg-[#8E7356] text-white text-xs uppercase tracking-[0.25em] font-semibold transition-all shadow-2xl hover:shadow-[0_20px_60px_rgba(197,155,109,0.4)] flex items-center justify-center gap-2"
              >
                <span>Explore Wedding Services</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="#venues"
                className="w-full sm:w-auto px-10 py-4 rounded-full border border-white/40 hover:border-white bg-white/10 hover:bg-white/15 text-white text-xs uppercase tracking-[0.25em] font-semibold transition-all backdrop-blur-sm"
              >
                Discover Venues
              </a>
            </div>

            {/* Trust Badges */}
            <div className="inline-flex flex-wrap items-center justify-center gap-6 sm:gap-10 py-4 px-8 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-xs text-white/80">
              <div className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#C59B6D]" />
                <span>500+ Verified Ateliers</span>
              </div>
              <span className="hidden sm:block text-white/20">|</span>
              <div className="flex items-center gap-1.5">
                <Star className="w-3.5 h-3.5 fill-[#DFBF99] text-[#DFBF99]" />
                <span className="text-white font-semibold">4.9</span>
                <span className="text-white/60">(2,400+ Couples)</span>
              </div>
              <span className="hidden sm:block text-white/20">|</span>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C59B6D]" />
                <span>100% Booking Guarantee</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Press Bar — bottom of hero */}
        <div className="absolute bottom-0 left-0 right-0 z-20 py-5 border-t border-white/10 bg-black/50 backdrop-blur-sm">
          <div className="max-w-5xl mx-auto px-6 flex flex-wrap items-center justify-around gap-6">
            {["Forbes", "The New York Times", "The Guardian", "TIME", "NBC NEWS"].map((p) => (
              <span key={p} className="text-white/40 text-xs font-serif tracking-[0.2em] uppercase">
                {p}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          2. FEATURED WEDDING SERVICES
      ============================================================ */}
      <section className="py-28 px-6 sm:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="eyebrow-divider mb-4">Curated Collection</span>
          <h2 className="font-serif text-4xl sm:text-6xl font-normal text-[#1C1917] mt-3 mb-5">
            Featured Wedding Services
          </h2>
          <p className="text-sm sm:text-base text-gray-500 font-light leading-relaxed">
            Hand-selected top rated wedding artisans and verified venues, vetted for luxury,
            impeccable reliability, and timeless excellence.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-14">
          {categoryFilterTabs.map((tab) => {
            const isActive = selectedCategory === tab;
            return (
              <button
                key={tab}
                onClick={() => setSelectedCategory(tab)}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 ${
                  isActive
                    ? "bg-[#1C1917] text-white shadow-lg scale-105"
                    : "bg-white text-gray-600 hover:text-[#1C1917] border border-[#E8E2D9] hover:border-[#1C1917] hover:shadow-sm"
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
              <div key={i} className="h-96 rounded-2xl bg-white animate-pulse border border-[#E8E2D9]" />
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
            className="inline-flex items-center gap-2 px-10 py-4 rounded-full border border-[#1C1917] text-[#1C1917] hover:bg-[#1C1917] hover:text-white transition-all text-xs uppercase tracking-[0.2em] font-semibold shadow-sm hover:shadow-lg"
          >
            <span>View All Wedding Services</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ============================================================
          3. VENUES SPOTLIGHT — Full editorial layout
      ============================================================ */}
      <section id="venues" className="py-28 bg-[#F5EFEB] border-y border-[#E8E2D9]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            {/* Left: Venue portrait */}
            <div className="lg:col-span-5 relative order-last lg:order-first">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-white aspect-[3/4]">
                <img
                  src="/wedding/citation-venue.jpg"
                  alt="Citation Glasgow Neoclassical Landmark"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-[#DFBF99] block mb-1">
                    Landmark Spotlight
                  </span>
                  <h4 className="font-serif text-2xl font-normal">Citation · Glasgow</h4>
                  <p className="text-xs text-white/70 font-light mt-1">
                    Merchant City Neoclassical · Est. 1844
                  </p>
                </div>
              </div>
              {/* Decorative circles */}
              <div className="absolute -top-6 -left-6 w-24 h-24 rounded-full border border-[#C59B6D]/30 pointer-events-none" />
              <div className="absolute -bottom-4 -right-4 w-16 h-16 rounded-full border border-[#C59B6D]/20 pointer-events-none" />
            </div>

            {/* Right: Story */}
            <div className="lg:col-span-7 space-y-7">
              <span className="eyebrow-divider">Iconic Venues</span>
              <h2 className="font-serif text-4xl sm:text-6xl font-normal text-[#1C1917] leading-tight">
                An unforgettable
                <br />
                <span className="font-serif italic text-[#C59B6D]">atmosphere</span> for
                <br />
                your celebration
              </h2>
              <p className="text-gray-600 font-light leading-relaxed text-sm sm:text-base max-w-xl">
                Citation, situated in the heart of Glasgow&apos;s Merchant City, is a stunning
                Neoclassical landmark dating back to 1844. With Corinthian columns, grand stone
                staircases, and romantic candlelit chambers, it provides an exquisite backdrop
                for your vows and evening banquets.
              </p>

              <div className="grid grid-cols-3 gap-6 py-6 border-t border-[#E8E2D9]">
                {[
                  { label: "Architecture", value: "Neoclassical · 1844", sub: "Corinthian stone columns" },
                  { label: "Capacity", value: "Up to 220 Guests", sub: "Ceremony & dining halls" },
                  { label: "Exclusivity", value: "Private Floors", sub: "Dedicated terrace & lounge" },
                ].map((item) => (
                  <div key={item.label} className="space-y-1">
                    <span className="text-[10px] uppercase tracking-widest text-[#C59B6D] font-bold block">
                      {item.label}
                    </span>
                    <p className="font-serif text-sm text-[#1C1917]">{item.value}</p>
                    <p className="text-xs text-gray-500 font-light">{item.sub}</p>
                  </div>
                ))}
              </div>

              <Link
                href="/services?category=Wedding%20Venues"
                className="inline-flex items-center gap-2 px-10 py-4 rounded-full bg-[#1C1917] text-white hover:bg-[#C59B6D] transition-all text-xs uppercase tracking-[0.25em] font-semibold shadow-lg"
              >
                <span>Explore Iconic Venues</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          4. WEDDING SERVICE CATEGORIES — Bold editorial cards
      ============================================================ */}
      <section className="py-28 max-w-7xl mx-auto px-6 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="eyebrow-divider mb-4">Explore by Discipline</span>
          <h2 className="font-serif text-4xl sm:text-6xl font-normal text-[#1C1917] mt-3 mb-5">
            Wedding Service Categories
          </h2>
          <p className="text-sm text-gray-500 font-light leading-relaxed">
            Explore your celebration essentials by category, curated with the highest standards
            of craftsmanship and luxury.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, idx) => {
            const IconComp = cat.icon;
            return (
              <Link
                key={idx}
                href={`/services?category=${encodeURIComponent(cat.name)}`}
                className="group relative h-80 rounded-2xl overflow-hidden border border-[#E8E2D9] shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col justify-end p-7"
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/5 group-hover:from-black/95 transition-all" />

                <div className="relative z-10 text-white">
                  <div className="w-9 h-9 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center mb-4 text-[#DFBF99] border border-white/25 group-hover:bg-[#C59B6D] group-hover:text-white group-hover:border-[#C59B6D] transition-all">
                    <IconComp className="w-4 h-4" />
                  </div>
                  <h3 className="font-serif text-xl font-normal text-white group-hover:text-[#DFBF99] transition-colors mb-1.5">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-white/75 font-light leading-relaxed">
                    {cat.description}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-widest text-[#C59B6D] font-semibold mt-4 group-hover:translate-x-1.5 transition-transform">
                    Browse <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ============================================================
          5. HOW WEDPLAN WORKS — with decorative numbered steps
      ============================================================ */}
      <section id="how-it-works" className="py-28 bg-[#1C1917] text-white relative overflow-hidden">
        {/* Decorative background texture */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: "radial-gradient(circle at 20% 50%, #C59B6D 0%, transparent 50%), radial-gradient(circle at 80% 20%, #C59B6D 0%, transparent 40%)"
        }} />

        <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <span className="inline-flex items-center gap-3 text-[11px] font-semibold tracking-[0.4em] uppercase text-[#C59B6D] mb-5">
              <span className="w-8 h-px bg-[#C59B6D]/50" />
              Concierge Process
              <span className="w-8 h-px bg-[#C59B6D]/50" />
            </span>
            <h2 className="font-serif text-4xl sm:text-6xl font-normal text-white mt-3 mb-5">
              How WedPlan Works
            </h2>
            <p className="text-sm text-gray-400 font-light leading-relaxed">
              From initial inspiration to your final vows, orchestrating your celebration
              has never been so effortless and refined.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-14 left-1/6 right-1/6 h-px bg-gradient-to-r from-transparent via-[#C59B6D]/40 to-transparent" />

            {[
              {
                num: "01",
                icon: Sparkles,
                title: "Curated Discovery",
                body: "Explore verified neoclassical venues, boutique photographers, floral designers, and haute couture stylists with transparent pricing and portfolios.",
              },
              {
                num: "02",
                icon: Calendar,
                title: "Direct Date Booking",
                body: "Select your wedding date, customize event requirements, and submit booking requests directly to verified vendor ateliers in one centralized dashboard.",
              },
              {
                num: "03",
                icon: Heart,
                title: "Flawless Celebration",
                body: "Coordinate contracts, track status updates, and relax knowing every vendor is backed by professional timelines and guaranteed care.",
              },
            ].map((step) => (
              <div
                key={step.num}
                className="bg-white/5 border border-white/10 rounded-3xl p-10 group hover:bg-white/8 hover:border-[#C59B6D]/30 transition-all duration-500 text-center"
              >
                <div className="w-14 h-14 rounded-full bg-[#C59B6D]/15 border border-[#C59B6D]/30 flex items-center justify-center mx-auto mb-6 group-hover:bg-[#C59B6D] group-hover:border-[#C59B6D] transition-all">
                  <step.icon className="w-6 h-6 text-[#C59B6D] group-hover:text-white transition-colors" />
                </div>
                <span className="font-serif text-6xl font-bold text-white/8 group-hover:text-[#C59B6D]/20 transition-colors block mb-4 leading-none">
                  {step.num}
                </span>
                <h3 className="font-serif text-2xl font-normal text-white mb-3">{step.title}</h3>
                <p className="text-sm text-gray-400 font-light leading-relaxed">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          6. ABOUT WEDPLAN — Storytelling editorial
      ============================================================ */}
      <section id="about" className="py-28 max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Image with rotating stamp */}
          <div className="relative">
            <div className="relative h-[520px] w-full rounded-3xl overflow-hidden shadow-2xl border border-[#E8E2D9]">
              <img
                src="/wedding/bride-car.jpg"
                alt="Bride in vintage convertible car"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            </div>

            {/* Rotating stamp badge */}
            <div className="absolute -bottom-6 -right-4 sm:right-8 w-32 h-32 rounded-full bg-[#C7795C] text-white flex items-center justify-center p-3 shadow-2xl border-4 border-[#FAF8F5]">
              <div className="relative w-full h-full rounded-full border border-dashed border-white/60 flex items-center justify-center animate-spin-slow">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <path id="stampCircle" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="none" />
                  <text className="text-[9px] font-bold uppercase tracking-[0.28em] fill-white">
                    <textPath href="#stampCircle" startOffset="0%">
                      WedPlan Atelier · Since 2024 ·
                    </textPath>
                  </text>
                </svg>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Heart className="w-7 h-7 text-white fill-white" />
              </div>
            </div>
          </div>

          {/* Right: Story content */}
          <div className="space-y-7">
            <span className="eyebrow-divider">Our Story</span>
            <h2 className="font-serif text-4xl sm:text-6xl font-normal text-[#1C1917] leading-tight">
              Crafting
              <br />
              <span className="font-serif italic text-[#C59B6D]">unforgettable</span>
              <br />
              celebrations
            </h2>
            <p className="text-gray-600 font-light leading-relaxed text-sm sm:text-base">
              WedPlan was born from a simple belief: that every couple deserves a flawless
              celebration orchestrated by the finest artisans. We hand-select every vendor
              in our atelier — testing their portfolio, verifying credentials, and ensuring
              they share our philosophy of excellence.
            </p>
            <p className="text-gray-600 font-light leading-relaxed text-sm sm:text-base">
              From grand neoclassical venues in Glasgow to intimate garden ceremonies in
              Tuscany, our concierge platform connects discerning couples with the most
              trusted wedding professionals across every category.
            </p>

            <div className="grid grid-cols-2 gap-6 py-6 border-t border-[#E8E2D9]">
              {[
                { num: "500+", label: "Verified Ateliers" },
                { num: "2,400+", label: "Happy Couples" },
                { num: "98%", label: "Satisfaction Rate" },
                { num: "50+", label: "Cities Covered" },
              ].map((stat) => (
                <div key={stat.label} className="space-y-1">
                  <span className="font-serif text-3xl font-normal text-[#C59B6D]">{stat.num}</span>
                  <p className="text-xs text-gray-500 font-light uppercase tracking-wider">{stat.label}</p>
                </div>
              ))}
            </div>

            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-10 py-4 rounded-full bg-[#C59B6D] hover:bg-[#8E7356] text-white text-xs uppercase tracking-[0.25em] font-semibold transition-all shadow-lg"
            >
              <span>Start Planning</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================
          7. BENEFITS SECTION — Why WedPlan
      ============================================================ */}
      <section className="py-24 bg-[#F5EFEB] border-y border-[#E8E2D9]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="eyebrow-divider mb-4">Why Choose WedPlan</span>
            <h2 className="font-serif text-4xl sm:text-5xl font-normal text-[#1C1917] mt-3">
              The WedPlan Promise
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
            {[
              {
                icon: Award,
                title: "Vetted Excellence",
                body: "Every vendor passes our 50-point atelier verification process before listing on our platform.",
              },
              {
                icon: ShieldCheck,
                title: "Booking Security",
                body: "Your deposits are held in secure escrow until services are confirmed and delivered.",
              },
              {
                icon: Clock,
                title: "Dedicated Support",
                body: "A personal concierge advisor available throughout your planning journey, 7 days a week.",
              },
              {
                icon: Users2,
                title: "Trusted Network",
                body: "Join 2,400+ couples who have celebrated extraordinary weddings through our platform.",
              },
            ].map((benefit) => (
              <div
                key={benefit.title}
                className="bg-white rounded-2xl p-8 border border-[#E8E2D9] hover:border-[#C59B6D] hover:shadow-xl transition-all group text-center"
              >
                <div className="w-12 h-12 rounded-full bg-[#C59B6D]/10 border border-[#C59B6D]/20 flex items-center justify-center mx-auto mb-5 group-hover:bg-[#C59B6D] transition-colors">
                  <benefit.icon className="w-5 h-5 text-[#C59B6D] group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-serif text-lg font-normal text-[#1C1917] mb-3">{benefit.title}</h3>
                <p className="text-xs text-gray-500 font-light leading-relaxed">{benefit.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          8. PRICING PLANS
      ============================================================ */}
      <section id="pricing" className="py-28 max-w-7xl mx-auto px-6 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="eyebrow-divider mb-4">Membership Tiers</span>
          <h2 className="font-serif text-4xl sm:text-6xl font-normal text-[#1C1917] mt-3 mb-5">
            Pricing Plans
          </h2>
          <p className="text-sm text-gray-500 font-light leading-relaxed">
            Choose the perfect plan for your wedding vision. Upgrade at any time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: "Local",
              price: "$999",
              period: "per wedding",
              description: "Perfect for intimate ceremonies and local vendor connections.",
              features: [
                "Browse 500+ verified vendors",
                "Up to 5 booking requests",
                "Standard concierge support",
                "Basic vendor portfolio access",
                "Email notifications",
              ],
              cta: "Get Started",
              featured: false,
              href: "/register",
            },
            {
              name: "Vendor Premium",
              price: "$49",
              period: "per month",
              description: "For wedding vendors who want priority listing and more bookings.",
              features: [
                "Featured atelier placement",
                "Unlimited service listings",
                "Priority booking requests",
                "Advanced analytics dashboard",
                "Direct customer messaging",
                "Premium badge & verification",
              ],
              cta: "Start Premium",
              featured: true,
              href: "/register",
            },
            {
              name: "Grand Atelier",
              price: "$2,999",
              period: "per wedding",
              description: "Full-concierge luxury planning for the most exceptional celebrations.",
              features: [
                "Everything in Local",
                "Dedicated personal concierge",
                "Venue scouting & coordination",
                "Unlimited vendor contacts",
                "Day-of coordination included",
                "Post-event gallery curation",
              ],
              cta: "Book Concierge",
              featured: false,
              href: "/services",
            },
          ].map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-3xl p-9 border transition-all duration-500 ${
                plan.featured
                  ? "bg-[#1C1917] border-[#1C1917] text-white shadow-2xl scale-105"
                  : "bg-white border-[#E8E2D9] text-[#1C1917] hover:border-[#C59B6D] hover:shadow-xl"
              }`}
            >
              {plan.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-[#C59B6D] text-white text-[10px] font-bold uppercase tracking-widest px-5 py-1.5 rounded-full shadow-lg">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-7">
                <span className={`text-[10px] uppercase tracking-widest font-bold mb-2 block ${plan.featured ? "text-[#C59B6D]" : "text-[#C59B6D]"}`}>
                  {plan.name}
                </span>
                <div className="flex items-baseline gap-1">
                  <span className="font-serif text-5xl font-normal">{plan.price}</span>
                  <span className={`text-xs font-light ${plan.featured ? "text-gray-400" : "text-gray-500"}`}>
                    {plan.period}
                  </span>
                </div>
                <p className={`text-xs font-light leading-relaxed mt-3 ${plan.featured ? "text-gray-400" : "text-gray-500"}`}>
                  {plan.description}
                </p>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-xs font-light leading-relaxed">
                    <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${plan.featured ? "text-[#C59B6D]" : "text-[#C59B6D]"}`} />
                    <span className={plan.featured ? "text-gray-300" : "text-gray-600"}>{f}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={plan.href}
                className={`block w-full text-center py-4 rounded-full text-xs uppercase tracking-[0.2em] font-semibold transition-all ${
                  plan.featured
                    ? "bg-[#C59B6D] hover:bg-[#8E7356] text-white shadow-lg"
                    : "border border-[#1C1917] text-[#1C1917] hover:bg-[#1C1917] hover:text-white"
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================
          9. LATEST ARTICLES / JOURNAL
      ============================================================ */}
      <section className="py-28 bg-[#F5EFEB] border-t border-[#E8E2D9]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-14">
            <div>
              <span className="eyebrow-divider mb-4">Editorial Journal</span>
              <h2 className="font-serif text-4xl sm:text-5xl font-normal text-[#1C1917] mt-3">
                Latest Articles
              </h2>
            </div>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-[#1C1917] hover:text-[#C59B6D] transition-colors whitespace-nowrap"
            >
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogArticles.map((article, idx) => (
              <article key={idx} className="group bg-white rounded-2xl overflow-hidden border border-[#E8E2D9] hover:border-[#C59B6D] hover:shadow-xl transition-all duration-500">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="p-7">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-[10px] uppercase tracking-widest font-bold text-[#C59B6D]">
                      {article.category}
                    </span>
                    <span className="text-gray-300">·</span>
                    <span className="text-[10px] text-gray-400">{article.readTime}</span>
                  </div>
                  <h3 className="font-serif text-xl font-normal text-[#1C1917] group-hover:text-[#C59B6D] transition-colors mb-3 leading-snug">
                    {article.title}
                  </h3>
                  <p className="text-xs text-gray-500 font-light leading-relaxed mb-5">
                    {article.summary}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-gray-400 font-light">{article.date}</span>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#1C1917] group-hover:text-[#C59B6D] transition-colors uppercase tracking-wider">
                      Read <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          10. INSTAGRAM GALLERY GRID
      ============================================================ */}
      <section className="py-24 max-w-7xl mx-auto px-6 sm:px-8">
        <div className="text-center mb-14">
          <span className="eyebrow-divider mb-4">Wedding Moments</span>
          <h2 className="font-serif text-4xl sm:text-5xl font-normal text-[#1C1917] mt-3">
            @WedPlanAtelier
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {instagramMoments.map((moment, idx) => (
            <div
              key={idx}
              className="group relative aspect-square overflow-hidden rounded-xl cursor-pointer"
            >
              <img
                src={moment.image}
                alt={moment.tag}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-white text-xs font-semibold text-center px-2 leading-tight">
                  {moment.tag}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================
          11. TESTIMONIALS — Carousel style
      ============================================================ */}
      <section className="py-28 bg-[#F5EFEB] border-t border-[#E8E2D9] relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="eyebrow-divider mb-4">Client Stories</span>
          <h2 className="font-serif text-4xl sm:text-5xl font-normal text-[#1C1917] mt-3 mb-16">
            What Our Couples Say
          </h2>

          <div className="relative bg-white rounded-3xl p-10 sm:p-16 border border-[#E8E2D9] shadow-lg">
            <Quote className="w-10 h-10 text-[#C59B6D] mx-auto mb-6 fill-[#C59B6D]/15" />
            <p className="font-serif text-lg sm:text-2xl text-[#1C1917] font-normal leading-relaxed italic mb-8">
              &ldquo;{testimonials[activeTestimonial].text}&rdquo;
            </p>
            <div className="flex items-center justify-center gap-1 text-[#C59B6D] mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#C59B6D]" />
              ))}
            </div>
            <p className="text-xs uppercase tracking-[0.25em] font-bold text-[#1C1917]">
              {testimonials[activeTestimonial].name}
            </p>
            <p className="text-xs text-gray-500 mt-1">{testimonials[activeTestimonial].location}</p>
          </div>

          {/* Testimonial navigation dots */}
          <div className="flex items-center justify-center gap-3 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveTestimonial(i)}
                className={`transition-all rounded-full ${
                  i === activeTestimonial
                    ? "w-8 h-2 bg-[#C59B6D]"
                    : "w-2 h-2 bg-[#E8E2D9] hover:bg-[#C59B6D]/50"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Rotating CTA badge */}
        <div className="flex justify-center mt-16">
          <Link
            href="/services"
            className="group relative w-36 h-36 rounded-full bg-[#1C1917] flex items-center justify-center shadow-2xl hover:bg-[#C59B6D] transition-all hover:scale-105"
          >
            <div className="animate-spin-slow absolute inset-0 flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <path id="ctaCircle" d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" fill="none" />
                <text className="text-[9px] font-bold uppercase tracking-[0.28em] fill-white">
                  <textPath href="#ctaCircle" startOffset="0%">
                    LET&apos;S TALK • PLAN WEDDING •
                  </textPath>
                </text>
              </svg>
            </div>
            <ArrowRight className="w-6 h-6 text-white group-hover:rotate-45 transition-transform duration-300 relative z-10" />
          </Link>
        </div>
      </section>

      {/* ============================================================
          12. NEWSLETTER — Dark luxury
      ============================================================ */}
      <section id="contact" className="py-24 bg-[#1C1917] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: "radial-gradient(circle at 30% 50%, #C59B6D 0%, transparent 60%)"
        }} />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <span className="inline-flex items-center gap-3 text-[11px] font-semibold tracking-[0.4em] uppercase text-[#C59B6D] mb-5">
            ✦ VIP Concierge Circle ✦
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-white mt-1 mb-5">
            Join the WedPlan Atelier
          </h2>
          <p className="text-sm text-gray-400 font-light max-w-xl mx-auto leading-relaxed mb-10">
            Receive exclusive seasonal bridal lookbooks, private invitations to neoclassical venue
            tours, and curated wedding planning masterclasses.
          </p>

          {newsletterSuccess ? (
            <div className="bg-[#2D2927] border border-[#C59B6D] text-[#DFBF99] py-4 px-8 rounded-full inline-block text-xs uppercase tracking-wider font-semibold">
              ✓ Thank you for joining our VIP Atelier Circle
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
                placeholder="Enter your email address..."
                className="w-full px-7 py-4 rounded-full bg-white/8 border border-white/15 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#C59B6D] transition-colors"
              />
              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#C59B6D] hover:bg-[#8E7356] text-white text-xs uppercase tracking-widest font-semibold transition-all shrink-0 shadow-lg"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
