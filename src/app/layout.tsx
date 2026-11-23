import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "WedPlan — Luxury Wedding Planning & Vendor Platform",
  description:
    "WedPlan is an exclusive wedding planning platform connecting couples with world-class venues, photographers, florists, stylists, and bespoke wedding services.",
  keywords: [
    "wedding planning",
    "wedding vendors",
    "wedding venues",
    "wedding photography",
    "bridal store",
    "gretna green",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased min-h-screen flex flex-col selection:bg-[#C59B6D] selection:text-white">
        <AuthProvider>
          {children}
          <Toaster
            position="top-right"
            richColors
            closeButton
            toastOptions={{
              className: "font-sans text-sm",
              style: {
                borderRadius: "1rem",
                border: "1px solid #E8E2D9",
              },
            }}
          />
        </AuthProvider>
      </body>
    </html>
  );
}
