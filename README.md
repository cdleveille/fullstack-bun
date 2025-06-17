# fullstack-bun

Single-page web app project template curated for performance, developer experience, and type safety.

## Stack

- [Bun](https://bun.sh) - server runtime, package manager, script runner
- [Elysia](https://elysiajs.com) - server framework
- [Elysia Eden](https://elysiajs.com/eden/overview.html) - end-to-end type safety
- [React](https://react.dev) - user interface
- [TanStack Router](https://tanstack.com/router) - client-side routing
- [TanStack Query](https://tanstack.com/query) - async state management
- [TypeScript](https://www.typescriptlang.org), [Biome](https://biomejs.dev), [Lefthook](https://lefthook.dev) - code quality/style
- [Vite](https://vite.dev) - dev server, bundler

## Features

- Server/client interaction is 100% type-safe. See [api.ts](https://github.com/cdleveille/fullstack-bun/blob/main/src/server/helpers/api.ts) and [useApi.ts](https://github.com/cdleveille/fullstack-bun/blob/main/src/client/hooks/useApi.ts) for HTTP and WebSocket examples.

- [Scalar](https://guides.scalar.com) documentation for API routes is served on [/api/reference](https://fullstack-bun.fly.dev/api/reference). [OpenAPI Specification](https://swagger.io/specification) raw .json data is served on [/api/reference/json](https://fullstack-bun.fly.dev/api/reference/json).

- The client meets [PWA](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps) requirements for an installable, native app-like experience on a variety of platforms. It scores a near-perfect [PageSpeed Insights](https://pagespeed.web.dev) report out of the box.

- A [service worker](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers) is installed in the browser for caching static assets and API responses client-side, enabling offline functionality and faster subsequent loads with fewer requests to the server.

- Includes a [Dockerfile](https://github.com/cdleveille/fullstack-bun/blob/main/Dockerfile), [fly.toml](https://github.com/cdleveille/fullstack-bun/blob/main/fly.toml), and [GitHub workflow](https://github.com/cdleveille/fullstack-bun/blob/main/.github/workflows/deploy.yml) for deploying to [fly.io](https://fly.io) on pushes to the `main` branch. The Dockerfile compiles the app into a standalone binary and runs it in a [distroless](https://github.com/GoogleContainerTools/distroless) image.

## Not Implemented

- Server-side rendering
- React server components
- Database
- Authentication
- CSS framework
- Tests
- Logging
- Analytics

...but I may look into adding these in the future!

## Setup

Install [Bun](https://bun.sh).

Optionally create a `.env` file in the root directory to override default environment variables. See [.env.example](https://github.com/cdleveille/fullstack-bun/blob/main/.env.example) for available options.

## Development

Install dependencies and run:

```bash
bun install
bun dev
```

## Production

Build client, compile server to standalone binary, and run:

```bash
bun run build
bun run compile
./main
```

Alternatively, build and run in a Docker container:

```bash
docker build -t fullstack-bun .
docker run -p 3000:3000 fullstack-bun
```
