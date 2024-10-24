import { model, Schema } from "mongoose";

import { BaseSchema } from "@helpers";
import type { TUser } from "@types";

export const User = model<TUser>(
	"User",
	new Schema<TUser>(
		{
			username: {
				type: String,
				required: true
			}
		},
		{ collection: "fullstack_bun_user" }
	).add(BaseSchema)
);
