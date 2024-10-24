import { type Express, Router } from "express";

import { Route } from "@constants";
import { CustomError, registerRoute } from "@helpers";
import { User } from "@models";

export const initRoutes = (app: Express) => {
	const router = Router();

	/* get all users */
	registerRoute(router, "GET", Route.User, async ({ res }) => {
		const users = await User.find();
		res.json(users);
	});

	/* get user by username */
	registerRoute(router, "GET", Route.UserByUsername, async ({ req, res }) => {
		const { username } = req.params;
		const user = await getUserByUsername(username);
		if (!user) throw new CustomError("User not found", 404);
		res.json(user);
	});

	/* new user */
	registerRoute(router, "POST", Route.NewUser, async ({ req, res }) => {
		const { username } = req.body;
		const existingUser = await getUserByUsername(username);
		if (existingUser) throw new CustomError(`User with username '${username}' already exists`, 400);
		const user = await User.create({ username });
		res.status(201).json(user);
	});

	/* update user */
	registerRoute(router, "PATCH", Route.UpdateUser, async ({ req, res }) => {
		const { username } = req.params;
		const existingUser = await getUserByUsername(username);
		if (!existingUser) throw new CustomError(`User with username '${username}' not found`, 404);
		const { username: newUsername } = req.body;
		const existingUserWithNewUsername = await getUserByUsername(newUsername);
		if (existingUserWithNewUsername)
			throw new CustomError(`User with username '${newUsername}' already exists`, 400);
		await User.updateOne({ username }, { username: newUsername });
		const updatedUser = await getUserByUsername(newUsername);
		if (!updatedUser) throw new CustomError(`User with username '${newUsername}' not found`, 404);
		res.json(updatedUser);
	});

	/* delete user */
	registerRoute(router, "DELETE", Route.DeleteUser, async ({ req, res }) => {
		const { username } = req.params;
		const user = await getUserByUsername(username);
		if (!user) throw new CustomError(`User with username '${username}' not found`, 404);
		await User.deleteOne({ username });
		res.json(user);
	});

	app.use(router);
};

const getUserByUsername = (username: string) => User.findOne({ username });
