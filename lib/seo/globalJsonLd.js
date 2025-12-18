import {
  BASE_SITE_URL,
  LOCAL_BUSINESS_ID,
  ORGANIZATION_ID,
  WEBSITE_ID,
} from "./schemaIds";

export const globalJsonLd = {
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
