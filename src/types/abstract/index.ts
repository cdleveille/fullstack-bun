import { SocketEvent } from "@constants";

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
