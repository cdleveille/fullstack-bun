# ⚡ fullstack-bun

Single-page web app project template curated for performance, developer experience, and type safety.

## 🔧 Stack

- [Bun](https://bun.sh) - server runtime, package manager, script runner
- [Elysia](https://elysiajs.com) - server framework
- [Eden](https://elysiajs.com/eden/overview) - end-to-end type safety
- [React](https://react.dev) - user interface
- [TanStack Router](https://tanstack.com/router) - client-side routing
- [TanStack Query](https://tanstack.com/query) - async state management
- [TypeScript](https://www.typescriptlang.org), [Biome](https://biomejs.dev), [Lefthook](https://lefthook.dev) - code quality/style
- [Vite](https://vite.dev) - dev server, bundler

## ✨ Features

- **100% Type-Safe API**: Full static type-safety between the server and client. See [api.ts](https://github.com/cdleveille/fullstack-bun/blob/main/src/server/api.ts) and [useApi.ts](https://github.com/cdleveille/fullstack-bun/blob/main/src/client/hooks/useApi.ts) for simple HTTP and WebSocket examples.

- **Automatic API Documentation**: Interactive [Scalar](https://github.com/scalar/scalar) documentation is automatically generated and served at `/api/reference`. The raw OpenAPI JSON is available at `/api/reference/json`.

- **Progressive Web App Capable**: Meets PWA requirements for an installable, native app-like experience. Scores a near-perfect [PageSpeed Insights](https://pagespeed.web.dev) report out of the box.

- **Offline Support**: A [service worker](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API) caches static assets and API responses, enabling offline functionality and faster subsequent loads with fewer requests to the server.

- **Production Ready**: Includes a multi-stage `Dockerfile` that compiles the app into a standalone binary and runs it in a minimal distroless image. Pre-configured GitHub workflows for continuous integration and deploying to [fly.io](https://fly.io) on pushes to the `main` branch.

## 🚧 Scope

The following are not currently implemented, but may be added in the future:

- Server-Side Rendering (SSR) / React Server Components (RSC)
- Database / ORM
- Authentication / Authorization
- CSS Framework / UI Component Library
- Unit / E2E Tests
- Logging / Analytics

## 🚀 Getting Started

### Setup:

1. Install [Git](https://git-scm.com/downloads), [Bun](https://bun.sh/docs/installation), and [Docker](https://docs.docker.com/get-docker) (optional, but useful for locally testing production builds)

2. Clone this repository:

```bash
git clone https://github.com/cdleveille/fullstack-bun.git

cd fullstack-bun
```

### Local Development:

```bash
# Install dependencies
bun install

# Start dev server
bun dev
```

### Production Build:

```bash
# Build client-side assets
bun run build

# Compile server into a standalone binary
bun run compile

# Run the compiled server
./main
```

...or...

```bash
# Build image
docker build -t fullstack-bun .

# Run image in container
docker run -p 3000:3000 fullstack-bun
```
