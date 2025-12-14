// app/(tr)/(site)/page.js

import HeroSection from "@/components/HeroSection";
import {
  ServicesTabsDeferred,
  ProjectsGalleryDeferred,
  CorporateEventsDeferred,
  CorporateIntroDeferred,
  TechCapabilitiesDeferred,
  WhyChooseUsDeferred,
  FaqDeferred,
} from "@/components/DeferredSections.client";

import { ScrollReveal } from "@/components/ScrollReveal";
import { HERO_FEATURES_TR } from "@/lib/heroFeatures";
import { HOME_PAGE_TITLE, getOgImageUrl } from "@/lib/seo/seoConfig";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { BASE_SITE_URL, ORGANIZATION_ID, WEBSITE_ID } from "@/lib/seo/schemaIds";

/* -------------------- SABİT VERİLER -------------------- */

const SEO_TECH_FEATURES = [
  "IP65 dış mekân LED paneller, 4500+ nit parlaklık",
  "Profesyonel line-array ses sistemleri, dijital mikserler",
  "Modüler podyum ve sahne platformları, truss sistemleri",
  "DMX kontrollü ışık sistemleri ve ambiyans aydınlatma",
];

const SEO_INFRA_FEATURES = [
  "100m²+ LED ekran kurulumu (P3.9 outdoor)",
  "Line-array ses sistemleri (JBL, RCF, dB)",
  "Truss kule sistemleri ve roof sahne çözümleri",
  "Jeneratör, UPS ve yedekli enerji altyapısı",
];

const BELOW_THE_FOLD_VISIBILITY_STYLE = Object.freeze({
  contentVisibility: "auto",
});

export const revalidate = 3600;

/* -------------------- SEO ARTICLES (SUSPENSE) -------------------- */

/* -------------------- JSON-LD (Schema.org) -------------------- */

