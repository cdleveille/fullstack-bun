import { z, ZodTypeAny } from "zod";

import { Endpoint, type RequestMethod, Route, SocketEvent } from "@constants";
import { Endpoints } from "@endpoints";

export type TClientToServerSocketEvent = {
	[SocketEvent.Hello]: (message: string) => void;
	[SocketEvent.Greetings]: () => void;
};

export type TServerToClientSocketEvent = {
	[SocketEvent.Hello]: (message: string) => void;
	[SocketEvent.Reload]: () => void;
	[SocketEvent.Greetings]: (greetings: string[]) => void;
};

export type TRequestMethod = keyof typeof RequestMethod;

export type TZodAnyOrUndefined = ZodTypeAny | undefined;

export type TEndpoint<
	TRouteParams extends TZodAnyOrUndefined = undefined,
	TReqBody extends TZodAnyOrUndefined = undefined,
	TQueryParams extends TZodAnyOrUndefined = undefined,
	TResBody extends TZodAnyOrUndefined = undefined
> = {
	method: TRequestMethod;
	route: Route;
	requestRouteParamsSchema?: TRouteParams;
	requestBodySchema?: TReqBody;
	requestQueryParamsSchema?: TQueryParams;
	responseBodySchema?: TResBody;
};

export type TEndpoints = Record<
	Endpoint,
	TEndpoint<TZodAnyOrUndefined, TZodAnyOrUndefined, TZodAnyOrUndefined, TZodAnyOrUndefined>
>;

export type TRequestRouteParams<T extends Endpoint> = T extends keyof typeof Endpoints
	? (typeof Endpoints)[T] extends { requestRouteParamsSchema: ZodTypeAny }
		? z.infer<(typeof Endpoints)[T]["requestRouteParamsSchema"]>
		: never
	: never;

export type TRequestBody<T extends Endpoint> = T extends keyof typeof Endpoints
	? (typeof Endpoints)[T] extends { requestBodySchema: ZodTypeAny }
		? z.infer<(typeof Endpoints)[T]["requestBodySchema"]>
		: never
	: never;

export type TRequestQueryParams<T extends Endpoint> = T extends keyof typeof Endpoints
	? (typeof Endpoints)[T] extends { requestQueryParamsSchema: ZodTypeAny }
		? z.infer<(typeof Endpoints)[T]["requestQueryParamsSchema"]>
		: never
	: never;

export type TResponseBody<T extends Endpoint> = T extends keyof typeof Endpoints
	? (typeof Endpoints)[T] extends { responseBodySchema: ZodTypeAny }
		? z.infer<(typeof Endpoints)[T]["responseBodySchema"]>
		: never
	: never;
