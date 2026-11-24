# WedPlan — Luxury Wedding Planning & Atelier Platform (Client)

WedPlan is a role-based, full-stack wedding planning platform where couples discover curated wedding services (venues, photography, floral design, catering, bridal couture, styling) and request bookings from verified ateliers. Vendors manage their catalog, review booking requests, and upgrade to Premium via Stripe. Admins oversee user security, moderate listings, and monitor immutable transactions.

This repository contains the **Next.js 15 (App Router) client**. The Express + MongoDB API lives in the [server repository](https://github.com/annoying-anna/wedplan-server).

---

## 🌐 Live Deployment & Repositories

| Deliverable | URL | Notes |
| :--- | :--- | :--- |
| **Live Frontend** | [https://client-rho-five-11.vercel.app](https://client-rho-five-11.vercel.app) | Next.js 15 on Vercel |
| **Live Backend API** | [https://wedplan-server-gilt.vercel.app](https://wedplan-server-gilt.vercel.app) | Express serverless API |
| **Health Check** | [https://wedplan-server-gilt.vercel.app/api/health](https://wedplan-server-gilt.vercel.app/api/health) | Returns `{ status: "healthy" }` |
| **Client Repository** | [github.com/annoying-anna/wedplan-client](https://github.com/annoying-anna/wedplan-client) | This repository |
| **Server Repository** | [github.com/annoying-anna/wedplan-server](https://github.com/annoying-anna/wedplan-server) | Express API + seed script |

> Both Vercel projects are public. Deployment protection (SSO) is disabled so evaluators can open every route without a Vercel login.

---

## 🎨 Design System (Gretna Green × Fleur Bridal)

- **Editorial typography**: `Playfair Display` serif headings with italic accents, paired with `Plus Jakarta Sans` and `Cormorant Garamond`.
- **Palette**: warm ivory `#FAF8F5`, champagne gold `#C59B6D`, deep charcoal `#1C1917`, sage olive `#525D4F`, terracotta `#C7795C`.
- **Signature details**: hairline gold eyebrow dividers (`— WEDDING PLANNER & ATELIER —`), rotating terracotta reception stamps, press logo strip (Forbes, NYT, The Guardian, TIME, NBC News).
- **Motion**: Framer Motion scroll-triggered reveals across the homepage and service cards.
- **Responsive**: desktop, tablet, and mobile layouts with a collapsible dashboard sidebar and mobile navigation drawer.

---

## ✨ Important Features

### Public experience
- **Home page** with hero, dynamic featured services from MongoDB, all 6 wedding categories, “Why Choose WedPlan?”, “How WedPlan Works”, testimonials, destinations, and pricing sections.
- **Browse Services** (`/services`) with keyword search (name, description, location), category chips, location filter, and price sorting (ascending/descending).
- **Service Details** (`/services/[id]`) with a multi-photo gallery, vendor profile card, pricing, description, and a booking request form.
- **Responsive navbar** that updates immediately after sign-in/sign-out. Authenticated users get a profile dropdown with name, avatar, dashboard, profile settings, and logout.
- **Footer** with brand overview, navigation, category shortcuts, concierge contact details, social links, and copyright.

### Authentication & security
- **Better Auth** configured with the native MongoDB adapter, JWT plugin, and Google OAuth (`src/lib/auth.ts`, `src/app/api/auth/[...all]/route.ts`).
- **Better Auth client SDK** (`src/lib/auth-client.ts`) exporting `signIn`, `signOut`, `signUp`, and `useSession`.
- **Google sign-in** on both `/login` and `/register`. A verified Better Auth Google session is bridged into the Express JWT session so the navbar and dashboards update correctly.
- **Email/password registration** with live password rules: minimum 6 characters, at least one uppercase letter, and at least one lowercase letter.
- **Role selection** at registration (Vendor or Customer). Admin accounts cannot be created publicly.
- **Blocked users** are rejected by client route guards and by the server JWT middleware (`403 Forbidden`).
- **Cross-role URL tampering** is blocked in `DashboardLayout` and by server role middleware (`verifyAdmin`, `verifyVendor`, `verifyCustomer`).

### Customer dashboard (`/dashboard/customer`)
- Overview cards: total inquiries, pending, accepted, and declined bookings.
- **My Bookings** tracker with status badges (`Pending`, `Accepted`, `Rejected`, `Cancelled`), a **View Details** modal, and cancellation for pending requests only.
- **Profile Settings** for name and profile photo.

### Vendor dashboard (`/dashboard/vendor`)
- Overview cards: total services, active services, pending booking requests, accepted bookings, and current subscription plan.
- **My Services** with edit, delete, availability toggle, and approval status.
- **Add Service** with ImgBB upload, category selection, validation, and Free-plan enforcement (maximum 3 active services).
- **Booking Requests** with customer details, event date/location/message, and one-click Accept/Reject (locked once processed).
- **Subscription** comparison of Free vs. Premium with an Upgrade button.
- **Profile Settings** for vendor name, business name, and profile image.

### Admin dashboard (`/dashboard/admin`)
- Overview cards: total users, vendors, customers, services, pending services, transactions, and revenue.
- **Manage Users** with search, role filter, a **View Details** modal, and instant Block/Unblock.
- **Manage Services** moderation queue with search, category/status filters, Approve, Reject, and Delete.
- **Transactions** as a read-only, immutable Stripe ledger.

### Payments & uploads
- **Stripe Checkout** session creation on the server, signature-verified webhooks, and server-side session verification.
- **Payment Success** page confirms the transaction and launches gold confetti; **Payment Cancel** offers a clean retry path.
- **ImgBB upload helper** (`src/lib/upload.ts`) with a local FileReader fallback for offline previews.

---

## 🛠️ Technology Stack

| Layer | Technology |
| :--- | :--- |
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| UI | React 19, Tailwind CSS 4, Lucide React, React Icons |
| Animation | Framer Motion, Canvas Confetti |
| Auth | Better Auth (MongoDB adapter, JWT plugin), Google OAuth |
| Data | MongoDB Atlas via the Express API |
| Payments | Stripe Checkout (test mode) |
| Images | ImgBB API + FileReader fallback |
| Notifications | Sonner toast notifications |
| Deployment | Vercel |

---

## 📁 Project Structure

```text
client/
├── src/
│   ├── app/
│   │   ├── page.tsx                  # Editorial homepage
│   │   ├── services/                 # Browse + dynamic details
│   │   ├── login/ register/          # Auth screens
│   │   ├── dashboard/
│   │   │   ├── admin/                # Overview, users, services, transactions, profile
│   │   │   ├── customer/             # Overview, bookings, profile
│   │   │   └── vendor/               # Overview, services, add, bookings, subscription, profile
│   │   ├── payment/                  # success + cancel
│   │   └── api/auth/[...all]/        # Better Auth route handler
│   ├── components/                   # Navbar, Footer, ServiceCard, DashboardLayout
│   ├── context/AuthContext.tsx       # Session + role state
│   └── lib/                          # api, auth, auth-client, upload, utils
├── public/wedding/                   # Local wedding imagery
└── tests/client-smoke.test.js
```

---

## 🔐 Environment Variables

Copy `.env.example` to `.env.local` and fill in your own values. **Never commit real credentials.**

```env
# API + app URLs
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Better Auth
MONGODB_URI=mongodb://127.0.0.1:27017/wedplan
BETTER_AUTH_SECRET=replace_with_a_long_random_secret
BETTER_AUTH_URL=http://localhost:3000

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Stripe (publishable key only on the client)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key

# ImgBB
NEXT_PUBLIC_IMGBB_API_KEY=your_imgbb_api_key
```

Production values (Vercel):

- `NEXT_PUBLIC_API_URL=https://wedplan-server-gilt.vercel.app/api`
- `NEXT_PUBLIC_APP_URL=https://client-rho-five-11.vercel.app`
- `BETTER_AUTH_URL=https://client-rho-five-11.vercel.app`

---

## 💻 Installation & Local Setup

### Prerequisites
- Node.js 20+
- MongoDB running locally (`mongodb://127.0.0.1:27017/wedplan`) or a MongoDB Atlas URI
- The [server repository](https://github.com/annoying-anna/wedplan-server) running on port `5000`

### 1. Start the server
```bash
git clone https://github.com/annoying-anna/wedplan-server.git
cd wedplan-server
npm install
cp .env.example .env        # fill in MONGODB_URI, JWT_SECRET, etc.
npm run seed                # seeds demo users, services, bookings, transactions
npm run dev                 # http://localhost:5000
```

### 2. Start the client
```bash
git clone https://github.com/annoying-anna/wedplan-client.git
cd wedplan-client
npm install
cp .env.example .env.local  # fill in the values above
npm run dev                 # http://localhost:3000
```

### 3. Production build & smoke test
```bash
npm run build
npm test
npm start
```

---

## 🔑 Evaluation Demo Credentials

| Role | Email | Password | What to test |
| :--- | :--- | :--- | :--- |
| **Admin** | `admin@wedplan.com` | `Password123` | Moderation, blocking, transactions |
| **Vendor (Premium)** | `aurora@wedplan.com` | `Password123` | Unlimited services, gold badge |
| **Vendor (Free)** | `sophia@wedplan.com` | `Password123` | 2 of 3 services used, upgrade enforcement |
| **Vendor (Premium)** | `marcus@wedplan.com` | `Password123` | Venue + catering listings |
| **Customer** | `emily@wedplan.com` | `Password123` | Pending and accepted bookings |
| **Customer** | `liam@wedplan.com` | `Password123` | Confirmed bookings |

> The login page has **one-click quick-fill buttons** for Admin, Vendor, and Customer.

---

## ✅ Suggested Evaluation Walkthrough

1. **Public pages** — open `/`, `/services`, and search/filter/sort without signing in.
2. **Protected detail** — open a service while signed out; you are redirected to `/login?redirect=/services/[id]`.
3. **Customer flow** — sign in as `emily@wedplan.com`, open a service, submit a booking, then cancel a pending request from **My Bookings**.
4. **Vendor flow** — sign in as `sophia@wedplan.com`, review **Booking Requests**, accept/reject one, and try adding a 4th service (blocked by the Free plan).
5. **Premium flow** — open **Subscription** as Sophia and click **Upgrade to Premium**. If Stripe keys are absent, the deployment uses an explicitly labelled demo checkout so the flow can still be reviewed without a charge.
6. **Admin flow** — sign in as `admin@wedplan.com`, view user details, block/unblock a user, approve/reject a service, and inspect the read-only transaction ledger.
7. **Role protection** — while signed in as a customer, manually open `/dashboard/admin`; you are redirected to your own dashboard.

---

## 🛡️ Security Notes

- All Express API routes verify JWTs; role middleware enforces Admin/Vendor/Customer access.
- Resource ownership is checked before service edits/deletes, booking cancellations, and booking decisions.
- Blocked accounts receive `403 Forbidden` from the API and are signed out by the client.
- Profile updates ignore `role` and `subscriptionPlan` fields sent by the client.
- Payment activation is server-verified. With real Stripe keys, the server retrieves the Checkout Session, confirms `payment_status === "paid"`, and checks that the session belongs to the requesting vendor. Webhooks are signature-verified and idempotent.
- `.env*` files are git-ignored; only `.env.example` is committed.

---

## 🚀 Deployment

The client is deployed on Vercel. Set the environment variables above in **Project → Settings → Environment Variables**, then deploy:

```bash
vercel --prod
```

Deployment checklist:
- `NEXT_PUBLIC_API_URL` points to the live API.
- `NEXT_PUBLIC_APP_URL` and `BETTER_AUTH_URL` point to the live frontend.
- Google OAuth redirect URI includes the live domain.
- Vercel deployment protection is disabled for public evaluation.
- All routes return `200` on refresh (Next.js App Router handles this).

---

## 📦 Git Commit Requirement

This repository contains **34+ meaningful commits** (the assignment requires at least 20). Commit messages describe the actual work performed. The server repository contains **18+ meaningful commits** (requirement: at least 12).

---

## 🔗 Related Links

- **Server repository**: [github.com/annoying-anna/wedplan-server](https://github.com/annoying-anna/wedplan-server)
- **Live frontend**: [client-rho-five-11.vercel.app](https://client-rho-five-11.vercel.app)
- **Live API**: [wedplan-server-gilt.vercel.app](https://wedplan-server-gilt.vercel.app)
