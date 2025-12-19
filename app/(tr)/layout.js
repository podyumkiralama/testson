import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import UtilityBar from "../../components/UtilityBar.client";
import StickyVideoRail from "@/components/StickyVideoRail"; // Root'tan buraya taşıdık
import { SpeedInsights } from "@vercel/speed-insights/next";

export default function TurkishLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Video Rail ve Utility Bar'ı buraya alarak, 
         sadece Türkçe sayfalarda görünmesini garanti altına aldık.
      */}
      <StickyVideoRail />
      
      <header
  /* ========================= JSON-LD: ORGANIZATION ========================= */
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://www.sahneva.com/#org",
  name: "Sahneva",
  url: "https://www.sahneva.com",
  logo: "https://www.sahneva.com/img/logo.png",
  description:
    "Türkiye genelinde sahne, podyum, LED ekran, ses-ışık sistemleri kiralama hizmetleri",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+90-545-304-8671",
    contactType: "customer service",
    areaServed: "TR",
    availableLanguage: ["tr"],
  },
  sameAs: [
    "https://www.instagram.com/sahnevaorganizasyon",
    "https://www.youtube.com/@sahneva",
  ],
};

/* ========================= JSON-LD: LOCAL BUSINESS ========================= */
const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://www.sahneva.com/#localbiz",
  name: "Sahneva",
  image: "https://www.sahneva.com/img/logo.png",
  url: "https://www.sahneva.com",
  telephone: "+90-545-304-8671",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Kağıthane",
    addressRegion: "İstanbul",
    addressCountry: "TR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 41.081,
    longitude: 28.9702,
  },
  priceRange: "₺₺",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "09:00",
      closes: "23:00",
    },
  ],
};

/* ========================= JSON-LD: WEBSITE ========================= */
const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://www.sahneva.com/#website",
  url: "https://www.sahneva.com",
  name: "Sahneva",
  inLanguage: "tr-TR",
  publisher: {
    "@id": "https://www.sahneva.com/#org",
  },
  potentialAction: {
    "@type": "SearchAction",
    target: "https://www.sahneva.com/arama?q={search_term}",
    "query-input": "required name=search_term",
  },
};

        id="_main_header"
        tabIndex={-1}
        aria-label="Sahneva ana site başlığı"
        className="w-full"
      >
        <UtilityBar />
        <Navbar />
      </header>

      <main
        id="_main_content"
        tabIndex={-1}
        className="flex-1 pt-6 pb-10 lg:pb-12 focus-ring scroll-mt-4"
      >
        {children}
      </main>

      <Footer />
      
      {/* Performans ölçümü */}
      <SpeedInsights />
    </div>
  );
}
