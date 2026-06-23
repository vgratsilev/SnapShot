# SnapShot

A React 19 + Vite image gallery powered by the [Flickr API](https://www.flickr.com/services/api/).

Browse curated categories (Mountain, Beaches, Birds, Food) or search for any tag.
Photos are fetched live from Flickr and rendered in a responsive grid.

## Prerequisites

- Node.js `>= 20.19.0`
- Yarn

## Setup

1. Install dependencies:
   ```bash
   yarn install
   ```
2. Create a `.env` file from the example and add your Flickr API key:

   ```bash
   cp .env.example .env
   ```

   Then edit `.env`:

   ```
   VITE_FLICKR_API_KEY=your_flickr_api_key_here
   ```

   Get a key from the [Flickr App Garden](https://www.flickr.com/services/apps/create/).

   > **Security note:** because this is a client-only app, `VITE_FLICKR_API_KEY`
   > is bundled into the shipped JavaScript and is visible to anyone who opens
   > the site's devtools. This is inherent to Flickr's public API and cannot be
   > hidden without introducing a server-side proxy. Prefer a key you can rotate.

## Scripts

| Script             | Description                                     |
| ------------------ | ----------------------------------------------- |
| `yarn dev`         | Start the Vite dev server (port 3000)           |
| `yarn build`       | Production build into `dist/`                   |
| `yarn preview`     | Preview the production build locally            |
| `yarn test`        | Run the Vitest test suite (jsdom)               |
| `yarn typecheck`   | Type-check with `tsc --noEmit`                  |
| `yarn lint`        | Lint with ESLint (incl. FSD boundary rules)     |
| `yarn lint:fix`    | Lint and auto-fix                               |
| `yarn format`      | Format source with Prettier                     |
| `yarn format:check`| Check formatting without writing                |
| `yarn deploy`      | Build and publish `dist/` to GitHub Pages       |

## Deployment

The app is configured for GitHub Pages at
`https://vgratsilev.github.io/SnapShot`. `vite.config.ts` sets
`base: "/SnapShot/"` so built assets resolve under that sub-path, and routing
uses a hash router so it works with no server-side configuration.

```bash
yarn deploy
```

## Architecture

The codebase follows **Feature-Sliced Design (FSD)** — a layered architecture
where modules may only import from layers below them (`app → pages → widgets →
features → entities → shared`). The boundary rules are enforced at lint time by
`eslint-plugin-fsd-import`.

See [ARCHITECTURE.md](./ARCHITECTURE.md) for the full structure, data flow, and
tooling details.

## Features

- Responsive grid layout
- Search any Flickr tag
- Curated category pages (Mountain, Beaches, Birds, Food)
- Per-query in-memory cache (no refetch on revisit)
- Route-level code splitting via React Router data loaders
- Fully typed (TypeScript strict mode)

## Built With

- React 19 + React Router 7 (data routers / loaders)
- Vite 8
- TypeScript (strict)
- ESLint + Prettier
- Flickr API
