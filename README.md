# WedPlan — Luxury Wedding Planning & Atelier Platform (Client)

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Better Auth](https://img.shields.io/badge/Better_Auth-Enabled-C59B6D?style=for-the-badge)](https://www.better-auth.com/)

A role-based, full-stack wedding planning application built with Next.js 15 (App Router), TypeScript, and Tailwind CSS. The interface adopts a luxury editorial wedding aesthetic (inspired by Gretna Green & Fleur Bridal Store), featuring serif typography, champagne gold accents, terracotta reception stamp badges, Framer Motion animations, and seamless booking & Stripe subscription workflows.

---

## 🌐 Live Website & Repository Links
- **Live Frontend**: [https://client-rho-five-11.vercel.app](https://client-rho-five-11.vercel.app)
- **Live Backend API**: [https://wedplan-server-gilt.vercel.app](https://wedplan-server-gilt.vercel.app)
- **Client GitHub Repository**: [https://github.com/annoying-anna/wedplan-client](https://github.com/annoying-anna/wedplan-client)
- **Server GitHub Repository**: [https://github.com/annoying-anna/wedplan-server](https://github.com/annoying-anna/wedplan-server)

---

## 📸 Screenshots

| Homepage Hero | Browse Services Catalog |
| :---: | :---: |
| ![Homepage](public/screenshots/home.png) | ![Browse Services](public/screenshots/services.png) |

| Sign In | Sign Up |
| :---: | :---: |
| ![Sign In](public/screenshots/login.png) | ![Sign Up](public/screenshots/register.png) |

---

## ✨ Important Features
- **Editorial Wedding Design**: Preserves typography (`Playfair Display`, `Cormorant Garamond`, `Plus Jakarta Sans`), colors (ivory `#FAF8F5`, champagne gold `#C59B6D`, sage olive `#525D4F`, terracotta `#C7795C`), spacing, and rotating decorative stamps.
- **Dynamic Hero & Featured Services**: Real-time integration with MongoDB for 6+ approved wedding services across 6 key wedding disciplines.
- **Advanced Catalog Search, Filter & Sort**: Search by keyword, filter by wedding category and location, with ascending and descending price sorting, loading skeletons, and empty states.
- **Dynamic Protected Service Details (`/services/[id]`)**: Multi-image gallery, vendor verification badge, and interactive booking inquiry form. Unauthenticated clicks redirect to `/login`.
- **Full Authentication System (Better Auth + JWT)**:
  - Email & Password registration with live password complexity validation (min 6 characters, uppercase, lowercase).
  - ImgBB file upload for profile & service photos.
  - Google OAuth sign-in support & one-click evaluation credentials quick-fill buttons.
  - Role-based automatic dashboard redirects and cross-role URL protection.
- **Role-Based Dashboards**:
  - **Vendor Dashboard**: Overview stat cards, catalog management (`My Services` with Edit/Delete/Availability), service creation with Free Tier limit enforcement (max 3 active services), booking request processing (`Accept` / `Reject`), Stripe subscription upgrades, and profile settings.
  - **Customer Dashboard**: Overview metrics, booking tracker with status badges (`Pending`, `Accepted`, `Rejected`, `Cancelled`), booking details modal, cancellation actions for pending inquiries, and profile settings.
  - **Admin Dashboard**: Platform-wide analytics, user moderation table with search, role filters, details modal, and immediate `Block` / `Unblock` actions, service moderation with `Approve` / `Reject` / `Delete`, and immutable read-only Stripe transactions ledger.
- **Stripe Checkout & Webhook Flow**: Verified vendor upgrades to Premium tier with celebratory confetti on `/payment/success` and retry options on `/payment/cancel`.
- **Production Resilience**: Custom `404` Not Found, `500` error boundaries, route skeleton loaders, and zero reload issues on production routes.

---

## 🛠️ Technology Stack
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript & React 19
- **Authentication**: Better Auth (`better-auth`, `@better-auth/react`), Google OAuth, JWT Plugin
- **Database Adapter**: MongoDB Client Adapter (`mongodb`)
- **Styling**: Tailwind CSS v4, CSS Custom Properties, Google Web Fonts
- **Animations & Icons**: Framer Motion, Lucide React, React Icons, Canvas Confetti
- **Notifications**: Sonner (Rich Toast Notifications)
- **Payment Gateway**: Stripe SDK & Stripe Checkout
- **Image Hosting**: ImgBB API

---

## 🔐 Environment Variables
Create a `.env.local` file in the root of the `client` directory (never commit `.env.local` to Git):
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

---

## 💻 How to Run Locally
1. Clone the repository & install dependencies:
   ```bash
   git clone https://github.com/annoying-anna/wedplan-client.git
   cd wedplan-client
   npm install
   ```
2. Configure `.env.local` using the template above.
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Build and run production server:
   ```bash
   npm run build
   npm start
   ```
5. Run client smoke tests:
   ```bash
   npm test
   ```
