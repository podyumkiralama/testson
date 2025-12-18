// app/layout.jsx

import "../styles/globals.css";

import SkipLinks from "@/components/SkipLinks";
import DocumentDirection from "@/components/i18n/DocumentDirection.client";
import NewTabAccessibility from "@/components/NewTabAccessibility.client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StickyVideoRailclient from "@/components/StickyVideoRail.client";
import DeferredSpeedInsights from "@/components/DeferredSpeedInsights.client";
import AnalyticsConsentWrapper from "@/components/AnalyticsConsentWrapper.client";

/* ================== METADATA ================== */
export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: HOME_PAGE_TITLE, template: "%s | Sahneva" },
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


export default function RootLayout({ children }) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body className="min-h-[100svh] flex flex-col bg-white text-neutral-900 antialiased">
        <SkipLinks />
        <DocumentDirection />
        <NewTabAccessibility />

        <header className="relative z-50">
          <Navbar />
          {process.env.NODE_ENV === "production" ? (
            <StickyVideoRailclient />
          ) : null}
        </header>

        <main
          id="_main_content"
          tabIndex={-1}
          className="flex-1 pt-16 lg:pt-20 focus:outline-none"
        >
          {children}
        </main>

        <Footer />

        {/* ⬇️ SABİT: EN SON, SCROLL / IDLE GATE ARKASINDA */}
       

        <DeferredSpeedInsights />
        <AnalyticsConsentWrapper />
      </body>
    </html>
  );
}
