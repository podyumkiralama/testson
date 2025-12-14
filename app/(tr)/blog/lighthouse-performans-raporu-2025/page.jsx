// app/(tr)/blog/lighthouse-performans-raporu-2025/page.jsx
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";

/* ================== YAPILANDIRMA & SABİTLER ================== */
const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.sahneva.com").replace(/\/$/, "");
const BLOG_URL = `${SITE_URL}/blog/lighthouse-performans-raporu-2025`;
const PUBLISH_DATE = "2025-12-14";
const AUTHOR_NAME = "Sahneva İçerik Ekibi";

/* ================== META DATA ================== */
export const metadata = {
  title: "2025 Lighthouse Performans Raporu: Mobil ve Masaüstü Sonuçları | Sahneva",
  description:
    "Lighthouse 13.0.1 ile ölçülen mobil ve masaüstü performans skorları: 97 performans, 100 erişilebilirlik, 100 en iyi uygulamalar, 100 SEO. FCP 1,1 sn, LCP 2,6 sn, TBT 0 ms, CLS 0.",
  alternates: {
    canonical: BLOG_URL,
  },
  image: "/img/og.jpg",
  openGraph: {
    title: "Lighthouse Performans Raporu (Aralık 2025)",
    description:
      "Mobil ve masaüstü için 97+ performans, 100 erişilebilirlik ve SEO skorları. FCP 1,1 sn, LCP 2,6 sn, TBT 0 ms.",
    url: BLOG_URL,
    type: "article",
    locale: "tr_TR",
    siteName: "Sahneva",
    images: [
      {
        url: `${SITE_URL}/img/og.jpg`,
        width: 1200,
        height: 630,
        alt: "Lighthouse performans kartı",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "2025 Lighthouse Performans Raporu",
    description: "Mobil ve masaüstü skorları ile iyileştirme önerileri.",
    images: [`${SITE_URL}/img/og.jpg`],
  },
  keywords: [
    "Lighthouse raporu",
    "Pagespeed",
    "Core Web Vitals",
    "performans optimizasyonu",
    "Sahneva performans",
  ],
  authors: [{ name: AUTHOR_NAME }],
  publisher: "Sahneva",
  date: PUBLISH_DATE,
};

/* ================== VERİLER ================== */
const MOBILE_METRICS = {
  platform: "Mobil (Moto G Power, yavaş 4G)",
  scores: { performance: 97, accessibility: 100, bestPractices: 100, seo: 100 },
  vitals: {
    fcp: "1,1 sn",
    lcp: "2,6 sn",
    tbt: "0 ms",
    cls: "0",
    si: "1,1 sn",
  },
  capturedAt: "14 Aralık 2025 03:01 GMT+3",
};

const DESKTOP_METRICS = {
  platform: "Masaüstü (HeadlessChromium 137.0.7151.119)",
  scores: { performance: 100, accessibility: 100, bestPractices: 100, seo: 97 },
  vitals: {
    fcp: "1,1 sn",
    lcp: "2,6 sn",
    tbt: "0 ms",
    cls: "0",
    si: "1,1 sn",
  },
  capturedAt: "Aynı oturum, tek sayfa yükleme",
};

const OPTIMIZATIONS = [
  {
    title: "Oluşturma engelleyen istekleri azalt",
    detail:
      "CSS veya kritik olmayan script çağrılarını ertelemek FCP ve LCP için ~400 ms kazanç potansiyeli sunuyor.",
  },
  {
    title: "Kullanılmayan JavaScript",
    detail:
      "Toplamda ~51 KiB tasarruf mümkün görünüyor. modül bazında en büyük kaynak 350...js (27,7 KiB) ve 82f86bbf1a6afe9a.js (22,9 KiB).",
  },
  {
    title: "Eski JavaScript",
    detail: "Polyfill veya eski bundle'ları kaldırmak ~14 KiB küçülme sağlayabilir.",
  },
  {
    title: "DOM boyutu optimizasyonu",
    detail: "Gereksiz düğümleri azaltmak boyama süresini iyileştirir ve LCP'yi stabilize eder.",
  },
];

/* ================== BİLEŞENLER ================== */
function MetricsCard({ title, metrics }) {
  return (
    <section className="w-full rounded-3xl border border-blue-100 bg-gradient-to-br from-white via-blue-50 to-blue-100/40 p-6 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <h2 className="text-lg font-bold text-gray-900">{title}</h2>
        <span className="text-sm text-gray-600">{metrics.capturedAt}</span>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl bg-white/80 p-4 shadow-inner">
          <p className="text-xs uppercase tracking-wide text-gray-500">Performans</p>
          <p className="text-3xl font-bold text-blue-700">{metrics.scores.performance}</p>
        </div>
        <div className="rounded-2xl bg-white/80 p-4 shadow-inner">
          <p className="text-xs uppercase tracking-wide text-gray-500">Erişilebilirlik</p>
          <p className="text-3xl font-bold text-emerald-700">{metrics.scores.accessibility}</p>
        </div>
        <div className="rounded-2xl bg-white/80 p-4 shadow-inner">
          <p className="text-xs uppercase tracking-wide text-gray-500">En İyi Uygulamalar</p>
          <p className="text-3xl font-bold text-indigo-700">{metrics.scores.bestPractices}</p>
        </div>
        <div className="rounded-2xl bg-white/80 p-4 shadow-inner">
          <p className="text-xs uppercase tracking-wide text-gray-500">SEO</p>
          <p className="text-3xl font-bold text-amber-700">{metrics.scores.seo}</p>
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {Object.entries(metrics.vitals).map(([key, value]) => (
          <div key={key} className="rounded-xl border border-blue-100 bg-white p-3 text-center">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">{key.toUpperCase()}</p>
            <p className="text-lg font-bold text-gray-900">{value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function ImprovementList() {
  return (
    <section className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between gap-4">
        <h2 className="text-lg font-bold text-gray-900">Teşhis ve İyileştirme Fırsatları</h2>
        <span className="text-xs text-gray-500">Lighthouse 13.0.1 önerileri</span>
      </div>
      <div className="space-y-4">
        {OPTIMIZATIONS.map((item) => (
          <div
            key={item.title}
            className="rounded-2xl border border-gray-100 bg-gray-50/80 p-4 hover:border-blue-200"
          >
            <h3 className="text-base font-semibold text-gray-900">{item.title}</h3>
            <p className="mt-1 text-sm text-gray-700 leading-relaxed">{item.detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ================== SAYFA ================== */
export default function Page() {
  const breadcrumbs = [
    { name: "Anasayfa", url: `${SITE_URL}` },
    { name: "Blog", url: `${SITE_URL}/blog` },
    { name: "Lighthouse Performans Raporu", url: BLOG_URL },
  ];

  return (
    <div className="bg-gradient-to-b from-blue-50/60 via-white to-white text-gray-900">
      <div className="container mx-auto px-4 py-10 lg:py-14">
        <nav aria-label="breadcrumb" className="mb-6 text-sm text-gray-600">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="hover:text-blue-600 transition-colors">
                Anasayfa
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/blog" className="hover:text-blue-600 transition-colors">
                Blog
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-900 font-semibold">Lighthouse Performans Raporu</li>
          </ol>
        </nav>

        <header className="mb-10 grid gap-6 rounded-3xl border border-blue-100 bg-white/70 p-8 shadow-sm lg:grid-cols-[2fr,1fr] lg:items-center">
          <div className="space-y-4">
            <p className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-800">
              Yeni
              <span className="text-gray-400">•</span>
              {new Date(PUBLISH_DATE).toLocaleDateString("tr-TR")}
            </p>
            <h1 className="text-3xl font-bold leading-tight text-gray-900 lg:text-4xl">
              Lighthouse 13.0.1 ile ölçülen performans sonuçları (Aralık 2025)
            </h1>
            <p className="text-lg text-gray-700">
              Mobil ve masaüstü testlerinde çekilen skorlar, Core Web Vitals metrikleri ve iyileştirme adımlarını özetledik.
              Tek sayfalık oturumda 97+ performans skorunu korurken daha da iyileştirmek için izlenecek yol haritasını aşağıda bulabilirsiniz.
            </p>
            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
              <span>📅 {new Date(PUBLISH_DATE).toLocaleDateString("tr-TR")}</span>
              <span>•</span>
              <span>✍️ {AUTHOR_NAME}</span>
              <span>•</span>
              <span>⏱️ 4 dk okuma</span>
            </div>
          </div>
          <div className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-500 to-indigo-600 p-6 text-white shadow-lg">
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-50">Skor Özeti</p>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="rounded-xl bg-white/10 p-4">
                <p className="text-xs text-blue-50">Mobil Performans</p>
                <p className="text-3xl font-bold">97</p>
                <p className="text-xs text-blue-50">Yavaş 4G simülasyonu</p>
              </div>
              <div className="rounded-xl bg-white/10 p-4">
                <p className="text-xs text-blue-50">Masaüstü Performans</p>
                <p className="text-3xl font-bold">100</p>
                <p className="text-xs text-blue-50">HeadlessChromium 137</p>
              </div>
              <div className="rounded-xl bg-white/10 p-4">
                <p className="text-xs text-blue-50">FCP</p>
                <p className="text-2xl font-bold">1,1 sn</p>
                <p className="text-xs text-blue-50">İlk içerik boyası</p>
              </div>
              <div className="rounded-xl bg-white/10 p-4">
                <p className="text-xs text-blue-50">LCP</p>
                <p className="text-2xl font-bold">2,6 sn</p>
                <p className="text-xs text-blue-50">En büyük içerik boyası</p>
              </div>
            </div>
          </div>
        </header>

        <div className="space-y-8">
          <MetricsCard title={MOBILE_METRICS.platform} metrics={MOBILE_METRICS} />
          <MetricsCard title={DESKTOP_METRICS.platform} metrics={DESKTOP_METRICS} />
          <ImprovementList />

          <section className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900">İzleme ve sonraki adımlar</h2>
            <div className="mt-3 space-y-3 text-gray-700 leading-relaxed">
              <p>
                Tek sayfalık oturumda elde edilen skorlar, üretim ortamında gerçek kullanıcı verisi olmadan tahmini olarak oluşturuldu.
                Kullanılmayan JavaScript ve bloklayıcı isteklerin azaltılmasıyla LCP'yi 2,5 saniyenin altına çekmek için ek optimizasyon planlanıyor.
              </p>
              <p>
                Mobilde özellikle render-blocking kaynakların ertelenmesi ve kritik CSS'in inlining ile FCP ~1,0 sn seviyesine indirilebilir.
                Masaüstünde SEO skorunu 100'e taşımak için meta etiket ve robots.txt denetimleri yeniden gözden geçirilecek.
              </p>
              <p className="text-sm text-gray-600">
                Lighthouse raporunda yer alan ağaç grafiği ve bağımlılık analizleri Chrome DevTools Performance panelinde de incelenerek
                esnek yükleme (code-splitting) fırsatları doğrulanacak.
              </p>
            </div>
          </section>
        </div>
      </div>

      <BreadcrumbJsonLd
        jsonLdPaths={breadcrumbs.map((item) => ({ name: item.name, url: item.url }))}
        baseUrl={SITE_URL}
      />
    </div>
  );
}
