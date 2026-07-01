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
- Direct imports: code imports the file it needs instead of going through barrel
  re-exports.
- Shared configuration: predefined categories live in one source of truth.

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

## Import Rules

The project does not use barrel `index.ts` files. Consumers import concrete
files while still respecting FSD layer direction:

```ts
// Allowed: direct file import from a lower layer
import { fetchPhotos } from "@/entities/photo/api/flickr";

// Forbidden: lower layers must not import upper layers
import { Header } from "@/widgets/header/ui/Header";
```

ESLint keeps `fsd-relative-path` and `layer-imports` enabled. The
`public-api-imports` rule is disabled because barrels are intentionally avoided.

## Directory Structure

```text
src/
  app/
    providers/       router, error boundary, top-level providers
    styles/          global CSS, resets, design tokens
    index.tsx        createRoot + provider composition

  pages/
    home/            redirect to the default category
    category/        predefined category pages
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

  shared/
    api/             base fetch client and API errors
    config/          env access and predefined category config
    lib/             tiny helpers such as bounded cache
```

## Data Flow

```text
URL -> router -> route loader -> entities/photo -> shared/api -> Flickr API
                           |
                           v
                  widgets/gallery renders loader data
```

- Navigation triggers a React Router loader in `entities/photo`.
- The loader calls `loadPhotos`, which uses a bounded per-query in-memory cache
  before calling the Flickr client.
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
