// components/HeroSection.js
import Image from "next/image";
import heroImg from "@/public/img/hero-bg.webp";

// *******************************************************************
// NOT: Maksimum LCP ve FCP performansı için font optimizasyonu,
// bu bileşenden bağımsız olarak, next/font modülü kullanılarak
// (örneğin layout.js dosyasında) uygulanmalıdır. Bu, font CSS'inin
// otomatik olarak satır içine alınmasını (inlining) ve ağ gidiş-dönüş
// süresinin ortadan kaldırılmasını sağlar (Bkz: Uzman Raporu 4.1).
// *******************************************************************

// —————————————————————————————————————————
// SABİT VERİLER (SADECE HERO İÇİN)
// —————————————————————————————————————————

const HERO_IMAGE_ALT =
  "LED ekran, truss çatı ve ışık sistemi içeren Sahneva sahne kurulumunu gösteren arka plan görseli";

const HERO_KEYWORDS =;

const CTA_BUTTONS =;

const CTA_BASE_CLASS =
  "w-full sm:w-auto min-w-[180px] min-h-[44px] text-center group relative text-white font-bold text-base px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-transform duration-200 hover:scale-105 border border-white/20 focus-ring";

const CTA_OVERLAY_CLASS =
  "absolute inset-0 rounded-xl bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200";

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

function CTAButton({
  href,
  label,
  icon,
  gradient = "from-blue-600 to-purple-600",
  srHint,
  ariaLabel,
 ...rest
}) {
  return (
    <a
      href={href}
      className={`${CTA_BASE_CLASS} bg-gradient-to-r ${gradient}`}
      aria-label={ariaLabel |

| (srHint? `${label} ${srHint}` : label)}
      {...rest}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        <span aria-hidden="true">{icon}</span> {label}
        {srHint? <span className="sr-only">{srHint}</span> : null}
      </span>
      <div className={CTA_OVERLAY_CLASS} aria-hidden="true" />
    </a>
  );
}

function CTAGroup() {
  return (
    <div className="mt-6 flex flex-col sm:flex-row justify-center items-center gap-3">
      {CTA_BUTTONS.map(({ srHint, gradient, ariaLabel,...cta }) => (
        <CTAButton
          key={cta.href}
          gradient={gradient}
          srHint={srHint}
          ariaLabel={ariaLabel}
          {...cta}
        />
      ))}
    </div>
  );
}

// LCP GÖRSELİ İÇİN MAKSİMUM HIZ OPTİMİZASYONU
function HeroBackgroundImage({ alt = HERO_IMAGE_ALT, ariaHidden = false }) {
  return (
    <Image
      src={heroImg}
      alt={ariaHidden? "" : alt}
      fill
      // LCP için 3 Yönlü Önceliklendirme
      priority // 1. Kaynağın önceden yüklenmesini (preload) sağlar
      loading="eager" // 2. Tembel yüklemeyi kesin olarak devre dışı bırakır
      fetchPriority="high" // 3. Ağ trafiğinde en yüksek önceliği verir [1]
      
      // Mobil Bant Genişliği Tasarrufu ve LCP Optimizasyonu
      sizes="(max-width: 768px) 100vw, 50vw" // Mobil için 100vw, daha büyük cihazlar için daha küçük kaynak talep eder [2]
      
      quality={45} // Orijinal kalite ayarı korunmuştur
      placeholder="blur" // CLS'yi önlemek ve algılanan hızı artırmak için
      className="absolute inset-0 h-full w-full object-cover object-center"
      aria-hidden={ariaHidden}
    />
  );
}

// —————————————————————————————————————————
// ANA HERO BİLEŞEN (SERVER COMPONENT)
// —————————————————————————————————————————

export default function HeroSection() {
  return (
    <section
      className="relative min-h-[75vh] pt-16 lg:pt-20 flex items-center justify-center overflow-hidden bg-black"
      aria-labelledby="hero-title"
      aria-describedby="hero-description hero-keywords"
    >
      {/* Arka plan görseli */}
      <div className="absolute inset-0" aria-hidden="true">
        <HeroBackgroundImage ariaHidden />
        {/* Tek, hafif overlay – fazla koyulaştırmadan okunabilirlik sağlar */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/70" />
      </div>

      {/* İçerik */}
      <div className="relative z-10 container py-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <p className="inline-flex items-center gap-3 bg-black/50 rounded-full px-4 py-2 border border-white/10 text-xs md:text-sm text-slate-100">
            <span
              className="w-2 h-2 bg-green-400 rounded-full"
              aria-hidden="true"
            />
            Sahneva Organizasyon • Türkiye Geneli Profesyonel Hizmet
          </p>

          {/* Başlık (LCP Metin Adayı) */}
          <h1
            id="hero-title"
            className="mt-4 text-white text-3xl md:text-5xl lg:text-6xl font-black leading-tight"
          >
            Türkiye genelinde
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-400 block">
              Sahne &amp; LED Ekran Kiralama
            </span>
          </h1>

          {/* Keyword pill’ler */}
          <KeywordPills id="hero-keywords" />

          {/* Alt açıklama */}
          <p
            id="hero-description"
            className="text-slate-100 text-sm md:text-lg mt-2 md:mt-4 max-w-xl mx-auto"
          >
            500+ başarılı proje, %98 müşteri memnuniyeti ve Türkiye geneli hızlı
            kurulum ile etkinliğinizde yanınızdayız.
          </p>

          {/* CTA’lar */}
          <CTAGroup />
        </div>
      </div>

      {/* Scroll cue (CLS ve Erişilebilirlik Optimizasyonu) */}
      <div
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
        aria-hidden="true"
      >
        <div className="animate-bounce motion-reduce:hidden"> {/* Hareket hassasiyeti olanlar için gizle (motion-reduce:hidden) */}
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2" />
          </div>
        </div>
      </div>
    </section>
  );
}
