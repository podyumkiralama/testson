import Image from "next/image";
import Link from "next/link";

/* ================== SEO METADATA ================== */
const SITE =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://www.sahneva.com";

const PAGE_PATH = "/nasil-calisiyoruz";
const PAGE_URL = `${SITE}${PAGE_PATH}`;

// !!! burayı ne yapalım? Eğer bu OG dosyası yoksa 404/boş OG görsel riski var.
// Varsa kalsın, yoksa genel OG’ye bağlayın: /img/og/og.webp gibi.
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

/* ================== BACKGROUND (FAQ.JS TEMA) ================== */
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

function SoftCard({ children, className = "" }) {
  return (
    <div
      className={
        "rounded-2xl border border-white/10 bg-white/[0.03] shadow-[0_0_0_1px_rgba(255,255,255,0.03)] " +
        className
      }
    >
      {children}
    </div>
  );
}

function ImgFrame({ src, alt }) {
  return (
    <SoftCard className="overflow-hidden">
      <div className="relative aspect-[16/10] w-full">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 520px"
          className="object-cover"
          // LCP olmasın diye hepsini priority yapmıyoruz
          priority={false}
        />
      </div>
    </SoftCard>
  );
}

function InlineLink({ href, children }) {
  return (
    <Link
      href={href}
      className="font-semibold text-white underline decoration-white/30 underline-offset-4 hover:decoration-white/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 rounded"
    >
      {children}
    </Link>
  );
}

/* ================== JSON-LD ================== */
function JsonLd({ steps, faqs }) {
  const orgId = `${SITE}/#org`;
  const webId = `${SITE}/#website`;
  const pageId = `${PAGE_URL}#webpage`;
  const breadcrumbId = `${PAGE_URL}#breadcrumb`;
  const howtoId = `${PAGE_URL}#howto`;
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
          name: s.title,
          text: s.plainText, // schema’da linkli HTML yerine sade metin
          url: `${PAGE_URL}#adim-${i + 1}`,
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

/* ================== SECTION (AtaWa style alternating) ================== */
function StepSection({ index, label, title, body, imageSrc, imageAlt, reverse }) {
  const id = `adim-${index}`;
  return (
    <section
      id={id}
      className="scroll-mt-24"
      aria-labelledby={`${id}-title`}
    >
      <div
        className={
          "grid items-center gap-6 lg:gap-10 " +
          (reverse ? "lg:grid-cols-[520px_1fr]" : "lg:grid-cols-[1fr_520px]")
        }
      >
        {/* Text */}
        <div className={reverse ? "lg:order-2" : ""}>
          <div className="flex flex-wrap items-center gap-3">
            <Badge>{label}</Badge>
            <Badge>Adım {index}</Badge>
          </div>

          <h3
            id={`${id}-title`}
            className="mt-4 text-xl font-semibold text-white sm:text-2xl"
          >
            {title}
          </h3>

          <SoftCard className="mt-4 p-5 sm:p-6">
            <div className="prose prose-invert max-w-none prose-p:my-0">
              {body}
            </div>
          </SoftCard>
        </div>

        {/* Image */}
        <div className={reverse ? "lg:order-1" : ""}>
          <ImgFrame src={imageSrc} alt={imageAlt} />
        </div>
      </div>
    </section>
  );
}

/* A11y Accordion */
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
        <p className="mt-2 text-sm text-white/60">Cevabı görmek için tıklayın.</p>
      </summary>
      <div className="mt-3 text-sm leading-relaxed text-white/75">{a}</div>
    </details>
  );
}

