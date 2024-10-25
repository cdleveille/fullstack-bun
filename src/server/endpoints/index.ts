import { type Express, Router } from "express";
import { z } from "zod";

import { registerEndpoint } from "@endpoints";
import { User } from "@models";

export * from "./register";

export const registerEndpoints = (app: Express) => {
	const router = Router();

	registerEndpoint(
		router,
		"GET",
		"/user",
		async ({ res }) => {
			const users = await User.getAllUsers();
			res.json(users);
		},
		{
			responseBodySchema: z.array(z.object({ username: z.string() }))
		}
	);

	registerEndpoint(
		router,
		"GET",
		"/user/:username",
		async ({ req, res }) => {
			const { username } = req.params;
			const user = await User.assertUserExists(username);
			res.json(user);
		},
		{
			requestRouteParamsSchema: z.object({ username: z.string() }),
			responseBodySchema: z.object({ username: z.string() })
		}
	);

	registerEndpoint(
		router,
		"POST",
		"/user",
		async ({ req, res }) => {
			const { username } = req.body;
			const user = await User.newUser(username);
			res.status(201).json(user);
		},
		{
			requestBodySchema: z.object({ username: z.string().min(4) }),
			responseBodySchema: z.object({ username: z.string() })
		}
	);

	registerEndpoint(
		router,
		"PATCH",
		"/user/:username",
		async ({ req, res }) => {
			const { username } = req.params;
			const { username: newUsername } = req.body;
			const updatedUser = await User.updateUser(username, newUsername);
			res.json(updatedUser);
		},
		{
			requestRouteParamsSchema: z.object({ username: z.string() }),
			requestBodySchema: z.object({ username: z.string().min(4) }),
			responseBodySchema: z.object({ username: z.string() })
		}
	);

	registerEndpoint(
		router,
		"DELETE",
		"/user/:username",
		async ({ req, res }) => {
			const { username } = req.params;
			const user = await User.deleteUser(username);
			res.json(user);
		},
		{
			requestRouteParamsSchema: z.object({ username: z.string() }),
			responseBodySchema: z.object({ username: z.string() })
		}
	);

	app.use(router);
};
