# fullstack-bun

Fully type-safe "MERB" stack monorepo project template. Bun/Express/Mongo on the backend, React on the frontend, with Socket.IO bridging the gap.

## Setup

1. Install [Bun](https://bun.sh)
2. Install [Docker Desktop](https://www.docker.com/products/docker-desktop)
3. Install [Visual Studio Code](https://code.visualstudio.com)
4. Install package dependencies: `bun i`
5. Initialize database container: `bun compose`
6. Start app: `bun dev` or press `F5` in Visual Studio Code to start debugging (must have [Bun](https://marketplace.visualstudio.com/items?itemName=oven.bun-vscode) extension installed)

## Stack

-   [Bun](https://bun.sh) (server runtime, module bundling, package manager, script runner)
-   [Express](https://expressjs.com) (web framework)
-   [MongoDB](https://www.mongodb.com), [Mongoose](https://mongoosejs.com) (database)
-   [React](https://react.dev) (ui)
-   [TanStack Query](https://tanstack.com/query) (data fetching)
-   [Socket.IO](https://socket.io) (real-time server/client interaction)
-   [Zod](https://zod.dev) (schema validation)
-   [TypeScript](https://www.typescriptlang.org), [ESLint](https://eslint.org), [Prettier](https://prettier.io) (code quality)
