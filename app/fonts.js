import { Inter } from "next/font/google";

export const inter = Inter({
  subsets: ["latin", "latin-ext", "arabic"],
  // Preload kapatılarak font isteklerinin kritik yolu engellememesi sağlanır.
  preload: false,
  display: "swap",
  adjustFontFallback: false,
  variable: "--font-inter",
});
