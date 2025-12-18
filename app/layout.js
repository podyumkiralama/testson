// app/layout.jsx
import "../styles/globals.css";

import SkipLinks from "@/components/SkipLinks";
import NewTabAccessibility from "@/components/NewTabAccessibility.client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StickyVideoRailclient from "@/components/StickyVideoRail.client";
import DeferredSpeedInsights from "@/components/DeferredSpeedInsights.client";
import AnalyticsConsentWrapper from "@/components/AnalyticsConsentWrapper.client";

import { SITE_URL } from "@/lib/seo/seoConfig";

/* ================== METADATA (GLOBAL ONLY) ================== */
export const metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: "Sahneva Organizasyon",
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

/* ================== ROOT LAYOUT ================== */
export default function RootLayout({ children }) {
  return (
    <html lang="tr" dir="ltr" suppressHydrationWarning>
      <body className="min-h-[100svh] flex flex-col bg-white text-neutral-900 antialiased">
        {/* Skip links (WCAG) */}
        <SkipLinks />

        {/* A11y helpers */}
        <NewTabAccessibility />

        {/* Header */}
        <header
          id="_main_header"
          className="relative z-50"
          aria-label="Sahneva site başlığı ve ana gezinme"
        >
          <Navbar />
          <StickyVideoRailclient />
        </header>

        {/* Main */}
        <main
          id="_main_content"
          tabIndex={-1}
          className="flex-1 pt-16 lg:pt-20 focus:outline-none scroll-mt-24"
          aria-label="Sahneva ana içerik"
        >
          {children}
        </main>

        {/* Footer */}
        <footer id="_main_footer">
          <Footer />
        </footer>

        {/* Performance & consent */}
        <DeferredSpeedInsights />
        <AnalyticsConsentWrapper />
      </body>
    </html>
  );
}
