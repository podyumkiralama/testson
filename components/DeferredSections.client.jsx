// components/DeferredSections.client.jsx
"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

// Dinamik componentler
const ServicesTabs = dynamic(() => import("./ServicesTabs"), { ssr: false });
const ProjectsGallery = dynamic(() => import("./ProjectsGallery"), {
  ssr: false,
});
const Faq = dynamic(() => import("./Faq"), { ssr: false });
const Navbar = dynamic(() => import("./Navbar"), { ssr: false });
const CorporateEvents = dynamic(() => import("./CorporateEvents"), {
  ssr: false,
});
const CorporateIntro = dynamic(() => import("./CorporateIntro"), {
  ssr: false,
});
const TechCapabilities = dynamic(() => import("./TechCapabilities"), {
  ssr: false,
});
const WhyChooseUs = dynamic(() => import("./WhyChooseUs"), { ssr: false });

// Lazy-load görünürlük hook'u
function useDeferredVisible(options) {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (visible) return;

    const el = ref.current;
    if (!el || typeof window === "undefined") return;

    const prefersReduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduce || !("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        setVisible(true);
        observer.disconnect();
      }
    }, options);

    observer.observe(el);
    return () => observer.disconnect();
  }, [visible, options]);

  return [ref, visible];
}

/* ───────────────── ServicesTabs (temiz wrapper) ───────────────── */

export function ServicesTabsDeferred(props) {
  const [ref, visible] = useDeferredVisible({
    rootMargin: "200px 0px",
    threshold: 0.1,
  });

  return (
    <section ref={ref}>
      {visible ? <ServicesTabs {...props} /> : null}
    </section>
  );
}

/* ───────────────── ProjectsGallery (temiz wrapper) ───────────────── */

export function ProjectsGalleryDeferred(props) {
  const [ref, visible] = useDeferredVisible({
    rootMargin: "400px 0px",
    threshold: 0.05,
  });

  return (
    <section ref={ref}>
      {visible ? <ProjectsGallery {...props} /> : null}
    </section>
  );
}

/* ───────────────── FAQ (temiz wrapper) ───────────────── */

export function FaqDeferred(props) {
  const [ref, visible] = useDeferredVisible({
    rootMargin: "200px 0px",
    threshold: 0.1,
  });

  return (
    <section ref={ref}>
      {visible ? <Faq {...props} /> : <div className="min-h-[220px]" />}
    </section>
  );
}

/* ───────────────── Navbar (temiz wrapper) ───────────────── */

export function NavbarDeferred(props) {
  const [ref, visible] = useDeferredVisible({
    rootMargin: "0px 0px",
    threshold: 0,
  });

  return (
    <section ref={ref}>
      {visible ? <Navbar {...props} /> : <div className="min-h-[80px]" />}
    </section>
  );
}

/* ───────────────── Corporate Events (temiz wrapper) ───────────────── */

export function CorporateEventsDeferred(props) {
  const [ref, visible] = useDeferredVisible({
    rootMargin: "200px 0px",
    threshold: 0.1,
  });

  return (
    <section ref={ref}>
      {visible ? <CorporateEvents {...props} /> : <div className="min-h-[320px]" />}
    </section>
  );
}

/* ───────────────── Corporate Intro (temiz wrapper) ───────────────── */

export function CorporateIntroDeferred(props) {
  const [ref, visible] = useDeferredVisible({
    rootMargin: "200px 0px",
    threshold: 0.1,
  });

  return (
    <section ref={ref}>
      {visible ? <CorporateIntro {...props} /> : <div className="min-h-[240px]" />}
    </section>
  );
}

/* ───────────────── Tech Capabilities (temiz wrapper) ───────────────── */

export function TechCapabilitiesDeferred(props) {
  const [ref, visible] = useDeferredVisible({
    rootMargin: "200px 0px",
    threshold: 0.1,
  });

  return (
    <section ref={ref}>
      {visible ? <TechCapabilities {...props} /> : <div className="min-h-[360px]" />}
    </section>
  );
}

/* ───────────────── Why Choose Us (temiz wrapper) ───────────────── */

export function WhyChooseUsDeferred(props) {
  const [ref, visible] = useDeferredVisible({
    rootMargin: "200px 0px",
    threshold: 0.1,
  });

  return (
    <section ref={ref}>
      {visible ? <WhyChooseUs {...props} /> : <div className="min-h-[320px]" />}
    </section>
  );
}

