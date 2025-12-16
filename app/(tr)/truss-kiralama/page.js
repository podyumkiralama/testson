// app/(tr)/truss-kiralama/page.jsx

import Link from "next/link";

/* ================== CONFIG ================== */
const SITE =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://www.sahneva.com";

const PAGE_PATH = "/truss-kiralama";
const PAGE_URL = `${SITE}${PAGE_PATH}`;

const ORG_ID = `${SITE}/#org`;
const WEBSITE_ID = `${SITE}/#website`;

const TITLE = "Truss Kiralama | Alüminyum Truss Sistemleri | Sahneva";
const DESCRIPTION =
  "Kare, üçgen, circle, kemer/gate dahil her türlü truss kiralama ve kurulumu. Sahne, LED ekran, ışık-ses sistemleri için nakliye + montaj + teknik ekip desteği.";

const OG_IMAGE = `${SITE}/img/og/truss-kiralama.webp`; // !!! burayı ne yapalım: yoksa default OG kullan

// !!! burayı ne yapalım: bunları gerçek bilgilerle değiştir
const WHATSAPP_URL = "https://wa.me/905555555555";
const PHONE_URL = "tel:+905555555555";
const EMAIL_URL = "mailto:info@sahneva.com";

/* ================== METADATA ================== */
export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: PAGE_URL,
    siteName: "Sahneva Organizasyon",
    locale: "tr_TR",
    type: "website",
    images: [{ url: OG_IMAGE }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
  robots: { index: true, follow: true },
};

/* ================== JSON-LD ================== */
function JsonLd() {
  const breadcrumb = [
    { name: "Ana Sayfa", item: SITE },
    { name: "Truss Kiralama", item: PAGE_URL },
  ];

  const faqs = [
    {
      q: "Hangi truss çeşitlerini kurabiliyorsunuz?",
      a: "Kare truss, üçgen truss, circle/oval truss, kemer (gate) truss ve özel ölçü/kurgu gerektiren kurulumlar dahil etkinliğe uygun her türlü truss sistemini kurabiliyoruz.",
    },
    {
      q: "Truss sistemleri LED ekran ve ışık sistemleri için uygun mu?",
      a: "Evet. LED ekran, ışık, hoparlör ve sahne ekipmanları için kurulum planı; alan, yük dağılımı ve güvenlik gerekliliklerine göre yapılır. Gereken durumlarda ek sabitleme ve destek çözümleri uygulanır.",
    },
    {
      q: "Kurulum ve söküm hizmeti veriyor musunuz?",
      a: "Evet. Nakliye, kurulum, söküm ve sahada teknik ekip desteği sağlayabiliyoruz. Etkinlik tarihine, lokasyona ve kapsamına göre planlama yapılır.",
    },
    {
      q: "Fiyatlar nasıl belirleniyor?",
      a: "Fiyat; truss tipi, toplam metraj, yükseklik, kurulum karmaşıklığı, ek ekipman (base, bağlantı elemanları, motor vb.), nakliye ve etkinlik süresine göre belirlenir.",
    },
    {
      q: "İstanbul dışında hizmet veriyor musunuz?",
      a: "Evet. İstanbul başta olmak üzere Türkiye genelinde proje bazlı hizmet verebiliyoruz.",
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": ORG_ID,
        name: "Sahneva Organizasyon",
        url: SITE,
      },
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: SITE,
        name: "Sahneva",
        publisher: { "@id": ORG_ID },
        inLanguage: "tr-TR",
      },
      {
        "@type": "WebPage",
        "@id": `${PAGE_URL}#webpage`,
        url: PAGE_URL,
        name: TITLE,
        description: DESCRIPTION,
        isPartOf: { "@id": WEBSITE_ID },
        inLanguage: "tr-TR",
        breadcrumb: { "@id": `${PAGE_URL}#breadcrumb` },
        primaryImageOfPage: { "@id": `${PAGE_URL}#primaryimage` },
        mainEntity: { "@id": `${PAGE_URL}#service` },
      },
      {
        "@type": "ImageObject",
        "@id": `${PAGE_URL}#primaryimage`,
        url: OG_IMAGE,
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${PAGE_URL}#breadcrumb`,
        itemListElement: breadcrumb.map((b, idx) => ({
          "@type": "ListItem",
          position: idx + 1,
          name: b.name,
          item: b.item,
        })),
      },
      {
        "@type": "Service",
        "@id": `${PAGE_URL}#service`,
        name: "Truss Kiralama ve Kurulum",
        serviceType: "Truss kiralama",
        provider: { "@id": ORG_ID },
        areaServed: "TR",
        url: PAGE_URL,
        description:
          "Etkinliklere özel truss kiralama ve kurulum hizmeti: kare/üçgen/circle/kemer truss sistemleri, nakliye + montaj + teknik ekip desteği.",
      },
      {
        "@type": "FAQPage",
        "@id": `${PAGE_URL}#faq`,
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

/* ================== UI HELPERS ================== */
function Section({ id, title, children }) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="relative mx-auto w-full max-w-6xl px-4 py-10 sm:py-14"
    >
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.04)] backdrop-blur-sm sm:p-8">
        <h2
          id={`${id}-title`}
          className="text-xl font-semibold tracking-tight text-white sm:text-2xl"
        >
          {title}
        </h2>
        <div className="prose prose-invert mt-4 max-w-none text-white/80 prose-p:leading-7 prose-li:leading-7">
          {children}
        </div>
      </div>
    </section>
  );
}

