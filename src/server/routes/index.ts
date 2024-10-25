import { type Express, Router } from "express";

import { Route } from "@constants";
import { registerRoute } from "@helpers";
import { User } from "@models";

export const initRoutes = (app: Express) => {
	const router = Router();

	/* get all users */
	registerRoute(router, "GET", Route.User, async ({ res }) => {
		const users = await User.getAllUsers();
		res.json(users);
	});

	/* get user by username */
	registerRoute(router, "GET", Route.UserByUsername, async ({ req, res }) => {
		const { username } = req.params;
		const user = await User.assertUserExists(username);
		res.json(user);
	});

	/* new user */
	registerRoute(router, "POST", Route.NewUser, async ({ req, res }) => {
		const { username } = req.body;
		const user = await User.newUser(username);
		res.status(201).json(user);
	});

	/* update user */
	registerRoute(router, "PATCH", Route.UpdateUser, async ({ req, res }) => {
		const { username } = req.params;
		const { username: newUsername } = req.body;
		const updatedUser = await User.updateUser(username, newUsername);
		res.json(updatedUser);
	});

	/* delete user */
	registerRoute(router, "DELETE", Route.DeleteUser, async ({ req, res }) => {
		const { username } = req.params;
		const user = await User.deleteUser(username);
		res.json(user);
	});

	app.use(router);
};
