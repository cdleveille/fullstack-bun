import { Elysia } from "elysia";

import { Path } from "@constants";
import { staticPlugin } from "@elysiajs/static";
import { swagger } from "@elysiajs/swagger";

import { description, name, version } from "../../../package.json";

export const middleware = new Elysia()
	.use(
		swagger({
			path: "/reference",
			documentation: { info: { title: name, version, description } },
			exclude: ["/health"]
		})
	)
	.use(staticPlugin({ prefix: "/", assets: Path.Public, noCache: true }));
