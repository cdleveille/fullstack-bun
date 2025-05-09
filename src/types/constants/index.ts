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
	Hello = "hello"
}

export enum Route {
	Api = "/api",
	Hello = "/hello",
	Reference = "/reference"
}

export enum ErrorMessage {
	InternalServerError = "Internal Server Error"
}

export const STORED_STATE_PREFIX = "state";

export const WS_TIMEOUT_MS = 5000;

export const HASH_PREFIX = "~";

export const HASH_REGEX = new RegExp(`${HASH_PREFIX}[a-zA-Z0-9]{8}\\.[a-z0-9]+$`);
