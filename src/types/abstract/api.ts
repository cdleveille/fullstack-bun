import { z } from "zod";

import { type RequestMethod, Route, SocketEvent } from "@constants";

export type TRequestMethod = keyof typeof RequestMethod;

export const RequestRouteParamsSchema = {};

export const RequestBodySchema = {
	[Route.Hello]: z.object({ name: z.string().optional() })
};

export const RequestQueryParamsSchema = {
	[Route.Hello]: z.object({ name: z.string().optional() }),
	[Route.Goodbye]: z.object({ name: z.string().optional() })
};

export const ResponseBodySchema = {
	[Route.Hello]: z.object({ message: z.string() }),
	[Route.Goodbye]: z.object({ message: z.string() })
};

export type TResponseBody<T extends Route> = T extends keyof typeof ResponseBodySchema
	? z.infer<(typeof ResponseBodySchema)[T]>
	: object;

export type TClientToServerSocketEvent = {
	[SocketEvent.Hello]: (message: string) => void;
	[SocketEvent.Greetings]: () => void;
};

export type TServerToClientSocketEvent = {
	[SocketEvent.Hello]: (message: string) => void;
	[SocketEvent.Reload]: () => void;
	[SocketEvent.Greetings]: (greetings: string[]) => void;
};

export type TRequestRouteParams<T extends Route> = T extends keyof typeof RequestRouteParamsSchema
	? z.infer<(typeof RequestRouteParamsSchema)[T]>
	: object;

export type TRequestBody<T extends Route> = T extends keyof typeof RequestBodySchema
	? z.infer<(typeof RequestBodySchema)[T]>
	: object;

export type TRequestQueryParams<T extends Route> = T extends keyof typeof RequestQueryParamsSchema
	? z.infer<(typeof RequestQueryParamsSchema)[T]>
	: object;
