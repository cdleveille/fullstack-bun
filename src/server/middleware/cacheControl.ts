import { Hono } from "hono";

export const useCacheControl = (app: Hono) =>
	app.use("*", ({ res }, next) => {
		res.headers.set("Cache-Control", "public, max-age=31536000");
		return next();
	});
