"use client";

import { useEffect } from "react";

// components/NonCriticalStylesheet.jsx
// Loads non-critical polish styles asynchronously to prevent render-blocking.

const HREF = "/css/non-critical.css";
const NON_CRITICAL_ID = "non-critical-css";
let hasInjected = false;

export default function NonCriticalStylesheet() {
  useEffect(() => {
    if (typeof document === "undefined") return;

    // Bail out quickly if we've already injected during this lifecycle or if a
    // matching link already exists (covers SSR/hydration and any other manual
    // insertion of the stylesheet).
    const existingLink =
      hasInjected ||
      document.getElementById(NON_CRITICAL_ID) ||
      document.querySelector(`link[href$="${HREF}"]`);

    if (existingLink) {
      if (process.env.NODE_ENV !== "production") {
        console.warn("non-critical.css is already loaded; skipping duplicate injection");
      }

      hasInjected = true;
      return;
    }

    const link = document.createElement("link");
    link.id = NON_CRITICAL_ID;
    link.rel = "stylesheet";
    link.href = HREF;
    link.media = "print";
    link.dataset.priority = "deferred";

    const enableStylesheet = () => {
      link.media = "all";
      link.dataset.loaded = "true";
    };

    link.addEventListener("load", enableStylesheet, { once: true });

    document.head.appendChild(link);
    hasInjected = true;

    return () => {
      link.removeEventListener("load", enableStylesheet);
    };
  }, []);

  return null;
}
