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

export type TRegisterEndpointProps<
	TRequestRouteParams extends z.ZodTypeAny = z.ZodAny,
	TRequestBody extends z.ZodTypeAny = z.ZodAny,
	TRequestQueryParams extends z.ZodTypeAny = z.ZodAny,
	TResponseBody extends z.ZodTypeAny = z.ZodAny
> = {
	router: Router;
	method: TRequestMethod;
	route: string;
	handler: (arg: {
		req: Request<z.infer<TRequestRouteParams>, unknown, z.infer<TRequestBody>, z.infer<TRequestQueryParams>>;
		res: Response<z.infer<TResponseBody>>;
		next: NextFunction;
	}) => Promise<void> | void;
	schema: TEndpointSchema<TRequestRouteParams, TRequestBody, TRequestQueryParams, TResponseBody>;
};

export type TEndpointSchema<
	TRequestRouteParams extends z.ZodTypeAny = z.ZodAny,
	TRequestBody extends z.ZodTypeAny = z.ZodAny,
	TRequestQueryParams extends z.ZodTypeAny = z.ZodAny,
	TResponseBody extends z.ZodTypeAny = z.ZodAny
> = {
	requestRouteParams?: TRequestRouteParams;
	requestBody?: TRequestBody;
	requestQueryParams?: TRequestQueryParams;
	responseBody?: TResponseBody;
};
