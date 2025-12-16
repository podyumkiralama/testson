// app/(tr)/truss-kiralama/page.jsx
import Link from "next/link";

const SITE =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://www.sahneva.com";

const PAGE_PATH = "/truss-kiralama";
const PAGE_URL = `${SITE}${PAGE_PATH}`;

const ORG_ID = `${SITE}/#org`;
const WEBSITE_ID = `${SITE}/#website`;

const TITLE = "Truss Kiralama | Alüminyum Truss Sistemleri | Sahneva";
const DESCRIPTION =
  "Kare, üçgen, circle, kemer/gate dahil her türlü truss kiralama ve kurulumu. Sahne, LED ekran, ışık-ses sistemleri için nakliye + montaj + teknik ekip desteği.";

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: PAGE_URL,
    siteName: "Sahneva Organizasyon",
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  robots: { index: true, follow: true },
};

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
        url: `${SITE}/img/og/truss-kiralama.webp`,
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
      // JSON-LD: safe stringify
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

function Section({ id, title, children }) {
  return (
    <section id={id} className="relative mx-auto w-full max-w-6xl px-4 py-10 sm:py-14">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.04)] backdrop-blur-sm sm:p-8">
        <h2 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
          {title}
        </h2>
        <div className="mt-4 text-base leading-7 text-white/80">{children}</div>
      </div>
    </section>
  );
}

