export enum Env {
	Production = "production",
	Development = "development"
}

export enum Path {
	Public = "public",
	ClientSrc = "src/client"
}

export enum SocketEvent {
	Connect = "connect",
	Hello = "hello",
	Reload = "reload"
}

export enum ErrorMessage {
	InternalServerError = "Internal Server Error"
}

export const STORED_STATE_PREFIX = "state";
