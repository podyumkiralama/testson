import Image from "next/image";
import Link from "next/link";

/* ================== SEO METADATA ================== */
const SITE =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://www.sahneva.com";

const PAGE_PATH = "/nasil-calisiyoruz";
const PAGE_URL = `${SITE}${PAGE_PATH}`;
const OG_IMAGE = `${SITE}/img/og/nasil-calisiriz-og.webp`;

export const metadata = {
  title: "Nasıl Çalışıyoruz? | Sahneva Organizasyon",
  description:
    "Sahneva’da süreç; ihtiyaç analizi, teklif, teknik keşif, kurulum ve etkinlik sonrası söküm dahil uçtan uca planlanır.",
  alternates: { canonical: PAGE_URL, languages: { "tr-TR": PAGE_URL, "x-default": PAGE_URL } },
  openGraph: {
    type: "website",
    url: PAGE_URL,
    title: "Nasıl Çalışıyoruz? | Sahneva Organizasyon",
    description:
      "İhtiyaç analizi → teklif → teknik keşif → kurulum → etkinlik günü → söküm.",
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

/* ================== JSON-LD (ONLY PLAIN DATA) ================== */
function JsonLd({ stepsData, faqs }) {
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
        step: stepsData.map((s) => ({
          "@type": "HowToStep",
          position: s.stepNo,
          name: s.title,
          text: s.plainText,
          url: `${PAGE_URL}#adim-${s.stepNo}`,
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

/* ================== AtaWa style alternating section ================== */
function StepSection({
  stepNo,
  label,
  title,
  body,
  imageSrc,
  imageAlt,
  reverse,
}) {
  const id = `adim-${stepNo}`;
  return (
    <section id={id} className="scroll-mt-24" aria-labelledby={`${id}-title`}>
      <div
        className={
          "grid items-center gap-6 lg:gap-10 " +
          (reverse ? "lg:grid-cols-[520px_1fr]" : "lg:grid-cols-[1fr_520px]")
        }
      >
        <div className={reverse ? "lg:order-2" : ""}>
          <div className="flex flex-wrap items-center gap-3">
            <Badge>{label}</Badge>
            <Badge>Adım {stepNo}</Badge>
          </div>

          <h3 id={`${id}-title`} className="mt-4 text-xl font-semibold text-white sm:text-2xl">
            {title}
          </h3>

          <SoftCard className="mt-4 p-5 sm:p-6">
            <div className="prose prose-invert max-w-none prose-p:my-0">{body}</div>
          </SoftCard>
        </div>

        <div className={reverse ? "lg:order-1" : ""}>
          <ImgFrame src={imageSrc} alt={imageAlt} />
        </div>
      </div>
    </section>
  );
}

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

  // JSON-LD için düz veri (React yok)
  const stepsData = [
    {
      stepNo: 1,
      label: "İlk temas",
      title: "İhtiyaç formu / ilk iletişim",
      plainText:
        "Etkinlik türü, tarih, lokasyon ve ihtiyaçlar paylaşılır. Danışman geri dönüş yapar ve süreç başlar.",
      imageSrc: "/img/nasil-calisiriz/01-ilk-iletisim.webp",
      imageAlt: "Sahneva ile ilk iletişim ve ihtiyaçların belirlenmesi",
    },
    {
      stepNo: 2,
      label: "Uzman görüşmesi",
      title: "Proje ihtiyaçları netleşir",
      plainText:
        "Bütçe, alan ölçüleri ve teknik gereksinimler netleştirilir; uygun çözüm taslağı hazırlanır.",
      imageSrc: "/img/nasil-calisiriz/02-uzman-gorusmesi.webp",
      imageAlt: "Danışmanla ihtiyaç analizi ve planlama",
    },
    {
      stepNo: 3,
      label: "48 saat sonra",
      title: "Teklif / öneri paketi",
      plainText:
        "Size özel teklif ve opsiyonlar sunulur, alternatif paketler ve revizyonlar yapılır.",
      imageSrc: "/img/nasil-calisiriz/03-teklif.webp",
      imageAlt: "Teklif ve opsiyonların hazırlanması",
    },
    {
      stepNo: 4,
      label: "Onay",
      title: "Rezervasyon ve planlama",
      plainText:
        "Onay sonrası ekipman ve ekip planlaması rezervasyona alınır; kurulum takvimi netleşir.",
      imageSrc: "/img/nasil-calisiriz/04-onay-rezervasyon.webp",
      imageAlt: "Onay sonrası rezervasyon ve ekip planlaması",
    },
    {
      stepNo: 5,
      label: "1 ay kala",
      title: "Keşif / teknik koordinasyon",
      plainText:
        "Saha erişimi, enerji ve zemin koşulları kontrol edilir; gerekiyorsa keşif yapılır.",
      imageSrc: "/img/nasil-calisiriz/05-teknik-kesif.webp",
      imageAlt: "Teknik keşif ve saha koordinasyonu",
    },
    {
      stepNo: 6,
      label: "24/48 saat önce",
      title: "Kurulum ve testler",
      plainText:
        "Etkinlikten 1-2 gün önce kurulum yapılır ve tüm sistemler test edilir.",
      imageSrc: "/img/nasil-calisiriz/06-kurulum.webp",
      imageAlt: "Sahada kurulum ve test süreci",
    },
    {
      stepNo: 7,
      label: "Büyük gün",
      title: "Etkinlik günü yönetimi",
      plainText:
        "Operasyon ekibi sahada süreci yönetir; yayın, görüntü ve ses akışı takip edilir.",
      imageSrc: "/img/nasil-calisiriz/07-etkinlik-gunu.webp",
      imageAlt: "Etkinlik günü operasyon ve teknik yönetim",
    },
    {
      stepNo: 8,
      label: "24/48 saat sonra",
      title: "Söküm ve temiz teslim",
      plainText:
        "Etkinlik sonrası söküm yapılır, ekipman toplanır ve alan düzenli şekilde teslim edilir.",
      imageSrc: "/img/nasil-calisiriz/08-sokum.webp",
      imageAlt: "Söküm ve ekipmanların güvenli şekilde toplanması",
    },
  ];

  // UI’de linkli zengin metin (burada React var, JSON’a gitmiyor)
  const stepsUi = stepsData.map((s) => {
    if (s.stepNo === 1) {
      return {
        ...s,
        body: (
          <>
            <p className="text-sm leading-relaxed text-white/75">
              Etkinlik türü, tarih, lokasyon ve ihtiyaçlarınızı iletin. Örn:{" "}
              <InlineLink href="/led-ekran-kiralama">LED ekran kiralama</InlineLink>,{" "}
              <InlineLink href="/truss-kiralama">truss kiralama</InlineLink>,{" "}
              <InlineLink href="/podyum-kiralama">sahne/podyum</InlineLink>,{" "}
              <InlineLink href="/ses-isik-sistemleri">ses-ışık</InlineLink>.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-white/75">
              Brief için{" "}
              <InlineLink href="/iletisim">iletişim formu</InlineLink> veya WhatsApp.
            </p>
          </>
        ),
      };
    }
    if (s.stepNo === 3) {
      return {
        ...s,
        body: (
          <p className="text-sm leading-relaxed text-white/75">
            Teklif opsiyonlarına{" "}
            <InlineLink href="/cadir-kiralama">çadır kiralama</InlineLink> ve{" "}
            <InlineLink href="/masa-sandalye-kiralama">masa-sandalye</InlineLink>{" "}
            gibi kalemler eklenebilir.
          </p>
        ),
      };
    }
    if (s.stepNo === 6) {
      return {
        ...s,
        body: (
          <p className="text-sm leading-relaxed text-white/75">
            Kurulumda{" "}
            <InlineLink href="/ses-isik-sistemleri">ses-ışık</InlineLink>{" "}
            ve{" "}
            <InlineLink href="/led-ekran-kiralama">LED ekran</InlineLink>{" "}
            testleri tamamlanır; güvenlik kontrolleri yapılır.
          </p>
        ),
      };
    }
    return {
      ...s,
      body: <p className="text-sm leading-relaxed text-white/75">{s.plainText}</p>,
    };
  });

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
      <JsonLd stepsData={stepsData} faqs={faqs} />

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
            İhtiyaç → teklif → keşif → kurulum → etkinlik günü → söküm.
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

      {/* STEPS */}
      <section className="mx-auto max-w-6xl px-4 pb-14" aria-label="Çalışma adımları">
        <h2 className="text-2xl font-semibold text-white">Ana Süreç Adımları</h2>
        <div className="mt-8 grid gap-10">
          {stepsUi.map((s, idx) => (
            <StepSection
              key={`step-${s.stepNo}`}
              stepNo={s.stepNo}
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

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-6xl px-4 pb-20" aria-labelledby="faq-title">
        <h2 id="faq-title" className="text-2xl font-semibold text-white">
          Sık Sorulan Sorular
        </h2>
        <div className="mt-6 grid gap-4">
          {faqs.map((f) => (
            <FaqItem key={f.q} q={f.q} a={f.a} />
          ))}
        </div>
      </section>
    </main>
  );
}
