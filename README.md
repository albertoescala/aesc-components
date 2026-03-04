# AESC Components (Lit + Tailwind)

Web Components library built with Lit, with Tailwind CSS styles embedded in each component (Shadow DOM).

## Scripts

- `npm run dev`: local playground (Vite)
- `npm run build`: library build (Vite) + types (TypeScript)
- `npm run analyze:bundle`: generates `dist/bundle-stats.html` with a treemap report
- `npm run analyze:size`: prints raw/gzip/brotli sizes for `dist/**` (JS/CSS)
- `npm run check:size`: same as above but fails if size budgets are exceeded
- `npm run typecheck`: type checking (no emit)
- `npm run test`: unit tests in real browser (Web Test Runner + Playwright)
- `npm run storybook`: component catalog (Storybook)
- `npm run docs`: documentation (VitePress)

## Build size

1. Run `npm run analyze:bundle` and open `dist/bundle-stats.html`.
2. Look for the biggest nodes (usually generated CSS) and confirm whether they are expected.
3. Run `npm run analyze:size` to see raw/gzip/brotli totals and the top largest files.

If `styles/tailwind.generated.js` grows unexpectedly, focus on Tailwind content scanning and reduce unused utilities (tighten `content` globs, avoid generating styles for files that aren’t part of the library).

## Conventions

- Each component lives in `src/components/<component>/`
- Each component exports an `index.ts` to allow granular imports
- Tailwind styles are applied by adding `tailwindStyles` to `static styles`
- Component tags use the `ae-` prefix (e.g. `ae-button`)
