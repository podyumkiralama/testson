// app/layout.jsx
import "../styles/globals.css";

import SkipLinks from "@/components/SkipLinks";
import DeferredJsonLd from "@/components/seo/DeferredJsonLd";
import RootClientShell from "@/components/RootClientShell";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DeferredSpeedInsights from "@/components/DeferredSpeedInsights.client";

import { LOCALE_CONTENT } from "@/lib/i18n/localeContent";
import { HOME_PAGE_TITLE, SITE_URL, getOgImageUrl } from "@/lib/seo/seoConfig";
import { inter } from "@/app/fonts";

const DEFAULT_LOCALE = LOCALE_CONTENT.tr;
const DEFAULT_LANG = "tr";
const DEFAULT_DIR = DEFAULT_LOCALE.direction;


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

/* ================== ROOT LAYOUT ================== */
export default function RootLayout({ children }) {
  return (
    <html
      lang={DEFAULT_LANG}
      dir={DEFAULT_DIR}
      className={inter.className}
      suppressHydrationWarning
    >
      <body className="min-h-[100svh] min-h-screen bg-white text-neutral-900 antialiased flex flex-col font-sans">
        <SkipLinks />
        <RootClientShell lang={DEFAULT_LANG} dir={DEFAULT_DIR} />

        

    
        <header
          id="_main_header"
          aria-label="Sahneva site başlığı ve ana gezinme"
          className="w-full relative z-50"
        >
         
          <Navbar />
        </header>

        <main
          id="_main_content"
          aria-label="Sahneva ana içerik"
          tabIndex={-1}
          className="flex-1 pt-12 lg:pt-16 focus:outline-none scroll-mt-24"
        >
          <div className="overflow-x-hidden">{children}</div>
        </main>

        <Footer ariaLabel="Sahneva site altbilgi" descriptionId="_main_footer" />
        <DeferredSpeedInsights />
      </body>
    </html>
  );
}
