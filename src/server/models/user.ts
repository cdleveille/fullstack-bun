import { model, Schema } from "mongoose";

import { BaseSchema } from "@helpers";
import { IUser } from "@types";

const UserSchema = new Schema<IUser>(
	{
		username: {
			type: String,
			required: true
		},
		password: {
			type: String,
			required: true
		}
	},
	{ collection: "bun_user" }
).add(BaseSchema);

export const User = model<IUser>("User", UserSchema);