function StructuredData() {
  const HOME_URL = BASE_SITE_URL;
  const WEBPAGE_ID = `${HOME_URL}#webpage`;
  const SERVICE_ID = `${HOME_URL}#primary-service`;
  const CATALOG_ID = `${HOME_URL}#catalog`;
  const FAQ_ID = `${HOME_URL}#sss`;
  const IMAGE_ID = `${HOME_URL}#og`;

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": WEBPAGE_ID,
        url: HOME_URL,
        name: HOME_PAGE_TITLE,
        description:
          "Sahneva ile profesyonel sahne, podyum, LED ekran, ses ve ışık sistemleri kiralama çözümlerini keşfedin. İstanbul merkezli, Türkiye geneli hızlı kurulum.",
        inLanguage: "tr-TR",
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": ORGANIZATION_ID },
        primaryImageOfPage: { "@id": IMAGE_ID },
      },
      {
        "@type": "OfferCatalog",
        "@id": CATALOG_ID,
        name: "Etkinlik Ekipmanları Kiralama Kataloğu",
        url: HOME_URL,
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Podyum Kiralama",
              description: "Modüler podyum sahne kiralama hizmeti",
            },
            priceSpecification: {
              "@type": "UnitPriceSpecification",
              price: "250.00",
              priceCurrency: "TRY",
              unitText: "m²",
              unitCode: "MTK",
            },
            availability: "https://schema.org/InStock",
            areaServed: { "@type": "Country", name: "Türkiye" },
            seller: { "@id": ORGANIZATION_ID },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "LED Ekran Kiralama",
              description: "İç/dış mekan LED ekran kiralama",
            },
            priceSpecification: {
              "@type": "UnitPriceSpecification",
              price: "1700.00",
              priceCurrency: "TRY",
              unitText: "günlük",
              unitCode: "DAY",
            },
            availability: "https://schema.org/InStock",
            areaServed: { "@type": "Country", name: "Türkiye" },
            seller: { "@id": ORGANIZATION_ID },
          },
          {
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: "Çadır Kiralama" },
            priceSpecification: {
              "@type": "PriceSpecification",
              priceCurrency: "TRY",
              minPrice: "6000.00",
              maxPrice: "800000.00",
            },
            availability: "https://schema.org/InStock",
            areaServed: { "@type": "Country", name: "Türkiye" },
            seller: { "@id": ORGANIZATION_ID },
          },
          {
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: "Sandalye Kiralama" },
            priceSpecification: {
              "@type": "UnitPriceSpecification",
              price: "200.00",
              priceCurrency: "TRY",
              unitText: "adet",
            },
            availability: "https://schema.org/InStock",
            areaServed: { "@type": "Country", name: "Türkiye" },
            seller: { "@id": ORGANIZATION_ID },
          },
          {
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: "Masa Kiralama" },
            priceSpecification: {
              "@type": "PriceSpecification",
              priceCurrency: "TRY",
              minPrice: "1000.00",
              maxPrice: "2000.00",
            },
            availability: "https://schema.org/InStock",
            areaServed: { "@type": "Country", name: "Türkiye" },
            seller: { "@id": ORGANIZATION_ID },
          },
          {
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: "Sahne Kiralama" },
            priceSpecification: {
              "@type": "PriceSpecification",
              priceCurrency: "TRY",
              minPrice: "10000.00",
              maxPrice: "200000.00",
            },
            availability: "https://schema.org/InStock",
            areaServed: { "@type": "Country", name: "Türkiye" },
            seller: { "@id": ORGANIZATION_ID },
          },
          {
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: "Ses-Işık Sistemleri" },
            priceSpecification: {
              "@type": "PriceSpecification",
              priceCurrency: "TRY",
              minPrice: "10000.00",
              maxPrice: "300000.00",
            },
            availability: "https://schema.org/InStock",
            areaServed: { "@type": "Country", name: "Türkiye" },
            seller: { "@id": ORGANIZATION_ID },
          },
          {
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: "İstanbul İçi Nakliye" },
            priceSpecification: {
              "@type": "PriceSpecification",
              price: "7000.00",
              priceCurrency: "TRY",
            },
            availability: "https://schema.org/InStock",
            areaServed: { "@type": "Country", name: "Türkiye" },
            seller: { "@id": ORGANIZATION_ID },
          },
        ],
      },
      {
        "@type": "Service",
        "@id": SERVICE_ID,
        name: "Etkinlik Ekipmanları Kiralama",
        description:
          "Türkiye genelinde sahne, podyum, LED ekran, ses-ışık sistemleri ve çadır kiralama hizmeti. Kurulum, teknik operasyon ve söküm dahil.",
        url: HOME_URL,
        areaServed: { "@type": "Country", name: "Türkiye" },
        provider: { "@id": ORGANIZATION_ID },
        hasOfferCatalog: { "@id": CATALOG_ID },
        serviceType: "Event Production",
      },
      {
        "@type": "ImageObject",
        "@id": IMAGE_ID,
        contentUrl: getOgImageUrl(),
        width: 1200,
        height: 630,
      },
      {
        "@type": "VideoObject",
        "@id": `${HOME_URL}#intro-video`,
        name: "Sahneva – Sahne, Podyum ve LED Ekran Kiralama Tanıtım Videosu",
        description:
          "Sahneva’nın sahne, podyum, LED ekran ve ses-ışık sistemleriyle gerçekleştirdiği kurulum ve etkinliklerden kısa bir özet.",
        thumbnailUrl: ["https://img.youtube.com/vi/173gBurWSRQ/hqdefault.jpg"],
        uploadDate: "2024-01-01",
        duration: "PT1M30S",
        publisher: { "@id": ORGANIZATION_ID },
        contentUrl: "https://www.youtube.com/watch?v=173gBurWSRQ",
        embedUrl: "https://www.youtube.com/embed/173gBurWSRQ",
      },
      {
        "@type": "FAQPage",
        "@id": FAQ_ID,
        url: FAQ_ID,
        mainEntity: [
          {
            "@type": "Question",
            name: "Sahne, podyum ve LED ekran kiralama hizmetini hangi şehirlerde veriyorsunuz?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Sahneva olarak İstanbul merkezli çalışıyor ve Türkiye genelinde sahne, podyum, LED ekran, ses-ışık sistemleri ve çadır kiralama hizmeti sunuyoruz. Şehir dışı projelerde nakliye ve konaklama planlamasını ekibimizle birlikte organize ediyoruz.",
            },
          },
          {
            "@type": "Question",
            name: "Kiralama sürecinde keşif ve fiyat teklifi nasıl ilerliyor?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Talebiniz geldikten sonra etkinlik alanı, katılımcı sayısı ve ihtiyaç duyduğunuz ekipmanları birlikte netleştiriyoruz. Gerekirse ücretsiz keşif yapıyor, ardından sahne, podyum, LED ekran ve ses-ışık sistemleri için detaylı ve kalem kalem ayrılmış teklif paylaşıyoruz.",
            },
          },
          {
            "@type": "Question",
            name: "Kurulum ve söküm hizmete dahil mi?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Evet. Tüm sahne, podyum, LED ekran ve ses-ışık kiralamalarında profesyonel ekip tarafından kurulum, etkinlik süresince teknik takip ve etkinlik bitiminde söküm hizmeti standart olarak dahildir.",
            },
          },
          {
            "@type": "Question",
            name: "Sahne ve LED ekran kiralama fiyatları neye göre değişiyor?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Fiyatlar; sahne veya podyum ölçüsü, LED ekran metrekaresi ve piksel aralığı, ses-ışık sistemi kapasitesi, etkinlik günü sayısı ve şehir içi/dışı olmasına göre değişir. Bütçenize uygun birkaç farklı paket seçeneği sunuyoruz.",
            },
          },
          {
            "@type": "Question",
            name: "Etkinlikten ne kadar önce rezervasyon yapmalıyım?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Özellikle yüksek sezonda (bahar-yaz dönemi) sahne, podyum ve LED ekran stoklarının dolmaması için en az 2–3 hafta öncesinden rezervasyon yapmanızı öneriyoruz. Acil projeler için ise aynı hafta içinde hızlı kurulum yapabildiğimiz durumlar da oluyor.",
            },
          },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/* -------------------- HERO ALT BİLEŞENLER -------------------- */


