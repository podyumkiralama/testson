"use client";

import { useEffect } from "react";

// components/NonCriticalStylesheet.jsx
// Loads non-critical polish styles asynchronously to prevent render-blocking.

const HREF = "/css/non-critical.css";

export default function NonCriticalStylesheet() {
  useEffect(() => {
    if (typeof document === "undefined") return;

    const existingLink = document.getElementById("non-critical-css");
    if (existingLink) {
      if (process.env.NODE_ENV !== "production") {
        // Helps surface accidental duplicate renders in development.
        console.warn("non-critical.css is already loaded; skipping duplicate injection");
      }
      return;
    }

    const link = document.createElement("link");
    link.id = "non-critical-css";
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

    return () => {
      link.removeEventListener("load", enableStylesheet);
    };
  }, []);

  return null;
}
