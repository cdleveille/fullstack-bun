import { SocketEvent } from "@constants";

export type TAppContext = {
	message: string;
	count: number;
	setCount: TReactStateSetter<number>;
};

export type TClientToServerSocketEvent = {
	[SocketEvent.Hello]: (message: string) => void;
};

export type TServerToClientSocketEvent = {
	[SocketEvent.Hello]: (message: string) => void;
	[SocketEvent.Reload]: () => void;
};

export type TReactStateSetter<T> = React.Dispatch<React.SetStateAction<T>>;
