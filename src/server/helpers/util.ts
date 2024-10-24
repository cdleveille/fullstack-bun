import type { NextFunction, Request, Response, Router } from "express";
import { Schema } from "mongoose";

import type { Route } from "@constants";
import type {
	TBase,
	TRequestQueryParams,
	TRequestRouteParams,
	TRequestBody,
	TRequestMethod,
	TResponseBody
} from "@types";

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

export const getRandomElements = <T>(arr: T[], n: number) => {
	for (let i = arr.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[arr[i], arr[j]] = [arr[j], arr[i]];
	}
	return arr.slice(0, n);
};

export const registerRouteHandler = <T extends Route>(
	router: Router,
	method: TRequestMethod,
	route: T,
	handler: (arg: {
		req: Request<TRequestRouteParams[T], unknown, TRequestBody[T], TRequestQueryParams[T]>;
		res: Response<TResponseBody[T]>;
		next: NextFunction;
	}) => void
) => {
	router[method](
		route,
		(
			req: Request<TRequestRouteParams[T], unknown, TRequestBody[T], TRequestQueryParams[T]>,
			res: Response<TResponseBody[T]>,
			next: NextFunction
		) => {
			try {
				handler({ req, res, next });
			} catch (error) {
				next(error);
			}
		}
	);
};
