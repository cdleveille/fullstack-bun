import { type RequestMethod, Route, SocketEvent } from "@constants";

export type TRequestMethod = keyof typeof RequestMethod;

export type TRequestRouteParams = {
	[Route.Hello]: undefined;
	[Route.Goodbye]: undefined;
};

export type TRequestBody = {
	[Route.Hello]: { name?: string };
	[Route.Goodbye]: { name?: string };
};

export type TRequestQueryParams = {
	[Route.Hello]: { name?: string };
	[Route.Goodbye]: { name?: string };
};

export type TResponseBody = {
	[Route.Hello]: { message: string };
	[Route.Goodbye]: { message: string };
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
