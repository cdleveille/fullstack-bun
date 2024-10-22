import { model, Schema } from "mongoose";

import { BaseSchema } from "@helpers";
import type { TUser } from "@types";

const UserSchema = new Schema<TUser>(
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

export const User = model<TUser>("User", UserSchema);
