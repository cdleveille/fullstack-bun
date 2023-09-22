import { Hono } from "hono";
import { serveStatic } from "hono/bun";

import { initConfigRoutes, initUserRoutes } from "@controllers";

export const initRoutes = (app: Hono) => {
	app.use("/*", serveStatic({ root: "public" }));
	initUserRoutes(app);
	initConfigRoutes(app);
};

export * from "./user";
export * from "./config";
