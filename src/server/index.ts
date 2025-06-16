import { createServer } from "node:http";
import { Elysia } from "elysia";

import { api } from "@/server/helpers/api";
import { Config } from "@/server/helpers/config";
import { createHttpAdapter, onError } from "@/server/helpers/elysia";
import { plugins } from "@/server/helpers/plugins";
// import { io } from "@/server/helpers/socket";

const { PORT, HOST } = Config;

const app = new Elysia({ aot: true, precompile: true, nativeStaticResponse: true })
	.onError(c => onError(c))
	.use(plugins)
	.use(api)
	.listen(PORT, () => console.log(`Server listening on ${HOST}:${PORT}`));

const server = createServer(createHttpAdapter(app));

// io.attach(server);

server.listen(PORT, () => console.log(`Server listening on ${HOST}:${PORT}`));
