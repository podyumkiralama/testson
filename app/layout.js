// app/layout.jsx
import "../styles/globals.css";

import SkipLinks from "@/components/SkipLinks";
import DocumentDirection from "@/components/i18n/DocumentDirection.client";
import NewTabAccessibility from "@/components/NewTabAccessibility.client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StickyVideoRailclient from "@/components/StickyVideoRail.client";
import UtilityBarClient from "@/components/UtilityBar.client";
import DeferredSpeedInsights from "@/components/DeferredSpeedInsights.client";
import AnalyticsConsentWrapper from "@/components/AnalyticsConsentWrapper.client";
import NonCriticalStylesheet from "@/components/NonCriticalStylesheet";

import {
  BASE_SITE_URL,
  ORGANIZATION_ID,
  WEBSITE_ID,
  LOCAL_BUSINESS_ID,
} from "@/lib/seo/schemaIds";

/* ================== JSON-LD: GLOBAL GRAPH ================== */
const globalJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": ORGANIZATION_ID,
      name: "Sahneva Organizasyon",
      url: BASE_SITE_URL,
      logo: `${BASE_SITE_URL}/img/logo.png`,
      description:
        "Türkiye genelinde sahne, podyum, LED ekran, ses-ışık ve çadır kiralama hizmetleri sunan profesyonel etkinlik prodüksiyon markası.",
      sameAs: [
        "https://www.instagram.com/sahnevaorganizasyon",
        "https://www.youtube.com/@sahneva",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+90-545-304-8671",
        contactType: "customer service",
        areaServed: ["TR"],
        availableLanguage: ["tr", "en", "ar"],
      },
    },

    {
      "@type": "Organization",
      "@id": `${BASE_SITE_URL}/#editor`,
      name: "Sahneva Editör",
      url: BASE_SITE_URL,
      parentOrganization: { "@id": ORGANIZATION_ID },
    },

    {
      "@type": "LocalBusiness",
      "@id": LOCAL_BUSINESS_ID,
      name: "Sahneva Organizasyon",
      url: BASE_SITE_URL,
      image: `${BASE_SITE_URL}/img/logo.png`,
      telephone: "+90-545-304-8671",
      priceRange: "₺₺₺",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Anadolu Caddesi No:61A, Hamidiye Mahallesi",
        addressLocality: "İstanbul",
        addressRegion: "TR34",
        postalCode: "34400",
        addressCountry: "TR",
      },
      areaServed: { "@type": "AdministrativeArea", name: "Türkiye" },
      parentOrganization: { "@id": ORGANIZATION_ID },
      sameAs: [
        "https://www.instagram.com/sahnevaorganizasyon",
        "https://www.youtube.com/@sahneva",
      ],
    },

    {
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      url: BASE_SITE_URL,
      name: "Sahneva Organizasyon",
      description:
        "Sahne, podyum, LED ekran, ses-ışık ve çadır kiralama hizmetleri için profesyonel etkinlik prodüksiyon çözümleri.",
      inLanguage: "tr-TR",
      publisher: { "@id": ORGANIZATION_ID },
    },
  ],
};


/* ================== METADATA (FINAL) ================== */
export const metadata = {
  title: {
    default: HOME_PAGE_TITLE,      // 🔒 AYNI
    template: "%s | Sahneva",      // ❗ SADECE BURADAN "Organizasyon" SİLİNDİ
  },

  description:
    "Türkiye genelinde sahne, podyum, LED ekran, ses-ışık sistemleri ve çadır kiralama. Hızlı kurulum, profesyonel teknik ekip, uygun fiyat. Hemen teklif alın!",

  applicationName: "Sahneva",

  manifest: "/manifest.json",

  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },
};

/* ================== ROOT LAYOUT (FINAL) ================== */
export default function RootLayout({ children }) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body className="min-h-[100svh] flex flex-col bg-white text-neutral-900 antialiased">
        <SkipLinks />
        <DocumentDirection />
        <NewTabAccessibility />

        {/* ✅ GLOBAL JSON-LD — SITE GENELİ KİMLİK */}
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(globalJsonLd).replace(/</g, "\\u003c"),
          }}
        />

        <NonCriticalStylesheet />

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

        <UtilityBarClient />
        <DeferredSpeedInsights />
        <AnalyticsConsentWrapper />
      </body>
    </html>
  );
}
