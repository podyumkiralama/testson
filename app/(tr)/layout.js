// app/(tr)/layout.js
import SkipLinks from "@/components/SkipLinks";
import NonCriticalStylesheet from "@/components/NonCriticalStylesheet";
import DeferredSpeedInsights from "@/components/DeferredSpeedInsights.client";
import NewTabAccessibility from "@/components/NewTabAccessibility.client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import { SITE_URL } from "@/lib/seo/seoConfig";
import {
  ORGANIZATION_ID,
  WEBSITE_ID,
  LOCAL_BUSINESS_ID,
} from "@/lib/seo/schemaIds";

/* ================== CONSTANTS ================== */
const SITE = String(SITE_URL || "https://www.sahneva.com").replace(/\/$/, "");
const PAGE_URL = `${SITE}/`;
const OG_IMAGE = `${SITE}/img/og/og-default.webp`;

/* ================== VIEWPORT ================== */
export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#6d28d9",
};

/* ================== METADATA (TR DEFAULT) ================== */
export const metadata = {
  applicationName: "Sahneva Organizasyon",

  title: {
    default: "Sahneva | Sahne, LED Ekran & Etkinlik Prodüksiyon",
    template: "%s | Sahneva Organizasyon",
  },

  description:
    "Türkiye genelinde sahne, podyum, LED ekran, truss, ses-ışık sistemleri ve etkinlik prodüksiyon hizmetleri. Kurulum, test ve söküm dahil hızlı teklif alın.",

  alternates: {
  canonical: `${SITE}/`,
  languages: {
    "tr-TR": `${SITE}/`,
    "en": `${SITE}/en`,
    "ar": `${SITE}/ar`,
    "x-default": `${SITE}/`,
  },
},

  openGraph: {
    type: "website",
    url: PAGE_URL,
    siteName: "Sahneva Organizasyon",
    title: "Sahneva | Sahne, LED Ekran & Etkinlik Prodüksiyon",
    description:
      "Sahne, podyum, LED ekran, truss ve ses-ışık sistemleri kiralama. Türkiye geneli kurulum ve teknik ekip.",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Sahneva Organizasyon – Etkinlik Prodüksiyon Hizmetleri",
      },
    ],
    locale: "tr_TR",
  },

  twitter: {
    card: "summary_large_image",
    title: "Sahneva | Sahne, LED Ekran & Etkinlik Prodüksiyon",
    description:
      "Sahne, LED ekran, truss ve ses-ışık sistemleri kiralama. Türkiye geneli kurulum ve teknik ekip.",
    images: [OG_IMAGE],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  metadataBase: new URL(SITE),
};

/* ================== JSON-LD (SITE LEVEL – TR) ================== */
function TrSiteJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": ORGANIZATION_ID,
        name: "Sahneva Organizasyon",
        url: SITE,
        logo: `${SITE}/img/logo/sahneva-logo.webp`,
        sameAs: [
          "https://www.instagram.com/sahnevaorganizasyon",
          "https://www.youtube.com/@sahnevaorganizasyon",
        ],
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+90-545-304-86-71",
          contactType: "customer service",
          areaServed: "TR",
          availableLanguage: ["Turkish"],
        },
      },

      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: SITE,
        name: "Sahneva Organizasyon",
        publisher: { "@id": ORGANIZATION_ID },
        inLanguage: "tr-TR",
        potentialAction: {
          "@type": "SearchAction",
          target: `${SITE}/arama?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },

      {
        "@type": "LocalBusiness",
        "@id": LOCAL_BUSINESS_ID,
        name: "Sahneva Organizasyon",
        url: SITE,
        parentOrganization: { "@id": ORGANIZATION_ID },
        image: OG_IMAGE,
        telephone: "+90-545-304-86-71",
        address: { "@type": "PostalAddress", addressCountry: "TR" },
        areaServed: { "@type": "Country", name: "Türkiye" },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

/* ================== TR LAYOUT ================== */
export default function TrLayout({ children }) {
  return (
    <>
      <SkipLinks />

      <NonCriticalStylesheet />
      <DeferredSpeedInsights />
      <NewTabAccessibility />

      <TrSiteJsonLd />

      <Navbar />
      <main id="_main_content">{children}</main>
      <Footer />
    </>
  );
}
