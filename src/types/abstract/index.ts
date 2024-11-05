import { SocketEvent } from "@constants";
import { resMessageSchema } from "@helpers";
import { z } from "@hono/zod-openapi";

export type TResMessage = z.infer<typeof resMessageSchema>;

export type TAppContext = {
	message: string;
	count: number;
	setCount: React.Dispatch<React.SetStateAction<number>>;
};

export type TClientToServerSocketEvent = {
	[SocketEvent.Hello]: (message: string) => void;
};

export type TServerToClientSocketEvent = {
	[SocketEvent.Hello]: (message: string) => void;
	[SocketEvent.Reload]: () => void;
};
