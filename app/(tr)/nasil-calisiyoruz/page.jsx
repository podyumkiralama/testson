// app/(tr)/nasil-calisiyoruz/page.jsx
import Link from "next/link";

/* ================== SEO METADATA ================== */
const SITE =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://www.sahneva.com";

const PAGE_PATH = "/nasil-calisiyoruz";
const PAGE_URL = `${SITE}${PAGE_PATH}`;

// !!! burayı ne yapalım? Eğer bu OG dosyası yoksa sayfa 404 OG görseli gösterebilir.
// Varsa kalsın, yoksa /img/og/og.webp gibi genel OG'ye bağlayın.
const OG_IMAGE = `${SITE}/img/og/how-it-works-og.webp`;

export const metadata = {
  title: "Nasıl Çalışıyoruz? | Sahneva Organizasyon",
  description:
    "Sahneva’da süreç; ihtiyaç analizi, teklif, teknik keşif, kurulum ve etkinlik sonrası söküm dahil uçtan uca planlanır. Adım adım nasıl ilerlediğimizi görün.",
  alternates: {
    canonical: PAGE_URL,
    languages: {
      "tr-TR": PAGE_URL,
      "x-default": PAGE_URL,
    },
  },
  openGraph: {
    type: "website",
    url: PAGE_URL,
    title: "Nasıl Çalışıyoruz? | Sahneva Organizasyon",
    description:
      "İhtiyaç analizi → teklif → teknik keşif → kurulum → etkinlik günü → söküm. Sahneva süreç yönetimi.",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Sahneva nasıl çalışır?" }],
    siteName: "Sahneva",
    locale: "tr_TR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nasıl Çalışıyoruz? | Sahneva Organizasyon",
    description:
      "Sahneva süreç yönetimi: teklif, keşif, kurulum, etkinlik günü, söküm.",
    images: [OG_IMAGE],
  },
};

