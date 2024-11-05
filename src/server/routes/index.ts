import type { OpenAPIHono } from "@hono/zod-openapi";
import { initHelloRoutes } from "@routes";
import { apiReference } from "@scalar/hono-api-reference";

export * from "./hello";

export const initRoutes = (app: OpenAPIHono) => {
	initHelloRoutes(app);

	app.get("/health", c => c.text("OK"));

	app.doc("/doc", {
		openapi: "3.0.0",
		info: {
			version: "1.0.0",
			title: "fullstack-bun"
		}
	});

	app.get(
		"/reference",
		apiReference({
			spec: {
				url: "/doc"
			}
		})
	);
};
