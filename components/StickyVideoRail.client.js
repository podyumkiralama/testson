// components/StickyVideoRail.client.js
"use client";

import { useEffect, useState } from "react";

import StickyVideoRailLazy from "./StickyVideoRail";

export default function StickyVideoRailClient() {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || shouldRender) return;

    const scheduleRender = () => setShouldRender(true);

    // Tarayıcı boşta kalınca yükle (tercih edilen)
    if ("requestIdleCallback" in window) {
      const idleId = window.requestIdleCallback(scheduleRender, {
        timeout: 2000,
      });
      return () => {
        if ("cancelIdleCallback" in window) {
          window.cancelIdleCallback(idleId);
        }
      };
    }

    // Eski tarayıcılar için fallback: hafif gecikme
    const timerId = window.setTimeout(scheduleRender, 2000);
    return () => window.clearTimeout(timerId);
  }, [shouldRender]);

  // Henüz yükleme → hiç gösterme
  if (!shouldRender) return null;

  // Artık sticky video rail’i yükle
  return <StickyVideoRailLazy />;
}
