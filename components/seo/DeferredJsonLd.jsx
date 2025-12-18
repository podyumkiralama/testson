"use client";

import Script from "next/script";

function serializeJsonLd(data) {
  try {
    return JSON.stringify(data).replace(/</g, "\\u003c");
  } catch (error) {
    console.error("JSON-LD serialize error", error);
    return "";
  }
}

export default function DeferredJsonLd({ id, data }) {
  const serialized = serializeJsonLd(data);
  if (!serialized) return null;

  return (
    <Script
      id={id}
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: serialized }}
    />
  );
}
