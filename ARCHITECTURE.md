# SnapShot — Application Architecture (Feature-Sliced Design)

SnapShot is a React 19 + Vite image gallery powered by the Flickr API. As of the
Stage 3 rewrite, the frontend is organized using **Feature-Sliced Design (FSD)** —
a layered, slice-based architecture for front-end applications.

> Reference: <https://feature-sliced.design/>

---

## Why FSD?

FSD gives the codebase:

- **Predictable dependency direction** — modules can only import from layers _below_
  them. There is no tangled, circular dependency graph.
- **Separation of concerns** — business logic, UI composition, routing, and shared
  infrastructure live in distinct layers, each with a single responsibility.
- **Controlled reuse** — a slice is the largest unit a feature can consume from
  another layer, which keeps coupling coarse and intentional.
- **Scalable refactoring** — adding a new route or feature only touches the layer it
  belongs to; it cannot silently affect unrelated areas.

---

## The FSD layers

Layers are ordered from the most specific (top) to the most generic (bottom). An
upper layer may import from any lower layer, but **never** the reverse, and never
sideways within the same layer.

```
app        ← application shell: providers, router, global styles
pages      ← route-level screens, composed from widgets/features
widgets    ← self-contained composite blocks (header, gallery)
features   ← user-facing interactions with their own business model
entities   ← domain models and their data sources (the Flickr photo entity)
shared     ← framework-agnostic, app-agnostic utilities and primitives
```

Each layer contains **slices** (e.g. `entities/photo`, `features/search-photos`),
and each slice is internally divided into **segments**: `ui`, `model`, `api`,
`lib`, `config` — only the segments a slice needs are created.

### Public API rule

A slice exposes its capabilities through a barrel `index.ts`. Consumers import
_from the slice_, never from its internal segments:

```ts
// ✅ allowed
import { FlickrPhoto, fetchPhotos } from "@/entities/photo";

// ❌ forbidden — reaches into internals
import { flickrGet } from "@/entities/photo/api/flickr";
```

This is enforced by ESLint (see [Tooling & enforcement](#tooling--enforcement)).

---

## Directory structure

```
src/
├─ app/                      # Application shell
│  ├─ providers/             # Router, error boundary, top-level context
│  ├─ styles/                # Global CSS, resets, design tokens
│  └─ index.tsx              # createRoot + provider composition
│
├─ pages/                    # Route screens (lazy-loaded)
│  ├─ home/                  # Redirects to a default category
│  ├─ search/                # /search/:query
│  └─ not-found/             # 404 fallback
│
├─ widgets/                  # Composite UI blocks
│  ├─ header/                # Brand title + search form + category nav
│  └─ gallery/               # Photo grid + loading / error / empty states
│
├─ features/                 # User-driven features
│  ├─ search-photos/         # Search input + submit + runSearch wiring
│  └─ photo-categories/      # Mountain / Beach / Bird / Food navigation
│
├─ entities/                 # Domain layer
│  └─ photo/                 # FlickrPhoto type, fetch-based client, route loaders
│     ├─ api/                # typed fetch wrapper around the Flickr REST API
│     ├─ model/              # photo query + per-query cache logic
│     └─ index.ts            # public API: FlickrPhoto, fetchPhotos, loaders
│
└─ shared/                   # App-agnostic, framework-agnostic layer
   ├─ api/                   # base fetch client (timeouts, JSON parsing, errors)
   ├─ config/                # env typing (VITE_FLICKR_API_KEY)
   ├─ lib/                   # tiny helpers (cache, classNames, etc.)
   └─ ui/                    # generic primitives (Button, Input, …) if introduced
```

---

## Layer-by-layer description

### `app/`

The application entry point. Composes all global providers (router, error
boundary) and mounts the tree. It knows about routing but contains no business
logic. This is the only layer that may reference _every_ other layer.

### `pages/`

One slice per route. A page orchestrates widgets and features into a screen and
binds the route's `loader` (react-router v7) to the `entities/photo` data source.
Pages are lazy-loaded via `React.lazy` to keep the initial bundle small.

### `widgets/`

Large, self-contained blocks composed of features and entities. Examples:

- **`header`** — title, search form, category navigation.
- **`gallery`** — renders the photo grid and owns its loading / error / empty
  states, consuming photos provided by a route loader.

### `features/`

Discrete user interactions, each with its own model and UI. They are the main
unit a widget or page consumes.

- **`search-photos`** — the search input and submit handler; wires `runSearch`
  to navigation.
- **`photo-categories`** — the Mountain / Beach / Bird / Food category links.

### `entities/`

Domain models and their data sources. SnapShot has a single entity: `photo`.

- **`entities/photo/api`** — a typed, `fetch`-based client for the Flickr REST
  `flickr.photos.search` endpoint.
- **`entities/photo/model`** — query logic and a per-query in-memory cache so
  revisiting a category does not refetch.
- The slice exposes `FlickrPhoto`, `fetchPhotos`, and route `loader`s via its
  public API.

### `shared/`

Framework-agnostic, app-agnostic code safe to copy into any project.

- **`shared/api`** — base `fetch` wrapper (timeouts, JSON parsing, typed errors).
- **`shared/config`** — environment access and types.
- **`shared/lib`** — small utilities (cache, `classNames`).
- **`shared/ui`** — generic UI primitives, added only when truly reusable.

---

## Data flow

```
URL  ──►  router (app/)  ──►  page loader (pages/)  ──►  entities/photo
                                                              │
                                              fetch client + cache (shared/)
                                                              │
page renders widgets (widgets/gallery)  ◄──  photos streamed via loader data
```

- Navigation triggers a route **loader** in `entities/photo`, which calls the
  fetch client in `shared/api`.
- A per-query cache in `shared/lib` short-circuits repeated navigations.
- The page passes loaded data down to `widgets/gallery` for rendering.
- No global context holds photos — state is per-route, eliminating the stale
  shared-state / loading-flash problems of the pre-rewrite `PhotoContext`.

---

## Tooling & enforcement

The FSD rules are **enforced by tooling**, not just by convention:

- **ESLint** (`eslint.config.js`, flat config) with:
  - `@eslint/js`, `typescript-eslint` for type-aware rules,
  - `eslint-plugin-react-hooks` and `eslint-plugin-react-refresh`,
  - **`eslint-plugin-fsd-import`** — purpose-built FSD enforcement. It forbids:
    - imports from a higher layer (layer-ordering rule),
    - imports across slices within the same layer,
    - imports into a slice's internal segments (public-API rule),
    - circular dependencies.
- **TypeScript** in `strict` mode provides the typed `FlickrPhoto` /
  `FlickrSearchResponse` contracts that flow between layers.
- **Vite** path alias `@/` → `src/` so imports read as `@/entities/photo`.

Scripts: `yarn dev`, `yarn build`, `yarn test`, `yarn lint`, `yarn format`.

---

## Notes & assumptions

- The Flickr API key (`VITE_FLICKR_API_KEY`) ships in the client bundle by design;
  this is inherent to a client-only app calling Flickr's public API and is not
  "fixed" without introducing a server-side proxy.
- The app uses `HashRouter` so it deploys to GitHub Pages with no server-side
  routing configuration.
- This document describes the **post-Stage-3** structure. Stages 1 and 2 keep the
  original flat `src/` layout; the FSD reorganization lands in Stage 3.
