// app/layout.js
import "../styles/globals.css";

import AnalyticsConsentWrapper from "@/components/AnalyticsConsentWrapper.client";

export default function RootLayout({ children }) {
  return (
    <html suppressHydrationWarning>
      <body>
        <AnalyticsConsentWrapper>{children}</AnalyticsConsentWrapper>
      </body>
    </html>
  );
}