/* -------------------- ANA SAYFA -------------------- */

export default function HomePage() {
  const baseUrl = BASE_SITE_URL;
  const breadcrumbItems = [{ name: "Ana Sayfa", url: `${baseUrl}/` }];

  return (
    <div className="overflow-x-hidden bg-black">
      <BreadcrumbJsonLd items={breadcrumbItems} baseUrl={baseUrl} />
      <StructuredData />

      {/* 1) HERO (statik kalsın: LCP için en iyisi) */}
      <HeroSection />

      {/* 2) HERO ALTI: Feature grid + danışmanlık */}
      <section
        className="py-10 bg-gradient-to-b from-slate-950 to-slate-900"
        aria-labelledby="hero-supporting-features"
        role="region"
      >
        <h2 id="hero-supporting-features" className="sr-only">
          Hızlı öne çıkan özellikler ve ücretsiz danışmanlık bağlantısı
        </h2>
        <div className="space-y-8 px-4 sm:px-6 lg:px-8">
          <HeroFeatureGrid />
          <ScrollReveal delay="1">
            <ConsultationCard />
          </ScrollReveal>
        </div>
      </section>

      {/* anchor */}
      <div id="teklif-al" className="sr-only" />

      {/* 3) HİZMETLER TABS */}
      <section
        aria-labelledby="hizmetler-title"
        className="relative bg-slate-950 overflow-hidden"
        role="region"
      >
        <h2 id="hizmetler-title" className="sr-only">
          Hizmetlerimiz
        </h2>

        {/* Tam genişlik */}
        <ServicesTabsDeferred idleTimeout={2800} rootMargin="320px" />
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

      {/* 7) CORPORATE INTRO */}
      <CorporateIntroDeferred />

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
