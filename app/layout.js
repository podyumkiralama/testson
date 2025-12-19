import "../styles/globals.css";

import CriticalAssets from "@/components/CriticalAssets";
import { inter } from "./fonts";

export default function RootLayout({ children }) {
  return (
    <html lang="tr" className={inter.variable} suppressHydrationWarning>
     <CriticalAssets />    
      <body>
      {children}
      </body>
    </html>
  );
}
