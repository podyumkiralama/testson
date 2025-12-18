// components/UtilityBar.client.js
"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const UtilityBar = dynamic(() => import("./UtilityBar"), {
  ssr: false,
  loading: () => null,
});

export default function UtilityBarClient() {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (shouldRender) return;

    let idleId = null;
    let timeoutId = null;
    let listenerAttached = false;

    const listenerOpts = { passive: true };
    const activate = () => setShouldRender(true);

    // Daha kontrollü: touchstart kaldırıldı (çok erken tetikliyor)
    const events = ["scroll", "pointerdown", "keydown"];

    const cleanup = () => {
      if (listenerAttached) {
        events.forEach((event) =>
          window.removeEventListener(event, onFirstInteraction, listenerOpts)
        );
        listenerAttached = false;
      }
      if (idleId && "cancelIdleCallback" in window) window.cancelIdleCallback(idleId);
      if (timeoutId) window.clearTimeout(timeoutId);
    };

    function onFirstInteraction() {
      activate();
      cleanup();
    }

    const attachListeners = () => {
      if (listenerAttached) return;
      listenerAttached = true;

      events.forEach((event) =>
        window.addEventListener(event, onFirstInteraction, listenerOpts)
      );

      // Fallback: kullanıcı hiç dokunmasa bile 5sn sonra yükle
      timeoutId = window.setTimeout(() => {
        activate();
        cleanup();
      }, 5000);
    };

    if ("requestIdleCallback" in window) {
      idleId = window.requestIdleCallback(attachListeners, { timeout: 1500 });
    } else {
      timeoutId = window.setTimeout(attachListeners, 150);
    }

    return cleanup;
  }, [shouldRender]);

  return (
    <div
      className="fixed left-4 bottom-6 z-50"
      style={{ width: 56, height: 56 }}
      aria-hidden={!shouldRender}
      {...(!shouldRender ? { inert: "" } : {})}
    >
      {shouldRender ? <UtilityBar /> : null}
    </div>
  );
}
