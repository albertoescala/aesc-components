# AESC Components (Lit + Tailwind)

Web Components library built with Lit, with Tailwind CSS styles embedded in each component (Shadow DOM).

## Scripts

- `npm run dev`: local playground (Vite)
- `npm run build`: library build (Vite) + types (TypeScript)
- `npm run typecheck`: type checking (no emit)
- `npm run test`: unit tests in real browser (Web Test Runner + Playwright)
- `npm run storybook`: component catalog (Storybook)
- `npm run docs`: documentation (VitePress)

## Conventions

- Each component lives in `src/components/<component>/`
- Each component exports an `index.ts` to allow granular imports
- Tailwind styles are applied by adding `tailwindStyles` to `static styles`
- Component tags use the `ae-` prefix (e.g. `ae-button`)
