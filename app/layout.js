import "../styles/globals.css";

import { inter } from "./fonts";

export default function RootLayout({ children }) {
  return (
    <html lang="tr" className={inter.variable} suppressHydrationWarning>
         <body>
      {children}
      </body>
    </html>
  );
}
