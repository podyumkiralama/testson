// app/(tr)/layout.js
import SkipLinks from "@/components/SkipLinks";
import NonCriticalStylesheet from "@/components/NonCriticalStylesheet";
import DeferredSpeedInsights from "@/components/DeferredSpeedInsights.client";
import NewTabAccessibility from "@/components/NewTabAccessibility.client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LOCALE_CONTENT } from "@/lib/i18n/localeContent";
import { HOME_PAGE_TITLE, SITE_URL, getOgImageUrl } from "@/lib/seo/seoConfig";
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

/* ================== METADATA ================== */
export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Sahne, Podyum, LED Ekran & Ses Işık Kiralama | Sahneva",
    template: "%s | Sahneva",
  },
  description:
    "Türkiye genelinde sahne, podyum, LED ekran, ses-ışık sistemleri ve çadır kiralama. Hızlı kurulum, profesyonel teknik ekip, uygun fiyat. Hemen teklif alın!",
  applicationName: "Sahneva Organizasyon",
  manifest: "/manifest.json",
   openGraph: {
    type: "website",
    url: SITE_URL,
    title: "Sahne, Podyum, LED Ekran & Ses Işık Kiralama | Sahneva Organizasyon",
    description:
      "Kurumsal etkinlikler, konserler, festivaller ve lansmanlar için sahne, podyum, LED ekran, ses-ışık ve çadır kiralama çözümleri.",
    siteName: "Sahneva Organizasyon",
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
    title: "Sahne, Podyum, LED Ekran & Ses Işık Kiralama | Sahneva Organizasyon",
    description:
      "Profesyonel etkinlik prodüksiyon çözümleri. Sahne, podyum, LED ekran, ses-ışık ve çadır kiralama.",
    images: [getOgImageUrl()],
  },
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
        name: "Sahneva",
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
        address: {
          "@type": "PostalAddress",
          addressCountry: "TR",
        },
        areaServed: {
          "@type": "Country",
          name: "Türkiye",
        },
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
