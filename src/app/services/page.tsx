"use client";

import React, { useEffect, useState, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServiceCard from "@/components/ServiceCard";
import { Service } from "@/types";
import { fetchApi } from "@/lib/api";
import {
  Search,
  MapPin,
  ArrowUpDown,
  RotateCcw,
  Sparkles,
} from "lucide-react";

function BrowseServicesContent() {
  const urlSearchParams = useSearchParams();
  const initialCategory = urlSearchParams.get("category") || "";
  const initialSearch = urlSearchParams.get("search") || "";

  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [total, setTotal] = useState<number>(0);

  // Filters & Sorting state
  const [search, setSearch] = useState<string>(initialSearch);
  const [category, setCategory] = useState<string>(initialCategory);
  const [location, setLocation] = useState<string>("");
  const [sort, setSort] = useState<string>("price_asc");

  const categories = [
    "All",
    "Photography & Videography",
    "Wedding Venues",
    "Decoration & Florist",
    "Catering Services",
    "Makeup & Styling",
    "Wedding Fashion",
  ];

  const loadServices = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.append("search", search);
      if (category && category !== "All") params.append("category", category);
      if (location) params.append("location", location);
      if (sort) params.append("sort", sort);
      params.append("limit", "24");

      const res = await fetchApi<{
        success: boolean;
        total: number;
        services: Service[];
      }>(`/services?${params.toString()}`);

      if (res.success) {
        setServices(res.services || []);
        setTotal(res.total || 0);
      }
    } catch (err) {
      console.error("Error loading services:", err);
    } finally {
      setLoading(false);
    }
  }, [search, category, location, sort]);

  useEffect(() => {
    const timer = setTimeout(() => {
      loadServices();
    }, 200);
    return () => clearTimeout(timer);
  }, [loadServices]);

  const handleResetFilters = () => {
    setSearch("");
    setCategory("");
    setLocation("");
    setSort("price_asc");
  };

  return (
    <main className="flex-1 pt-32 pb-24 max-w-7xl mx-auto px-6 sm:px-8 w-full">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="eyebrow-divider mb-3">Atelier Directory</span>
        <h1 className="font-serif text-4xl sm:text-6xl font-normal text-[#1C1917] mt-2 mb-4">
          Browse Wedding Services
        </h1>
        <p className="text-sm sm:text-base text-gray-500 font-light leading-relaxed">
          Discover and book verified wedding venues, photographers, florists, and bespoke artists
          to make your celebration unforgettable.
        </p>
      </div>

      {/* Search, Filter & Sort Controls Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E2D9] shadow-sm mb-12 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 text-[#C59B6D] absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search services by keyword..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-[#FAF8F5] rounded-full border border-[#E8E2D9] text-xs font-medium text-[#1C1917] placeholder-gray-400 focus:outline-none focus:border-[#C59B6D] transition-colors"
            />
          </div>

          {/* Location Filter */}
          <div className="relative">
            <MapPin className="w-4 h-4 text-[#C59B6D] absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Filter by city or location..."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-[#FAF8F5] rounded-full border border-[#E8E2D9] text-xs font-medium text-[#1C1917] placeholder-gray-400 focus:outline-none focus:border-[#C59B6D] transition-colors"
            />
          </div>

          {/* Sorting (Challenge requirement: Price Ascending & Descending) */}
          <div className="relative">
            <ArrowUpDown className="w-4 h-4 text-[#C59B6D] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="w-full pl-11 pr-8 py-3 bg-[#FAF8F5] rounded-full border border-[#E8E2D9] text-xs font-medium text-[#1C1917] focus:outline-none focus:border-[#C59B6D] appearance-none cursor-pointer transition-colors"
            >
              <option value="price_asc">Price: Low to High (Ascending)</option>
              <option value="price_desc">Price: High to Low (Descending)</option>
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>
        </div>

        {/* Category Chips Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none pt-2 border-t border-[#E8E2D9]/60">
          <span className="text-[11px] uppercase tracking-wider text-gray-400 font-semibold mr-2 shrink-0">
            Categories:
          </span>
          {categories.map((cat) => {
            const isActive = (cat === "All" && !category) || category === cat;
            return (
              <button
                key={cat}
                onClick={() => setCategory(cat === "All" ? "" : cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium tracking-wide shrink-0 transition-all ${
                  isActive
                    ? "bg-[#C59B6D] text-white shadow-sm"
                    : "bg-[#FAF8F5] text-gray-600 hover:bg-[#E8E2D9]/60 border border-[#E8E2D9]"
                }`}
              >
                {cat}
              </button>
            );
          })}

          {(search || category || location || sort !== "price_asc") && (
            <button
              onClick={handleResetFilters}
              className="ml-auto inline-flex items-center gap-1.5 text-xs text-red-600 hover:text-red-700 font-medium shrink-0 px-3 py-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Results Count & Meta */}
      <div className="flex items-center justify-between mb-8">
        <p className="text-xs uppercase tracking-widest text-gray-500 font-medium">
          Showing <span className="font-bold text-[#1C1917]">{services.length}</span> of{" "}
          <span className="font-bold text-[#1C1917]">{total}</span> approved wedding services
        </p>
      </div>

      {/* Service Grid States */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="h-96 rounded-2xl bg-white border border-[#E8E2D9] animate-pulse p-4 space-y-4"
            >
              <div className="h-48 bg-[#F4EFEA] rounded-xl" />
              <div className="h-4 bg-gray-200 rounded w-1/3" />
              <div className="h-6 bg-gray-200 rounded w-2/3" />
              <div className="h-4 bg-gray-200 rounded w-full" />
            </div>
          ))}
        </div>
      ) : services.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <ServiceCard key={service._id} service={service} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-16 text-center border border-[#E8E2D9] max-w-xl mx-auto shadow-sm">
          <div className="w-16 h-16 rounded-full bg-[#FAF8F5] border border-[#E8E2D9] flex items-center justify-center text-[#C59B6D] mx-auto mb-4">
            <Sparkles className="w-7 h-7" />
          </div>
          <h3 className="font-serif text-2xl text-[#1C1917] mb-2 font-normal">
            No Matching Services Found
          </h3>
          <p className="text-xs text-gray-500 font-light mb-6">
            We couldn&apos;t find any wedding services matching your current filter criteria. Try
            adjusting your search terms or clearing selected filters.
          </p>
          <button
            onClick={handleResetFilters}
            className="px-6 py-2.5 rounded-full bg-[#C59B6D] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#8E7356] transition-colors"
          >
            Reset All Filters
          </button>
        </div>
      )}
    </main>
  );
}

export default function BrowseServicesPage() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1C1917] flex flex-col">
      <Navbar />
      <Suspense fallback={<div className="min-h-screen pt-32 text-center">Loading atelier catalog...</div>}>
        <BrowseServicesContent />
      </Suspense>
      <Footer />
    </div>
  );
}
