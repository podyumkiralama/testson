// app/(tr)/bolgesel-kiralama/page.jsx
import RegionalRentalClient from "./RegionalRentalClient.client";

const SITE =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://www.sahneva.com";

const PAGE_PATH = "/bolgesel-kiralama";
const PAGE_URL = `${SITE}${PAGE_PATH}`;
const OG_IMAGE = `${SITE}/img/og/bolgesel-kiralama-og.webp`;

export const metadata = {
  title: "Bölgesel Kiralama | Sahneva Organizasyon",
  description:
    "Sahneva ile Türkiye genelinde LED ekran, truss, sahne/podyum ve ses-ışık sistemleri kiralama. Şehrinizi seçin, hızlı teklif alın.",
  alternates: {
    canonical: PAGE_URL,
    languages: { "tr-TR": PAGE_URL, "x-default": PAGE_URL },
  },
  openGraph: {
    type: "website",
    url: PAGE_URL,
    title: "Bölgesel Kiralama | Sahneva Organizasyon",
    description:
      "Türkiye genelinde etkinlik ekipmanı kiralama: LED ekran, truss, sahne/podyum, ses-ışık. Şehrinizi seçin.",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Sahneva Bölgesel Kiralama" }],
    siteName: "Sahneva",
    locale: "tr_TR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bölgesel Kiralama | Sahneva Organizasyon",
    description:
      "Türkiye genelinde etkinlik ekipmanı kiralama. Şehrinizi seçin, hızlı teklif alın.",
    images: [OG_IMAGE],
  },
};

function JsonLd({ regions, services, faqs }) {
  const orgId = `${SITE}/#org`;
  const webId = `${SITE}/#website`;
  const pageId = `${PAGE_URL}#webpage`;
  const breadcrumbId = `${PAGE_URL}#breadcrumb`;
  const catalogId = `${PAGE_URL}#offerCatalog`;
  const faqId = `${PAGE_URL}#faq`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": webId,
        url: SITE,
        name: "Sahneva Organizasyon",
        publisher: { "@id": orgId },
        inLanguage: "tr-TR",
      },
      {
        "@type": "WebPage",
        "@id": pageId,
        url: PAGE_URL,
        name: "Bölgesel Kiralama",
        description:
          "Türkiye genelinde etkinlik ekipmanı kiralama: LED ekran, truss, sahne/podyum, ses-ışık. Şehrinizi seçin ve hızlı teklif alın.",
        isPartOf: { "@id": webId },
        about: { "@id": orgId },
        inLanguage: "tr-TR",
        breadcrumb: { "@id": breadcrumbId },
      },
      {
        "@type": "BreadcrumbList",
        "@id": breadcrumbId,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Anasayfa", item: SITE },
          { "@type": "ListItem", position: 2, name: "Bölgesel Kiralama", item: PAGE_URL },
        ],
      },

      // Basit bir OfferCatalog (fiyat vermeden, hizmet katalogu)
      {
        "@type": "OfferCatalog",
        "@id": catalogId,
        name: "Bölgesel Kiralama Hizmetleri",
        itemListElement: services.map((s, idx) => ({
          "@type": "Offer",
          position: idx + 1,
          itemOffered: {
            "@type": "Service",
            name: s.title,
            url: `${SITE}${s.href}`,
            areaServed: {
              "@type": "Country",
              name: "Türkiye",
            },
          },
        })),
      },

      {
        "@type": "FAQPage",
        "@id": faqId,
        inLanguage: "tr-TR",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
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

export default function Page() {
  const regions = [
    { name: "İstanbul", slug: "istanbul", desc: "Kurumsal etkinlik, fuar, konser ve lansmanlar." },
    { name: "Ankara", slug: "ankara", desc: "Kongre, salon etkinliği, kamu & kurum organizasyonları." },
    { name: "İzmir", slug: "izmir", desc: "Açık hava sahne, festival ve sahil etkinlikleri." },
    { name: "Bursa", slug: "bursa", desc: "Fuar alanları, bayi toplantıları, sahne kurulumları." },
    { name: "Antalya", slug: "antalya", desc: "Otel etkinlikleri, gala, kongre & turizm organizasyonları." },
    { name: "Kocaeli", slug: "kocaeli", desc: "Fabrika etkinlikleri, lansman & kurumsal kurulumlar." },
    { name: "Sakarya", slug: "sakarya", desc: "Açık alan kurulumları, truss & sahne projeleri." },
    { name: "Tekirdağ", slug: "tekirdag", desc: "Festival, sahne, ses-ışık ve LED ekran kurulumları." },
  ];

  const services = [
    { title: "LED Ekran Kiralama", href: "/led-ekran-kiralama" },
    { title: "Truss Kiralama", href: "/truss-kiralama" },
    { title: "Sahne / Podyum Kiralama", href: "/podyum-kiralama" },
    { title: "Ses & Işık Sistemleri", href: "/ses-isik-sistemleri" },
    { title: "Çadır Kiralama", href: "/cadir-kiralama" },
    { title: "Masa & Sandalye Kiralama", href: "/masa-sandalye-kiralama" },
  ];

  const faqs = [
    {
      q: "Bölgesel kiralama ne demek?",
      a: "Etkinlik ekipmanlarını (LED ekran, truss, sahne/podyum, ses-ışık) bulunduğunuz şehre göre planlayıp kurulum/söküm dahil uçtan uca hizmet vermemizdir.",
    },
    {
      q: "Türkiye genelinde hizmet veriyor musunuz?",
      a: "Evet. Operasyon planına göre Türkiye genelinde kurulum ve teknik ekip desteği sağlayabiliriz.",
    },
    {
      q: "Fiyatlar şehre göre değişiyor mu?",
      a: "Evet. Mesafe, kurulum süresi, ekip sayısı ve ekipman setine göre değişebilir. En doğru fiyat için brief yeterlidir.",
    },
    {
      q: "Aynı projede birden fazla hizmet alabilir miyim?",
      a: "Evet. LED ekran + truss + sahne/podyum + ses-ışık gibi kalemleri tek paket halinde planlayabiliriz.",
    },
  ];

  return (
    <main className="relative overflow-hidden">
      <JsonLd regions={regions} services={services} faqs={faqs} />
      <RegionalRentalClient regions={regions} services={services} faqs={faqs} />
    </main>
  );
}
