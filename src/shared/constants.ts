import type { TConfig } from "@shared/types";

export const DefaultConfig: TConfig = {
	PORT: 3000,
	HOST: "http://localhost"
};

export const Contact = {
	name: "Chris Leveille",
	email: "cdleveille@gmail.com",
	url: "https://www.cdleveille.net"
};

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

export const HASH_REGEX = new RegExp(`${HASH_PREFIX}.{8}\\.[a-zA-Z0-9]+$`);
