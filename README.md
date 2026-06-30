# Intergamma Assessment

Next.js 16 + TypeScript assessment project with a Product Listing Page and a
persistent wishlist side panel.

## Overview

This app renders:

- A server-rendered homepage Product Listing Page backed by `data/products.json`.
- A wishlist widget with add/remove controls, quantity editing, a header badge,
  and persistence through `localStorage`.
- A side panel wishlist overlay opened from the favorites button in the header.
- Category detail pages at `/:categorySlug` with product grid results per
  category.

Core data sources:

- `data/categories.json`
- `data/products.json`

## Requirements

- Node.js 20+
- npm 10+

## Installation

Install all dependencies from `package.json` with:

```bash
npm install
```

What this does:

- Downloads and installs runtime dependencies into `node_modules`.
- Downloads and installs development tools (TypeScript, ESLint, Jest, Testing Library, etc.).
- Uses `package-lock.json` to install exact locked versions for consistent local setup.

## Run The App

Start the development server:

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

## Unit Tests

Unit tests are implemented with Jest + Testing Library.

Run all unit tests once:

```bash
npm test
```

Run unit tests in watch mode (re-runs tests on file changes):

```bash
npm run test:watch
```

Run unit tests with coverage output:

```bash
npm run test:coverage
```

Current component tests are in `components/*.test.tsx` and utility tests are in `lib/*.test.ts`.

## Other Scripts

Lint:

```bash
npm run lint
```

Lint and auto-fix:

```bash
npm run lint:fix
```

Format check:

```bash
npm run format
```

Format write:

```bash
npm run format:write
```

Production build:

```bash
npm run build
```

Run production server (after build):

```bash
npm run start
```

## Project Structure

- `app/`: App Router pages and layout.
- `components/`: UI components and component unit tests.
- `context/`: Shared React context.
- `hooks/`: Custom hooks.
- `lib/`: Shared utilities, types, and unit tests.
- `data/`: Static JSON data sources.
- `public/`: Static assets.

## Notes

- Product and category data are imported from local JSON in Server Components, so
  the initial product listing can be rendered on the server.
- Wishlist interactions are isolated in Client Components because they depend on
  browser-only state, dialog interactions, and `localStorage`.
- Dynamic category routes are statically generated from category labels.
- Category slugs are normalized by `lib/categorySlug.ts`.
- The wishlist drawer uses Radix Dialog primitives for focus management, escape
  handling, ARIA semantics, and keyboard navigation.
