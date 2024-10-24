import { Route, SocketEvent } from "@constants";

export type TRequestMethod = "get" | "post" | "put" | "delete" | "patch" | "options" | "head" | "all";

export type TReqRouteParams = {
	[Route.Hello]: undefined;
	[Route.Goodbye]: undefined;
};

export type TReqQueryParams = {
	[Route.Hello]: { name?: string };
	[Route.Goodbye]: { name?: string };
};

export type TRequestBody = {
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
