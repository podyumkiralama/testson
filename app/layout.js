import "../styles/globals.css";

import CriticalAssets from "@/components/CriticalAssets";
import NonCriticalStylesheet from "@/components/NonCriticalStylesheet";

import { inter } from "./fonts";

export default function RootLayout({ children }) {
  return (
    <html lang="tr" className={inter.variable} suppressHydrationWarning>
      <head>
        <CriticalAssets />
      </head>
      <body>
        <NonCriticalStylesheet />
        {children}
      </body>
    </html>
  );
}
