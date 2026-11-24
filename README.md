# WedPlan — Luxury Wedding Planning & Atelier Platform (Client)

A role-based, full-stack wedding planning application built with Next.js (App Router), TypeScript, and Tailwind CSS. The interface strictly adopts the provided luxury editorial design aesthetic (inspired by Gretna Green & Fleur Bridal Store), featuring serif typography, champagne gold accents, terracotta reception stamp badges, and seamless booking workflows.

---

## 🌐 Live Website & Links
- **Live Frontend**: [https://client-rho-five-11.vercel.app](https://client-rho-five-11.vercel.app)
- **Live Backend API**: [https://wedplan-server-gilt.vercel.app](https://wedplan-server-gilt.vercel.app)
- **GitHub Repository**: [https://github.com/annoying-anna/wedplan-client](https://github.com/annoying-anna/wedplan-client)

---

## Important Features
- **Editorial Wedding Design Reference**: Faithfully preserves typography (`Playfair Display`, `Cormorant Garamond`, `Plus Jakarta Sans`), colors (ivory `#FAF8F5`, champagne gold `#C59B6D`, sage olive `#525D4F`, terracotta `#C7795C`), spacing, and custom rotating decorative badges.
- **Dynamic Hero & Featured Services**: Real-time integration with backend database for verified and approved wedding services across 6 key wedding disciplines.
- **Advanced Catalog Search & Filters**: Search by keyword, filter by wedding category and location, with ascending and descending price sorting.
- **Dynamic Protected Service Details (`/services/[id]`)**: Full-screen photo gallery, vendor verification badge, and interactive booking inquiry modal. Unauthenticated clicks seamlessly route through sign-in.
- **Full Authentication System**:
  - Email & Password registration with live password complexity validation (min 6 characters, uppercase, lowercase).
  - One-click Google sign-in support.
  - One-click evaluation credentials quick-fill buttons for instant grading.
  - Role-based automatic dashboard redirects.
- **Role-Based Dashboards**:
  - **Vendor Dashboard**: Overview stat cards, catalog management (`My Services`), service creation with Free Tier limit enforcement (max 3 active services), booking request processing (`Accept` / `Reject`), Stripe subscription upgrades, and profile settings.
  - **Customer Dashboard**: Overview metrics, booking tracker with status badges (`Pending`, `Accepted`, `Rejected`, `Cancelled`), cancellation actions for pending inquiries, and profile settings.
  - **Admin Dashboard**: Platform-wide analytics, user moderation table with search, role filters, and immediate `Block` / `Unblock` actions, service moderation with `Approve` / `Reject` / `Delete`, and immutable read-only Stripe transactions ledger.
- **Stripe Checkout & Webhook Flow**: Verified vendor upgrades to Premium tier with celebratory confetti on `/payment/success` and retry options on `/payment/cancel`.
- **Production Resilience**: Custom 404 Not Found, 500 error boundaries, route skeleton loaders, and zero reload issues on production routes.

## Technology Stack
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Authentication**: Better Auth (`better-auth`, `@better-auth/react`), Google OAuth, JWT Plugin
- **Database Adapter**: MongoDB Client Adapter (`mongodb`)
- **Styling**: Tailwind CSS, CSS Custom Properties, Google Web Fonts
- **Animations & Icons**: Framer Motion, Lucide React, React Icons, Canvas Confetti
- **Notifications**: Sonner (Rich Toast Notifications)
- **Payment Gateway**: Stripe SDK & Stripe Checkout
- **Image Hosting**: ImgBB API

## Environment Variables
Create a `.env.local` file in the root of the `client` directory:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_APP_URL=http://localhost:3000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/wedplan
BETTER_AUTH_SECRET=your_better_auth_secret_key
BETTER_AUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
NEXT_PUBLIC_IMGBB_API_KEY=your_imgbb_api_key
```

## How to Run Locally
1. Install dependencies:
   ```bash
   npm install
   ```
2. Build production assets:
   ```bash
   npm run build
   ```
3. Run verification test:
   ```bash
   npm test
   ```
4. Start development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Evaluation Demo Credentials
- **Admin**: `admin@wedplan.com` / `Password123`
- **Vendor (Premium)**: `aurora@wedplan.com` / `Password123`
- **Vendor (Free)**: `sophia@wedplan.com` / `Password123`
- **Customer**: `emily@wedplan.com` / `Password123`

## GitHub Repository
- **Client**: [https://github.com/annoying-anna/wedplan-client](https://github.com/annoying-anna/wedplan-client)
- **Server**: [https://github.com/annoying-anna/wedplan-server](https://github.com/annoying-anna/wedplan-server)
- **Customer**: `emily@wedplan.com` / `Password123`
