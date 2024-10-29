import { Router } from "express";
import { z } from "zod";

import { registerEndpoint } from "@helpers";
import { User } from "@models";

export const registerUserEndpoints = () => {
	const userRouter = Router();

	// get all users
	registerEndpoint({
		router: userRouter,
		method: "GET",
		route: "/",
		handler: async ({ res }) => {
			const users = await User.getAllUsers();
			res.json(users);
		},
		schema: {
			resBody: z.array(z.object({ username: z.string() }))
		}
	});

	// get user by username
	registerEndpoint({
		router: userRouter,
		method: "GET",
		route: "/:username",
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

	// create user
	registerEndpoint({
		router: userRouter,
		method: "POST",
		route: "/",
		handler: async ({ req, res }) => {
			const { username } = req.body;
			const user = await User.createUser(username);
			res.status(201).json(user);
		},
		schema: {
			reqBody: z.object({ username: z.string().min(4) }),
			resBody: z.object({ username: z.string() })
		}
	});

	// update user by username
	registerEndpoint({
		router: userRouter,
		method: "PATCH",
		route: "/:username",
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

	// delete user username
	registerEndpoint({
		router: userRouter,
		method: "DELETE",
		route: "/:username",
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

	return { userRouter };
};
