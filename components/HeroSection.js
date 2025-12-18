// components/HeroSection.js
"use client";

import { FOCUS_RING_CLASS } from "@/lib/ui/focusRing";

const MOTION_SAFE =
  "motion-reduce:transition-none motion-reduce:transform-none motion-reduce:animate-none";

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
    ariaLabel: "Hemen Ara — 0 545 304 86 71 numaralı telefonu arayın",
    gradient: "from-blue-600 to-purple-600",
  },
  {
    href: "https://wa.me/905453048671",
    label: "WhatsApp Teklif",
    icon: "💬",
    target: "_blank",
    rel: "noopener noreferrer nofollow",
    ariaLabel:
      "WhatsApp Teklif — WhatsApp üzerinden teklif isteyin (yeni sekmede açılır)",
    gradient: "from-green-600 to-emerald-700",
  },
];

function HeroBackgroundImage() {
  return (
    <picture aria-hidden="true">
      <source
        media="(max-width: 768px)"
        srcSet="/img/hero-bg-mobile.webp"
        type="image/webp"
      />
      <source srcSet="/img/hero-bg.webp" type="image/webp" />
      <img
        src="/img/hero-bg.webp"
        alt=""
        loading="eager"
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
    </picture>
  );
}

export default function HeroSection() {
  return (
    <section
      className="
        relative
        min-h-[calc(100svh-64px)]
        lg:min-h-[calc(100svh-80px)]
        pt-16 lg:pt-20
        flex items-center justify-center
        overflow-hidden
        bg-black
      "
      aria-labelledby="hero-title"
      aria-describedby="hero-description hero-keywords"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <HeroBackgroundImage />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/45 to-black/75" />
      </div>

      {/* Content */}
      <div className="relative z-10 container py-10 sm:py-12">
        <div className="max-w-3xl mx-auto text-center px-4 sm:px-0">
          {/* Badge */}
          <p className="inline-flex items-center gap-2 rounded-full bg-black/50 px-4 py-2 text-xs sm:text-sm text-slate-100 border border-white/10 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-green-400" aria-hidden />
            Sahneva Organizasyon • Türkiye Geneli
          </p>

          {/* Title */}
          <h1
            id="hero-title"
            className="
              mt-4
              text-white
              text-3xl sm:text-4xl md:text-5xl lg:text-6xl
              font-black
              leading-tight
              [text-wrap:balance]
            "
          >
            Türkiye genelinde
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-400 pb-2">
              Sahne &amp; LED Ekran Kiralama
            </span>
          </h1>

          {/* Keywords */}
          <ul
            id="hero-keywords"
            className="mt-4 mb-5 flex flex-wrap justify-center gap-2"
            aria-label="Öne çıkan hizmetler"
          >
            {HERO_KEYWORDS.map((k) => (
              <li key={k.text}>
                <span
                  className={`px-3 py-1 rounded-lg bg-white/15 border border-white/10 text-sm md:text-base font-semibold ${k.gradient}`}
                >
                  {k.text}
                </span>
              </li>
            ))}
          </ul>

          {/* Description */}
          <p
            id="hero-description"
            className="mx-auto mt-2 max-w-xl text-sm sm:text-base md:text-lg text-slate-100"
          >
            500+ başarılı proje, %98 müşteri memnuniyeti ve Türkiye geneli hızlı
            kurulum ile etkinliğinizde yanınızdayız.
          </p>

          {/* CTA */}
          <div className="mt-6 flex flex-col sm:flex-row justify-center gap-3">
            {CTA_BUTTONS.map((cta) => (
              <a
                key={cta.label}
                href={cta.href}
                target={cta.target}
                rel={cta.rel}
                aria-label={cta.ariaLabel}
                className={`
                  min-h-[44px] min-w-[180px]
                  rounded-xl
                  px-6 py-3
                  font-bold text-white
                  bg-gradient-to-r ${cta.gradient}
                  shadow-md hover:shadow-lg
                  transition-transform duration-200
                  hover:scale-105
                  ${FOCUS_RING_CLASS}
                  ${MOTION_SAFE}
                `}
              >
                <span className="flex items-center justify-center gap-2">
                  <span aria-hidden>{cta.icon}</span>
                  {cta.label}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
