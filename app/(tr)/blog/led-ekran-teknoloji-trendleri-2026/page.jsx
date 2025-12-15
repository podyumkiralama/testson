import Image from "next/image";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";

// ✅ Repoda VAR olan görseller (public/img/blog/)
import heroImg from "@/public/img/blog/led-2026-hero.webp";
import stageWideImg from "@/public/img/blog/led-2026-sahne-genis.webp";
import cobMacroImg from "@/public/img/blog/cob-led-macro.webp";

/* ================== YAPILANDIRMA & SABİTLER ================== */
const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.sahneva.com").replace(
  /\/$/,
  ""
);

const BLOG_PATH = "/blog/led-ekran-teknoloji-trendleri-2026";
const BLOG_URL = `${SITE_URL}${BLOG_PATH}`;

const LED_SERVICE_PATH = "/led-ekran-kiralama";
const LED_SERVICE_URL = `${SITE_URL}${LED_SERVICE_PATH}`;

// ✅ Rich Results için timezone dahil ISO 8601
const PUBLISH_DATE = "2025-12-15T00:00:00+03:00";
const MODIFIED_DATE = "2025-12-15T00:00:00+03:00";

const AUTHOR_NAME = "Sahneva İçerik Ekibi";

/* ================== META DATA ================== */
export const metadata = {
  title:
    "2026 LED Ekran Teknolojisi Trendleri: COB, 2.0 Nesil Paneller ve Sahne Tasarımı | Sahneva",
  description:
    "2026’da LED ekran teknolojisinde COB paneller, ultra düşük piksel aralığı ve HDR sahne tasarımı etkinlikleri nasıl değiştirecek? Lansman, festival ve kurumsal etkinlikler için teknik rehber.",
  alternates: { canonical: BLOG_URL },

  // ✅ Blog kartları sende buradan okuyor: metadata.image
  image: "/img/blog/led-2026-hero.webp",

  openGraph: {
    title: "2026 LED Ekran Teknolojisi Trendleri ve Etkinlik Tasarımı",
    description:
      "COB LED paneller, 2.0 nesil sürücüler ve HDR içerik üretimi ile 2026’da etkinlik sahneleri nasıl dönüşüyor?",
    url: BLOG_URL,
    type: "article",
    locale: "tr_TR",
    siteName: "Sahneva",
    images: [
      {
        url: `${SITE_URL}/img/blog/led-2026-hero.webp`,
        width: 1200,
        height: 630,
        alt: "2026 LED ekran teknolojisi trendlerini temsil eden kurumsal etkinlik sahnesi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "2026 LED Ekran Teknolojisi Trendleri",
    description:
      "COB LED, ince piksel aralığı ve HDR içerik ile sahne tasarımında yeni dönem.",
    images: [`${SITE_URL}/img/blog/led-2026-hero.webp`],
  },
  keywords: [
    "LED ekran trendleri 2026",
    "COB LED panel",
    "2.0 nesil LED sürücü",
    "HDR LED ekran",
    "etkinlik LED ekran kiralama",
    "sahne LED ekran tasarımı",
    "fine pitch LED",
    "LED ekran kiralama fiyatları",
  ],
  authors: [{ name: AUTHOR_NAME }],
  publisher: "Sahneva",
  other: {
    "article:published_time": PUBLISH_DATE,
    "article:modified_time": MODIFIED_DATE,
    "article:author": AUTHOR_NAME,
    "article:section": "LED Ekran Kiralama",
  },
};

/* ================== FAQ VERİLERİ ================== */
const FAQ_ITEMS = [
  {
    question: "COB LED panel ile SMD LED panel arasındaki temel fark nedir?",
    answer:
      "COB (Chip on Board) LED panellerde LED çipleri tek bir yüzeyde bütünleşik halde bulunur ve bu yapı daha homojen ışık, daha yüksek kontrast ve daha dayanıklı bir ekran yüzeyi sağlar. SMD panellerde ise her piksel üç ayrı LED bileşeninden oluşur.",
  },
  {
    question: "2026’da iç mekan sahneler için ideal piksel aralığı nedir?",
    answer:
      "Kurumsal etkinlik, lansman ve TV prodüksiyonuna yakın işler için genellikle P1.9 – P2.6 aralığı tercih edilir. 6–20 metre izleme mesafelerinde hem kamera için hem izleyici gözü için oldukça keskin bir görüntü sunar.",
  },
  {
    question: "HDR destekli LED ekran gerçekten fark yaratıyor mu?",
    answer:
      "Evet. HDR destekli LED ekranlar, özellikle ürün lansmanlarında metalik yüzeyler, derin siyahlar ve canlı renk geçişlerinde çok daha gerçekçi bir algı oluşturur. Profesyonel içerik üretimiyle birleştiğinde sahne adeta TV stüdyosu kalitesine yükselir.",
  },
  {
    question: "Sahneva 2026 LED trendlerine uygun ne tür çözümler sunuyor?",
    answer:
      "Sahneva; fine-pitch iç mekan paneller, yüksek yenileme oranına sahip LED ekran sistemleri, renk kalibrasyonu, medya server entegrasyonları ve komple sahne–ses–ışık altyapısını anahtar teslim sunar.",
  },
];

/* ================== SCHEMA (JSON-LD) ================== */
function ArticleSchema() {
  const site = String(SITE_URL || "").replace(/\/$/, "");
  const orgId = `${site}/#org`;
  const editorId = `${site}/#editor`;

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${BLOG_URL}#blogposting`,
        headline: metadata?.title || "Blog Yazısı",
        description: metadata?.description,
        image: `${site}/img/blog/led-2026-hero.webp`,
        datePublished: PUBLISH_DATE,
        dateModified: MODIFIED_DATE,
        inLanguage: "tr-TR",
        author: { "@id": editorId },
        publisher: { "@id": orgId },
        mainEntityOfPage: { "@type": "WebPage", "@id": BLOG_URL },
        isPartOf: { "@type": "Blog", "@id": `${site}/blog#blog` },
        relatedLink: [LED_SERVICE_URL],
      },
      {
        "@type": "FAQPage",
        "@id": `${BLOG_URL}#faq`,
        mainEntity: FAQ_ITEMS.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema).replace(/</g, "\u003c"),
      }}
    />
  );
}