export default function Page() {
  return (
    <main className="relative min-h-screen bg-[#0B1120] text-white">
      <JsonLd />

      {/* bg grid + glow (faq.js vibes) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-100"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.22),transparent_55%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_at_center,black_55%,transparent_78%)]" />
      </div>

      {/* HERO */}
      <header className="relative mx-auto w-full max-w-6xl px-4 pb-6 pt-14 sm:pb-10 sm:pt-20">
        <p className="text-sm font-medium text-blue-200/90">
          Sahne • LED Ekran • Işık & Ses • Fuar & Organizasyon
        </p>

        <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-5xl">
          Truss Kiralama ve Kurulum
        </h1>

        <p className="mt-4 max-w-3xl text-base leading-7 text-white/80 sm:text-lg">
          Kare, üçgen, circle ve kemer (gate) dahil <b className="text-white">her türlü truss</b> sistemini
          etkinliğinize göre planlıyor; nakliye, kurulum-söküm ve sahada teknik ekip desteği sağlıyoruz.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href="https://wa.me/905555555555"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
            aria-label="WhatsApp üzerinden teklif al (yeni sekmede açılır)"
          >
            WhatsApp Teklif Al
          </a>

          <a
            href="tel:+905555555555"
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

      {/* QUICK NAV */}
      <nav aria-label="Sayfa içi hızlı erişim" className="relative mx-auto w-full max-w-6xl px-4">
        <div className="flex flex-wrap gap-2 rounded-2xl border border-white/10 bg-white/5 p-3">
          {[
            ["#cesitler", "Truss Çeşitleri"],
            ["#kullanim", "Kullanım Alanları"],
            ["#teknik", "Teknik & Güvenlik"],
            ["#paketler", "Paketler"],
            ["#faq", "SSS"],
            ["#teklif", "Teklif Al"],
          ].map(([href, label]) => (
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

      <Section id="cesitler" title="Kurabildiğimiz Truss Çeşitleri">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            ["Kare Truss", "Sahne üstü taşıyıcı kurgular, ışık ve LED ekran uygulamaları için sık tercih edilir."],
            ["Üçgen Truss", "Daha hafif kurgu ve dekoratif uygulamalarda esnek çözümler sunar."],
            ["Circle / Oval Truss", "Sahne tasarımında dairesel/oval formlu yaratıcı rigging kurguları."],
            ["Kemer (Gate) Truss", "Giriş takı, sahne portalı ve fuar alanı geçişleri için ideal."],
            ["Özel Kurgu", "Etkinliğin ölçülerine göre metraj, yükseklik ve bağlantı planı oluşturulur."],
            ["Aksesuar & Bağlantı", "Base/foot, bağlantı elemanları, destek ve sabitleme çözümleri."],
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
        <p className="mt-5 text-sm text-white/70">
          Not: Proje gereksinimlerine göre farklı ölçü/seri truss sistemleriyle çözüm üretebiliriz.
        </p>
      </Section>

      <Section id="kullanim" title="Truss Nerelerde Kullanılır?">
        <ul className="grid gap-3 sm:grid-cols-2">
          {[
            "Sahne üstü ışık ve ses rigging",
            "LED ekran askı & truss frame",
            "DJ booth ve backdrop taşıyıcı sistemler",
            "Fuar stand üst konstrüksiyonu",
            "Giriş takı / kemer / portal",
            "Açık alan etkinlik kurguları (ek sabitleme ile)",
          ].map((x) => (
            <li
              key={x}
              className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-white/80"
            >
              {x}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap gap-3 text-sm">
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
        </div>
      </Section>

      <Section id="teknik" title="Teknik & Güvenlik Yaklaşımı">
        <p>
          Truss kurulumunda en kritik konu güvenliktir. Kurulum planı; alan ölçüsü, yükseklik,
          kullanım amacı (LED ekran / ışık / dekor), rüzgâr ve zemin koşulları gibi parametrelere göre
          yapılır. Gereken durumlarda ek destek ve sabitleme çözümleri uygulanır.
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-white/75">
          <li>Kurulum-söküm sürecinde sahada ekip koordinasyonu</li>
          <li>Yük dağılımı ve bağlantı noktalarının doğru kurgulanması</li>
          <li>Açık alanda rüzgâr/zemin şartlarına göre ek güvenlik önlemleri</li>
        </ul>
      </Section>

      <Section id="paketler" title="Etkinlik Paketleri">
        <div className="grid gap-4 lg:grid-cols-3">
          {[
            ["Mini Paket", ["Kısa metraj truss", "Temel bağlantılar", "Kurulum-söküm"]],
            ["Standart Paket", ["Orta ölçek metraj", "Portal/askı kurgusu", "Teknik ekip desteği"]],
            ["Pro Paket", ["Özel kurgu", "LED/ışık rigging uyumu", "Proje bazlı planlama"]],
          ].map(([name, items]) => (
            <div key={name} className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <h3 className="text-base font-semibold">{name}</h3>
              <ul className="mt-3 space-y-2 text-sm text-white/75">
                {items.map((i) => (
                  <li key={i}>• {i}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm text-white/70">
          Paketler örnektir. Metraj, yükseklik ve ekipman ihtiyacına göre proje bazlı netleştiriyoruz.
        </p>
      </Section>

      <Section id="faq" title="Sık Sorulan Sorular">
        <div className="space-y-3">
          {[
            ["Hangi truss sistemini seçmeliyim?", "Kullanım amacınıza (LED ekran/ışık/dekor), ölçü ve yükseklik ihtiyacınıza göre doğru truss kurgusunu öneriyoruz."],
            ["Kurulum ne kadar sürer?", "Metraj ve kurguya göre değişir. Basit kurulumlar daha hızlı, özel kurgular proje bazlı planlanır."],
            ["Açık alanda truss kurulur mu?", "Evet. Ancak rüzgâr ve zemin koşullarına göre ek sabitleme/önlem planı yapılır."],
            ["Fiyat almak için ne lazım?", "Tarih, şehir, kullanım amacı, ölçü (en-boy-yükseklik) ve etkinlik süresi yeterli."],
          ].map(([q, a]) => (
            <details
              key={q}
              className="rounded-2xl border border-white/10 bg-white/5 p-5"
            >
              <summary className="cursor-pointer text-sm font-semibold text-white/90 focus:outline-none">
                {q}
              </summary>
              <p className="mt-3 text-sm leading-6 text-white/75">{a}</p>
            </details>
          ))}
        </div>
      </Section>

      <Section id="teklif" title="Teklif Al">
        <p className="mb-4 text-sm text-white/75">
          Aşağıdaki bilgileri yazarsanız en hızlı şekilde net teklif çıkarabiliriz:
        </p>

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

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href="https://wa.me/905555555555"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
            aria-label="WhatsApp ile teklif iste (yeni sekmede açılır)"
          >
            WhatsApp’tan Yaz
          </a>
          <a
            href="mailto:info@sahneva.com"
            className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white/90 transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
          >
            E-posta Gönder
          </a>
        </div>

        <p className="mt-4 text-xs text-white/60">
          Not: WhatsApp ve telefon bilgilerini kendi gerçek numaralarınızla güncelleyin.
        </p>
      </Section>

      <footer className="relative mx-auto w-full max-w-6xl px-4 pb-12 pt-2 text-sm text-white/55">
        <p>
          İlgili hizmetler:{" "}
          <Link className="text-white/75 hover:text-white" href="/led-ekran-kiralama">
            LED Ekran Kiralama
          </Link>{" "}
          •{" "}
          <Link className="text-white/75 hover:text-white" href="/podyum-kiralama">
            Podyum Kiralama
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
