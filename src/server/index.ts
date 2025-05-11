import { existsSync } from "node:fs";
import { createServer } from "node:http";
import { staticPlugin } from "@elysiajs/static";
import { Elysia } from "elysia";

import { Path } from "@constants";
import { api } from "@server/helpers/api";
import { Config } from "@server/helpers/config";
import { createNodeHandler, handleError } from "@server/helpers/http";
import { log } from "@server/helpers/log";
import { plugins } from "@server/helpers/plugins";
import { initSocket } from "@server/helpers/socket";

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
