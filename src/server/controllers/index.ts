import { Hono } from "hono";

import { initUserRoutes, initWsRoutes } from "@controllers";

export const initRoutes = (app: Hono) => {
	initUserRoutes(app);
	initWsRoutes(app);
};

export * from "./user";
export * from "./ws";