export default function HowItWorksPage() {
  const CTA_BRIEF = "/iletisim";
  const CTA_WHATSAPP = "https://wa.me/905453048671";

  // !!! burayı ne yapalım?
  // Bu resimler public altında yoksa sayfa build’da patlar. Aşağıdaki dosya adlarını ekleyelim.
  const steps = [
    {
      label: "İlk temas",
      title: "İhtiyaç formu / ilk iletişim",
      imageSrc: "/img/how-it-works/01-ilk-iletisim.webp",
      imageAlt: "Sahneva ile ilk iletişim ve ihtiyaçların belirlenmesi",
      plainText:
        "Etkinlik türü, tarih, lokasyon ve ihtiyaçlar paylaşılır. Danışman geri dönüş yapar ve süreç başlar.",
      body: (
        <>
          <p className="text-sm leading-relaxed text-white/75">
            Etkinlik türü, tarih, lokasyon ve ihtiyaçlarınızı iletin. Örn:{" "}
            <InlineLink href="/led-ekran-kiralama">LED ekran kiralama</InlineLink>,{" "}
            <InlineLink href="/truss-kiralama">truss kiralama</InlineLink>,{" "}
            <InlineLink href="/podyum-kiralama">sahne/podyum</InlineLink>,{" "}
            <InlineLink href="/ses-isik-sistemleri">ses-ışık</InlineLink>.
            Ekibimiz en hızlı şekilde sizinle iletişime geçer.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-white/75">
            İsterseniz doğrudan{" "}
            <InlineLink href="/iletisim">iletişim formu</InlineLink> üzerinden brief bırakın
            veya WhatsApp’tan yazın.
          </p>
        </>
      ),
    },
    {
      label: "Uzman görüşmesi",
      title: "Proje ihtiyaçları netleşir",
      imageSrc: "/img/how-it-works/02-uzman-gorusmesi.webp",
      imageAlt: "Danışmanla ihtiyaç analizi ve planlama",
      plainText:
        "Bütçe, alan ölçüleri ve teknik gereksinimler netleştirilir; uygun çözüm taslağı hazırlanır.",
      body: (
        <p className="text-sm leading-relaxed text-white/75">
          Alan ölçüleri, sahne yönü, izleyici akışı, enerji altyapısı ve kurulum detayları
          netleştirilir. Büyük projelerde{" "}
          <InlineLink href="/kurumsal-organizasyon">kurumsal organizasyon</InlineLink>{" "}
          yaklaşımıyla operasyon planı da çıkarılır.
        </p>
      ),
    },
    {
      label: "48 saat sonra",
      title: "Teklif / öneri paketi",
      imageSrc: "/img/how-it-works/03-teklif.webp",
      imageAlt: "Teklif ve opsiyonların hazırlanması",
      plainText:
        "Size özel teklif ve opsiyonlar sunulur, alternatif paketler ve revizyonlar yapılır.",
      body: (
        <p className="text-sm leading-relaxed text-white/75">
          Size özel teklif + opsiyonlar gelir. Örneğin{" "}
          <InlineLink href="/cadir-kiralama">çadır kiralama</InlineLink> veya{" "}
          <InlineLink href="/masa-sandalye-kiralama">masa-sandalye</InlineLink>{" "}
          gibi kalemler paket içine dahil edilebilir.
        </p>
      ),
    },
    {
      label: "Onay",
      title: "Rezervasyon ve planlama",
      imageSrc: "/img/how-it-works/04-onay-rezervasyon.webp",
      imageAlt: "Onay sonrası rezervasyon ve ekip planlaması",
      plainText:
        "Onay sonrası ekipman ve ekip planlaması rezervasyona alınır; kurulum takvimi netleşir.",
      body: (
        <p className="text-sm leading-relaxed text-white/75">
          Onayla birlikte ekipman ve ekip planlaması rezervasyona alınır. Gerekirse
          teslim/kurulum saatleri, kamyon giriş noktaları ve sahne arkasındaki teknik akış
          netleştirilir.
        </p>
      ),
    },
    {
      label: "1 ay kala",
      title: "Keşif / teknik koordinasyon",
      imageSrc: "/img/how-it-works/05-teknik-kesif.webp",
      imageAlt: "Teknik keşif ve saha koordinasyonu",
      plainText:
        "Saha erişimi, enerji ve zemin koşulları kontrol edilir; gerekiyorsa keşif yapılır.",
      body: (
        <p className="text-sm leading-relaxed text-white/75">
          Büyük{" "}
          <InlineLink href="/led-ekran-kiralama">LED ekran</InlineLink> ve{" "}
          <InlineLink href="/truss-kiralama">truss</InlineLink>{" "}
          projelerinde, rigging/güvenlik ve enerji altyapısı için keşif önerilir.
          Bazı projelerde keşif opsiyoneldir.
        </p>
      ),
    },
    {
      label: "24/48 saat önce",
      title: "Kurulum ve testler",
      imageSrc: "/img/how-it-works/06-kurulum.webp",
      imageAlt: "Sahada kurulum ve test süreci",
      plainText:
        "Etkinlikten 1-2 gün önce kurulum yapılır ve tüm sistemler test edilir.",
      body: (
        <p className="text-sm leading-relaxed text-white/75">
          Sahne/truss kurulur,{" "}
          <InlineLink href="/ses-isik-sistemleri">ses-ışık</InlineLink>{" "}
          kurulumu ve{" "}
          <InlineLink href="/led-ekran-kiralama">LED ekran</InlineLink>{" "}
          testleri tamamlanır. Kablolama, güvenlik ve son kontroller yapılır.
        </p>
      ),
    },
    {
      label: "Büyük gün",
      title: "Etkinlik günü yönetimi",
      imageSrc: "/img/how-it-works/07-etkinlik-gunu.webp",
      imageAlt: "Etkinlik günü operasyon ve teknik yönetim",
      plainText:
        "Operasyon ekibi sahada süreci yönetir; yayın, görüntü ve ses akışı takip edilir.",
      body: (
        <p className="text-sm leading-relaxed text-white/75">
          Operasyon ekibi sahadadır. Gerekirse içerik akışı, ekran yönetimi, ses miks ve
          ışık sahneleri canlı takip edilir.
        </p>
      ),
    },
    {
      label: "24/48 saat sonra",
      title: "Söküm ve temiz teslim",
      imageSrc: "/img/how-it-works/08-sokum.webp",
      imageAlt: "Söküm ve ekipmanların güvenli şekilde toplanması",
      plainText:
        "Etkinlik sonrası söküm yapılır, ekipman toplanır ve alan düzenli şekilde teslim edilir.",
      body: (
        <p className="text-sm leading-relaxed text-white/75">
          Planlanan zaman aralığında söküm yapılır, ekipmanlar güvenle toplanır ve alan
          düzenli şekilde teslim edilir.
        </p>
      ),
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
      q: "Aynı anda birden fazla hizmet alabilir miyim?",
      a: "Evet. Sahne, truss, LED ekran, ses-ışık, çadır ve oturma düzeni gibi kalemleri tek projede paketleyerek uçtan uca yönetebiliriz.",
    },
  ];

  return (
    <main className="relative overflow-hidden">
      <GlowBg />
      <JsonLd steps={steps} faqs={faqs} />

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
            AtaWa’daki gibi süreç adımlarını net ve görselli şekilde gösteriyoruz:{" "}
            ihtiyaç → teklif → keşif → kurulum → etkinlik günü → söküm. :contentReference[oaicite:1]{index=1}
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              href={CTA_BRIEF}
              className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black hover:bg-white/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
            >
              İletişim / Brief Bırak
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

          {/* quick internal links row */}
          <div className="mt-2 flex flex-wrap gap-2 text-sm text-white/70">
            <span className="text-white/50">Popüler:</span>
            <InlineLink href="/led-ekran-kiralama">LED ekran</InlineLink>
            <span aria-hidden="true">•</span>
            <InlineLink href="/truss-kiralama">Truss</InlineLink>
            <span aria-hidden="true">•</span>
            <InlineLink href="/podyum-kiralama">Sahne/Podyum</InlineLink>
            <span aria-hidden="true">•</span>
            <InlineLink href="/ses-isik-sistemleri">Ses-ışık</InlineLink>
          </div>
        </div>
      </section>

      {/* STEPS (AtaWa style alternating) */}
      <section className="mx-auto max-w-6xl px-4 pb-14" aria-label="Çalışma adımları">
        <div className="flex items-end justify-between gap-6">
          <div>
            <h2 className="text-2xl font-semibold text-white">Ana Süreç Adımları</h2>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-white/75">
              Her adımda ne yaptığımızı ve hangi noktada hangi ekipmanların devreye girdiğini netleştiriyoruz.
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-10">
          {steps.map((s, idx) => (
            <StepSection
              key={s.title}
              index={idx + 1}
              label={s.label}
              title={s.title}
              body={s.body}
              imageSrc={s.imageSrc}
              imageAlt={s.imageAlt}
              reverse={idx % 2 === 1}
            />
          ))}
        </div>
      </section>

      {/* Guarantees */}
      <section className="mx-auto max-w-6xl px-4 pb-14">
        <h2 className="text-2xl font-semibold text-white">Garantilerimiz</h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-white/75">
          AtaWa’daki “Global offer / Accompaniment / Quality & excellence” mantığına benzer şekilde 3 garanti sunuyoruz. :contentReference[oaicite:2]{index=2}
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <SoftCard className="p-6">
            <h3 className="text-base font-semibold text-white">Uçtan Uca Çözüm</h3>
            <p className="mt-2 text-sm leading-relaxed text-white/75">
              Ekipman + kurulum + operasyon yönetimini tek noktadan planlarız.
            </p>
            <div className="mt-3 text-sm text-white/70">
              <InlineLink href="/kurumsal-organizasyon">Kurumsal organizasyon</InlineLink>
            </div>
          </SoftCard>

          <SoftCard className="p-6">
            <h3 className="text-base font-semibold text-white">Uzman Eşlik</h3>
            <p className="mt-2 text-sm leading-relaxed text-white/75">
              Danışman + teknik ekip süreç boyunca yanınızdadır; kararları hızlandırır, riski azaltır.
            </p>
            <div className="mt-3 text-sm text-white/70">
              <InlineLink href="/iletisim">İletişime geçin</InlineLink>
            </div>
          </SoftCard>

          <SoftCard className="p-6">
            <h3 className="text-base font-semibold text-white">Kalite & Detay</h3>
            <p className="mt-2 text-sm leading-relaxed text-white/75">
              Güvenli kurulum standartları, testler, temiz teslim ve kontrollü söküm.
            </p>
            <div className="mt-3 text-sm text-white/70">
              <InlineLink href="/ses-isik-sistemleri">Teknik ekipmanlar</InlineLink>
            </div>
          </SoftCard>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-6xl px-4 pb-14" aria-labelledby="faq-title">
        <h2 id="faq-title" className="text-2xl font-semibold text-white">
          Sık Sorulan Sorular
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-white/75">
          Süreç, keşif ve kurulum zamanlaması ile ilgili hızlı cevaplar.
        </p>

        <div className="mt-6 grid gap-4">
          {faqs.map((f) => (
            <FaqItem key={f.q} q={f.q} a={f.a} />
          ))}
        </div>
      </section>

      {/* 3 steps CTA */}
      <section className="mx-auto max-w-6xl px-4 pb-20">
        <SoftCard className="p-6 sm:p-10 rounded-3xl">
          <h2 className="text-2xl font-semibold text-white">
            3 Basit Adımda Başlayalım
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-white/75">
            AtaWa’daki “3 simple steps” CTA mantığını Sahneva’ya uyarladık. :contentReference[oaicite:3]{index=3}
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <SoftCard className="p-6">
              <h3 className="text-base font-semibold text-white">1) Brief bırakın</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/75">
                Tarih, lokasyon ve ihtiyaç listesi (LED/truss/sahne/ses-ışık).
              </p>
              <div className="mt-3 text-sm text-white/70">
                <InlineLink href="/iletisim">İletişim</InlineLink>
              </div>
            </SoftCard>

            <SoftCard className="p-6">
              <h3 className="text-base font-semibold text-white">2) Teklifi alın</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/75">
                Paket + opsiyonlar (çadır, oturma düzeni vb.) netleşir.
              </p>
              <div className="mt-3 text-sm text-white/70">
                <InlineLink href="/cadir-kiralama">Çadır</InlineLink>{" "}
                <span aria-hidden="true">•</span>{" "}
                <InlineLink href="/masa-sandalye-kiralama">Masa-sandalye</InlineLink>
              </div>
            </SoftCard>

            <SoftCard className="p-6">
              <h3 className="text-base font-semibold text-white">3) Kurulumu bize bırakın</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/75">
                Kurulum + test + etkinlik günü yönetimi + söküm.
              </p>
              <div className="mt-3 text-sm text-white/70">
                <InlineLink href="/ses-isik-sistemleri">Ses-ışık</InlineLink>
              </div>
            </SoftCard>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href={CTA_BRIEF}
              className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black hover:bg-white/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
            >
              İletişim Formuna Git
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
        </SoftCard>
      </section>
    </main>
  );
}
