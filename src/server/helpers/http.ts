import type { IncomingMessage, ServerResponse } from "node:http";
import { type Elysia, type ErrorHandler, ValidationError } from "elysia";

import { ErrorMessage } from "@constants";

export const handleError: ErrorHandler = c => {
	const { error } = c;
	if (error instanceof ValidationError) {
		c.set.status = 400;
		const message = error.all.map(e => e.summary).join(", ");
		return { message };
	}
	const message = "message" in error ? error.message : ErrorMessage.InternalServerError;
	return { message };
};

// Creates a Node-style handler for the Elysia app (needed to attach Socket.IO instance to server)
export const createNodeHandler = (app: Elysia) => {
	return async function handler(req: IncomingMessage, res: ServerResponse) {
		try {
			const host = req.headers.host || "localhost";
			const url = new URL(req.url || "/", `http://${host}`);

			const request = new Request(url.toString(), {
				method: req.method || "GET",
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

			if (response.body) {
				const body = Buffer.from(await response.arrayBuffer());
				res.end(body);
			} else {
				res.end();
			}
		} catch (error) {
			console.error("Error in HTTP adapter:", error);
			if (!res.headersSent) {
				res.writeHead(500, { "Content-Type": "text/plain" });
				res.end("Internal Server Error");
			} else {
				res.end();
			}
		}
	};
};
