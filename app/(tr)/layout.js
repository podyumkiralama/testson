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

/* ================== JSON-LD (SITE LEVEL – TR) ================== */
function TrSiteJsonLd() {
  const site = String(SITE_URL || "https://www.sahneva.com").replace(/\/$/, "");

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": ORGANIZATION_ID,
        name: "Sahneva Organizasyon",
        url: site,
        logo: `${site}/img/logo/sahneva-logo.webp`,
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
        url: site,
        name: "Sahneva Organizasyon",
        publisher: { "@id": ORGANIZATION_ID },
        inLanguage: "tr-TR",
        potentialAction: {
          "@type": "SearchAction",
          target: `${site}/arama?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },

      {
        "@type": "LocalBusiness",
        "@id": LOCAL_BUSINESS_ID,
        name: "Sahneva Organizasyon",
        url: site,
        parentOrganization: { "@id": ORGANIZATION_ID },
        image: `${site}/img/og/og-default.webp`,
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

      {/* ✅ JSON-LD – HEAD KULLANMADAN */}
      <TrSiteJsonLd />

      <Navbar />

      <main id="_main_content">{children}</main>

      <Footer />
    </>
  );
}
