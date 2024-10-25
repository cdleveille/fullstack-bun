import { type Express, Router } from "express";
import { z } from "zod";

import { Endpoint, Route } from "@constants";
import { registerEndpoint } from "@endpoints";
import { User } from "@models";
import type { TEndpoints } from "@types";

export * from "./register";

export const registerEndpoints = (app: Express) => {
	const router = Router();

	registerEndpoint(router, Endpoint.GetAllUsers, async ({ res }) => {
		const users = await User.getAllUsers();
		res.json(users);
	});

	registerEndpoint(router, Endpoint.GetUserByUsername, async ({ req, res }) => {
		const { username } = req.params;
		const user = await User.assertUserExists(username);
		res.json(user);
	});

	registerEndpoint(router, Endpoint.NewUser, async ({ req, res }) => {
		const { username } = req.body;
		const user = await User.newUser(username);
		res.status(201).json(user);
	});

	registerEndpoint(router, Endpoint.UpdateUser, async ({ req, res }) => {
		const { username } = req.params;
		const { username: newUsername } = req.body;
		const updatedUser = await User.updateUser(username, newUsername);
		res.json(updatedUser);
	});

	registerEndpoint(router, Endpoint.DeleteUser, async ({ req, res }) => {
		const { username } = req.params;
		const user = await User.deleteUser(username);
		res.json(user);
	});

	app.use(router);
};

const userSchema = z.object({ username: z.string() });

const newUserSchema = z.object({
	username: z.string().min(4)
});

export const Endpoints = {
	getAllUsers: {
		method: "GET",
		route: Route.User,
		responseBodySchema: z.array(userSchema)
	},
	getUserByUsername: {
		method: "GET",
		route: Route.UserByUsername,
		requestRouteParamsSchema: userSchema,
		responseBodySchema: userSchema
	},
	newUser: {
		method: "POST",
		route: Route.User,
		requestBodySchema: newUserSchema,
		responseBodySchema: userSchema
	},
	updateUser: {
		method: "PATCH",
		route: Route.UserByUsername,
		requestRouteParamsSchema: userSchema,
		requestBodySchema: newUserSchema,
		responseBodySchema: userSchema
	},
	deleteUser: {
		method: "DELETE",
		route: Route.UserByUsername,
		requestRouteParamsSchema: userSchema,
		responseBodySchema: userSchema
	}
} satisfies TEndpoints;
