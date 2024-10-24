import { z } from "zod";

import { type RequestMethod, Route, SocketEvent } from "@constants";

export type TRequestMethod = keyof typeof RequestMethod;

const UserSchema = z.object({ username: z.string() });

const NewUserSchema = z.object({
	username: z.string().min(4)
});

export const RequestRouteParamsSchema = {
	[Route.UserByUsername]: z.object(UserSchema.shape),
	[Route.UpdateUser]: z.object(UserSchema.shape),
	[Route.DeleteUser]: z.object(UserSchema.shape)
};

export const RequestBodySchema = {
	[Route.NewUser]: z.object(NewUserSchema.shape),
	[Route.UpdateUser]: z.object(NewUserSchema.shape)
};

export const RequestQueryParamsSchema = {};

export const ResponseBodySchema = {
	[Route.User]: z.array(z.object(UserSchema.shape)),
	[Route.UserByUsername]: z.object(UserSchema.shape),
	[Route.NewUser]: z.object(UserSchema.shape),
	[Route.UpdateUser]: z.object(UserSchema.shape),
	[Route.DeleteUser]: z.object(UserSchema.shape)
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

export type TRequestRouteParams<T extends Route> = T extends keyof typeof RequestRouteParamsSchema
	? z.infer<(typeof RequestRouteParamsSchema)[T]>
	: object;

export type TRequestBody<T extends Route> = T extends keyof typeof RequestBodySchema
	? z.infer<(typeof RequestBodySchema)[T]>
	: object;

export type TRequestQueryParams<T extends Route> = T extends keyof typeof RequestQueryParamsSchema
	? z.infer<(typeof RequestQueryParamsSchema)[T]>
	: object;

export type TResponseBody<T extends Route> = T extends keyof typeof ResponseBodySchema
	? z.infer<(typeof ResponseBodySchema)[T]>
	: object;
