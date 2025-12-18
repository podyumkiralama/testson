// app/layout.jsx
import "../styles/globals.css";

import SkipLinks from "@/components/SkipLinks";
import NewTabAccessibility from "@/components/NewTabAccessibility.client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StickyVideoRailclient from "@/components/StickyVideoRail.client";
import DeferredSpeedInsights from "@/components/DeferredSpeedInsights.client";
import AnalyticsConsentWrapper from "@/components/AnalyticsConsentWrapper.client";

import { HOME_PAGE_TITLE, SITE_URL, getOgImageUrl } from "@/lib/seo/seoConfig";

/* ================== METADATA ================== */
export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: HOME_PAGE_TITLE, template: "%s | Sahneva" },
  applicationName: "Sahneva Organizasyon",
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Sahneva Organizasyon",
    images: [{ url: getOgImageUrl(), width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", images: [getOgImageUrl()] },
};

/* ================== ROOT LAYOUT ================== */
export default function RootLayout({ children }) {
  return (
    <html lang="tr" dir="ltr" suppressHydrationWarning>
      <body className="min-h-[100svh] flex flex-col bg-white text-neutral-900 antialiased">
        {/* Skip links */}
        <SkipLinks />

        {/* A11y helpers */}
        <NewTabAccessibility />

        {/* Header */}
        <header id="_main_header" className="relative z-50">
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
        <div id="_main_footer">
          <Footer />
        </div>

        {/* Perf / Consent */}
        <DeferredSpeedInsights />
        <AnalyticsConsentWrapper />
      </body>
    </html>
  );
}