function Callout({ title, children }) {
  return (
    <div className="mt-6 rounded-2xl border border-white/10 bg-[#0B1120]/30 p-5">
      <h3 className="text-base font-semibold text-white">{title}</h3>
      <div className="mt-2 text-sm leading-6 text-white/75">{children}</div>
    </div>
  );
}

function AnchorNav() {
  const items = [
    ["#hizmet", "Hizmet"],
    ["#nedir", "Nedir?"],
    ["#cesitler", "Çeşitler"],
    ["#kullanim", "Kullanım"],
    ["#guvenlik", "Güvenlik"],
    ["#fiyat", "Fiyatlar"],
    ["#surec", "Süreç"],
    ["#faq", "SSS"],
    ["#teklif", "Teklif Al"],
  ];

  return (
    <nav
      aria-label="Sayfa içi hızlı erişim"
      className="relative mx-auto w-full max-w-6xl px-4"
    >
      <div className="flex flex-wrap gap-2 rounded-2xl border border-white/10 bg-white/5 p-3">
        {items.map(([href, label]) => (
          <a
            key={href}
            href={href}
            className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/85 transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
          >
            {label}
          </a>
        ))}
      </div>
    </nav>
  );
}

function ContactCtas() {
  return (
    <div className="mt-6 flex flex-wrap gap-3">
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
        aria-label="WhatsApp üzerinden teklif al (yeni sekmede açılır)"
      >
        WhatsApp Teklif Al
      </a>

      <a
        href={PHONE_URL}
        className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white/90 transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
        aria-label="Telefonla ara"
      >
        Hemen Ara
      </a>

      <a
        href="#teklif"
        className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white/90 transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
      >
        Form ile Fiyat Al
      </a>
    </div>
  );
}

