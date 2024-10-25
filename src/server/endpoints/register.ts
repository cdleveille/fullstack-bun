import type { NextFunction, Request, Response } from "express";
import { z, type ZodError, type ZodIssue } from "zod";

import { RequestMethod } from "@constants";
import { CustomError } from "@helpers";
import type { TRegisterEndpointProps } from "@types";

export const registerEndpoint = <
	TRouteParams extends z.ZodTypeAny = z.ZodAny,
	TReqBody extends z.ZodTypeAny = z.ZodAny,
	TQueryParams extends z.ZodTypeAny = z.ZodAny,
	TResBody extends z.ZodTypeAny = z.ZodAny
>({
	router,
	method,
	route,
	handler,
	schema = {}
}: TRegisterEndpointProps<TRouteParams, TReqBody, TQueryParams, TResBody>) => {
	const { requestRouteParams = z.any(), requestBody = z.any(), requestQueryParams = z.any() } = schema;

	router[RequestMethod[method]](
		route,
		async (
			req: Request<
				z.infer<typeof requestRouteParams>,
				unknown,
				z.infer<typeof requestBody>,
				z.infer<typeof requestQueryParams>
			>,
			res: Response<TResBody>,
			next: NextFunction
		) => {
			try {
				validatePayload(requestRouteParams, req.params, "Invalid request route parameter(s)");
				validatePayload(requestBody, req.body, "Invalid request body");
				validatePayload(requestQueryParams, req.query, "Invalid request query parameter(s)");
				await handler({ req, res, next });
			} catch (error) {
				next(error);
			}
		}
	);
};

const validatePayload = <T extends z.ZodTypeAny>(schema: T, object: unknown, message = "Invalid payload") => {
	const result = schema.safeParse(object);
	if (!result.success) throwValidationError(message, result.error);
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
