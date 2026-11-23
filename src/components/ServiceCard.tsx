"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Service } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { MapPin, ArrowRight, Sparkles, Star } from "lucide-react";

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const { user } = useAuth();
  const router = useRouter();

  const handleCardClick = (e: React.MouseEvent) => {
    // Access Rule: If an unauthenticated user clicks View Details or tries to book a service,
    // redirect them to the Sign In page.
    if (!user) {
      e.preventDefault();
      router.push(`/login?redirect=/services/${service._id}`);
    }
  };

  const primaryImage =
    service.images && service.images.length > 0
      ? service.images[0]
      : "/wedding/bridal-store.jpg";

  const isPremium = service.vendorId?.subscriptionPlan === "premium";

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-[#E8E2D9] hover:border-[#C59B6D] transition-all duration-500 shadow-sm hover:shadow-xl flex flex-col">
      {/* Image Container with category pill badge & subtle zoom */}
      <div className="relative aspect-[4/3] sm:aspect-[16/11] w-full overflow-hidden bg-[#F5EFEB]">
        <img
          src={primaryImage}
          alt={service.serviceName}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-70 group-hover:opacity-50 transition-opacity" />

        {/* Top Badges */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
          <span className="bg-white/95 backdrop-blur-md text-[#1C1917] text-[10px] font-semibold tracking-wider uppercase px-3 py-1 rounded-full shadow-sm border border-[#E8E2D9]/60">
            {service.category}
          </span>

          {isPremium && (
            <span className="bg-[#C59B6D] text-white text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full shadow-md flex items-center gap-1 border border-white/20">
              <Sparkles className="w-3 h-3 fill-white" />
              Featured Atelier
            </span>
          )}
        </div>

        {/* Location badge on bottom left of image */}
        <div className="absolute bottom-3 left-4 flex items-center gap-1.5 text-white text-xs font-light">
          <MapPin className="w-3.5 h-3.5 text-[#C59B6D]" />
          <span className="truncate drop-shadow-sm">{service.location}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Vendor Info Bar & Rating */}
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2 min-w-0">
              <img
                src={
                  service.vendorId?.image ||
                  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
                }
                alt={service.vendorId?.name || "Vendor"}
                className="w-6 h-6 rounded-full object-cover border border-[#E8E2D9] flex-shrink-0"
              />
              <span className="text-xs text-gray-500 truncate font-medium">
                {service.vendorId?.businessName || service.vendorId?.name || "Verified Atelier"}
              </span>
            </div>

            <div className="flex items-center gap-1 text-[#C59B6D] flex-shrink-0">
              <Star className="w-3.5 h-3.5 fill-[#C59B6D]" />
              <span className="text-xs font-semibold text-[#1C1917]">4.9</span>
            </div>
          </div>

          {/* Service Name */}
          <h3 className="font-serif text-xl font-medium text-[#1C1917] group-hover:text-[#C59B6D] transition-colors leading-snug line-clamp-2">
            {service.serviceName}
          </h3>

          {/* Short description */}
          <p className="mt-2 text-xs text-gray-500 font-light line-clamp-2 leading-relaxed">
            {service.description}
          </p>
        </div>

        {/* Bottom Price & View Details Action */}
        <div className="pt-5 mt-5 border-t border-[#E8E2D9]/70 flex items-center justify-between">
          <div>
            <span className="text-[10px] tracking-wider uppercase text-gray-400 block font-medium">
              Starting from
            </span>
            <span className="font-serif text-lg font-semibold text-[#1C1917]">
              {formatCurrency(service.price)}
            </span>
          </div>

          <Link
            href={`/services/${service._id}`}
            onClick={handleCardClick}
            className="inline-flex items-center gap-1.5 text-xs tracking-wider uppercase font-semibold text-[#1C1917] hover:text-white border border-[#1C1917]/25 hover:border-[#C59B6D] hover:bg-[#C59B6D] px-4 py-2 rounded-full transition-all duration-300 shadow-sm"
          >
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
