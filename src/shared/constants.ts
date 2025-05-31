import type { TConfig } from "@shared/types";
import { author, description, license, version } from "package.json";

export const AppInfo = {
	name: "hello from bun!",
	version,
	description,
	author: {
		name: author,
		url: "https://cdleveille.net"
	},
	license,
	url: "https://fullstack-bun.fly.dev"
};

export const DefaultConfig: TConfig = {
	PORT: 3000,
	HOST: "http://localhost"
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
