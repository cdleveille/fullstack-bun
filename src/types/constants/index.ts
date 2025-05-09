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
	Health = "/health",
	Hello = "/hello",
	Reference = "/reference"
}

export enum ErrorMessage {
	InternalServerError = "Internal Server Error"
}

export const STORED_STATE_PREFIX = "state";

export const WS_TIMEOUT_MS = 5000;
