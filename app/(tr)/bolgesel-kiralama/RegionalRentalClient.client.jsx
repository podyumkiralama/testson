"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

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
        "transition-transform duration-300 hover:-translate-y-1 hover:bg-white/[0.045] " +
        className
      }
    >
      {children}
    </div>
  );
}

function usePrefersReducedMotion() {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    const m = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!m) return;
    const onChange = () => setReduce(!!m.matches);
    onChange();
    m.addEventListener?.("change", onChange);
    return () => m.removeEventListener?.("change", onChange);
  }, []);
  return reduce;
}

function Reveal({ children }) {
  const reduce = usePrefersReducedMotion();
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (reduce) {
      setShown(true);
      return;
    }
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.12 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [reduce]);

  return (
    <div
      ref={ref}
      className={
        "transition-all duration-700 will-change-transform " +
        (shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4")
      }
    >
      {children}
    </div>
  );
}

function ImgFrame({ src, alt, priority = false }) {
  return (
    <SoftCard className="overflow-hidden">
      <div className="relative aspect-[21/10] w-full">
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, 560px"
          className="object-cover transition-transform duration-500 will-change-transform hover:scale-[1.03]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
      </div>
    </SoftCard>
  );
}

function CityCard({ name, desc, href, imgSrc }) {
  return (
    <SoftCard className="p-5 sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-base font-semibold text-white">{name}</h3>
          <p className="mt-2 text-sm text-white/70">{desc}</p>
        </div>
        <span className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/80">
          ↗
        </span>
      </div>

      <div className="mt-4">
        <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
          <Image
            src={imgSrc}
            alt={`${name} bölgesel kiralama görseli`}
            fill
            sizes="(max-width: 768px) 100vw, 400px"
            className="object-cover opacity-90"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
        </div>
      </div>

      <Link
        href={href}
        className="mt-4 inline-flex w-full items-center justify-center rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-semibold text-white hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
        aria-label={`${name} için teklif almak üzere iletişime git`}
      >
        {name} için Teklif Al
      </Link>
    </SoftCard>
  );
}

