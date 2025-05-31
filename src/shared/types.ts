import { SocketEvent } from "@shared/constants";

export type TConfig = {
	PORT: number;
	HOST: string;
};

export type TAppContext = {
	count: number;
	setCount: TReactStateSetter<number>;
};

export type TClientToServerSocketEvent = {
	[SocketEvent.Hello]: (message: string) => void;
};

export type TServerToClientSocketEvent = {
	[SocketEvent.Hello]: ({ message }: { message: string }) => void;
};

export type TSocketReqParams<T extends keyof TClientToServerSocketEvent> = {
	event: T;
	data?: Parameters<TClientToServerSocketEvent[T]>;
};

export type TSocketResArgs<T extends keyof TClientToServerSocketEvent> = Parameters<
	TServerToClientSocketEvent[T]
>;

export type TReactStateSetter<T> = React.Dispatch<React.SetStateAction<T>>;

export type TMessage = {
	message: string;
};
