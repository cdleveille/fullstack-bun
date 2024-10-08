import { SocketEvent } from "@constants";

export type TConfig = {
	IS_PROD: boolean;
	HOST: string;
	PORT: number;
	RELOAD_PORT: number;
	MONGO_URI: string;
	SKIP_DB: boolean;
};

export type TBase = {
	created_at: Date;
	updated_at: Date;
};

export type TUser = {
	username: string;
	password: string;
};

type ReverseMap<T> = T[keyof T];
export type TSocketEvent = ReverseMap<typeof SocketEvent>;

export class CustomError extends Error {
	statusCode: number;

	constructor(message: string, statusCode: number) {
		super(message);
		this.statusCode = statusCode;
		Object.setPrototypeOf(this, CustomError.prototype);
	}
}
