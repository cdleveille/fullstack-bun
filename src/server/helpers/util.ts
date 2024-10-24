import type { NextFunction, Request, Response, Router } from "express";
import { Schema } from "mongoose";
import { z, type ZodError, type ZodIssue } from "zod";

import { RequestMethod, Route } from "@constants";
import { CustomError } from "@helpers";
import {
	RequestBodySchema,
	RequestQueryParamsSchema,
	RequestRouteParamsSchema,
	type TBase,
	type TRequestBody,
	type TRequestMethod,
	type TRequestQueryParams,
	type TRequestRouteParams,
	type TResponseBody
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

export const registerRoute = <T extends Route>(
	router: Router,
	method: TRequestMethod,
	route: T,
	handler: (arg: {
		req: Request<TRequestRouteParams<T>, unknown, TRequestBody<T>, TRequestQueryParams<T>>;
		res: Response<TResponseBody<T>>;
		next: NextFunction;
	}) => void
) => {
	router[RequestMethod[method]](
		route,
		(
			req: Request<TRequestRouteParams<T>, unknown, TRequestBody<T>, TRequestQueryParams<T>>,
			res: Response<TResponseBody<T>>,
			next: NextFunction
		) => {
			try {
				validateRouteParams(route, req.params);
				validateBody(route, req.body);
				validateQuery(route, req.query);
				handler({ req, res, next });
			} catch (error) {
				next(error);
			}
		}
	);
};

const validateRouteParams = <T extends Route>(route: T, routeParams: unknown) => {
	const schema =
		route in RequestRouteParamsSchema
			? RequestRouteParamsSchema[route as keyof typeof RequestRouteParamsSchema]
			: z.object({});
	const result = schema.safeParse(routeParams);
	if (!result.success) throwValidationError("Invalid request route parameter(s)", result.error);
	return result.data;
};

const validateBody = <T extends Route>(route: T, body: unknown) => {
	const schema =
		route in RequestBodySchema ? RequestBodySchema[route as keyof typeof RequestBodySchema] : z.object({});
	const result = schema.safeParse(body);
	if (!result.success) throwValidationError("Invalid request body", result.error);
	return result.data;
};

const validateQuery = <T extends Route>(route: T, query: unknown) => {
	const schema =
		route in RequestQueryParamsSchema
			? RequestQueryParamsSchema[route as keyof typeof RequestQueryParamsSchema]
			: z.object({});
	const result = schema.safeParse(query);
	if (!result.success) throwValidationError("Invalid request query parameter(s)", result.error);
	return result.data;
};

const throwValidationError = (message: string, error: ZodError) => {
	const errorMessages = error.errors
		.map(err => {
			const error = err as ZodIssue & { expected: string };
			const path = error.path.join(".");
			const message = error.message;
			return `${path}<${error.expected}>: ${message}`;
		})
		.join(", ");
	throw new CustomError(`${message}: ${errorMessages}`, 400);
};
