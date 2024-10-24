import { type Express, Router } from "express";

import { RequestMethod, Route } from "@constants";
import { registerRoute } from "@helpers";

export const initRoutes = (app: Express) => {
	const router = Router();

	registerRoute(router, RequestMethod.GET, Route.Hello, ({ req, res }) => {
		const { name } = req.query;
		res.json({ message: `Hello${name ? `, ${name}` : ""}!` });
	});

	registerRoute(router, RequestMethod.GET, Route.Goodbye, ({ req, res }) => {
		const { name } = req.query;
		res.json({ message: `Goodbye${name ? `, ${name}` : ""}!` });
	});

	app.use(router);
};
