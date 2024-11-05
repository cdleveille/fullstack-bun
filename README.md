# fullstack-bun

Type-safe monorepo project template. [Bun](https://bun.sh)/[Hono](https://hono.dev) backend, [React](https://react.dev) frontend, [Socket.IO](https://socket.io) bridging the gap.

## Features

-   Server API routes are automatically validated and documented via [@hono/zod-openapi](https://www.npmjs.com/package/@hono/zod-openapi). [OpenAPI Specification](https://swagger.io/specification) .json data is served on [/spec](https://fullstack-bun.fly.dev/spec), and [Scalar](https://guides.scalar.com) documentation is served on [/reference](https://fullstack-bun.fly.dev/reference).

-   The client implements [PWA](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps) standards for a native app-like experience and boasts a near-perfect [Lighthouse](https://developer.chrome.com/docs/lighthouse/) score out of the box. It instantly rebuilds when a client-side source file is saved, and the browser will automatically refresh, optionally with [persisted state](https://github.com/cdleveille/fullstack-bun/blob/main/src/client/hooks/usePersistedState.ts).

-   Includes a [Dockerfile](https://github.com/cdleveille/fullstack-bun/blob/main/Dockerfile), [config](https://github.com/cdleveille/fullstack-bun/blob/main/fly.toml), and [workflow](https://github.com/cdleveille/fullstack-bun/blob/main/.github/workflows/deploy.yml) for deploying to [fly.io](https://fly.io).

## Setup

1. Install [Bun](https://bun.sh)
2. Install package dependencies:

```sh
bun i
```

3. Start app:

```sh
bun dev
```

4. By default, the client will be served on [localhost:3000](http://localhost:3000) in development mode. This can be overridden in a .env file (see [.env.example](https://github.com/cdleveille/fullstack-bun/blob/main/.env.example) for all environment variable options).

## Stack

-   [Bun](https://bun.sh) (server runtime, bundler, package manager, script runner)
-   [Hono](https://hono.dev) (web framework)
-   [React](https://react.dev) (user interface)
-   [TanStack Query](https://tanstack.com/query) (async state management)
-   [Socket.IO](https://socket.io) (real-time server/client communication)
-   [TypeScript](https://www.typescriptlang.org), [ESLint](https://eslint.org), [Prettier](https://prettier.io) (code quality/style)
