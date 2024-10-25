import { type Express, Router } from "express";

import { registerEndpoint } from "@helpers";
import { User } from "@models";

export const initRoutes = (app: Express) => {
	const router = Router();

	/* get all users */
	registerEndpoint(router, "getAllUsers", async ({ res }) => {
		const users = await User.getAllUsers();
		res.json(users);
	});

	/* get user by username */
	registerEndpoint(router, "getUserByUsername", async ({ req, res }) => {
		const { username } = req.params;
		const user = await User.assertUserExists(username);
		res.json(user);
	});

	/* new user */
	registerEndpoint(router, "newUser", async ({ req, res }) => {
		const { username } = req.body;
		const user = await User.newUser(username);
		res.status(201).json(user);
	});

	/* update user */
	registerEndpoint(router, "updateUser", async ({ req, res }) => {
		const { username } = req.params;
		const { username: newUsername } = req.body;
		const updatedUser = await User.updateUser(username, newUsername);
		res.json(updatedUser);
	});

	/* delete user */
	registerEndpoint(router, "deleteUser", async ({ req, res }) => {
		const { username } = req.params;
		const user = await User.deleteUser(username);
		res.json(user);
	});

	app.use(router);
};
