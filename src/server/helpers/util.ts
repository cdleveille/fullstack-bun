import { Schema } from "mongoose";

import type { TBase } from "@types";

export const BaseSchema = new Schema<TBase>({
	created_at: {
		type: Date,
		default: () => Date.now(),
		immutable: true
	},
	updated_at: {
		type: Date,
		default: () => Date.now()
	}
});

export const isCacheFirstRequest = (filename: string) => filename.includes("~");
