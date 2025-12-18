// app/layout.jsx
import "../styles/globals.css";

import SkipLinks from "@/components/SkipLinks";
import NonCriticalStylesheet from "@/components/NonCriticalStylesheet";
import DeferredSpeedInsights from "@/components/DeferredSpeedInsights.client";
import DocumentDirection from "@/components/i18n/DocumentDirection.client";
import UtilityBar from "@/components/UtilityBar.client";
import Navbar from "@/components/Navbar";
import StickyVideoRailclient from "@/components/StickyVideoRail.client";
import NewTabAccessibility from "@/components/NewTabAccessibility.client";
import Footer from "@/components/Footer";
import AnalyticsConsentWrapper from "@/components/AnalyticsConsentWrapper.client";

import { LOCALE_CONTENT } from "@/lib/i18n/localeContent";
import { HOME_PAGE_TITLE, SITE_URL, getOgImageUrl } from "@/lib/seo/seoConfig";
import {
  BASE_SITE_URL,
  ORGANIZATION_ID,
  WEBSITE_ID,
  LOCAL_BUSINESS_ID,
} from "@/lib/seo/schemaIds";
import { inter } from "@/app/fonts";

const DEFAULT_LOCALE = LOCALE_CONTENT.tr;
const DEFAULT_LANG = "tr";
const DEFAULT_DIR = DEFAULT_LOCALE.direction;

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
        <UtilityBarClient />

        <DeferredSpeedInsights />
        <AnalyticsConsentWrapper />
      </body>
    </html>
  );
}
