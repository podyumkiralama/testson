"use client";

import AnalyticsConsentWrapper from "@/components/AnalyticsConsentWrapper.client";
import DeferredSpeedInsights from "@/components/DeferredSpeedInsights.client";
import DocumentDirection from "@/components/i18n/DocumentDirection.client";
import NewTabAccessibility from "@/components/NewTabAccessibility.client";
import StickyVideoRailclient from "@/components/StickyVideoRail.client";

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
