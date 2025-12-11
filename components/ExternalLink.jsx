/**
 * Erişilebilir dış bağlantı bileşeni
 * - target="_blank" ise: rel güvenliği + “yeni sekmede açılır” uyarısını aria-label üzerine ekler
 * - aria-label yoksa, görünür metni baz alarak erişilebilir adı otomatik üretir
 * - clsx/extra bağımlılık YOK
 */
export default function ExternalLink({
  href,
  children,
  className = "",
  title,
  target = "_blank",
  rel,
  ariaLabel,
  ...rest
}) {
  const isNewTab = target === "_blank";

  const isWhatsappLink = (url) =>
    url.hostname === "wa.me" || url.hostname.endsWith("whatsapp.com");

  // Metni string’e çevir (sadece düz string ise)
  const visibleText =
    typeof children === "string" ? children.trim() : "";

  const hasNewTabHint = (text = "") =>
    /(yeni sekmede açılır|opens in a new tab|علامة تبويب جديدة)/i.test(text);

  // 1) ARIA LABEL
  const baseAriaLabel = ariaLabel?.trim() || (visibleText || undefined);
  const computedAriaLabel = isNewTab
    ? baseAriaLabel
      ? hasNewTabHint(baseAriaLabel)
        ? baseAriaLabel
        : `${baseAriaLabel} – yeni sekmede açılır`
      : "Yeni sekmede açılır"
    : baseAriaLabel;

  // 2) REL güvenliği + nofollow (isteğe bağlı)
  let computedRel = rel || "";
  if (isNewTab) {
    const relParts = new Set(
      computedRel
        .split(" ")
        .map((p) => p.trim())
        .filter(Boolean)
    );
    relParts.add("noopener");
    relParts.add("noreferrer");

    // Harici link ise nofollow ekle
    try {
      const url = new URL(href, typeof window !== "undefined" ? window.location.href : undefined);
      const shouldAddNofollow =
        typeof window !== "undefined" &&
        url.origin !== window.location.origin &&
        !isWhatsappLink(url);

      if (shouldAddNofollow) {
        relParts.add("nofollow");
      }
    } catch {
      // Hata olursa zorlamadan bırak
    }

    computedRel = Array.from(relParts).join(" ");
  }

  return (
    <a
      href={href}
      target={target}
      rel={computedRel || undefined}
      title={title}
      aria-label={computedAriaLabel}
      className={className}
      data-external-link="true"
      {...rest}
    >
      {/* Görünür içerik */}
      {children}
    </a>
  );
}
