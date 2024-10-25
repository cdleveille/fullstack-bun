import { z } from "zod";

import { type RequestMethod, Route, SocketEvent } from "@constants";

export type TRequestMethod = keyof typeof RequestMethod;

const UserSchema = z.object({ username: z.string() });

const NewUserSchema = z.object({
	username: z.string().min(4)
});

export const RequestRouteParamsSchema = {
	getUserByUsername: UserSchema,
	updateUser: UserSchema,
	deleteUser: UserSchema
};

export const RequestBodySchema = {
	newUser: NewUserSchema,
	updateUser: NewUserSchema
};

export const RequestQueryParamsSchema = {};

export const ResponseBodySchema = {
	getAllUsers: z.array(UserSchema),
	getUserByUsername: UserSchema,
	newUser: UserSchema,
	updateUser: UserSchema,
	deleteUser: UserSchema
};

export type TClientToServerSocketEvent = {
	[SocketEvent.Hello]: (message: string) => void;
	[SocketEvent.Greetings]: () => void;
};

export type TServerToClientSocketEvent = {
	[SocketEvent.Hello]: (message: string) => void;
	[SocketEvent.Reload]: () => void;
	[SocketEvent.Greetings]: (greetings: string[]) => void;
};

export type TEndpoint = {
	method: TRequestMethod;
	route: Route;
};

export const Endpoint = {
	getAllUsers: {
		method: "GET",
		route: Route.User
	},
	getUserByUsername: {
		method: "GET",
		route: Route.UserByUsername
	},
	newUser: {
		method: "POST",
		route: Route.User
	},
	updateUser: {
		method: "PATCH",
		route: Route.UserByUsername
	},
	deleteUser: {
		method: "DELETE",
		route: Route.UserByUsername
	}
} satisfies Record<string, TEndpoint>;

export type TEndpointKey = keyof typeof Endpoint;

export type TRequestRouteParams<T extends TEndpointKey> = T extends keyof typeof RequestRouteParamsSchema
	? z.infer<(typeof RequestRouteParamsSchema)[T]>
	: unknown;

export type TRequestBody<T extends TEndpointKey> = T extends keyof typeof RequestBodySchema
	? z.infer<(typeof RequestBodySchema)[T]>
	: unknown;

export type TRequestQueryParams<T extends TEndpointKey> = T extends keyof typeof RequestQueryParamsSchema
	? z.infer<(typeof RequestQueryParamsSchema)[T]>
	: unknown;

export type TResponseBody<T extends TEndpointKey> = T extends keyof typeof ResponseBodySchema
	? z.infer<(typeof ResponseBodySchema)[T]>
	: unknown;
