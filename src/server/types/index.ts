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

export class CustomError extends Error {
	statusCode: number;

	constructor(message: string, statusCode: number) {
		super(message);
		this.statusCode = statusCode;
		Object.setPrototypeOf(this, CustomError.prototype);
	}
}
