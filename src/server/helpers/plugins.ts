import { Elysia } from "elysia";

import { swagger } from "@elysiajs/swagger";

import { description, name, version } from "../../../package.json";

export const plugins = new Elysia().use(
	swagger({
		path: "/reference",
		documentation: { info: { title: name, version, description } },
		exclude: ["/health"]
	})
);
