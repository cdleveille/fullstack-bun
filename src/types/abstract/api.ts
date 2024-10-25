import type { NextFunction, Request, Response, Router } from "express";
import { z } from "zod";

import { type RequestMethod, SocketEvent } from "@constants";

export type TRequestMethod = keyof typeof RequestMethod;

export type TClientToServerSocketEvent = {
	[SocketEvent.Hello]: (message: string) => void;
	[SocketEvent.Greetings]: () => void;
};

export type TServerToClientSocketEvent = {
	[SocketEvent.Hello]: (message: string) => void;
	[SocketEvent.Reload]: () => void;
	[SocketEvent.Greetings]: (greetings: string[]) => void;
};

export type TEndpointHandler<
	TRequestRouteParams extends z.ZodTypeAny,
	TResponseBody extends z.ZodTypeAny,
	TRequestBody extends z.ZodTypeAny,
	TRequestQueryParams extends z.ZodTypeAny
> = (arg: {
	req: Request<z.infer<TRequestRouteParams>, unknown, z.infer<TRequestBody>, z.infer<TRequestQueryParams>>;
	res: Response<z.infer<TResponseBody>>;
	next: NextFunction;
}) => Promise<void> | void;

export type TEndpointSchema<
	TRequestRouteParams extends z.ZodTypeAny,
	TResponseBody extends z.ZodTypeAny,
	TRequestBody extends z.ZodTypeAny,
	TRequestQueryParams extends z.ZodTypeAny
> = {
	requestRouteParams?: TRequestRouteParams;
	responseBody?: TResponseBody;
	requestBody?: TRequestBody;
	requestQueryParams?: TRequestQueryParams;
};

export type TRegisterEndpointProps<
	TRequestRouteParams extends z.ZodTypeAny = z.ZodAny,
	TResponseBody extends z.ZodTypeAny = z.ZodAny,
	TRequestBody extends z.ZodTypeAny = z.ZodAny,
	TRequestQueryParams extends z.ZodTypeAny = z.ZodAny
> = {
	router: Router;
	method: TRequestMethod;
	route: string;
	handler: TEndpointHandler<TRequestRouteParams, TResponseBody, TRequestBody, TRequestQueryParams>;
	schema: TEndpointSchema<TRequestRouteParams, TResponseBody, TRequestBody, TRequestQueryParams>;
};

export type TValidatePayloadAgainstSchemaProps<T extends z.ZodTypeAny> = {
	payload: unknown;
	schema: T;
	message?: string;
};
