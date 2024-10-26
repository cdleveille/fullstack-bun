import { type Express, Router } from "express";
import { z } from "zod";

import { registerEndpoint } from "@helpers";
import { User } from "@models";

export const registerUserEndpoints = (app: Express) => {
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
			resBody: z.array(z.object({ username: z.string() }))
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
			reqParams: z.object({ username: z.string() }),
			resBody: z.object({ username: z.string() })
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
			reqBody: z.object({ username: z.string().min(4) }),
			resBody: z.object({ username: z.string() })
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
			reqParams: z.object({ username: z.string() }),
			reqBody: z.object({ username: z.string().min(4) }),
			resBody: z.object({ username: z.string() })
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
			reqParams: z.object({ username: z.string() }),
			resBody: z.object({ username: z.string() })
		}
	});

	app.use(router);
};
