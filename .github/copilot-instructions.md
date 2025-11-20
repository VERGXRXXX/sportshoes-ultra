<!-- Copilot instructions for coding agents in this repo -->

# Copilot instructions — SportShoes Ultra

Purpose: help AI coding agents be productive immediately in this React + Vite Tailwind app.

**Big Picture**

- **Project type:** Single-page React app built with `Vite` and `Tailwind CSS`.
- **Entry points:** `src/main.jsx` mounts `<App />` into `index.html` (`id="root"`).
- **Orchestration:** `src/App.jsx` holds the central UI state (views, category, brand, cart) and drives navigation flows. Many components receive callbacks and state from `App.jsx` rather than using a global store.
- **Data source:** static, generated catalog in `src/data/catalogData.js`. Several UI pieces generate products dynamically from this file (see `App.jsx` and `ShoesCarousel.jsx`).
- **Animation & icons:** Framer Motion (`framer-motion`) and React Icons (`react-icons`) are used across components.

**Key files to inspect for context**

- `src/App.jsx` — central state, navigation, cart logic, product generation (handleBrandSelect, handleBuyNow).
- `src/data/catalogData.js` — canonical catalogue, brand lists, modelsByBrand used for product generation.
- `src/components/*` — UI components. Typical examples:
  - `Header.jsx` — search behavior, menu, category selection, live search results.
  - `ProductsList.jsx` & `ProductDetailModal.jsx` — product presentation and add-to-cart flow.
  - `ShoesCarousel.jsx` — client-side generated carousel with autoplay and pagination.

**Conventions & patterns (project-specific)**

- UI uses functional components and inline Tailwind utility classes (no CSS modules). Keep classes in JSX.
- Motion patterns use `framer-motion` `motion` components and `AnimatePresence` for enter/exit animations.
- Event flow: parent (`App.jsx`) passes handlers to children (e.g., `onAddToCart`, `onBuyNow`, `onCategorySelect`). Modify handlers in `App.jsx` to alter app behavior globally.
- Product data is often generated on the client for demo purposes. If integrating an API, replace generation sites in `App.jsx` and `ShoesCarousel.jsx` and keep the same object shape: { id, name, model, brand, price, originalPrice, discount, color }.
- Modals are controlled via boolean props (e.g., `isOpen`) and callbacks (e.g., `onClose`) — follow this pattern when adding dialogs.

**Build / dev / lint commands**

- Install: `npm install`
- Dev server: `npm run dev` (Vite, default `http://localhost:5173` or as Vite prints)
- Build: `npm run build`
- Preview build: `npm run preview`
- Lint: `npm run lint` (ESLint configured; aim for zero warnings)

Notes about environment and tooling

- Project uses `type: "module"` in `package.json` and ES modules throughout.
- Tailwind is configured via `tailwind.config.js` and PostCSS is present — updating design tokens should go in that file.
- Recommended VS Code settings (from README) include Prettier and ESLint auto-fix on save; mirror those if making changes.

Quick examples of change points

- To change the catalog or add brands/models, edit `src/data/catalogData.js`.
- To centralize API integration, replace the product generation in `App.jsx`'s `handleBrandSelect` with an async fetch and map results into the same product shape.
- To add a global state (if needed), consider minimal lift: introduce a context provider around `App.jsx` and migrate only pieces that require cross-cutting access (cart or user info).

What NOT to change without tests / discussion

- Don't rework `App.jsx` responsibilities in one PR. It intentionally keeps all navigation and cart logic in one place; refactors should be incremental and preserve prop-driven APIs for components.
- Avoid changing Tailwind tokens or global color names without updating `tailwind.config.js` and the README color notes.

If you update this file

- Keep it concise. Mention concrete file paths, commands, and small code examples.

Questions for the repo owner

- Do you want the client-side product generation replaced by a mock API layer for tests? (I can scaffold a simple `src/api/mockCatalog.js`.)
- Are there preferred commit/message conventions or PR labels to use?

---

If anything here is unclear or you'd like more detail (examples of API integration, tests, or refactor guidance), tell me which area to expand.
