export type UserRole = "customer" | "vendor" | "admin";
export type SubscriptionPlan = "free" | "premium";

export interface User {
  _id: string;
  name: string;
  email: string;
  image?: string;
  role: UserRole;
  isBlocked: boolean;
  businessName?: string;
  subscriptionPlan: SubscriptionPlan;
  subscriptionExpiresAt?: string | null;
  createdAt?: string;
}

export type ServiceCategory =
  | "Photography & Videography"
  | "Wedding Venues"
  | "Decoration & Florist"
  | "Catering Services"
  | "Makeup & Styling"
  | "Wedding Fashion";

export interface Service {
  _id: string;
  vendorId: {
    _id: string;
    name: string;
    email: string;
    image?: string;
    businessName?: string;
    subscriptionPlan?: SubscriptionPlan;
  };
  serviceName: string;
  category: ServiceCategory;
  description: string;
  price: number;
  location: string;
  images: string[];
  status: "pending" | "approved" | "rejected";
  isActive: boolean;
  createdAt: string;
}

export type BookingStatus = "Pending" | "Accepted" | "Rejected" | "Cancelled";

export interface Booking {
  _id: string;
  serviceId: {
    _id: string;
    serviceName: string;
    category: string;
    price: number;
    images: string[];
    location: string;
  };
  vendorId: {
    _id: string;
    name: string;
    email: string;
    businessName?: string;
    image?: string;
  };
  customerId: {
    _id: string;
    name: string;
    email: string;
    image?: string;
  };
  eventDate: string;
  eventLocation: string;
  message?: string;
  status: BookingStatus;
  createdAt: string;
}

export interface Transaction {
  _id: string;
  vendorId: {
    _id: string;
    name: string;
    email: string;
    businessName?: string;
    image?: string;
  };
  plan: string;
  amount: number;
  currency: string;
  stripeSessionId?: string;
  status: "succeeded" | "pending" | "failed";
  createdAt: string;
}

export interface DashboardStats {
  // Admin stats
  totalUsers?: number;
  totalVendors?: number;
  totalCustomers?: number;
  totalServices?: number;
  pendingServices?: number;
  approvedServices?: number;
  rejectedServices?: number;
  totalBookings?: number;
  totalTransactions?: number;
  totalRevenue?: number;

  // Vendor stats
  activeServices?: number;
  pendingBookings?: number;
  acceptedBookings?: number;
  rejectedBookings?: number;
  subscriptionPlan?: SubscriptionPlan;
  subscriptionExpiresAt?: string | null;

  // Customer stats
  cancelledBookings?: number;
}
