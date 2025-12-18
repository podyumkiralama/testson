export default function Head() {
  return (
    <>
      <link
        rel="preload"
        as="image"
        href="/img/hero-bg-mobile.webp"
        imageSrcSet="/img/hero-bg-mobile.webp"
        media="(max-width: 768px)"
        type="image/webp"
      />
      <link
        rel="preload"
        as="image"
        href="/img/hero-bg.webp"
        imageSrcSet="/img/hero-bg.webp"
        media="(min-width: 769px)"
        type="image/webp"
      />
    </>
  );
}
