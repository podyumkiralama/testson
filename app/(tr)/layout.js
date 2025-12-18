// app/(tr)/(site)/layout.jsx

import {
  HOME_PAGE_TITLE,
  buildAlternateLanguages,
  buildCanonical,
  SITE_URL,
  getOgImageUrl,
} from "@/lib/seo/seoConfig";

import DeferredJsonLd from "@/components/seo/DeferredJsonLd";

import {
  BASE_SITE_URL,
  ORGANIZATION_ID,
  WEBSITE_ID,
  LOCAL_BUSINESS_ID,
} from "@/lib/seo/schemaIds";

/* ================== JSON-LD: GLOBAL GRAPH (TR) ================== */
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

/* ================== METADATA (TR FULL) ================== */
export const metadata = {
  title: {
    default: HOME_PAGE_TITLE,
    template: "%s | Sahneva",
  },

  description:
    "Türkiye genelinde sahne, podyum, LED ekran, ses-ışık sistemleri ve çadır kiralama. Hızlı kurulum, profesyonel teknik ekip, uygun fiyat. Hemen teklif alın!",

  alternates: {
    canonical: buildCanonical("/"),
    languages: buildAlternateLanguages("/"),
  },

  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "Sahne, Podyum, LED Ekran & Ses Işık Kiralama | Sahneva Organizasyon",
    description:
      "Kurumsal etkinlikler, konserler, festivaller ve lansmanlar için sahne, podyum, LED ekran, ses-ışık ve çadır kiralama çözümleri.",
    siteName: "Sahneva Organizasyon",
    locale: "tr_TR",
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

/* ================== TR LAYOUT ================== */
export default function TurkishLayout({ children }) {
  return (
    <>
      {/* JSON-LD: global graph (TR segment) */}
      <DeferredJsonLd id="global-schema" data={globalJsonLd} />

      {children}
    </>
  );
}
