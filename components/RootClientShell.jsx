"use client";

import dynamic from "next/dynamic";

const DocumentDirection = dynamic(
  () => import("@/components/i18n/DocumentDirection.client"),
  {
    ssr: false,
    loading: () => null,
  }
);

const NewTabAccessibility = dynamic(
  () => import("@/components/NewTabAccessibility.client"),
  {
    ssr: false,
    loading: () => null,
  }
);

const StickyVideoRailclient = dynamic(
  () => import("@/components/StickyVideoRail.client"),
  {
    ssr: false,
    loading: () => null,
  }
);

const DeferredSpeedInsights = dynamic(
  () => import("@/components/DeferredSpeedInsights.client"),
  {
    ssr: false,
    loading: () => null,
  }
);

const AnalyticsConsentWrapper = dynamic(
  () => import("@/components/AnalyticsConsentWrapper.client"),
  {
    ssr: false,
    loading: () => null,
  }
);

export default function RootClientShell({ lang, dir }) {
  return (
    <>
      <DocumentDirection lang={lang} dir={dir} />
      <NewTabAccessibility />
      {process.env.NODE_ENV === "production" ? <StickyVideoRailclient /> : null}
      <DeferredSpeedInsights />
      <AnalyticsConsentWrapper />
    </>
  );
}
