import { type NextFunction, type Request, type Response, Router } from "express";
import { z, type ZodError, type ZodIssue } from "zod";

import { Endpoint, RequestMethod } from "@constants";
import { Endpoints } from "@endpoints";
import { CustomError } from "@helpers";
import type { TRequestBody, TRequestQueryParams, TRequestRouteParams, TResponseBody } from "@types";

export const registerEndpoint = <T extends Endpoint>(
	router: Router,
	endpointKey: T,
	handler: (arg: {
		req: Request<TRequestRouteParams<T>, TResponseBody<T>, TRequestBody<T>, TRequestQueryParams<T>>;
		res: Response<TResponseBody<T>>;
		next: NextFunction;
	}) => Promise<void> | void
) => {
	const endpoint = Endpoints[endpointKey];
	router[RequestMethod[endpoint.method]](
		endpoint.route,
		async (
			req: Request<TRequestRouteParams<T>, TResponseBody<T>, TRequestBody<T>, TRequestQueryParams<T>>,
			res: Response<TResponseBody<T>>,
			next: NextFunction
		) => {
			try {
				validateRouteParams(endpointKey, req.params);
				validateBody(endpointKey, req.body);
				validateQueryParams(endpointKey, req.query);
				await handler({ req, res, next });
			} catch (error) {
				next(error);
			}
		}
	);
};

const validateRouteParams = (endpointKey: Endpoint, routeParams: unknown) => {
	const endpoint = Endpoints[endpointKey];
	const schema = "requestRouteParamsSchema" in endpoint ? endpoint.requestRouteParamsSchema : z.any();
	const result = (schema as z.ZodTypeAny).safeParse(routeParams);
	if (!result.success) throwValidationError("Invalid request route parameter(s)", result.error);
};

const validateBody = (endpointKey: Endpoint, body: unknown) => {
	const endpoint = Endpoints[endpointKey];
	const schema = "requestBodySchema" in endpoint ? endpoint.requestBodySchema : z.any();
	const result = (schema as z.ZodTypeAny).safeParse(body);
	if (!result.success) throwValidationError("Invalid request body", result.error);
};

const validateQueryParams = (endpointKey: Endpoint, queryParams: unknown) => {
	const endpoint = Endpoints[endpointKey];
	const schema = "requestQueryParamsSchema" in endpoint ? endpoint.requestQueryParamsSchema : z.any();
	const result = (schema as z.ZodTypeAny).safeParse(queryParams);
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
