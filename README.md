# SnapShot

A React 19 + Vite image gallery powered by the [Flickr API](https://www.flickr.com/services/api/).

Browse predefined categories (Mountain, Beaches, Birds, Food) or search for any text query. Photos are fetched live from Flickr and rendered in a responsive grid.

## Prerequisites

- Node.js `>= 20.19.0`
- Yarn 1

## Setup

1. Install dependencies:

   ```bash
   yarn install
   ```

2. Create a local env file from the example and add your Flickr API key:

   ```bash
   cp .env.example .env.local
   ```

   Then edit `.env.local`:

   ```bash
   VITE_FLICKR_API_KEY=your_flickr_api_key_here
   ```

   Get a key from the [Flickr App Garden](https://www.flickr.com/services/apps/create/).

   > Security note: because this is a client-only app, `VITE_FLICKR_API_KEY`
   > is bundled into the shipped JavaScript and is visible to anyone who opens
   > the site's devtools. This is inherent to Flickr's public API and cannot be
   > hidden without introducing a server-side proxy. Prefer a key you can rotate.

## Scripts

| Script              | Description                             |
| ------------------- | --------------------------------------- |
| `yarn dev`          | Start the Vite dev server               |
| `yarn start`        | Alias for `yarn dev`                    |
| `yarn build`        | Production build into `dist/`           |
| `yarn preview`      | Preview the production build locally    |
| `yarn test`         | Run the Vitest test suite (jsdom)       |
| `yarn typecheck`    | Type-check with `tsc --noEmit`          |
| `yarn lint`         | Lint with ESLint and FSD boundary rules |
| `yarn lint:fix`     | Lint and auto-fix                       |
| `yarn format`       | Format source with Prettier             |
| `yarn format:check` | Check formatting without writing        |
| `yarn deploy`       | Optional manual publish to GitHub Pages |

## Deployment

The app is configured for GitHub Pages at
`https://vgratsilev.github.io/SnapShot`. `vite.config.ts` sets
`base: "/SnapShot/"` so built assets resolve under that sub-path, and routing
uses a hash router so it works with no server-side configuration.

Deployment is handled by `.github/workflows/deploy.yml` on pushes to `main` and
manual `workflow_dispatch` runs.

Before the first deploy:

1. In GitHub, open repository **Settings -> Secrets and variables -> Actions**.
2. Add repository secret `VITE_FLICKR_API_KEY`.
3. In **Settings -> Pages**, set **Source** to **GitHub Actions**.

The workflow type-checks, lints, tests, builds `dist/` with the Flickr key from
GitHub Secrets, uploads the artifact, and deploys it through GitHub Pages.

## Architecture

The codebase follows **Feature-Sliced Design (FSD)** - a layered architecture
where modules may only import from layers below them (`app -> pages -> widgets ->
features -> entities -> shared`). The boundary rules are enforced at lint time by
`eslint-plugin-fsd-import`.

See [ARCHITECTURE.md](./ARCHITECTURE.md) for the full structure, data flow, and
tooling details.

## Features

- Responsive grid layout
- Search Flickr by text query
- Predefined category pages (Mountain, Beaches, Birds, Food)
- Bounded per-query in-memory cache (no refetch on quick revisits)
- Lazy route modules for search and 404 pages
- Fully typed (TypeScript strict mode)

## Built With

- React 19 + React Router 7 (data routers / loaders)
- Vite 8
- TypeScript (strict)
- ESLint + Prettier
- Flickr API
