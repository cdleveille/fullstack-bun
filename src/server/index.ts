import { existsSync } from "node:fs";
import { createServer } from "node:http";
import { staticPlugin } from "@elysiajs/static";
import { Elysia } from "elysia";

import { api } from "@server/helpers/api";
import { Config } from "@server/helpers/config";
import { createHttpAdapter, onBeforeHandle, onError } from "@server/helpers/elysia";
import { plugins } from "@server/helpers/plugins";
import { io } from "@server/helpers/socket";
import { Path } from "@shared/constants";

const { PORT, HOST } = Config;

const app = new Elysia()
	.onError(c => onError(c))
	.onBeforeHandle(onBeforeHandle)
	.use(plugins)
	.use(api);

if (existsSync(Path.Public)) {
	app.use(staticPlugin({ prefix: "/", assets: Path.Public, noCache: true, indexHTML: true }));
}

const server = createServer(createHttpAdapter(app));

io.attach(server);

server.listen(PORT, () => console.log(`Server listening on ${HOST}:${PORT}`));
