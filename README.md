# fullstack-bun

Fully type-safe monorepo project template. Bun/Hono/Mongo on the backend, React on the frontend, with Socket.IO bridging the gap.

## Setup

1. Install [Bun](https://bun.sh)
2. Install [Docker Desktop](https://www.docker.com/products/docker-desktop)
3. Install package dependencies: `bun i`
4. Initialize database container: `bun compose`
5. Start app: `bun dev` or press `F5` in Visual Studio Code to start debugging (must have [Bun](https://marketplace.visualstudio.com/items?itemName=oven.bun-vscode) extension installed)

## Stack

-   [Bun](https://bun.sh) (server runtime, bundler, package manager, script runner)
-   [Hono](https://hono.dev) (web framework)
-   [MongoDB](https://www.mongodb.com), [Mongoose](https://mongoosejs.com) (database)
-   [React](https://react.dev) (user interface)
-   [TanStack Query](https://tanstack.com/query) (async state management)
-   [Socket.IO](https://socket.io) (real-time server/client communication)
-   [Zod](https://zod.dev) (schema validation)
-   [TypeScript](https://www.typescriptlang.org), [ESLint](https://eslint.org), [Prettier](https://prettier.io) (code quality/style)
