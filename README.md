# fullstack-bun

Type-safe monorepo project template. [Bun](https://bun.sh)/[Hono](https://hono.dev) backend, [React](https://react.dev) frontend, [Socket.IO](https://socket.io) bridging the gap.

## Features

-   API routes are automatically validated and documented via [@hono/zod-openapi](https://www.npmjs.com/package/@hono/zod-openapi). [OpenAPI Specification](https://swagger.io/specification) .json data is served on `/spec`, and [Scalar](https://guides.scalar.com) documentation is served on `/reference`.

-   Includes a Dockerfile and config/workflow for deploying to [fly.io](https://fly.io).

-   The client implements [PWA](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps) standards for a native app-like experience and boasts a perfect [Lighthouse](https://developer.chrome.com/docs/lighthouse/) score out of the box.

-   The frontend instantly rebuilds when a client-side source file is saved. The browser will also automatically refresh, optionally with persisted state.

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

4. By default, the client will be served on [localhost:3000](http://localhost:3000) in development mode.

## Stack

-   [Bun](https://bun.sh) (server runtime, bundler, package manager, script runner)
-   [Hono](https://hono.dev) (web framework)
-   [React](https://react.dev) (user interface)
-   [TanStack Query](https://tanstack.com/query) (async state management)
-   [Socket.IO](https://socket.io) (real-time server/client communication)
-   [TypeScript](https://www.typescriptlang.org), [ESLint](https://eslint.org), [Prettier](https://prettier.io) (code quality/style)