function FaqItem({ q, a }) {
  return (
    <details className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-colors hover:bg-white/[0.045]">
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

export default function RegionalRentalClient({ regions, services, faqs }) {
  const CTA_BRIEF = "/iletisim";
  const CTA_WHATSAPP = "https://wa.me/905453048671";

  const IMG_DIR = "/img/bolgesel-kiralama";

  const cityImages = useMemo(() => {
    // Aynı görsel seti yoksa bile sayfa patlamasın diye güvenli map
    const map = {};
    regions.forEach((r) => {
      map[r.slug] = `${IMG_DIR}/${r.slug}.webp`;
    });
    return map;
  }, [regions]);

  return (
    <>
      <GlowBg />

      {/* HERO */}
      <section className="mx-auto max-w-6xl px-4 pb-10 pt-16 sm:pb-14 sm:pt-20">
        <div className="grid items-center gap-8 lg:grid-cols-[1fr_520px]">
          <div className="flex flex-col gap-6">
            <div className="flex flex-wrap items-center gap-3">
              <Badge>Türkiye geneli</Badge>
              <Badge>Kurulum + operasyon</Badge>
              <Badge>Hızlı teklif</Badge>
            </div>

            <div>
              <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-5xl">
                Bölgesel Kiralama
              </h1>
              <p className="mt-3 text-base text-white/70 sm:text-lg">
                Bulunduğunuz şehre göre planlayalım: LED ekran, truss, sahne/podyum ve ses-ışık.
              </p>
            </div>

            <p className="max-w-3xl text-sm leading-relaxed text-white/75 sm:text-base">
              Şehrinizi seçin, kısa bir brief bırakın. Ekibimiz ihtiyaçları netleştirip kurulum takvimini planlasın.
              Süreci uçtan uca yönetiriz.
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

            <div className="flex flex-wrap gap-2 text-xs text-white/60">
              <span>Hizmetler:</span>
              {services.slice(0, 4).map((s, i) => (
                <span key={s.href} className="flex items-center gap-2">
                  <Link
                    href={s.href}
                    className="font-semibold text-white underline decoration-white/30 underline-offset-4 hover:decoration-white/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 rounded"
                  >
                    {s.title.replace(" Kiralama", "")}
                  </Link>
                  {i < 3 ? <span aria-hidden="true">•</span> : null}
                </span>
              ))}
            </div>
          </div>

          <div className="lg:justify-self-end">
            <Reveal>
              <ImgFrame
                src={`${IMG_DIR}/hero.webp`}
                alt="Sahneva bölgesel kiralama: ekip, planlama ve operasyon"
                priority
              />
              <p className="mt-3 text-xs text-white/60">
                Not: Operasyon ve ekip odağı — ekranda/screen görünmez.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* HİZMET KATALOĞU */}
      <section className="mx-auto max-w-6xl px-4 pb-10">
        <Reveal>
          <div className="grid gap-4 lg:grid-cols-3">
            <SoftCard className="p-6">
              <h2 className="text-base font-semibold text-white">Hızlı Hizmet Seçimi</h2>
              <p className="mt-2 text-sm text-white/70">
                Tek bir projede birden fazla hizmeti paketleyebiliriz.
              </p>

              <div className="mt-4 grid gap-2 text-sm">
                {services.map((s) => (
                  <Link
                    key={s.href}
                    href={s.href}
                    className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 font-semibold text-white/85 hover:bg-white/[0.06] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                  >
                    {s.title}
                  </Link>
                ))}
              </div>
            </SoftCard>

            <SoftCard className="p-6 lg:col-span-2">
              <h2 className="text-base font-semibold text-white">Nasıl ilerliyor?</h2>
              <ul className="mt-3 grid gap-2 text-sm text-white/75 sm:grid-cols-2">
                <li>• Brief / ihtiyaç → teklif</li>
                <li>• Keşif (gerekiyorsa)</li>
                <li>• Kurulum + test</li>
                <li>• Etkinlik günü operasyon</li>
                <li>• Söküm + temiz teslim</li>
                <li>• Tek ekip, tek koordinasyon</li>
              </ul>

              <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <p className="text-sm text-white/75">
                  Kurulum sahasında güvenlik ve akış kontrolü için teknik ekip sahada olur. Proje büyüklüğüne göre
                  kurulum 24–48 saat önceden planlanabilir.
                </p>
              </div>
            </SoftCard>
          </div>
        </Reveal>
      </section>

      {/* BÖLGELER */}
      <section className="mx-auto max-w-6xl px-4 pb-14" aria-label="Bölgelere göre kiralama">
        <h2 className="text-2xl font-semibold text-white">Şehrinizi Seçin</h2>
        <p className="mt-2 max-w-3xl text-sm text-white/70">
          Bölgeye göre ekip planlaması, ulaşım ve kurulum takvimi netleşir. Teklif için şehrinizi seçin.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {regions.map((r) => (
            <Reveal key={r.slug}>
              <CityCard
                name={r.name}
                desc={r.desc}
                imgSrc={cityImages[r.slug]}
                href={`/iletisim?konu=bolgesel-kiralama&sehir=${encodeURIComponent(r.name)}`}
              />
            </Reveal>
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

        <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <h3 className="text-base font-semibold text-white">Hızlı teklif</h3>
          <p className="mt-2 text-sm text-white/70">
            Tarih + şehir + etkinlik türü + ihtiyaç listesi paylaşmanız yeterli. Ekibimiz hızlıca dönüş yapar.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/iletisim"
              className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black hover:bg-white/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
            >
              Brief Bırak
            </Link>
            <a
              href={CTA_WHATSAPP}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
              aria-label="WhatsApp üzerinden yaz (yeni sekmede açılır)"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