/* ================== HELPERS ================== */
function JsonLd() {
  const orgId = `${SITE}/#org`;
  const webId = `${SITE}/#website`;
  const pageId = `${PAGE_URL}#webpage`;
  const breadcrumbId = `${PAGE_URL}#breadcrumb`;
  const howtoId = `${PAGE_URL}#howto`;
  const faqId = `${PAGE_URL}#faq`;

  const steps = [
    {
      name: "İhtiyaç formu / ilk iletişim",
      text:
        "Etkinliğinizin tarihini, lokasyonunu ve ihtiyaçlarınızı paylaşın. Ekibimiz en hızlı şekilde sizinle iletişime geçer.",
      url: `${PAGE_URL}#adim-1`,
    },
    {
      name: "Uzman görüşmesi",
      text:
        "Bütçe, alan ölçüleri, teknik gereksinimler ve hedefler netleştirilir. En uygun çözüm taslağı hazırlanır.",
      url: `${PAGE_URL}#adim-2`,
    },
    {
      name: "Teklif ve alternatifler",
      text:
        "Size özel teklif + opsiyonlar sunulur. Gerekirse alternatif paketler ve revizyonlar yapılır.",
      url: `${PAGE_URL}#adim-3`,
    },
    {
      name: "Onay ve rezervasyon",
      text:
        "Onay sonrası ekipman ve planlama rezervasyona alınır. Kurulum planı ve operasyon akışı netleşir.",
      url: `${PAGE_URL}#adim-4`,
    },
    {
      name: "Teknik keşif / proje koordinasyonu",
      text:
        "Saha erişimi, elektrik altyapısı, zemin durumu ve güvenlik koşulları kontrol edilir (gerektiğinde).",
      url: `${PAGE_URL}#adim-5`,
    },
    {
      name: "Kurulum",
      text:
        "Etkinlikten 24/48 saat önce ekiplerimiz kurulum ve testleri tamamlar (truss, sahne, LED, ses-ışık vb.).",
      url: `${PAGE_URL}#adim-6`,
    },
    {
      name: "Etkinlik günü yönetimi",
      text:
        "Operasyon ekibi süreç boyunca sahadadır. Yayın, görüntü ve ses akışı dahil tüm detaylar takip edilir.",
      url: `${PAGE_URL}#adim-7`,
    },
    {
      name: "Söküm ve teslim",
      text:
        "Etkinlik bitiminde planlanan zaman aralığında söküm yapılır, alan düzenli şekilde teslim edilir.",
      url: `${PAGE_URL}#adim-8`,
    },
  ];

  const faqs = [
    {
      q: "Teklif ne kadar sürede hazırlanır?",
      a: "Genellikle aynı gün veya 24–48 saat içinde ihtiyaçlar netleştirildikten sonra teklif iletilir. Keşif gerektiren projelerde süre, saha planına göre değişebilir.",
    },
    {
      q: "Keşif yapmak zorunlu mu?",
      a: "Her işte zorunlu değildir. Ancak büyük LED ekran kurulumları, truss sistemleri, sahne üstü rigging veya enerji altyapısı kritik olan projelerde keşif önerilir.",
    },
    {
      q: "Kurulum etkinlikten kaç saat önce yapılır?",
      a: "Proje büyüklüğüne göre 24–48 saat önce kurulum ve testler planlanır. Küçük kurulumlar aynı gün içinde tamamlanabilir.",
    },
    {
      q: "Söküm ve teslim süreci nasıl ilerler?",
      a: "Etkinlik bitiminde planlanan zaman aralığında söküm yapılır, alan düzenli şekilde toparlanır ve temiz teslim sağlanır.",
    },
    {
      q: "Aynı anda birden fazla hizmet alabilir miyim?",
      a: "Evet. Sahne, truss, LED ekran, ses-ışık, çadır ve oturma düzeni gibi kalemleri tek projede paketleyerek uçtan uca yönetebiliriz.",
    },
    {
      q: "Acil / son dakika kurulum yapabiliyor musunuz?",
      a: "Müsaitlik durumuna göre hızlı planlama yapılabilir. En doğru yönlendirme için WhatsApp veya iletişim formundan tarih-lokasyon ve ihtiyaç listesini iletmeniz yeterlidir.",
    },
  ];

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
        name: "Nasıl Çalışıyoruz?",
        description:
          "Sahneva’da süreç; ihtiyaç analizi, teklif, teknik keşif, kurulum ve söküm dahil uçtan uca planlanır.",
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
          { "@type": "ListItem", position: 2, name: "Nasıl Çalışıyoruz", item: PAGE_URL },
        ],
      },
      {
        "@type": "HowTo",
        "@id": howtoId,
        name: "Sahneva ile Etkinlik Süreci Nasıl İlerler?",
        description:
          "İlk iletişimden kurulum ve söküme kadar Sahneva’nın uçtan uca etkinlik kurulum süreci.",
        inLanguage: "tr-TR",
        step: steps.map((s, i) => ({
          "@type": "HowToStep",
          position: i + 1,
          name: s.name,
          text: s.text,
          url: s.url,
        })),
      },

      /* ================== FAQ PAGE (Rich Results) ================== */
      {
        "@type": "FAQPage",
        "@id": faqId,
        inLanguage: "tr-TR",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: f.a,
          },
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

/* ================== UI BITS ================== */
function GlowBg() {
  return (
    <>
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[#0B1120]" />
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-70"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
      <div className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-blue-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-48 left-10 -z-10 h-[480px] w-[480px] rounded-full bg-cyan-400/10 blur-3xl" />
    </>
  );
}

function Badge({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-white/80">
      {children}
    </span>
  );
}

function Card({ title, desc }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.03)]">
      <h3 className="text-base font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-white/75">{desc}</p>
    </div>
  );
}

function Step({ id, k, title, text, hint }) {
  return (
    <li
      id={id}
      className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-5"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span
            className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500/15 text-sm font-semibold text-blue-100 ring-1 ring-blue-400/20"
            aria-hidden="true"
          >
            {k}
          </span>
          <h3 className="text-base font-semibold text-white">{title}</h3>
        </div>
        {hint ? <Badge>{hint}</Badge> : null}
      </div>
      <p className="mt-3 text-sm leading-relaxed text-white/75">{text}</p>
    </li>
  );
}

/* A11y-friendly accordion using <details>/<summary> (no JS needed) */
function FaqItem({ q, a }) {
  return (
    <details className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <summary className="cursor-pointer list-none select-none">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-base font-semibold text-white">{q}</h3>
          <span
            className="mt-0.5 inline-flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/80 group-open:bg-white/10"
            aria-hidden="true"
          >
            +
          </span>
        </div>
        <p className="mt-2 text-sm text-white/60">
          Cevabı görmek için tıklayın.
        </p>
      </summary>
      <div className="mt-3 text-sm leading-relaxed text-white/75">{a}</div>
    </details>
  );
}

