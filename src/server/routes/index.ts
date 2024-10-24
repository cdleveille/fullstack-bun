import { type Express, Router } from "express";

import { Route } from "@constants";
import { registerRouteHandler } from "@helpers";

export const initRoutes = (app: Express) => {
	const router = Router();

	registerRouteHandler(router, "get", Route.Hello, ({ req, res }) => {
		const { name: queryName } = req.query;
		const { name: bodyName } = req.body;
		const name = queryName ?? bodyName;
		res.json({ message: `Hello${name ? `, ${name}` : ""}!` });
	});

	registerRouteHandler(router, "get", Route.Goodbye, ({ req, res }) => {
		const { name: queryName } = req.query;
		const { name: bodyName } = req.body;
		const name = queryName ?? bodyName;
		res.json({ message: `Goodbye${name ? `, ${name}` : ""}!` });
	});

	app.use(router);
};
