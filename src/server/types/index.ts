import { SocketEvent } from "@constants";

export type TBase = {
	created_at: Date;
	updated_at: Date;
};

export type TUser = {
	username: string;
	password: string;
};

export type TAppContext = {
	message: string;
	count: number;
	setCount: React.Dispatch<React.SetStateAction<number>>;
};

type ReverseMap<T> = T[keyof T];
export type TSocketEvent = ReverseMap<typeof SocketEvent>;

export type TClientToServerEventPayload = {
	[SocketEvent.Hello]: string;
};

export type TClientToServerEvents = {
	[SocketEvent.Hello]: (message: TServerToClientEventPayload[SocketEvent.Hello]) => void;
};

export type TServerToClientEventPayload = {
	[SocketEvent.Hello]: string;
};

export type TServerToClientEvents = {
	[SocketEvent.Hello]: (message: TClientToServerEventPayload[SocketEvent.Hello]) => void;
	[SocketEvent.Reload]: () => void;
};
