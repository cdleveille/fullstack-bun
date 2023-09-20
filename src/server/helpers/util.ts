import { Context } from "hono";
import { Schema } from "mongoose";

import { IBase, IError } from "@types";

export const BaseSchema = new Schema<IBase>({
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

export const successResponse = (c: Context, data: any, code?: number) => c.json(data, code ?? 200);

export const errorResponse = (c: Context, error: IError) =>
	c.text(error?.data ?? "Internal server error.", error?.code ?? 500);
