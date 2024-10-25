import type { NextFunction, Request, Response } from "express";
import { z, type ZodError, type ZodIssue } from "zod";

import { RequestMethod } from "@constants";
import { CustomError } from "@helpers";
import type { TRegisterEndpointProps, TValidatePayloadAgainstSchemaProps } from "@types";

export const registerEndpoint = <
	TRouteParams extends z.ZodTypeAny,
	TResBody extends z.ZodTypeAny,
	TReqBody extends z.ZodTypeAny,
	TQueryParams extends z.ZodTypeAny
>({
	router,
	method,
	route,
	handler,
	schema
}: TRegisterEndpointProps<TRouteParams, TResBody, TReqBody, TQueryParams>) => {
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
				validatePayloadAgainstSchema({
					payload: req.params,
					schema: requestRouteParams,
					message: "Invalid request route parameter(s)"
				});
				validatePayloadAgainstSchema({
					payload: req.body,
					schema: requestBody,
					message: "Invalid request body"
				});
				validatePayloadAgainstSchema({
					payload: req.query,
					schema: requestQueryParams,
					message: "Invalid request query parameter(s)"
				});
				await handler({ req, res, next });
			} catch (error) {
				next(error);
			}
		}
	);
};

const validatePayloadAgainstSchema = <T extends z.ZodTypeAny>({
	payload,
	schema,
	message = "Invalid payload"
}: TValidatePayloadAgainstSchemaProps<T>) => {
	const result = schema.safeParse(payload);
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
