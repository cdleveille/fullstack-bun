import { Hono } from "hono";
import { initUserRoutes } from "src/server/controllers";

export const initRoutes = (app: Hono) => {
	initUserRoutes(app);
};

export * from "./user";
