# fullstack-bun

"MERB" stack monorepo project template written in TypeScript. Bun/Express/Mongo on the backend, React on the frontend, with Socket.IO bridging the gap.

## Setup

1. Install [Bun](https://bun.sh)
2. Install [Docker Desktop](https://www.docker.com/products/docker-desktop)
3. Install [Visual Studio Code](https://code.visualstudio.com) and recommended extensions:
    - [Docker](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker)
    - [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
    - [EditorConfig](https://marketplace.visualstudio.com/items?itemName=editorconfig.editorconfig)
    - [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
    - [TypeScript Import Sorter](https://marketplace.visualstudio.com/items?itemName=mike-co.import-sorter)
    - [Bun](https://marketplace.visualstudio.com/items?itemName=oven.bun-vscode)
4. Install package dependencies: `bun i`
5. Initialize database container: `bun compose`
6. Start app: `bun dev` or press `F5` in Visual Studio Code to start debugging

## Stack

-   [Bun](https://bun.sh)
-   [Express](https://expressjs.com)
-   [MongoDB](https://www.mongodb.com)
-   [React](https://react.dev)
-   [Socket.IO](https://socket.io)
