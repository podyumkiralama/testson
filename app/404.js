import Link from "next/link";

export const metadata = {
  title: "Sayfa bulunamadı",
};

export default function NotFound() {
  const helpfulLinks = [
    {
      href: "/",
      title: "Ana sayfa",
      description: "En çok ziyaret edilen içeriklerimize ve güncel duyurulara hızlıca dönün.",
    },
    {
      href: "/hizmetler",
      title: "Hizmetler",
      description: "Ses, ışık, sahne ve kurumsal etkinlik çözümlerimizi inceleyin.",
    },
    {
      href: "/blog",
      title: "Blog",
      description: "Etkinlik yönetimi için ipuçları ve ilham verici başarı hikayelerini keşfedin.",
    },
    {
      href: "/iletisim",
      title: "İletişim",
      description: "Ekibimize ulaşın, teklif alın veya size en yakın lokasyonu öğrenin.",
    },
  ];

  return (
    <div className="min-h-[60vh] container mx-auto px-4 py-16">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold">Sayfa bulunamadı</h1>
        <p className="mt-4 text-neutral-600">
          Aradığınız sayfa taşınmış veya hiç var olmamış olabilir. Aşağıdaki
          bağlantılardan sık kullanılan sayfalarımıza gidebilir ya da ana sayfaya
          dönebilirsiniz.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center mt-8 rounded-xl px-5 py-3 font-semibold bg-violet-700 text-white hover:bg-violet-800 focus-ring"
        >
          Ana sayfaya dön
        </Link>
      </div>

      <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {helpfulLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="block rounded-xl border border-neutral-200 bg-white/70 p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus-ring"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold text-neutral-900">
                  {link.title}
                </h2>
                <p className="mt-2 text-sm text-neutral-600">{link.description}</p>
              </div>
              <span aria-hidden className="text-xl text-violet-700">→</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
