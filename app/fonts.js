import { Inter } from "next/font/google";

export const inter = Inter({
  subsets: ["latin", "latin-ext", "arabic"],
  preload: true,
  display: "swap",
  adjustFontFallback: false,
  variable: "--font-inter",
});
