import type { OpenAPIHono } from "@hono/zod-openapi";
import { initHelloRoutes } from "@routes";

export * from "./hello";

export const initRoutes = (app: OpenAPIHono) => {
	initHelloRoutes(app);

	app.get("/health", c => c.text("OK"));
};
