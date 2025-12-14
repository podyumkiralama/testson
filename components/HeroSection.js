// components/HeroSection.js
import Image from "next/image";

// ——————————————————————————————
// SABİTLER
// ——————————————————————————————

const HERO_IMAGE_ALT =
  "LED ekran, truss çatı ve ışık sistemi içeren Sahneva sahne kurulumunu gösteren etkinlik alanı";

const HERO_KEYWORDS = [
  { text: "Sahne Kiralama", gradient: "text-blue-300" },
  { text: "LED Ekran", gradient: "text-purple-300" },
  { text: "Ses & Işık Sistemleri", gradient: "text-cyan-300" },
];

const CTA_BUTTONS = [
  {
    href: "tel:+905453048671",
    label: "Hemen Ara",
    icon: "📞",
  },
  {
    href: "https://wa.me/905453048671?text=Merhaba%2C+web+sitenizden+ula%C5%9F%C4%B1yorum.",
    label: "WhatsApp Teklif",
    icon: "💬",
    target: "_blank",
    rel: "noopener noreferrer nofollow",
    ariaLabel:
      "WhatsApp üzerinden teklif isteyin (bağlantı yeni sekmede açılır)",
    gradient: "from-green-600 to-emerald-700",
  },
];

const CTA_BASE =
  "w-full sm:w-auto min-w-[180px] min-h-[44px] relative font-bold text-white px-6 py-3 rounded-xl border border-white/20 shadow-md hover:shadow-lg transition-transform hover:scale-105 focus-ring";

const CTA_OVERLAY =
  "absolute inset-0 rounded-xl bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity";

// ——————————————————————————————
// ALT BİLEŞENLER
// ——————————————————————————————

function KeywordPills({ id }) {
  return (
    <ul
      id={id}
      className="flex flex-wrap justify-center gap-2 mt-4 mb-6"
      aria-label="Öne çıkan hizmetler"
    >
      {HERO_KEYWORDS.map(({ text, gradient }) => (
        <li key={text}>
          <span
            className={`px-3 py-1 text-sm md:text-base font-semibold rounded-lg bg-white/15 border border-white/10 ${gradient}`}
          >
            {text}
          </span>
        </li>
      ))}
    </ul>
  );
}

function CTAGroup() {
  return (
    <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
      {CTA_BUTTONS.map(
        ({ href, label, icon, gradient = "from-blue-600 to-purple-600", ariaLabel, ...rest }) => (
          <a
            key={href}
            href={href}
            aria-label={ariaLabel || label}
            className={`${CTA_BASE} bg-gradient-to-r ${gradient} group`}
            {...rest}
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              <span aria-hidden="true">{icon}</span>
              {label}
            </span>
            <span className={CTA_OVERLAY} aria-hidden="true" />
          </a>
        )
      )}
    </div>
  );
}

// ——————————————————————————————
// HERO BACKGROUND (BLUR YOK)
// ——————————————————————————————

function HeroBackgroundImage({ ariaHidden = false }) {
  return (
    <>
      {/* Mobile */}
      <Image
        src="/img/hero-bg-mobile.webp"
        alt={ariaHidden ? "" : HERO_IMAGE_ALT}
        fill
        priority
        fetchPriority="high"
        sizes="100vw"
        quality={70}
        media="(max-width: 767px)"
        className="absolute inset-0 object-cover md:hidden"
        aria-hidden={ariaHidden}
      />

      {/* Desktop */}
      <Image
        src="/img/hero-bg-desktop.webp"
        alt={ariaHidden ? "" : HERO_IMAGE_ALT}
        fill
        priority
        fetchPriority="high"
        sizes="100vw"
        quality={70}
        media="(min-width: 768px)"
        className="absolute inset-0 object-cover hidden md:block"
        aria-hidden={ariaHidden}
      />
    </>
  );
}

// ——————————————————————————————
// ANA HERO
// ——————————————————————————————

export default function HeroSection() {
  return (
    <section
      className="relative min-h-[75vh] pt-16 lg:pt-20 flex items-center justify-center overflow-hidden bg-black"
      aria-labelledby="hero-title"
      aria-describedby="hero-description hero-keywords"
    >
      {/* Arka plan */}
      <div className="absolute inset-0" aria-hidden="true">
        <HeroBackgroundImage ariaHidden />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/70" />
      </div>

      {/* İçerik */}
      <div className="relative z-10 container py-10 text-center">
        <p className="inline-flex items-center gap-2 bg-black/50 px-4 py-2 rounded-full border border-white/10 text-xs md:text-sm text-white">
          <span className="w-2 h-2 bg-green-400 rounded-full" />
          Sahneva Organizasyon • Türkiye Geneli
        </p>

        <h1
          id="hero-title"
          className="mt-4 text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight"
        >
          Türkiye genelinde
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-400">
            Sahne & LED Ekran Kiralama
          </span>
        </h1>

        <KeywordPills id="hero-keywords" />

        <p
          id="hero-description"
          className="mt-3 text-sm md:text-lg text-slate-100 max-w-xl mx-auto"
        >
          500+ başarılı proje, %98 müşteri memnuniyeti ve hızlı kurulum ile
          etkinliğinizde yanınızdayız.
        </p>

        <CTAGroup />
      </div>

      {/* Scroll cue – sadece desktop */}
      <div
        className="hidden md:block absolute bottom-6 left-1/2 -translate-x-1/2"
        aria-hidden="true"
      >
        <div className="animate-bounce motion-reduce:animate-none">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2" />
          </div>
        </div>
      </div>
    </section>
  );
}
