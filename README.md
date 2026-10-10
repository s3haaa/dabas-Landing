# DABAS homepage redesign

Production-oriented React/TypeScript prototype for a complete redesign of the DABAS.hr homepage.

## Run locally

```bash
pnpm install
pnpm dev
```

Production verification:

```bash
pnpm build
```

After building, open the workspace root `index.html` directly by double-clicking it. The build also keeps identical copies in the project root and at `dist/index.html`. The complete application bundle and styles are embedded in the HTML file, so a local server is not required. An internet connection is still needed for product photography hosted by DABAS.

`source.html` is the Vite development entry. Every `pnpm build` automatically compiles it and promotes the standalone result to the root `index.html`.

## Architecture

- `src/data/` contains replaceable products, categories, navigation, banners, and asset references.
- `src/components/` contains reusable navigation, product, promotional, layout, and UI components.
- `src/context/ShopContext.tsx` owns demo cart and wishlist state with `localStorage` persistence.
- `src/services/catalog.ts` isolates the local catalog behind an interface ready for a WooCommerce adapter.
- `src/pages/HomePage/` contains the homepage composition; future routes can be added without rebuilding it.

All checkout, product-request, and newsletter actions are explicitly demonstrational. No customer data is transmitted and no payment is processed.
