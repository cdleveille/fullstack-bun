import { type Express, Router } from "express";

import { Route } from "@constants";
import { registerRoute } from "@helpers";

export const initRoutes = (app: Express) => {
	const router = Router();

	registerRoute(router, "GET", Route.Hello, ({ req, res }) => {
		const { name } = req.query;
		res.json({ message: `Hello${name ? `, ${name}` : ""}!` });
	});

	registerRoute(router, "GET", Route.Goodbye, ({ req, res }) => {
		const { name } = req.query;
		res.json({ message: `Goodbye${name ? `, ${name}` : ""}!` });
	});

	app.use(router);
};
