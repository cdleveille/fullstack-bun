import { model, Schema } from "mongoose";

import { BaseSchema, CustomError } from "@helpers";
import type { TUser } from "@types";

const UserModel = model<TUser>(
	"User",
	new Schema<TUser>(
		{
			username: {
				type: String,
				required: true,
				index: true
			}
		},
		{ collection: "fullstack_bun_user" }
	).add(BaseSchema)
);

const getAllUsers = () => UserModel.find();

const getUserByUsername = (username: string) => UserModel.findOne({ username });

const assertUserExists = async (username: string) => {
	const user = await UserModel.findOne({ username });
	if (!user) throw new CustomError(`User with username '${username}' not found`, 404);
	return user;
};

const assertUserDoesNotExist = async (username: string) => {
	const user = await UserModel.findOne({ username });
	if (user) throw new CustomError(`User with username '${username}' already exists`, 400);
};

const createUser = async (username: string) => {
	await assertUserDoesNotExist(username);
	return UserModel.create({ username });
};

const updateUser = async (username: string, newUsername: string) => {
	await assertUserExists(username);
	await assertUserDoesNotExist(newUsername);
	await UserModel.updateOne({ username }, { username: newUsername });
	return assertUserExists(newUsername);
};

const deleteUser = async (username: string) => {
	const user = await assertUserExists(username);
	await UserModel.deleteOne({ username });
	return user;
};

export const User = {
	getAllUsers,
	getUserByUsername,
	assertUserExists,
	assertUserDoesNotExist,
	createUser,
	updateUser,
	deleteUser
};
