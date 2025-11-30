# Readiness Application

A React + TypeScript + Vite application for evaluating data protection readiness with Firebase backend integration.

## Features

- Interactive quiz evaluation system
- Firebase Firestore database integration
- Real-time data persistence
- Responsive design with Bootstrap
- Accessibility compliant

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
