import type { IncomingMessage, ServerResponse } from "node:http";
import type { Elysia } from "elysia";

export const createNodeHandler = (app: Elysia) => {
	return async function handler(req: IncomingMessage, res: ServerResponse) {
		if (req.url?.startsWith("/socket.io/")) return;
		const url = new URL(req.url || "", `http://${req.headers.host}`);
		const request = new Request(url.toString(), {
			method: req.method,
			headers: req.headers as HeadersInit,
			body: ["GET", "HEAD"].includes(req.method || "")
				? undefined
				: (req as unknown as ReadableStream)
		});

		const response = await app.handle(request);
		const headers: Record<string, string> = {};
		response.headers.forEach((value, key) => {
			headers[key] = value;
		});

		res.writeHead(response.status, headers);
		const body = response.body ? Buffer.from(await response.arrayBuffer()) : undefined;
		res.end(body);
	};
};