/* ================== UI ================== */
const Breadcrumbs = () => (
  <nav aria-label="Breadcrumb" className="mb-6 text-sm text-gray-600">
    <ol className="flex items-center space-x-2 flex-wrap">
      <li>
        <Link href="/" className="hover:text-blue-600 transition-colors">
          Anasayfa
        </Link>
      </li>
      <li aria-hidden="true" className="text-gray-500">
        /
      </li>
      <li>
        <Link href="/blog" className="hover:text-blue-600 transition-colors">
          Blog
        </Link>
      </li>
      <li aria-hidden="true" className="text-gray-500">
        /
      </li>
      <li className="text-gray-900 font-medium truncate" aria-current="page">
        2026 LED Ekran Teknolojisi Trendleri
      </li>
    </ol>
  </nav>
);

const TableOfContents = () => (
  <div className="bg-gray-50 rounded-2xl p-5 border border-gray-200 mb-6 hidden lg:block">
    <h4 className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-wide">
      İçindekiler
    </h4>
    <ul className="space-y-2 text-sm">
      {[
        { id: "fine-pitch", label: "1. Fine-Pitch ve P1.x Dönemi" },
        { id: "cob-led", label: "2. COB LED ve Dayanıklılık" },
        { id: "hdr", label: "3. HDR İçerik ve Renk Kalibrasyonu" },
        { id: "sahne-tasarim", label: "4. 2026 Sahne Tasarımında LED" },
        { id: "fiyatlar", label: "2026’da LED Ekran Kiralama Fiyatlarını Ne Belirler?" },
        { id: "teknik-checklist", label: "Teknik Checklist" },
        { id: "faq", label: "Sık Sorulan Sorular" },
      ].map((item) => (
        <li key={item.id}>
          <a
            href={`#${item.id}`}
            className="text-gray-600 hover:text-blue-600 hover:translate-x-1 transition-all block"
          >
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

/* ================== PAGE ================== */
export default function LedTrends2026Page() {
  const breadcrumbItems = [
    { name: "Ana Sayfa", url: `${SITE_URL}/` },
    { name: "Blog", url: `${SITE_URL}/blog` },
    { name: "2026 LED Ekran Teknolojisi Trendleri", url: BLOG_URL },
  ];

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbItems} baseUrl={SITE_URL} />
      <ArticleSchema />

      {/* HERO */}
      <header className="relative py-24 bg-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/80 to-blue-900/40 z-10" />
        <div className="absolute inset-0 z-0">
          <Image
            src={heroImg}
            alt="2026 LED ekran teknolojisi trendlerini temsil eden kurumsal etkinlik sahnesi"
            fill
            className="object-cover opacity-65"
            priority
            sizes="100vw"
            fetchPriority="high"
          />
        </div>

        <div className="container mx-auto px-4 relative z-20 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-sm font-semibold mb-8 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-blue-300 animate-pulse" />
            2026 LED Ekran Trend Raporu
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.15] mb-6 tracking-tight">
            2026’da LED Ekran{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-cyan-300 to-indigo-300">
              Sahne Tasarımını Nasıl Değiştiriyor?
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-200 leading-relaxed max-w-2xl mx-auto font-light antialiased">
            COB paneller, 2.0 nesil sürücüler ve HDR içerik ile kurumsal etkinliklerde LED ekranlar artık sadece fon değil,
            başrol oyuncu. Teknik kararları 2026’da nasıl almalısınız?
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-200 mt-8 pt-8 border-t border-white/10">
            <time dateTime={PUBLISH_DATE} className="flex items-center gap-2">
              <span>📅</span> 15 Aralık 2025
            </time>
            <span className="flex items-center gap-2">
              <span>⏱️</span> 7 dk okuma
            </span>
            <span className="flex items-center gap-2">
              <span>✍️</span> {AUTHOR_NAME}
            </span>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              href="https://wa.me/905453048671"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LED projeniz için WhatsApp üzerinden yazın — yeni sekmede açılır"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold px-7 py-3.5 shadow-lg shadow-emerald-900/40 transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-emerald-500"
            >
              <span>💬</span>
              <span>LED Projeniz İçin WhatsApp&apos;tan Yazın</span>
            </a>

            <Link
              href={LED_SERVICE_PATH}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold px-7 py-3.5 border border-white/20 backdrop-blur-md transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-400"
            >
              <span>🖥️</span>
              <span>LED Ekran Kiralama Sayfasını İncele</span>
            </Link>
          </div>
        </div>
      </header>

      {/* CONTENT */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <Breadcrumbs />

          <div className="flex flex-col lg:flex-row gap-12 relative">
            <div className="lg:w-2/3">
              <article className="prose prose-lg prose-headings:font-bold prose-headings:text-gray-900 prose-headings:scroll-mt-32 prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-img:rounded-2xl max-w-none">
                <div className="bg-blue-50/60 p-6 rounded-xl border-l-4 border-blue-500 mb-8 not-prose">
                  <p className="text-lg text-gray-700 font-medium italic m-0">
                    2018’de “LED ekran olsun yeter” dönemi bitti. 2026’da markalar; piksel aralığı, sürücü teknolojisi, HDR desteği
                    ve kamera dostu flicker performansını aynı anda talep ediyor.
                  </p>
                  <p className="text-sm text-gray-600 mt-3 mb-0">
                    Bu yazı, LED ekran kiralama kararı almadan önce teknik bir checklist oluşturmanız için hazırlandı.
                  </p>
                </div>

                {/* ✅ STRATEJİK LINK #1 */}
                <p>
                  Büyük bir ürün lansmanı, global bayi toplantısı veya hibrit bir konferans planlıyor olabilirsiniz. Ekranda
                  gördüğünüz görsel, salondaki herkes için markanızın vitrini. Bu yüzden{" "}
                  <Link href={LED_SERVICE_PATH}>profesyonel LED ekran kiralama</Link>{" "}
                  sürecinde yalnızca metrekare değil; piksel aralığı, sürücü kartı ve içerik uyumu gibi teknik detayları da doğru
                  seçmek gerekir.
                </p>

                <figure className="my-10 not-prose">
                  <Image
                    src={stageWideImg}
                    alt="Geniş LED ekranlı modern kurumsal sahne ve ışık tasarımı"
                    width={stageWideImg.width}
                    height={stageWideImg.height}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 800px"
                    className="w-full h-auto rounded-2xl shadow-lg"
                    loading="lazy"
                  />
                  <figcaption className="mt-3 text-sm text-gray-600 text-center font-medium">
                    2026 sahne tasarımlarında LED ekran; dekorun değil, hikâyenin merkezinde konumlanıyor.
                  </figcaption>
                </figure>

                <h2 id="fine-pitch">1. Fine-Pitch ve P1.x Dönemi</h2>
                <p>
                  2026’da iç mekan sahnelerde <strong>P1.9 – P2.6</strong> aralığı yeni normal haline geldi. Yakın izleme mesafesinde
                  daha keskin metinler ve kamera için TV kalitesine yakın görüntü elde edilir.
                </p>

                <h2 id="cob-led">2. COB LED ve Dayanıklılık</h2>
                <p>
                  COB (Chip on Board) paneller, pürüzsüz yüzey yapısı sayesinde daha homojen ışık ve daha iyi yansıma kontrolü
                  sunar. Kurulum sırasında darbe/çizilme riski de azalır.
                </p>

                <figure className="my-10 not-prose">
                  <Image
                    src={cobMacroImg}
                    alt="COB LED panel yüzeyinin yakın plan görünümü"
                    width={cobMacroImg.width}
                    height={cobMacroImg.height}
                    sizes="(max-width: 768px) 100vw, 800px"
                    className="w-full h-auto rounded-2xl shadow-lg"
                    loading="lazy"
                  />
                  <figcaption className="mt-3 text-sm text-gray-600 text-center font-medium">
                    COB LED paneller, pürüzsüz yüzey yapısı sayesinde hem siyah seviyelerinde hem yansıma kontrolünde avantaj sağlar.
                  </figcaption>
                </figure>

                <h2 id="hdr">3. HDR İçerik ve Renk Kalibrasyonu</h2>
                <p>
                  HDR destekli bir LED sistem, doğru içerik üretimi ve sahnede yapılan canlı kalibrasyon ile birleştiğinde ürün
                  lansmanlarında ve kurumsal etkinliklerde algıyı ciddi biçimde yükseltir.
                </p>

                <h2 id="sahne-tasarim">4. 2026 Sahne Tasarımında LED</h2>
                <p>
                  LED ekran artık yalnızca arka fon değil; sahnenin tamamını saran bir deneyim alanı. Yan ekranlar, totemler ve sahne
                  mimarisiyle birleşen ekran kurguları öne çıkıyor.
                </p>

                <h2 id="fiyatlar">2026’da LED Ekran Kiralama Fiyatlarını Ne Belirler?</h2>
                <p>
                  Fiyat tek bir “m²” hesabı değildir. Piksel aralığı, panel tipi, yenileme oranı, kurulum süresi ve yedek panel stoğu
                  gibi teknik değişkenler toplam maliyeti belirler.
                </p>
                <p>
                  Bu yüzden karar aşamasında{" "}
                  <Link href={LED_SERVICE_PATH}>LED ekran kiralama fiyatlandırmasını etkileyen faktörleri</Link>{" "}
                  net şekilde görmek ve teknik ekip planlamasını doğru yapmak kritik.
                </p>

                <h2 id="teknik-checklist">Teknik Checklist – Teklif Almadan Önce</h2>
                <div className="not-prose bg-gray-50 border border-gray-200 rounded-xl p-6 my-8 space-y-4">
                  <ul className="list-disc list-inside text-sm text-gray-700 space-y-2">
                    <li>LED panel marka / model</li>
                    <li>Piksel aralığı (P1.9 / P2.6 vb.)</li>
                    <li>Yenileme oranı (3840Hz+ önerilir)</li>
                    <li>Kurulum süresi, ekip sayısı, yedek panel</li>
                    <li>İçerik için tavsiye çözünürlük / FPS</li>
                  </ul>

                  {/* ✅ STRATEJİK LINK #2 */}
                  <div className="pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-700 m-0">
                      Bu kriterlerin tamamını karşılayan{" "}
                      <Link href={LED_SERVICE_PATH}>LED ekran kiralama hizmetimizi</Link>{" "}
                      inceleyebilirsiniz.
                    </p>
                  </div>
                </div>

                <h2 id="faq">Sık Sorulan Sorular</h2>
                <section aria-labelledby="faq-heading" className="not-prose space-y-3 mt-6">
                  <h3 id="faq-heading" className="sr-only">
                    LED ekran trendleri hakkında sıkça sorulan sorular
                  </h3>
                  {FAQ_ITEMS.map((item, index) => (
                    <details
                      key={index}
                      className="group bg-white border border-gray-200 rounded-xl overflow-hidden open:ring-2 open:ring-blue-100 open:border-blue-300 transition-all duration-200"
                    >
                      <summary
                        className="flex items-center justify-between p-4 md:p-5 cursor-pointer font-semibold text-gray-800 select-none bg-gray-50/50 hover:bg-gray-50 transition-colors"
                        role="button"
                        tabIndex={0}
                      >
                        {item.question}
                        <span className="ml-4 flex-shrink-0 transition-transform group-open:rotate-180 text-gray-600">
                          ▼
                        </span>
                      </summary>
                      <div className="px-5 pb-5 pt-2 text-gray-600 text-sm leading-relaxed border-t border-gray-100">
                        {item.answer}
                      </div>
                    </details>
                  ))}
                </section>

                <div className="not-prose mt-16 bg-gradient-to-br from-gray-900 to-blue-900 rounded-3xl p-8 md:p-12 text-center text-white shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                  <h3 className="text-2xl md:text-3xl font-black mb-4 relative z-10">
                    2026 LED Ekran Projenizi Birlikte Tasarlayalım
                  </h3>
                  <p className="text-blue-100 mb-6 max-w-xl mx-auto relative z-10 text-lg">
                    Teknik keşif + kurulum + operasyon dahil, 2026 trendlerine uygun LED ekran kurgusu için bize ulaşın.
                  </p>

                  {/* ✅ STRATEJİK LINK #3 */}
                  <p className="text-blue-100 max-w-xl mx-auto relative z-10 text-sm mb-6">
                    <Link
                      href={LED_SERVICE_PATH}
                      className="text-white underline underline-offset-4 decoration-white/40 hover:decoration-white"
                    >
                      2026’ya uygun LED ekran kiralama çözümlerimizi
                    </Link>{" "}
                    inceleyip projenize göre doğru panel/kurulum planını netleştirebilirsiniz.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                    <a
                      href="https://wa.me/905453048671"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="WhatsApp üzerinden hızlı teklif alın — yeni sekmede açılır"
                      className="inline-flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-4 px-8 rounded-xl transition-transform hover:-translate-y-1 shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-emerald-500"
                    >
                      <span>💬</span> WhatsApp&apos;tan Yazın
                    </a>
                    <a
                      href="tel:+905453048671"
                      className="inline-flex items-center justify-center gap-2 bg-white text-blue-900 hover:bg-blue-50 font-bold py-4 px-8 rounded-xl transition-transform hover:-translate-y-1 shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-400"
                    >
                      <span>📞</span> Hemen Arayın
                    </a>
                  </div>
                </div>
              </article>
            </div>

            <aside className="lg:w-1/3 relative">
              <div className="sticky top-24 space-y-8">
                <TableOfContents />

                <nav className="bg-gray-50 rounded-2xl p-6 border border-gray-200" aria-label="İlgili Hizmetler">
                  <h4 className="font-bold mb-4 text-sm uppercase tracking-wider text-gray-700">
                    Hizmetlerimiz
                  </h4>
                  <ul className="space-y-1">
                    {[
                      { href: LED_SERVICE_PATH, icon: "🖥️", label: "LED Ekran Kiralama" },
                      { href: "/sahne-kiralama", icon: "🎭", label: "Sahne Kiralama" },
                      { href: "/ses-isik-sistemleri", icon: "🎵", label: "Ses & Işık Sistemleri" },
                      { href: "/kurumsal-organizasyon", icon: "🏢", label: "Kurumsal Organizasyon" },
                    ].map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-white hover:shadow-sm transition-all text-gray-700 hover:text-blue-600 group"
                        >
                          <span className="bg-white group-hover:bg-blue-50 text-lg w-8 h-8 flex items-center justify-center rounded-md border border-gray-100 shadow-sm transition-colors">
                            {link.icon}
                          </span>
                          <span className="font-medium text-sm">{link.label}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
