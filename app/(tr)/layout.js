// app/(tr)/layout.js
import SkipLinks from "@/components/SkipLinks";
import NonCriticalStylesheet from "@/components/NonCriticalStylesheet";
import DeferredSpeedInsights from "@/components/DeferredSpeedInsights.client";
import DocumentDirection from "@/components/i18n/DocumentDirection.client";
import UtilityBar from "@/components/UtilityBar.client";
import Navbar from "@/components/Navbar";
import StickyVideoRailclient from "@/components/StickyVideoRail.client";
import NewTabAccessibility from "@/components/NewTabAccessibility.client";
import Footer from "@/components/Footer";

import { LOCALE_CONTENT } from "@/lib/i18n/localeContent";
import { SITE_URL } from "@/lib/seo/seoConfig";
import { ORGANIZATION_ID, WEBSITE_ID, LOCAL_BUSINESS_ID } from "@/lib/seo/schemaIds";

const DEFAULT_LOCALE = LOCALE_CONTENT.tr;

export default function TrLayout({ children }) {
  const site = String(SITE_URL || "https://www.sahneva.com").replace(/\/$/, "");

  // ✅ ESKİ DOĞRU JSON-LD MANTIĞINI BURADA KORUYORUZ
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": ORGANIZATION_ID,
        name: "Sahneva Organizasyon",
        url: site,
        // ... eski doğru alanların (logo, sameAs, contactPoint vs) aynen burada
      },
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: site,
        name: "Sahneva",
        publisher: { "@id": ORGANIZATION_ID },
        inLanguage: "tr-TR",
      },
      {
        "@type": "LocalBusiness",
        "@id": LOCAL_BUSINESS_ID,
        name: "Sahneva Organizasyon",
        url: site,
        parentOrganization: { "@id": ORGANIZATION_ID },
        // ... eski doğru local business alanları
      },
    ],
  };

  return (
    <>
      <SkipLinks />
      <DocumentDirection locale={DEFAULT_LOCALE} />

      <NonCriticalStylesheet />
      <DeferredSpeedInsights />
      <NewTabAccessibility />

      {/* ✅ JSON-LD – SSR içinde */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <UtilityBar />
      <Navbar />

      <main id="_main_content">{children}</main>

      <StickyVideoRailclient />
      <Footer />
    </>
  );
}
