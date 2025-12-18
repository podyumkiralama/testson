# Homepage Performance Report

## Test Environment
- Lighthouse mobile profile (slow 4G, mid-tier device): **Not run locally** — container lacks a Chrome/Lighthouse runner. Findings and action items are based on code inspection and typical bottlenecks for this page.
- Chrome Performance profile: **Not run locally** for the same reason.

## Largest Contentful Paint (LCP)
- **Expected LCP element**: Hero background image (`picture > img[src="/img/hero-bg.webp"]`) with overlayed heading.
- The hero image is now preloaded via `app/(tr)/(site)/head.js`, with `fetchPriority="high"` on the `<img>` element to encourage early fetching.

## JavaScript Long Tasks (likely contributors)
Based on bundle structure and deferred sections:
1. **Navbar client bundle** — includes menu logic and accessibility helpers.
2. **Hero interactive elements** — CTA hover/animation logic.
3. **ServicesTabs** dynamic import when first viewed/hydrated.
4. **ProjectsGallery** dynamic import and gallery scripts when first viewed/hydrated.
5. **Analytics/consent wrappers** (deferred but still executed after hydration).

## Network Resources Before LCP (expected largest)
1. `/img/hero-bg-mobile.webp` (mobile hero art, preloaded)
2. `/img/hero-bg.webp` (desktop hero art, preloaded)
3. Web fonts from `app/fonts.js` (Inter)
4. Critical CSS injected via `components/CriticalAssets.js`
5. Initial JS for Navbar/Hero (client-side bundle)

## Action Plan & Expected Impact
- **Hero-first render**: Ensure Hero renders before schema scripts (already applied) to avoid delaying first paint. Expected LCP gain: ~300–800 ms.
- **Hero image preload**: Added explicit preload links for mobile/desktop hero imagery to start requests within ~200 ms under throttling. Expected LCP gain: ~150–300 ms.
- **Shared focus ring + lighter navbar/hero hydration**: Reused a single focus-ring style to avoid duplicated CSS in multiple client bundles; improves consistency and keeps critical CSS lean.
- **Deferred sections tuned**: Tightened `rootMargin` and added `idleTimeout` gating so below-the-fold dynamic imports hydrate later, lowering main-thread contention and TBT (target <150 ms) on mobile.
- **Third-party scripts**: Keep analytics wrapped in existing deferred/consent loaders; no new synchronous scripts added.

## Follow-up Measurements
- After deploying, re-run Lighthouse (mobile, slow 4G) and capture:
  - LCP, TBT, INP, CLS
  - LCP element confirmation (should be hero image/title)
  - JS execution breakdown to validate reduced long tasks from deferred sections.
