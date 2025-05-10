const PORT = Number.parseInt(process.env.PORT ?? "3000");

const DEV_PORT = Number.parseInt(process.env.DEV_PORT ?? "5173");

const HOST = process.env.HOST ?? "http://localhost";

export const Config = {
	PORT,
	DEV_PORT,
	HOST
};
