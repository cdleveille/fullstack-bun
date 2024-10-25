import type { NextFunction, Request, Response, Router } from "express";
import { z, type ZodError, type ZodIssue } from "zod";

import { RequestMethod } from "@constants";
import { CustomError } from "@helpers";
import type { TRequestMethod } from "@types";

export const registerEndpoint = <
	TRouteParams extends z.ZodTypeAny = z.ZodAny,
	TReqBody extends z.ZodTypeAny = z.ZodAny,
	TQueryParams extends z.ZodTypeAny = z.ZodAny,
	TResBody extends z.ZodTypeAny = z.ZodAny
>(
	router: Router,
	method: TRequestMethod,
	route: string,
	handler: (arg: {
		req: Request<z.infer<TRouteParams>, unknown, z.infer<TReqBody>, z.infer<TQueryParams>>;
		res: Response<z.infer<TResBody>>;
		next: NextFunction;
	}) => Promise<void> | void,
	schema: {
		requestRouteParamsSchema?: TRouteParams;
		requestBodySchema?: TReqBody;
		requestQueryParamsSchema?: TQueryParams;
		responseBodySchema?: TResBody;
	} = {}
) => {
	const {
		requestRouteParamsSchema = z.any(),
		requestBodySchema = z.any(),
		requestQueryParamsSchema = z.any()
	} = schema;

	router[RequestMethod[method]](
		route,
		async (
			req: Request<
				z.infer<typeof requestRouteParamsSchema>,
				unknown,
				z.infer<typeof requestBodySchema>,
				z.infer<typeof requestQueryParamsSchema>
			>,
			res: Response<TResBody>,
			next: NextFunction
		) => {
			try {
				validateRouteParams(requestRouteParamsSchema, req.params);
				validateBody(requestBodySchema, req.body);
				validateQueryParams(requestQueryParamsSchema, req.query);
				await handler({ req, res, next });
			} catch (error) {
				next(error);
			}
		}
	);
};

const validateRouteParams = <T extends z.ZodTypeAny>(schema: T, routeParams: unknown) => {
	const result = schema.safeParse(routeParams);
	if (!result.success) throwValidationError("Invalid request route parameter(s)", result.error);
};

const validateBody = <T extends z.ZodTypeAny>(schema: T, body: unknown) => {
	const result = schema.safeParse(body);
	if (!result.success) throwValidationError("Invalid request body", result.error);
};

const validateQueryParams = <T extends z.ZodTypeAny>(schema: T, queryParams: unknown) => {
	const result = schema.safeParse(queryParams);
	if (!result.success) throwValidationError("Invalid request query parameter(s)", result.error);
};

const throwValidationError = (message: string, error: ZodError) => {
	const errorMessages = error.errors
		.map(err => {
			const error = err as ZodIssue & { expected?: string };
			const path = error.path.join(".");
			const message = error.message;
			const expected = error.expected ? ` <${error.expected}>` : "";
			return `${path}${expected}: ${message}`;
		})
		.join(", ");
	throw new CustomError(`${message}: ${errorMessages}`, 400);
};
