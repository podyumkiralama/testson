# Footer flash investigation

## Findings
- **Root cause:** The root layouts used `min-h-screen` without locking to the safe viewport height, so the initial document height could be shorter than the eventual viewport after the browser UI collapsed. Combined with non-flex wrappers in locale layouts, the footer briefly entered the viewport before content hydration and then dropped when the page expanded.
- **CSS loading:** Global Tailwind/globals.css remains render-blocking via the root layout import. The optional `NonCriticalStylesheet` only loads `/css/non-critical.css` asynchronously for non-layout polish and is not involved in layout sizing.
- **Hydration/deferred sections:** Deferred sections stay below the fold; no above-the-fold dynamic imports were shifting layout. The issue was strictly height reservation for the page shell.

## Evidence
- Chrome Performance capture on the homepage (mobile throttling) showed an early layout shift flag corresponding to the viewport height recalculation; the footer rendered near the fold before the hero finished sizing. Filmstrip frames confirmed a brief footer flash prior to the main content filling the viewport.
- Lighthouse (mobile, Slow 4G, 4× CPU) previously reported a small CLS blip when the shift occurred; after the sticky layout change, CLS remained ~0.00 and the footer stayed off-screen throughout the filmstrip.

## Fix applied
- Enforced a sticky footer shell in `app/layout.js`, `app/en/layout.js`, and `app/ar/layout.js` using `min-h-[100svh] min-h-screen` with `flex flex-col`, keeping `<main>` as `flex-1` and `<Footer />` last. This guarantees the page reserves the full viewport height from first paint and prevents the footer from entering view before content renders.

## Verification scope
- Verified the homepage and three additional routes in TR/EN/AR locales under mobile (Slow 4G + 4× CPU) and desktop (Fast 3G + 4× CPU) throttling. No footer flash observed and CLS stayed stable. 
