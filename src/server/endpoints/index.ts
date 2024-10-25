import { type Express, Router } from "express";
import { z } from "zod";

import { registerEndpoint } from "@endpoints";
import { User } from "@models";

export * from "./register";

export const registerEndpoints = (app: Express) => {
	const router = Router();

	registerEndpoint({
		router,
		method: "GET",
		route: "/user",
		handler: async ({ res }) => {
			const users = await User.getAllUsers();
			res.json(users);
		},
		schema: {
			responseBody: z.array(z.object({ username: z.string() }))
		}
	});

	registerEndpoint({
		router,
		method: "GET",
		route: "/user/:username",
		handler: async ({ req, res }) => {
			const { username } = req.params;
			const user = await User.assertUserExists(username);
			res.json(user);
		},
		schema: {
			requestRouteParams: z.object({ username: z.string() }),
			responseBody: z.object({ username: z.string() })
		}
	});

	registerEndpoint({
		router,
		method: "POST",
		route: "/user",
		handler: async ({ req, res }) => {
			const { username } = req.body;
			const user = await User.newUser(username);
			res.status(201).json(user);
		},
		schema: {
			requestBody: z.object({ username: z.string().min(4) }),
			responseBody: z.object({ username: z.string() })
		}
	});

	registerEndpoint({
		router,
		method: "PATCH",
		route: "/user/:username",
		handler: async ({ req, res }) => {
			const { username } = req.params;
			const { username: newUsername } = req.body;
			const updatedUser = await User.updateUser(username, newUsername);
			res.json(updatedUser);
		},
		schema: {
			requestRouteParams: z.object({ username: z.string() }),
			requestBody: z.object({ username: z.string().min(4) }),
			responseBody: z.object({ username: z.string() })
		}
	});

	registerEndpoint({
		router,
		method: "DELETE",
		route: "/user/:username",
		handler: async ({ req, res }) => {
			const { username } = req.params;
			const user = await User.deleteUser(username);
			res.json(user);
		},
		schema: {
			requestRouteParams: z.object({ username: z.string() }),
			responseBody: z.object({ username: z.string() })
		}
	});

	app.use(router);
};
