// app/layout.jsx

import "../styles/globals.css";

import SkipLinks from "@/components/SkipLinks";
import DocumentDirection from "@/components/i18n/DocumentDirection.client";
import NewTabAccessibility from "@/components/NewTabAccessibility.client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StickyVideoRailclient from "@/components/StickyVideoRail.client";
import DeferredSpeedInsights from "@/components/DeferredSpeedInsights.client";
import AnalyticsConsentWrapper from "@/components/AnalyticsConsentWrapper.client";

export const metadata = {
  applicationName: "Sahneva Organizasyon",
  title: {
    default: "Sahneva | Sahne, LED Ekran & Etkinlik Prodüksiyon",
    template: "%s | Sahneva Organizasyon",
  },
  description:
    "Türkiye genelinde sahne, podyum, LED ekran, ses-ışık sistemleri ve etkinlik prodüksiyon hizmetleri.",

  manifest: "/manifest.json",

  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon.ico",
  },

  // ❌ Bilerek YOK:
  // themeColor
  // viewport (Next otomatik yönetir)
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body className="min-h-[100svh] flex flex-col bg-white text-neutral-900 antialiased">
        <SkipLinks />
        <DocumentDirection />
        <NewTabAccessibility />

        <header className="relative z-50">
          <Navbar />
          {process.env.NODE_ENV === "production" ? (
            <StickyVideoRailclient />
          ) : null}
        </header>

        <main
          id="_main_content"
          tabIndex={-1}
          className="flex-1 pt-16 lg:pt-20 focus:outline-none"
        >
          {children}
        </main>

        <Footer />

        {/* ⬇️ SABİT: EN SON, SCROLL / IDLE GATE ARKASINDA */}
       

        <DeferredSpeedInsights />
        <AnalyticsConsentWrapper />
      </body>
    </html>
  );
}
