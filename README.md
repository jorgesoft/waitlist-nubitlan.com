# Readiness Application

A React + TypeScript + Vite application for evaluating data protection readiness with Firebase backend integration.

## Features

- Interactive quiz evaluation system
- Firebase Firestore database integration
- Real-time data persistence
- Tailwind CSS v4 + shadcn/ui, with a pixel-art cloud theme and dark mode
- Markdown-based blog
- Free client-side tools with short URLs (e.g. `/ps`)
- Accessibility compliant

## Stack

| Area | Choice |
| --- | --- |
| Build | Vite 7 + React 19 + TypeScript |
| Styling | Tailwind CSS v4 (`src/index.css` holds all design tokens) |
| Components | shadcn/ui primitives in `src/components/ui` |
| Icons | `lucide-react`, plus in-house pixel sprites |
| Routing | React Router 7 |
| Content | Markdown + YAML frontmatter |

Design tokens (the sky/cloud palette, radii, fonts and animations) all live in
the `:root` / `.dark` blocks of `src/index.css`. Change a colour there and it
propagates everywhere.

## PR previews

Every pull request is built and published to GitHub Pages at:

```
https://<owner>.github.io/waitlist-nubitlan.com/pr-<number>/
```

A bot comment on the PR carries the link, and the preview is deleted when the
PR closes. See [`.github/workflows/pr-preview.yml`](./.github/workflows/pr-preview.yml).

**One-time setup:** in the repository, go to **Settings → Pages** and set
*Source* to **Deploy from a branch**, branch **`gh-pages`**, folder **`/ (root)`**.
The branch is created automatically by the first preview run, so publish a PR
first if `gh-pages` is not offered yet.

Notes:

- Previews are skipped for pull requests from forks, which only receive a
  read-only token and cannot publish.
- Because previews are served from a subdirectory, anything in `public/`
  must be referenced through `asset()` from `src/lib/asset.ts` rather than a
  bare `/path`. Vite rewrites URLs in `index.html` and in imported modules
  by itself; `asset()` covers runtime `fetch` calls and `src` values built
  from data, which it cannot see.

## Writing a blog post

Add a markdown file to `src/content/blog/`. The filename becomes the URL slug,
so `mi-articulo.md` is served at `/blog/mi-articulo`.

```markdown
---
title: 'Título del artículo'
date: 2026-08-14
excerpt: 'Resumen de una o dos frases, usado en las tarjetas y en SEO.'
author: Equipo Nubitlan   # optional, defaults to "Equipo Nubitlan"
tags:                     # optional, drives the tag filter
  - Ciberseguridad
draft: false              # optional; drafts are hidden in production builds
---

El contenido va aquí, en markdown normal.
```

Posts are picked up automatically at build time — there is no index to update.
They sort newest-first by `date`, and reading time is calculated from the body.
`title` and `date` are required; a file missing either is skipped with a
console warning.

## Adding a tool

Tools are self-contained React components listed in `src/tools/registry.ts`.

1. Create the component, e.g. `src/tools/mi-herramienta/MiHerramienta.tsx`.
2. Add an entry to the `TOOLS` array:

```ts
{
  slug: 'mi-herramienta',      // canonical: /herramientas/mi-herramienta
  shortPath: '/mh',            // memorable alias: /mh
  name: 'Mi herramienta',
  tagline: 'Una línea para la tarjeta.',
  description: 'Párrafo mostrado en el encabezado de la herramienta.',
  icon: WrenchIcon,
  sprite: ICON_KEY,
  component: MiHerramienta,
  highlights: ['100% local'],
}
```

Routes, the `/herramientas` index and the short alias are all generated from
that entry — no other file needs editing. The tool renders at **both** the
canonical path and the short path (no redirect), so `nubitlan.com/mh` can be
shared directly.

Pick `shortPath` values that cannot collide with an existing page route
(`/blog`, `/herramientas`, `/servicios/*`, `/evaluacion`, `/terminos`,
`/quienes-somos`, `/caso-de-estudio`).

## Quick Start

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up Firebase (see [docs/QUICK_START.md](./docs/QUICK_START.md) for step-by-step guide):
   ```bash
   cp .env.example .env
   # Edit .env with your Firebase credentials
   ```

3. Start development server:
   ```bash
   npm run dev
   ```

## Firebase Integration

This application uses Firebase for:
- **Firestore**: Storing quiz results and email subscriptions
- **Analytics**: Tracking user engagement and conversions

## 📚 Documentation

All documentation is in the [`docs/`](./docs) folder:

- 🚀 [Quick Start Guide](./docs/QUICK_START.md) - Get up and running in 10 minutes
- 🔥 [Firebase Setup](./docs/FIREBASE_SETUP.md) - Detailed Firebase configuration
- 📊 [Analytics Events](./docs/ANALYTICS_EVENTS.md) - Custom analytics tracking
- 🚀 [Deployment Checklist](./docs/DEPLOYMENT_CHECKLIST.md) - Pre-deployment guide
- ♿ [Accessibility](./docs/accessibility-enhancements.md) - Accessibility features

**See [docs/README.md](./docs/README.md) for complete documentation index.**

---

## Original Template Info

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
