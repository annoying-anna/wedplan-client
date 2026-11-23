"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Service } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { MapPin, ArrowRight, Sparkles, Building2 } from "lucide-react";

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
      : "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80";

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-[#E8E2D9] hover:border-[#C59B6D] transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col">
      {/* Image Container with category pill badge */}
      <div className="relative h-64 w-full overflow-hidden bg-[#F4EFEA]">
        <img
          src={primaryImage}
          alt={service.serviceName}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

        {/* Category Badge */}
        <span className="absolute top-4 left-4 bg-white/95 backdrop-blur-md text-[#1C1917] text-[10px] font-semibold tracking-wider uppercase px-3 py-1 rounded-full shadow-sm">
          {service.category}
        </span>

        {/* Premium Vendor Badge */}
        {service.vendorId?.subscriptionPlan === "premium" && (
          <span className="absolute top-4 right-4 bg-[#C59B6D] text-white text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
            <Sparkles className="w-3 h-3 fill-white" />
            Featured
          </span>
        )}

        {/* Location badge on bottom left of image */}
        <div className="absolute bottom-3 left-4 flex items-center gap-1.5 text-white/95 text-xs font-light">
          <MapPin className="w-3.5 h-3.5 text-[#C59B6D]" />
          <span>{service.location}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Vendor Info Bar */}
          <div className="flex items-center gap-2.5 mb-3">
            <img
              src={
                service.vendorId?.image ||
                "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
              }
              alt={service.vendorId?.name || "Vendor"}
              className="w-6 h-6 rounded-full object-cover border border-[#E8E2D9]"
            />
            <span className="text-xs text-gray-500 truncate font-medium">
              {service.vendorId?.businessName || service.vendorId?.name || "Verified Atelier"}
            </span>
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
        <div className="pt-5 mt-4 border-t border-[#E8E2D9]/70 flex items-center justify-between">
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
            className="inline-flex items-center gap-1.5 text-xs tracking-wider uppercase font-semibold text-[#1C1917] hover:text-[#C59B6D] border border-[#1C1917]/20 hover:border-[#C59B6D] px-4 py-2 rounded-full transition-all group-hover:bg-[#C59B6D] group-hover:text-white group-hover:border-[#C59B6D]"
          >
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
