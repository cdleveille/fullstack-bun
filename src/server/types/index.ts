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

export type TClientToServerPayload = {
	[SocketEvent.Hello]: string;
};

export type TClientToServerSocketEvent = {
	[SocketEvent.Hello]: (message: TClientToServerPayload[SocketEvent.Hello]) => void;
	[SocketEvent.Greetings]: () => void;
};

export type TServerToClientPayload = {
	[SocketEvent.Hello]: string;
	[SocketEvent.Greetings]: string[];
};

export type TServerToClientSocketEvent = {
	[SocketEvent.Hello]: (message: TServerToClientPayload[SocketEvent.Hello]) => void;
	[SocketEvent.Reload]: () => void;
	[SocketEvent.Greetings]: (greetings: TServerToClientPayload[SocketEvent.Greetings]) => void;
};