/* ================== PAGE ================== */
export default function Page() {
  return (
    <main id="main" className="relative min-h-screen bg-[#0B1120] text-white">
      <JsonLd />

      {/* Background: faq.js vibe (grid + blue glow) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.22),transparent_55%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_at_center,black_55%,transparent_78%)]" />
      </div>

      {/* HERO (makale sayfası gibi) */}
      <header className="relative mx-auto w-full max-w-6xl px-4 pb-6 pt-14 sm:pb-10 sm:pt-20">
        <p className="text-sm font-medium text-blue-200/90">
          Sahne • LED Ekran • Işık & Ses • Fuar & Organizasyon
        </p>

        <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-5xl">
          Truss Kiralama
        </h1>

        <p className="mt-4 max-w-3xl text-base leading-7 text-white/80 sm:text-lg">
          Kare, üçgen, circle ve kemer (gate) dahil <b className="text-white">her türlü truss</b>{" "}
          sistemini etkinliğinize göre planlıyor; nakliye, kurulum-söküm ve sahada
          teknik ekip desteği sağlıyoruz.
        </p>

        <ContactCtas />

        <ul className="mt-6 grid gap-3 text-sm text-white/75 sm:grid-cols-3">
          <li className="rounded-xl border border-white/10 bg-white/5 p-4">
            ✅ Nakliye + Kurulum + Söküm
          </li>
          <li className="rounded-xl border border-white/10 bg-white/5 p-4">
            ✅ Teknik Ekip & Sahada Destek
          </li>
          <li className="rounded-xl border border-white/10 bg-white/5 p-4">
            ✅ İstanbul & Türkiye Geneli
          </li>
        </ul>
      </header>

      <AnchorNav />

      {/* 1) HİZMET */}
      <Section id="hizmet" title="Truss Kiralama Hizmeti">
        <p>
          Truss kiralama; etkinliklerde sahne üstü ışık, ses ve LED ekran sistemlerinin güvenli şekilde
          taşınmasını ve konumlandırılmasını sağlayan profesyonel bir taşıyıcı sistem çözümüdür.
          Sahneva Organizasyon olarak konser, festival, fuar, lansman ve kurumsal etkinlikler için
          <strong> her ölçekte truss kiralama ve kurulum</strong> hizmeti sunuyoruz.
        </p>

        <p>
          Alüminyum truss sistemleri; hafif, modüler ve yüksek taşıma kapasitesine sahip yapılarıyla
          hem iç mekân hem de açık alan kurulumlarında tercih edilir. Etkinliğin alan ölçüsü,
          yükseklik ihtiyacı ve taşınacak ekipmanlara göre truss planlaması yapılır.
        </p>

        <Callout title="Uyumlu Hizmetler">
          <div className="flex flex-wrap gap-3">
            <Link
              href="/led-ekran-kiralama"
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-white/85 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
            >
              LED Ekran Kiralama
            </Link>
            <Link
              href="/sahne-kiralama"
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-white/85 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
            >
              Sahne Kiralama
            </Link>
            <Link
              href="/ses-isik-sistemleri"
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-white/85 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
            >
              Ses & Işık Sistemleri
            </Link>
            <Link
              href="/podyum-kiralama"
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-white/85 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
            >
              Podyum Kiralama
            </Link>
          </div>
        </Callout>
      </Section>

      {/* 2) NEDİR */}
      <Section id="nedir" title="Truss Sistemleri Nedir?">
        <p>
          Truss; modüler parçalardan oluşan, birbirine bağlantı elemanları ile sabitlenen ve yük taşıma
          amacıyla kullanılan alüminyum konstrüksiyon sistemidir. Sahne üstü kurulumlarda güvenlik ve
          stabilite açısından kritik bir rol oynar.
        </p>

        <p>
          Sahne, LED ekran ve ışık sistemlerinin doğru açıda ve doğru yük dağılımıyla konumlandırılmasını
          sağlar. Özellikle büyük ölçekli organizasyonlarda, iyi planlanmış bir truss kurgusu; hem
          görsel kaliteyi artırır hem de operasyonu güvenli hale getirir.
        </p>
      </Section>

      {/* 3) ÇEŞİTLER */}
      <Section id="cesitler" title="Hangi Truss Çeşitlerini Kurabiliyoruz?">
        <p>
          Sahneva olarak etkinliğin ihtiyacına göre <strong>tüm truss türleriyle</strong> çözüm
          üretebiliyoruz:
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            [
              "Kare Truss",
              "Yüksek taşıma kapasitesi ve rijit yapısıyla LED ekran askıları, sahne üstü ışık sistemleri ve geniş açıklıklı kurgular için tercih edilir.",
            ],
            [
              "Üçgen Truss",
              "Daha hafif ve kompakt yapısıyla dekoratif uygulamalarda ve orta ölçekli sistemlerde kullanılır.",
            ],
            [
              "Circle / Oval Truss",
              "Dairesel sahne tasarımları, merkez sahne kurguları ve yaratıcı konseptler için idealdir.",
            ],
            [
              "Kemer (Gate) Truss",
              "Giriş takı, sahne portalı, fuar alanı geçişleri ve marka kapıları için kullanılır.",
            ],
            [
              "Özel Truss Kurguları",
              "Alan ölçülerine, yükseklik ihtiyacına ve konsept tasarımına göre proje bazlı planlama yapılır.",
            ],
            [
              "Aksesuar & Bağlantı",
              "Base/foot, bağlantı elemanları, destek ve sabitleme çözümleri projeye göre belirlenir.",
            ],
          ].map(([t, d]) => (
            <div
              key={t}
              className="rounded-2xl border border-white/10 bg-[#0B1120]/30 p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.04)]"
            >
              <h3 className="text-base font-semibold text-white">{t}</h3>
              <p className="mt-2 text-sm leading-6 text-white/75">{d}</p>
            </div>
          ))}
        </div>

        <p className="mt-6 text-sm text-white/70">
          Not: Truss türü, metraj ve yükseklik; taşınacak ekipmanlar ve sahne tasarımına göre
          netleştirilir.
        </p>
      </Section>

      {/* 4) KULLANIM */}
      <Section id="kullanim" title="Truss Nerelerde Kullanılır?">
        <p>
          Truss sistemleri çok geniş bir kullanım alanına sahiptir. Sık karşılaşılan kullanım örnekleri:
        </p>

        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          {[
            "LED ekran askı ve truss frame çözümleri",
            "Sahne üstü ışık rigging (moving head, wash, efekt sistemleri)",
            "Ses sistemi taşıyıcı kurgular (proje gerekliliklerine göre)",
            "Sahne portalı ve backdrop sistemleri",
            "Fuar stand üst konstrüksiyonları",
            "Açık alan konser ve festival sahneleri (ek sabitleme/önlem ile)",
          ].map((x) => (
            <li
              key={x}
              className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-white/80"
            >
              {x}
            </li>
          ))}
        </ul>

        <Callout title="Projenizde truss ile birlikte en çok istenenler">
          <p className="mb-3">
            Truss sistemleri genellikle şu hizmetlerle birlikte planlanır:
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/led-ekran-kiralama"
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-white/85 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
            >
              LED Ekran
            </Link>
            <Link
              href="/ses-isik-sistemleri"
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-white/85 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
            >
              Ses & Işık
            </Link>
            <Link
              href="/sahne-kiralama"
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-white/85 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
            >
              Sahne
            </Link>
            <Link
              href="/kurumsal-organizasyon"
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-white/85 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
            >
              Kurumsal Organizasyon
            </Link>
          </div>
        </Callout>
      </Section>

      {/* 5) GÜVENLİK */}
      <Section id="guvenlik" title="Truss Kurulumunda Güvenlik ve Teknik Planlama">
        <p>
          Truss kurulumunda en önemli konu <strong>yük, bağlantı güvenliği ve stabilite</strong>tir.
          Bu nedenle her projede; taşınacak ekipmanların türü (LED ekran, ışık, dekor), yükseklik ve
          açıklık (span), zemin koşulları ve açık alandaki çevresel etkiler dikkate alınarak planlama yapılır.
        </p>

        <h3 className="mt-6 text-lg font-semibold text-white">Dikkate aldığımız teknik başlıklar</h3>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-white/75">
          <li>Taşınacak ekipmanın ağırlığı ve yerleşimi</li>
          <li>Truss açıklığı, yükseklik ve bağlantı noktaları</li>
          <li>Zemin şartları ve mekân kısıtları</li>
          <li>Açık alanda rüzgâr/zemin koşullarına göre ek sabitleme yaklaşımı</li>
          <li>Kurulum-söküm sürecinde sahada ekip koordinasyonu</li>
        </ul>

        <Callout title="Açık Alan Kurulum Notu">
          <p>
            Açık alanda truss kurulumu yapılabilir; ancak rüzgâr ve zemin koşullarına göre
            ek sabitleme/denge çözümleri proje bazlı planlanır.
          </p>
        </Callout>
      </Section>

      {/* 6) FİYAT */}
      <Section id="fiyat" title="Truss Kiralama Fiyatları Nasıl Belirlenir?">
        <p>
          Truss kiralama fiyatları sabit değildir. Fiyatlandırma; truss tipi, toplam metraj, yükseklik,
          kurulum karmaşıklığı, ek ekipman ihtiyacı ve nakliye/kurulum günü gibi kriterlere göre belirlenir.
        </p>

        <h3 className="mt-6 text-lg font-semibold text-white">Fiyatı etkileyen başlıca kriterler</h3>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-white/75">
          <li>Truss türü (kare/üçgen/circle/kemer) ve toplam metraj</li>
          <li>Yükseklik ve kurgu karmaşıklığı</li>
          <li>Ek ekipman (base/foot, bağlantı, destek, motor vb.)</li>
          <li>Nakliye mesafesi ve kurulum-söküm planı</li>
          <li>Etkinliğin süresi (tek gün / çok gün)</li>
        </ul>

        <p className="mt-6">
          Net fiyat için etkinlik bilgilerinizi alıp proje bazlı teklif hazırlıyoruz.
        </p>
      </Section>

      {/* 7) SÜREÇ */}
      <Section id="surec" title="Truss Kiralama Süreci">
        <p>
          LED ekran kiralama sayfasındaki işleyiş mantığıyla aynı şekilde, truss projelerinde de
          süreci 3 adımda netleştiriyoruz:
        </p>

        <ol className="mt-5 grid gap-4 lg:grid-cols-3">
          {[
            [
              "1) İhtiyacın Belirlenmesi",
              "Etkinlik tarihi, şehir, ölçüler, kullanım amacı (LED/ışık/dekor) ve süre netleştirilir.",
            ],
            [
              "2) Planlama ve Teklif",
              "Metraj, yükseklik, kurgu ve gerekli aksesuarlar belirlenir; proje bazlı teklif oluşturulur.",
            ],
            [
              "3) Kurulum ve Operasyon",
              "Nakliye, kurulum, söküm ve sahada teknik destek ile kurulum tamamlanır.",
            ],
          ].map(([t, d]) => (
            <li key={t} className="list-none rounded-2xl border border-white/10 bg-white/5 p-6">
              <h3 className="text-base font-semibold text-white">{t}</h3>
              <p className="mt-2 text-sm leading-6 text-white/75">{d}</p>
            </li>
          ))}
        </ol>

        <Callout title="Hızlı Teklif için gerekli bilgiler">
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              "Şehir / İlçe",
              "Etkinlik tarihi",
              "Kurulum süresi (kaç gün)",
              "Ölçü ihtiyacı (en-boy-yükseklik)",
              "Kullanım amacı (LED/ışık/dekor)",
              "Ek ihtiyaçlar (sahne, LED, ses-ışık)",
            ].map((x) => (
              <div
                key={x}
                className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-white/80"
              >
                {x}
              </div>
            ))}
          </div>
        </Callout>
      </Section>

      {/* 8) FAQ */}
      <Section id="faq" title="Sık Sorulan Sorular">
        <div className="mt-2 space-y-3">
          {[
            [
              "Kaç metre truss gerekir?",
              "Etkinliğin ölçülerine, yükseklik ihtiyacına ve kullanım amacına göre belirlenir. Bilgileri paylaşırsanız en doğru metrajı öneririz.",
            ],
            [
              "LED ekran truss’a asılabilir mi?",
              "Evet. Uygun kurgu, yük dağılımı ve güvenlik önlemleriyle LED ekran askı çözümleri planlanabilir.",
            ],
            [
              "Kurulum ne kadar sürer?",
              "Kurulum süresi truss metrajı ve kurgusuna göre değişir. Basit kurulumlar daha hızlı, özel kurgular proje bazlı planlanır.",
            ],
            [
              "Açık alanda truss kurulur mu?",
              "Evet. Ancak rüzgâr ve zemin koşullarına göre ek sabitleme/denge çözümleri proje bazlı uygulanır.",
            ],
            [
              "İstanbul dışında hizmet veriyor musunuz?",
              "Evet. İstanbul başta olmak üzere Türkiye genelinde proje bazlı hizmet verebiliyoruz.",
            ],
          ].map(([q, a]) => (
            <details
              key={q}
              className="rounded-2xl border border-white/10 bg-white/5 p-5"
            >
              <summary className="cursor-pointer text-sm font-semibold text-white/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 rounded-lg">
                {q}
              </summary>
              <p className="mt-3 text-sm leading-6 text-white/75">{a}</p>
            </details>
          ))}
        </div>
      </Section>

      {/* 9) TEKLİF */}
      <Section id="teklif" title="Truss Kiralama Teklifi Alın">
        <p>
          Etkinliğiniz için en uygun truss çözümünü belirlemek ve fiyat teklifi almak için bizimle
          iletişime geçebilirsiniz. Sahneva Organizasyon olarak profesyonel, güvenli ve zamanında
          kurulum hedefiyle çalışıyoruz.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
            aria-label="WhatsApp ile teklif iste (yeni sekmede açılır)"
          >
            WhatsApp’tan Yaz
          </a>

          <a
            href={EMAIL_URL}
            className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white/90 transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
          >
            E-posta Gönder
          </a>

          <a
            href={PHONE_URL}
            className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white/90 transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
            aria-label="Telefonla ara"
          >
            Telefonla Ara
          </a>
        </div>

        <p className="mt-4 text-xs text-white/60">
          Not: İletişim bilgileriniz ve OG görseliniz farklıysa üstteki sabitleri güncelleyin.
        </p>
      </Section>

      {/* FOOTER LINKS */}
      <footer className="relative mx-auto w-full max-w-6xl px-4 pb-12 pt-2 text-sm text-white/55">
        <p>
          İlgili hizmetler:{" "}
          <Link className="text-white/75 hover:text-white" href="/led-ekran-kiralama">
            LED Ekran Kiralama
          </Link>{" "}
          •{" "}
          <Link className="text-white/75 hover:text-white" href="/sahne-kiralama">
            Sahne Kiralama
          </Link>{" "}
          •{" "}
          <Link className="text-white/75 hover:text-white" href="/ses-isik-sistemleri">
            Ses & Işık Sistemleri
          </Link>
        </p>
      </footer>
    </main>
  );
}
