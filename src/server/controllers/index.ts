import { Hono } from "hono";
import { serveStatic } from "hono/bun";

import { initUserRoutes, initWsRoutes } from "@controllers";

export const initRoutes = (app: Hono) => {
	app.use("/*", serveStatic({ root: "public" }));
	initUserRoutes(app);
	initWsRoutes(app);
};

export * from "./user";
export * from "./ws";
