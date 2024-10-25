export enum Env {
	Production = "production",
	Development = "development"
}

export enum RequestMethod {
	GET = "get",
	POST = "post",
	PUT = "put",
	DELETE = "delete",
	PATCH = "patch",
	OPTIONS = "options",
	HEAD = "head",
	CONNECT = "connect",
	TRACE = "trace",
	ALL = "all"
}

export enum SocketEvent {
	Hello = "hello",
	Reload = "reload",
	Greetings = "greetings"
}

export enum Path {
	Public = "./public",
	ClientSrc = "./src/client"
}

export const STORED_STATE_PREFIX = "state";

export const GREETINGS = [
	"hello",
	"hi",
	"hiya",
	"hey",
	"yo",
	"sup",
	"ahoy",
	"greetings",
	"salutations",
	"howdy",
	"hola",
	"bonjour",
	"good day",
	"g'day",
	"aloha",
	"nǐ hǎo",
	"konnichiwa",
	"namaste",
	"shalom",
	"ciao"
];
