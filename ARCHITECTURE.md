# SnapShot Application Architecture

SnapShot is a React 19 + Vite image gallery powered by the Flickr API. The
frontend is organized using **Feature-Sliced Design (FSD)**, a layered,
slice-based architecture for front-end applications.

Reference: <https://feature-sliced.design/>

## Why FSD?

FSD gives the codebase:

- Predictable dependency direction: modules can only import from layers below them.
- Separation of concerns: business logic, UI composition, routing, and shared
  infrastructure live in distinct layers.
- Controlled reuse: consumers import a slice through its public API instead of
  reaching into internal files.
- Scalable refactoring: adding a route or feature is localized to the layer that
  owns it.

## Layers

Layers are ordered from the most specific to the most generic. An upper layer may
import from any lower layer, but never the reverse.

```text
app      -> application shell: providers, router, global styles
pages    -> route-level screens, composed from widgets/features
widgets  -> self-contained composite blocks such as header and gallery
features -> user-facing interactions with their own model
entities -> domain models and data sources, currently Flickr photos
shared   -> app-agnostic utilities, config, and primitives
```

Each layer contains slices such as `entities/photo` or
`features/search-photos`. A slice may contain segments like `ui`, `model`, `api`,
`lib`, or `config` when needed.

## Public API Rule

A slice exposes capabilities through a barrel `index.ts`. Consumers import from
the slice, not from internal segments:

```ts
// Allowed
import { fetchPhotos, type FlickrPhoto } from "@/entities/photo";

// Forbidden: reaches into slice internals
import { fetchPhotos } from "@/entities/photo/api/flickr";
```

ESLint enforces this rule through `eslint-plugin-fsd-import`.

## Directory Structure

```text
src/
  app/
    providers/       router, error boundary, top-level providers
    styles/          global CSS, resets, design tokens
    index.tsx        createRoot + provider composition

  pages/
    home/            redirect to the default category
    category/        curated category pages
    search/          /search/:searchInput
    not-found/       404 fallback

  widgets/
    header/          brand title, search form, category navigation
    gallery/         photo grid plus loading, error, and empty states

  features/
    search-photos/   search input, submit handling, icon asset
    photo-categories/ category navigation links

  entities/
    photo/
      api/           Flickr REST client
      model/         photo types, route loaders, per-query cache
      index.ts       public API

  shared/
    api/             base fetch client and API errors
    config/          env access
    lib/             tiny helpers such as cache and classNames
```

## Data Flow

```text
URL -> router -> route loader -> entities/photo -> shared/api -> Flickr API
                           |
                           v
                  widgets/gallery renders loader data
```

- Navigation triggers a React Router loader in `entities/photo`.
- The loader calls `loadPhotos`, which uses a per-query in-memory cache before
  calling the Flickr client.
- Flickr requests use `text` search with relevance sorting so category routes
  and manual searches return images that match the current query.
- The page passes the loaded result to `widgets/gallery` for rendering.
- Abort signals from React Router are passed down to `fetch`, so superseded
  navigations can be cancelled.

## Tooling

- Vite for development, build, and preview.
- React Router 7 data routers and hash routing for GitHub Pages.
- TypeScript in strict mode.
- Vitest + Testing Library for tests.
- ESLint flat config with React, TypeScript, React Refresh, and FSD rules.
- Prettier for formatting.

## Environment

The Flickr key is read from `VITE_FLICKR_API_KEY` in `.env.local`.
`.env.local` is intentionally ignored by Git. `.env.example` documents the
required variable without storing a real key.

Because this is a client-only app, the key is visible in the built JavaScript.
Use a key that can be rotated, or add a server-side proxy if the key must be
hidden.
