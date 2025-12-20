// components/DeferredSections.client.jsx
"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

// Navbar hâlihazırda anında render ediliyor. Eski deferred referanslarını bozmayacak
// şekilde fallback sağlamak için eşlenik bir wrapper export ediyoruz.
import Navbar from "./Navbar";

export function NavbarDeferred(props) {
  return <Navbar {...props} />;
}

// Dinamik componentler
const ServicesTabs = dynamic(() => import("./ServicesTabs"), { ssr: false });
const ProjectsGallery = dynamic(() => import("./ProjectsGallery"), { ssr: false });
const Faq = dynamic(() => import("./Faq"), { ssr: false });

const CorporateEvents = dynamic(() => import("./CorporateEvents"), { ssr: false });
const CorporateIntro = dynamic(() => import("./CorporateIntro"), { ssr: false });
const TechCapabilities = dynamic(() => import("./TechCapabilities"), { ssr: false });
const WhyChooseUs = dynamic(() => import("./WhyChooseUs"), { ssr: false });

// Lazy-load görünürlük hook'u
function useDeferredVisible({ rootMargin, threshold, idleTimeout }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (visible) return;

    const el = ref.current;
    if (!el || typeof window === "undefined") return;

    let idleHandle = null;
    let timeoutHandle = null;

    const prefersReduce =
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;

    if (prefersReduce || !("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }

    if (idleTimeout) {
      if (typeof window.requestIdleCallback === "function") {
        idleHandle = window.requestIdleCallback(
          () => setVisible(true),
          { timeout: idleTimeout }
        );
      } else {
        timeoutHandle = window.setTimeout(() => setVisible(true), idleTimeout);
      }
    }

    const observer = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        setVisible(true);
        observer.disconnect();
      }
    }, { rootMargin, threshold });

    observer.observe(el);
    return () => {
      observer.disconnect();
      if (idleHandle && typeof window.cancelIdleCallback === "function") {
        window.cancelIdleCallback(idleHandle);
      }
      if (timeoutHandle) {
        window.clearTimeout(timeoutHandle);
      }
    };
  }, [visible, rootMargin, threshold, idleTimeout]);

  return [ref, visible];
}

/* ───────────────── ServicesTabs (temiz wrapper) ───────────────── */

export function ServicesTabsDeferred({
  rootMargin = "140px 0px",
  threshold = 0.12,
  idleTimeout = 2600,
  ...props
}) {
  const [ref, visible] = useDeferredVisible({ rootMargin, threshold, idleTimeout });

  return (
    <div ref={ref} className="w-full min-w-0">
      {visible ? (
        <ServicesTabs {...props} />
      ) : (
        <div
          className="nc-DeferredSections-wrapper w-full"
          style={{ "--nc-min-h": "400px" }}
          aria-hidden="true"
        />
      )}
    </div>
  );
}

/* ───────────────── ProjectsGallery (temiz wrapper) ───────────────── */

export function ProjectsGalleryDeferred({
  rootMargin = "220px 0px",
  threshold = 0.08,
  idleTimeout = 3400,
  ...props
}) {
  const [ref, visible] = useDeferredVisible({ rootMargin, threshold, idleTimeout });

  return (
    <div ref={ref} className="w-full min-w-0">
      {visible ? (
        <ProjectsGallery {...props} />
      ) : (
        <div
          className="nc-DeferredSections-wrapper w-full"
          style={{ "--nc-min-h": "320px" }}
          aria-hidden="true"
        />
      )}
    </div>
  );
}

/* ───────────────── FAQ (temiz wrapper) ───────────────── */

export function FaqDeferred({
  rootMargin = "140px 0px",
  threshold = 0.12,
  idleTimeout = 3600,
  ...props
}) {
  const [ref, visible] = useDeferredVisible({ rootMargin, threshold, idleTimeout });

  return (
    <div ref={ref} className="w-full min-w-0">
      {visible ? (
        <Faq {...props} />
      ) : (
        <div
          className="nc-DeferredSections-wrapper nc-DeferredSections-clip w-full"
          style={{ "--nc-min-h": "780px" }}
          aria-hidden="true"
        />
      )}
    </div>
  );
}

/* ───────────────── Corporate Events (temiz wrapper) ───────────────── */

export function CorporateEventsDeferred({
  rootMargin = "160px 0px",
  threshold = 0.12,
  idleTimeout = 2600,
  ...props
}) {
  const [ref, visible] = useDeferredVisible({ rootMargin, threshold, idleTimeout });

  return (
    <div ref={ref} className="w-full min-w-0">
      {visible ? (
        <CorporateEvents {...props} />
      ) : (
        <div
          className="nc-DeferredSections-wrapper w-full"
          style={{ "--nc-min-h": "320px" }}
          aria-hidden="true"
        />
      )}
    </div>
  );
}

/* ───────────────── Corporate Intro (temiz wrapper) ───────────────── */

export function CorporateIntroDeferred({
  rootMargin = "160px 0px",
  threshold = 0.12,
  idleTimeout = 3200,
  ...props
}) {
  const [ref, visible] = useDeferredVisible({ rootMargin, threshold, idleTimeout });

  return (
    <div ref={ref} className="w-full min-w-0">
      {visible ? (
        <CorporateIntro {...props} />
      ) : (
        <div
          className="nc-DeferredSections-wrapper w-full"
          style={{ "--nc-min-h": "240px" }}
          aria-hidden="true"
        />
      )}
    </div>
  );
}

/* ───────────────── Tech Capabilities (temiz wrapper) ───────────────── */

export function TechCapabilitiesDeferred({
  rootMargin = "160px 0px",
  threshold = 0.12,
  idleTimeout = 3200,
  ...props
}) {
  const [ref, visible] = useDeferredVisible({ rootMargin, threshold, idleTimeout });

  return (
    <div ref={ref} className="w-full min-w-0">
      {visible ? (
        <TechCapabilities {...props} />
      ) : (
        <div
          className="nc-DeferredSections-wrapper w-full"
          style={{ "--nc-min-h": "360px" }}
          aria-hidden="true"
        />
      )}
    </div>
  );
}

/* ───────────────── Why Choose Us (temiz wrapper) ───────────────── */

export function WhyChooseUsDeferred({
  rootMargin = "160px 0px",
  threshold = 0.12,
  idleTimeout = 3200,
  ...props
}) {
  const [ref, visible] = useDeferredVisible({ rootMargin, threshold, idleTimeout });

  return (
    <div ref={ref} className="w-full min-w-0">
      {visible ? (
        <WhyChooseUs {...props} />
      ) : (
        <div
          className="nc-DeferredSections-wrapper w-full"
          style={{ "--nc-min-h": "320px" }}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
