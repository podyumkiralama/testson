// components/HeroSection.js
import Image from "next/image";
import Link from "next/link";

// Senin sayfandaki mevcut hero görsel importunu buraya taşı
import heroImg from "@/public/img/hero-bg.webp";

export default function HeroSection() {
  return (
    <section
      className="relative overflow-hidden"
      // Görüntüyü değiştirmeden: ilk paint’te arka planı garanti eder
      style={{ backgroundColor: "#000" }}
      aria-label="Sahneva ana tanıtım bölümü"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src={heroImg}
          alt="Sahne, podyum, LED ekran ve ses ışık kiralama hizmetleri"
          fill
          priority
          fetchPriority="high"
          placeholder="blur"
          sizes="(max-width: 480px) 100vw, (max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1200px"
          className="object-cover object-center"
        />
        {/* Overlay (mevcut tasarımın varsa classlarını buraya koy) */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/70" />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="min-h-[76vh] lg:min-h-[82vh] flex items-center py-14 lg:py-20">
          <div className="max-w-3xl text-white">
            <p className="text-sm font-semibold tracking-wide text-white/85">
              Sahneva
            </p>

            <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
              Sahne, Podyum, LED Ekran &amp; Ses Işık Kiralama
            </h1>

            <p className="mt-4 text-base sm:text-lg text-white/90 leading-relaxed">
              Türkiye genelinde sahne, podyum, LED ekran, truss ve ses-ışık
              sistemleri kiralama. Kurulum, test ve söküm dahil hızlı teklif
              alın.
            </p>

            <div className="mt-7 flex flex-col sm:flex-row gap-3">
              <Link
                href="/iletisim"
                className="inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-bold text-white bg-primary hover:opacity-95 focus-ring"
              >
                Hemen Teklif Al
              </Link>

              <Link
                href="/hizmetler"
                className="inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-bold text-white/95 bg-white/10 hover:bg-white/15 backdrop-blur focus-ring"
              >
                Hizmetleri İncele
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
