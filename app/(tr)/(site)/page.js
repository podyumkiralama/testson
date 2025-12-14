// app/(tr)/(site)/page.js

import HeroSection from "@/components/HeroSection";
import HeroBelow from "@/components/HeroBelow";
import {
  ServicesTabsDeferred,
  ProjectsGalleryDeferred,
  CorporateEventsDeferred,
  CorporateIntroDeferred,
  TechCapabilitiesDeferred,
  WhyChooseUsDeferred,
  FaqDeferred,
} from "@/components/DeferredSections.client";

import { HOME_PAGE_TITLE, getOgImageUrl } from "@/lib/seo/seoConfig";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { BASE_SITE_URL, ORGANIZATION_ID, WEBSITE_ID } from "@/lib/seo/schemaIds";

/* -------------------
   Below-the-fold: content-visibility (perf)
------------------- */
const BELOW_THE_FOLD_VISIBILITY_STYLE = {
  contentVisibility: "auto",
  containIntrinsicSize: "1px 1200px",
};

/* -------------------
   JSON-LD helpers
------------------- */
function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default function HomePage() {
  const baseUrl = BASE_SITE_URL;
  const breadcrumbItems = [{ name: "Ana Sayfa", url: `${baseUrl}/` }];

  // OG image
  const ogImage = getOgImageUrl?.({
    path: "/img/og/sahneva-og.webp",
    absolute: true,
  });

  // Basic structured data (minimal, safe)
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: `${baseUrl}/`,
    name: "Sahneva",
    publisher: { "@id": ORGANIZATION_ID },
  };

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: "Sahneva Organizasyon",
    url: `${baseUrl}/`,
    logo: `${baseUrl}/img/logo/sahneva-logo.webp`,
  };

  // SEO lists used in TechCapabilities
  const SEO_TECH_FEATURES = [
    {
      title: "LED Ekran Kurulum & Teknik Operasyon",
      desc: "Indoor/Outdoor LED panel kurulumları, canlı yayın/stream ve içerik yönetimi.",
    },
    {
      title: "Ses & Işık Sistemleri",
      desc: "Profesyonel ses sistemleri, ışık tasarımı ve teknik ekip desteği.",
    },
    {
      title: "Sahne, Podyum & Truss",
      desc: "Modüler sahne/podyum, truss sistemleri ve güvenli kurulum çözümleri.",
    },
  ];

  const SEO_INFRA_FEATURES = [
    {
      title: "Keşif & Planlama",
      desc: "Mekân keşfi, teknik ihtiyaç analizi ve proje planı.",
    },
    {
      title: "Kurulum & Operasyon",
      desc: "Zamanında kurulum, sahada teknik ekip ve operasyon yönetimi.",
    },
    {
      title: "Söküm & Teslim",
      desc: "Etkinlik sonrası güvenli söküm ve raporlama.",
    },
  ];

  return (
    <div className="overflow-x-hidden bg-black">
      {/* Basic JSON-LD */}
      <JsonLd data={websiteJsonLd} />
      <JsonLd data={organizationJsonLd} />
      <BreadcrumbJsonLd items={breadcrumbItems} />

      {/* 1) HERO (statik kalsın: LCP için en iyisi) */}
      <HeroSection />

      {/* 2) HERO ALTI */}
      <HeroBelow />

      {/* anchor */}
      <div id="teklif-al" className="sr-only" />

      {/* 3) HİZMETLER TABS */}
      <section aria-labelledby="hizmetler-title" className="bg-black">
        <h2 id="hizmetler-title" className="sr-only">
          Hizmetler
        </h2>
        <ServicesTabsDeferred idleTimeout={1800} rootMargin="260px" />
      </section>

      {/* 4) PROJELER */}
      <ProjectsGalleryDeferred idleTimeout={3200} rootMargin="360px" />

      {/* 5) TECH CAPABILITIES (below-the-fold) */}
      <div className="bg-slate-900 py-16" style={BELOW_THE_FOLD_VISIBILITY_STYLE}>
        <TechCapabilitiesDeferred
          techFeatures={SEO_TECH_FEATURES}
          infraFeatures={SEO_INFRA_FEATURES}
        />
      </div>

      {/* 6) KURUMSAL ORGANİZASYON */}
      <div className="bg-slate-50 py-0 m-0 w-full">
        <CorporateEventsDeferred />
      </div>

      {/* 7) KURUMSAL INTRO (below-the-fold) */}
      <div className="bg-black py-0 m-0 w-full" style={BELOW_THE_FOLD_VISIBILITY_STYLE}>
        <CorporateIntroDeferred />
      </div>

      {/* 8) WHY CHOOSE US */}
      <div className="w-full p-0 m-0">
        <WhyChooseUsDeferred />
      </div>

      {/* 10) SSS */}
      <div className="w-full bg-transparent p-0 m-0">
        <FaqDeferred />
      </div>
    </div>
  );
}
