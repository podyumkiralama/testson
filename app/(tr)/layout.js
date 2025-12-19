// app/(tr)/layout.js
import SkipLinks from "@/components/SkipLinks";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function TrLayout({ children }) {
  return (
    <>
      <SkipLinks />
      <Navbar />
      <main id="_main_content">{children}</main>
      <Footer />
    </>
  );
}
