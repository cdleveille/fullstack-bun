import { Hono } from "hono";

import { initConfigRoutes, initUserRoutes } from "@controllers";

export const initRoutes = (app: Hono) => {
	initUserRoutes(app);
	initConfigRoutes(app);
};

export * from "./user";
export * from "./config";
