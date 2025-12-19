// app/(tr)/layout.js
import SkipLinks from "@/components/SkipLinks";
import NonCriticalStylesheet from "@/components/NonCriticalStylesheet";
import DeferredSpeedInsights from "@/components/DeferredSpeedInsights.client";
import NewTabAccessibility from "@/components/NewTabAccessibility.client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function TrLayout({ children }) {
  return (
    <>
      <SkipLinks />

      <NonCriticalStylesheet />
      <DeferredSpeedInsights />
      <NewTabAccessibility />

      <Navbar />
      <main id="_main_content">{children}</main>
      <Footer />
    </>
  );
}
