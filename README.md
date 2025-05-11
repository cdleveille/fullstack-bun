# fullstack-bun

Curated web app project template with emphasis on developer experience and type safety. [Bun](https://bun.sh)/[Elysia](https://elysiajs.com) backend, [React](https://react.dev) frontend, [Socket.IO](https://socket.io) and [TanStack Query](https://tanstack.com/query) bridging the gap.

Designed for building single-page web apps with real-time, bi-directional server/client interaction.

## Features

- All server/client interaction is fully type-safe. See [api.ts](https://github.com/cdleveille/fullstack-bun/blob/main/src/server/helpers/api.ts) and [useApi.ts](https://github.com/cdleveille/fullstack-bun/blob/main/src/client/hooks/useApi.ts) for simple examples.

- [Scalar](https://guides.scalar.com) documentation for API routes is served on [/api/reference](https://fullstack-bun.fly.dev/api/reference). [OpenAPI Specification](https://swagger.io/specification) raw .json data is served on [/api/reference/json](https://fullstack-bun.fly.dev/api/reference/json).

- The client meets [PWA](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps) requirements for an installable, native app-like experience on a variety of platforms, and boasts a near-perfect [PageSpeed Insights](https://pagespeed.web.dev) score out of the box.

- Includes a [Dockerfile](https://github.com/cdleveille/fullstack-bun/blob/main/Dockerfile), [fly.toml](https://github.com/cdleveille/fullstack-bun/blob/main/fly.toml), and [GitHub workflow](https://github.com/cdleveille/fullstack-bun/blob/main/.github/workflows/deploy.yml) for deploying to [fly.io](https://fly.io) on pushes to the `main` branch. The Dockerfile compiles the app into a standalone binary, which is then run in a [distroless](https://github.com/GoogleContainerTools/distroless) image.

## Development

Install [Bun](https://bun.sh).

Optionally create a `.env` file in the root directory to override default environment variables. See [.env.example](https://github.com/cdleveille/fullstack-bun/blob/main/.env.example) for available options.

Install dependencies and launch:

```bash
bun install
bun run dev
```

## Production

Build client and compile server to standalone binary:

```bash
bun run build
bun run compile
```

Start server by executing the compiled `main` binary or by running:

```bash
bun run start
```

Alternatively, build and run in a Docker container:

```bash
docker build -t fullstack-bun .
docker run -p 3000:3000 fullstack-bun
```

## Stack

- [Bun](https://bun.sh) - server runtime, package manager, script runner
- [Elysia](https://elysiajs.com) - web framework
- [React](https://react.dev) - user interface
- [TanStack Query](https://tanstack.com/query) - async state management
- [Socket.IO](https://socket.io) - real-time server/client communication
- [TypeScript](https://www.typescriptlang.org), [Biome](https://biomejs.dev), [Lefthook](https://lefthook.dev) - code quality/style
- [Vite](https://vite.dev) - dev server, bundler
