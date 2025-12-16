export function normalizeBaseUrl(url) {
  return String(url || "").replace(/\/$/, "");
}

export function buildBreadcrumbList({ baseUrl, items }) {
  const normalizedBase = normalizeBaseUrl(baseUrl);

  const normalizedItems = (items || [])
    .filter((it) => it && it.name && it.url) // ✅ boş item engelle
    .map((it) => {
      const rawUrl = String(it.url || "");
      const isAbsolute = /^https?:\/\//i.test(rawUrl);

      const absUrl = isAbsolute
        ? rawUrl
        : `${normalizedBase}/${rawUrl.replace(/^\//, "")}`;

      return { name: it.name, url: absUrl };
    });

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: normalizedItems.map((it, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: it.name,
      item: it.url,
    })),
  };
}
