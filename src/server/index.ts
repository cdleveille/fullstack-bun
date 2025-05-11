import { existsSync } from "node:fs";
import { createServer } from "node:http";
import { staticPlugin } from "@elysiajs/static";
import { Elysia } from "elysia";

import { Path } from "@constants";
import { Config, createNodeHandler, handleError, initSocket, log, plugins } from "@helpers";
import { api } from "@routes";

const { PORT, HOST } = Config;

const app = new Elysia()
	.onError(c => handleError(c))
	.onBeforeHandle(c => {
		c.set.headers.vary = "Origin";
	})
	.use(plugins)
	.use(api);

if (existsSync(Path.Public)) {
	app.use(staticPlugin({ prefix: "/", assets: Path.Public, noCache: true }));
}

const server = createServer(createNodeHandler(app));

initSocket(server);

server.listen(PORT, () => log.info(`Server listening on ${HOST}:${PORT}`));
