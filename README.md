# fullstack-bun

Minimal, performant, type-safe monorepo project template. [Bun](https://bun.sh)/[Elysia](https://elysiajs.com/) backend, [React](https://react.dev) frontend, [Socket.IO](https://socket.io) bridging the gap.

## Features

- [Scalar](https://guides.scalar.com) documentation for API routes is served on [/reference](https://fullstack-bun.fly.dev/reference). [OpenAPI Specification](https://swagger.io/specification) raw .json data is served on [/reference/json](https://fullstack-bun.fly.dev/reference/json).

- The client implements [PWA](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps) standards for a native app-like experience and boasts a [near-perfect PageSpeed Insights score](https://pagespeed.web.dev/analysis/https-fullstack-bun-fly-dev/uosoviysds?form_factor=desktop) out of the box. It instantly rebuilds when a client-side source file is saved, and the browser will automatically refresh, optionally with persisted state via the [usePersistedState](https://github.com/cdleveille/fullstack-bun/blob/main/src/client/hooks/usePersistedState.ts) hook.

- Includes a [Dockerfile](https://github.com/cdleveille/fullstack-bun/blob/main/Dockerfile), [fly.toml](https://github.com/cdleveille/fullstack-bun/blob/main/fly.toml), and [GitHub workflow](https://github.com/cdleveille/fullstack-bun/blob/main/.github/workflows/deploy.yml) for deploying to [fly.io](https://fly.io) on pushes to the `main` branch.

## Setup

1. Install [Bun](https://bun.sh)
2. Install package dependencies: `bun i`
3. Start app: `bun dev`
4. The client will be served on [localhost:3000](http://localhost:3000) unless overridden in a .env file (see [.env.example](https://github.com/cdleveille/fullstack-bun/blob/main/.env.example) for all environment variable options)

## Stack

- [Bun](https://bun.sh) (server runtime, bundler, package manager, script runner)
- [Elysia](https://elysiajs.com/) (web framework)
- [React](https://react.dev) (user interface)
- [TanStack Query](https://tanstack.com/query) (async state management)
- [Socket.IO](https://socket.io) (real-time server/client communication)
- [TypeScript](https://www.typescriptlang.org), [ESLint](https://eslint.org), [Prettier](https://prettier.io) (code quality/style)
