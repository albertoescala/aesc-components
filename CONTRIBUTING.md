# Contributing

## Add a component

1. Create a folder in `src/components/<name>/`.
2. Implement the component in `src/components/<name>/ae-<name>.ts`.
3. Export from `src/components/<name>/index.ts`.
4. Add a story `*.stories.ts`.
5. Add a test `*.test.ts`.

## Styles (Tailwind)

Use Tailwind classes in the component template. Make sure to include `tailwindStyles` in `static styles`.