/* ================== PAGE ================== */
export default function HowItWorksPage() {
  const CTA_BRIEF = "/iletisim";
  const CTA_WHATSAPP = "https://wa.me/905453048671";

  const faqList = [
    {
      q: "Teklif ne kadar sürede hazırlanır?",
      a: "Genellikle aynı gün veya 24–48 saat içinde ihtiyaçlar netleştirildikten sonra teklif iletilir. Keşif gerektiren projelerde süre, saha planına göre değişebilir.",
    },
    {
      q: "Keşif yapmak zorunlu mu?",
      a: "Her işte zorunlu değildir. Ancak büyük LED ekran kurulumları, truss sistemleri, sahne üstü rigging veya enerji altyapısı kritik olan projelerde keşif önerilir.",
    },
    {
      q: "Kurulum etkinlikten kaç saat önce yapılır?",
      a: "Proje büyüklüğüne göre 24–48 saat önce kurulum ve testler planlanır. Küçük kurulumlar aynı gün içinde tamamlanabilir.",
    },
    {
      q: "Söküm ve teslim süreci nasıl ilerler?",
      a: "Etkinlik bitiminde planlanan zaman aralığında söküm yapılır, alan düzenli şekilde toparlanır ve temiz teslim sağlanır.",
    },
    {
      q: "Aynı anda birden fazla hizmet alabilir miyim?",
      a: "Evet. Sahne, truss, LED ekran, ses-ışık, çadır ve oturma düzeni gibi kalemleri tek projede paketleyerek uçtan uca yönetebiliriz.",
    },
    {
      q: "Acil / son dakika kurulum yapabiliyor musunuz?",
      a: "Müsaitlik durumuna göre hızlı planlama yapılabilir. En doğru yönlendirme için WhatsApp veya iletişim formundan tarih-lokasyon ve ihtiyaç listesini iletmeniz yeterlidir.",
    },
  ];

  return (
    <main className="relative overflow-hidden">
      <GlowBg />
      <JsonLd />

      {/* HERO */}
      <section className="mx-auto max-w-6xl px-4 pb-10 pt-16 sm:pb-14 sm:pt-20">
        <div className="flex flex-col gap-6">
          <div className="flex flex-wrap items-center gap-3">
            <Badge>Sahneva Organizasyon</Badge>
            <Badge>Uçtan uca kurulum</Badge>
            <Badge>Teknik ekip + operasyon</Badge>
          </div>

          <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-5xl">
            Nasıl Çalışıyoruz?
          </h1>

          <p className="max-w-3xl text-base leading-relaxed text-white/75 sm:text-lg">
            İlk iletişimden kurulum ve söküme kadar; sahne, truss, LED ekran, ses-ışık ve
            diğer tüm ekipmanları planlı bir süreçle yönetiyoruz. Aşağıda adım adım
            ilerleyişi görebilirsiniz.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              href={CTA_BRIEF}
              className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black hover:bg-white/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
            >
              Teklif / Keşif Talebi
            </Link>

            <a
              href={CTA_WHATSAPP}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
              aria-label="WhatsApp üzerinden iletişime geç (yeni sekmede açılır)"
            >
              WhatsApp’tan Yazın
            </a>
          </div>
        </div>
      </section>

      {/* TIMELINE / STEPS */}
      <section className="mx-auto max-w-6xl px-4 pb-10">
        <h2 className="text-2xl font-semibold text-white">Süreçteki Temel Adımlar</h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-white/75">
          İhtiyaç analizi → teklif → keşif → kurulum → etkinlik günü → söküm.
        </p>

        <ol className="mt-6 grid gap-4 sm:gap-5" aria-label="Sahneva çalışma süreci">
          <Step
            id="adim-1"
            k="1"
            title="İhtiyaç formu / ilk iletişim"
            text="Etkinlik türü, tarih, lokasyon ve ihtiyaçlarınızı paylaşırsınız. Ekibimiz hızlıca size dönüş yapar."
          />
          <Step
            id="adim-2"
            k="2"
            title="Uzman görüşmesi"
            text="Alan ölçüleri, kurulum planı, teknik detaylar ve bütçe hedefi netleştirilir. Size özel çözüm kurgusu çıkarılır."
            hint="Aynı gün / ertesi gün"
          />
          <Step
            id="adim-3"
            k="3"
            title="Teklif ve alternatifler"
            text="Size özel teklif + opsiyonlar sunulur. Gerekirse paket/kalem revizyonları yapılır."
            hint="24–48 saat"
          />
          <Step
            id="adim-4"
            k="4"
            title="Onay ve rezervasyon"
            text="Onay sonrası ekipman ve ekip planlaması rezervasyona alınır. Operasyon takvimi netleşir."
          />
          <Step
            id="adim-5"
            k="5"
            title="Teknik keşif / proje koordinasyonu"
            text="Saha erişimi, enerji altyapısı, zemin ve güvenlik koşulları kontrol edilir (gerektiğinde)."
            hint="Etkinliğe göre"
          />
          <Step
            id="adim-6"
            k="6"
            title="Kurulum"
            text="Etkinlikten 24/48 saat önce kurulum ve testler tamamlanır: truss, sahne, LED ekran, ses-ışık vb."
            hint="24–48 saat önce"
          />
          <Step
            id="adim-7"
            k="7"
            title="Etkinlik günü yönetimi"
            text="Operasyon ekibi sahadadır; yayın, görüntü ve ses akışı dahil tüm kritik noktalar takip edilir."
            hint="Büyük gün"
          />
          <Step
            id="adim-8"
            k="8"
            title="Söküm ve teslim"
            text="Etkinlik sonrası planlanan zaman aralığında söküm yapılır, alan düzenli şekilde teslim edilir."
            hint="24–48 saat sonra"
          />
        </ol>
      </section>

      {/* GUARANTEES */}
      <section className="mx-auto max-w-6xl px-4 pb-12">
        <h2 className="text-2xl font-semibold text-white">Garantilerimiz</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <Card
            title="Uçtan Uca Çözüm"
            desc="Ekipman + kurulum + operasyon yönetimini tek noktadan planlayarak süreç karmaşasını azaltırız."
          />
          <Card
            title="Uzman Eşlik"
            desc="Proje yöneticisi ve teknik ekip; ihtiyaç analizi, keşif, kurulum ve etkinlik günü boyunca yanınızdadır."
          />
          <Card
            title="Kalite & Detay Odaklılık"
            desc="Güvenli kurulum standartları, düzenli kablolama, temiz teslim ve kontrollü söküm ile işi garanti altına alırız."
          />
        </div>
      </section>

      {/* FAQ */}
      <section
        id="faq"
        className="mx-auto max-w-6xl px-4 pb-14"
        aria-labelledby="faq-title"
      >
        <div className="flex flex-col gap-2">
          <h2 id="faq-title" className="text-2xl font-semibold text-white">
            Sık Sorulan Sorular
          </h2>
          <p className="max-w-3xl text-sm leading-relaxed text-white/75">
            Süreç, keşif, kurulum zamanı ve son dakika talepleriyle ilgili en çok gelen soruları burada topladık.
          </p>
        </div>

        <div className="mt-6 grid gap-4">
          {faqList.map((f, idx) => (
            <FaqItem key={`${idx}-${f.q}`} q={f.q} a={f.a} />
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href={CTA_BRIEF}
            className="inline-flex items-center justify-center rounded-xl bg-blue-500/90 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-200/60"
          >
            İletişim Formuna Git
          </Link>

          <a
            href={CTA_WHATSAPP}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
            aria-label="WhatsApp üzerinden hızlı bilgi al (yeni sekmede açılır)"
          >
            WhatsApp Hızlı Bilgi
          </a>
        </div>
      </section>

      {/* 3 SIMPLE STEPS CTA */}
      <section className="mx-auto max-w-6xl px-4 pb-20">
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-10">
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-semibold text-white">
              Etkinliğinizi 3 Basit Adımda Başlatalım
            </h2>

            <div className="grid gap-4 sm:grid-cols-3">
              <Card
                title="1) İhtiyacı paylaşın"
                desc="Ne kuracağız? (LED, sahne, truss, ses-ışık, çadır vb.) Tarih ve lokasyonla birlikte iletin."
              />
              <Card
                title="2) Teklifi alın"
                desc="Projenize uygun kalemler + alternatif opsiyonlar ile net bir teklif sunalım."
              />
              <Card
                title="3) Kurulumu bize bırakın"
                desc="Zamanında kurulum, test ve etkinlik günü yönetimi ile süreci sorunsuz tamamlayalım."
              />
            </div>

            <div className="mt-2 flex flex-wrap gap-3">
              <Link
                href={CTA_BRIEF}
                className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black hover:bg-white/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
              >
                Başlayalım (İletişim)
              </Link>

              <a
                href={CTA_WHATSAPP}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                aria-label="WhatsApp üzerinden hızlı teklif için yaz (yeni sekmede açılır)"
              >
                WhatsApp Hızlı Teklif
              </a>
            </div>

            <p className="text-xs text-white/60">
              Not: Keşif gerektiren projelerde saha koşullarına göre kurulum planı revize edilebilir.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
