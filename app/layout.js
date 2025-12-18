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

/* ================== VIEWPORT ================== */
export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#6d28d9",
};

/* ================== METADATA ================== */
export const metadata = {
  metadataBase: new URL(SITE_URL),

  applicationName: "Sahneva Organizasyon",

  title: {
    default: HOME_PAGE_TITLE || "Sahne, Podyum, LED Ekran & Ses Işık Kiralama",
    template: "%s | Sahneva",
  },

  description:
    "Türkiye genelinde sahne, podyum, LED ekran, ses-ışık sistemleri ve çadır kiralama. Hızlı kurulum, profesyonel teknik ekip, uygun fiyat. Hemen teklif alın!",

  manifest: "/manifest.json",

  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: ["/favicon.ico"],
  },

  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "Sahne, Podyum, LED Ekran & Ses Işık Kiralama | Sahneva",
    description:
      "Kurumsal etkinlikler, konserler, festivaller ve lansmanlar için sahne, podyum, LED ekran, ses-ışık ve çadır kiralama çözümleri.",
    siteName: "Sahneva",
    images: [
      {
        url: getOgImageUrl(),
        width: 1200,
        height: 630,
        alt: "Sahneva profesyonel açık hava sahne, LED ekran ve ışık kurulumu",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Sahne, Podyum, LED Ekran & Ses Işık Kiralama | Sahneva",
    description:
      "Profesyonel etkinlik prodüksiyon çözümleri. Sahne, podyum, LED ekran, ses-ışık ve çadır kiralama.",
    images: [getOgImageUrl()],
  },
};

/* ================== JSON-LD: GLOBAL GRAPH ================== */
const globalJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": ORGANIZATION_ID,
      name: "Sahneva",
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
      "@type": "LocalBusiness",
      "@id": LOCAL_BUSINESS_ID,
      name: "Sahneva",
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
      areaServed: {
        "@type": "AdministrativeArea",
        name: "Türkiye",
      },
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
      name: "Sahneva",
      description:
        "Sahne, podyum, LED ekran, ses-ışık ve çadır kiralama hizmetleri için profesyonel etkinlik prodüksiyon çözümleri.",
      inLanguage: "tr-TR",
      publisher: { "@id": ORGANIZATION_ID },
    },
  ],
};

/* ================== ROOT LAYOUT ================== */
export default function RootLayout({ children }) {
  return (
    <html
      lang={DEFAULT_LANG}
      dir={DEFAULT_DIR}
      className={inter.className}
      suppressHydrationWarning
    >
      <body className="min-h-[100svh] flex flex-col bg-white text-neutral-900 antialiased">
        <SkipLinks />
        <DocumentDirection lang={DEFAULT_LANG} dir={DEFAULT_DIR} />
        <NewTabAccessibility />

        {/* GLOBAL JSON-LD */}
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(globalJsonLd).replace(/</g, "\\u003c"),
          }}
        />

        <header className="relative z-50" aria-label="Sahneva site başlığı ve ana gezinme">
          <Navbar />
          {process.env.NODE_ENV === "production" ? <StickyVideoRailclient /> : null}
        </header>

        <main
          id="_main_content"
          tabIndex={-1}
          aria-label="Sahneva ana içerik"
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
