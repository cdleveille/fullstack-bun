import { SocketEvent } from "@constants";

export interface IConfig {
	IS_PROD: boolean;
	HOST: string;
	PORT: number;
	RELOAD_PORT: number;
	MONGO_URI: string;
}

export interface IBase {
	created_at: Date;
	updated_at: Date;
}

export interface IUser {
	username: string;
	password: string;
}

export interface IError {
	code: number;
	message: string;
}

type ReverseMap<T> = T[keyof T];
export type SocketEventName = ReverseMap<typeof SocketEvent>;
