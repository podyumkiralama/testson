// components/HeroSection.js
import Image from "next/image";
import heroImg from "@/public/img/hero-bg.webp";

// —————————————————————————————————————————
// SABİT VERİLER
// —————————————————————————————————————————

const HERO_IMAGE_ALT =
  "LED ekran, truss çatı ve ışık sistemi içeren Sahneva sahne kurulumunu gösteren arka plan görseli";

const HERO_KEYWORDS = [
  { text: "Sahne Kiralama", gradient: "text-blue-300" },
  { text: "LED Ekran", gradient: "text-purple-300" },
  { text: "Ses-Işık Sistemleri", gradient: "text-cyan-300" },
];

const CTA_BUTTONS = [
  {
    href: "tel:+905453048671",
    label: "Hemen Ara",
    icon: "📞",
  },
  {
    href: "https://wa.me/905453048671?text=Merhaba%2C+web+sitenizden+ula%C5%9F%C4%B1yorum.+Sahne+kiralama+ve+LED+ekran+fiyatlar%C4%B1+hakk%C4%B1nda+detayl%C4%B1+teklif+almak+istiyorum.&utm_source=homepage&utm_medium=hero_cta&utm_campaign=whatsapp",
    label: "WhatsApp Teklif",
    icon: "💬",
    target: "_blank",
    rel: "noopener noreferrer nofollow",
    srHint: "(yeni sekmede açılır)",
    gradient: "from-green-600 to-emerald-700",
  },
];

// —————————————————————————————————————————
// ALT PARÇALAR
// —————————————————————————————————————————

function KeywordPills({ id }) {
  return (
    <ul
      id={id}
      className="flex flex-wrap justify-center gap-2 mt-4 mb-6 max-w-4xl mx-auto"
      aria-label="Öne çıkan hizmet başlıkları"
    >
      {HERO_KEYWORDS.map(({ text, gradient }) => (
        <li key={text} className="list-none">
          <span
            className={`text-sm md:text-base font-semibold px-3 py-1 ${gradient} bg-white/15 rounded-lg border border-white/10`}
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
    <div className="mt-6 flex flex-col sm:flex-row justify-center items-center gap-3">
      {CTA_BUTTONS.map(({ href, label, icon, gradient = "from-blue-600 to-purple-600", ...rest }) => (
        <a
          key={href}
          href={href}
          className={`
            w-full sm:w-auto min-w-[140px] sm:min-w-[180px] min-h-[44px]
            text-center relative text-white font-bold text-sm sm:text-base
            px-4 sm:px-6 py-3 rounded-xl shadow-md hover:shadow-lg
            transition-transform duration-200 hover:scale-105 border border-white/20
            focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black
            bg-gradient-to-r ${gradient}
          `}
          {...rest}
        >
          <span className="flex items-center justify-center gap-2">
            <span aria-hidden="true">{icon}</span> {label}
            {rest.srHint && <span className="sr-only">{rest.srHint}</span>}
          </span>
        </a>
      ))}
    </div>
  );
}

// —————————————————————————————————————————
// ANA HERO BİLEŞEN (SERVER COMPONENT)
// —————————————————————————————————————————

export default function HeroSection() {
  return (
    <section
      className="relative min-h-[65vh] sm:min-h-[75vh] pt-16 flex items-center justify-center overflow-hidden bg-black"
      aria-labelledby="hero-title"
      aria-describedby="hero-description hero-keywords"
    >
      {/* Arka plan - Mobil için daha optimize */}
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src={heroImg}
          alt=""
          fill
          priority
          sizes="(max-width: 768px) 100vw, 100vw"
          quality={30}
          placeholder="blur"
          className="absolute inset-0 h-full w-full object-cover object-center"
          // Mobilde daha hızlı yükleme için decoding async
          decoding="async"
          // Görsel öncelik sırası
          fetchPriority="high"
        />
        {/* Mobilde daha koyu overlay - daha iyi okunabilirlik */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/80" />
      </div>

      {/* İçerik */}
      <div className="relative z-10 w-full px-4 py-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge - Mobilde daha küçük */}
          <p className="inline-flex items-center gap-2 bg-black/60 rounded-full px-3 py-1.5 border border-white/10 text-xs text-slate-100">
            <span
              className="w-1.5 h-1.5 bg-green-400 rounded-full"
              aria-hidden="true"
            />
            Sahneva Organizasyon • Türkiye Geneli
          </p>

          {/* Başlık - Mobilde daha uygun font boyutu */}
          <h1
            id="hero-title"
            className="mt-4 text-white text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-black leading-tight"
          >
            Türkiye genelinde
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-400 block mt-1">
              Sahne &amp; LED Ekran Kiralama
            </span>
          </h1>

          {/* Keyword pill'ler */}
          <KeywordPills id="hero-keywords" />

          {/* Alt açıklama - Mobilde daha kısa */}
          <p
            id="hero-description"
            className="text-slate-100 text-sm sm:text-base md:text-lg mt-2 sm:mt-4 max-w-xl mx-auto px-2"
          >
            500+ başarılı proje, %98 müşteri memnuniyeti ile Türkiye geneli hızlı kurulum.
          </p>

          {/* CTA'lar */}
          <CTAGroup />
        </div>
      </div>

      {/* Scroll cue - Sadece masaüstünde göster, mobilde gizle */}
      <div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden sm:block"
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
