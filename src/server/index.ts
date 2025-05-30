import { existsSync } from "node:fs";
import { createServer } from "node:http";
import { Elysia } from "elysia";

import { api } from "@server/helpers/api";
import { Config } from "@server/helpers/config";
import { createHttpAdapter, onAfterHandle, onError } from "@server/helpers/elysia";
import { plugins, serveStatic } from "@server/helpers/plugins";
import { io } from "@server/helpers/socket";
import { Path } from "@shared/constants";

const { PORT, HOST } = Config;

const app = new Elysia({ aot: true, precompile: true, nativeStaticResponse: true })
	.onError(c => onError(c))
	.onAfterHandle(onAfterHandle)
	.use(plugins)
	.use(api);

if (existsSync(Path.Public)) app.use(serveStatic);

const server = createServer(createHttpAdapter(app));

io.attach(server);

server.listen(PORT, () => console.log(`Server listening on ${HOST}:${PORT}`));
