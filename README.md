# fullstack-bun

Curated web app project template with emphasis on developer experience and type safety. [Bun](https://bun.sh)/[Elysia](https://elysiajs.com) backend, [React](https://react.dev) frontend, [Socket.IO](https://socket.io) and [TanStack Query](https://tanstack.com/query) bridging the gap.

Designed for building single-page web apps with real-time, bi-directional server/client interaction.

## Features

- [Scalar](https://guides.scalar.com) documentation for API routes is served on [/api/reference](https://fullstack-bun.fly.dev/api/reference). [OpenAPI Specification](https://swagger.io/specification) raw .json data is served on [/api/reference/json](https://fullstack-bun.fly.dev/api/reference/json).

- The client meets [PWA](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps) requirements for an installable, native app-like experience on a variety of platforms, and boasts a near-perfect [PageSpeed Insights](https://pagespeed.web.dev) score out of the box.

- Includes a [Dockerfile](https://github.com/cdleveille/fullstack-bun/blob/main/Dockerfile), [fly.toml](https://github.com/cdleveille/fullstack-bun/blob/main/fly.toml), and [GitHub workflow](https://github.com/cdleveille/fullstack-bun/blob/main/.github/workflows/deploy.yml) for deploying to [fly.io](https://fly.io) on pushes to the `main` branch. The Dockerfile compiles the app into a standalone binary, which is then run in a [distroless](https://github.com/GoogleContainerTools/distroless) image.

## Setup

1. Install [Bun](https://bun.sh)
2. Install package dependencies:
   ```bash
   bun install
   ```
3. Start app in dev mode:
   ```bash
   bun dev
   ```

## Stack

- [Bun](https://bun.sh) - server runtime, bundler, package manager, script runner
- [Elysia](https://elysiajs.com) - web framework
- [React](https://react.dev) - user interface
- [TanStack Query](https://tanstack.com/query) - async state management
- [Socket.IO](https://socket.io) - real-time server/client communication
- [TypeScript](https://www.typescriptlang.org), [Biome](https://biomejs.dev), [Lefthook](https://lefthook.dev) - code quality/style
- [Vite](https://vite.dev) - local dev server
