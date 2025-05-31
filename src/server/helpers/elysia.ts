import type { IncomingMessage, ServerResponse } from "node:http";
import { type ErrorHandler, type Handler, ValidationError } from "elysia";

import { ErrorMessage, Path } from "@shared/constants";

export const onError: ErrorHandler = ({ error }) => {
	if (error instanceof ValidationError) {
		const message = error.all.map(e => e.summary).join(", ");
		return { message };
	}
	const message = "message" in error ? error.message : ErrorMessage.InternalServerError;
	return { message };
};

export const onAfterHandle: Handler = c => {
	// Needed to prevent service worker caching error
	c.set.headers.vary = "Origin";
};

// Creates a Node-style HTTP adapter function (needed to attach Socket.IO to Elysia)
export const createHttpAdapter = (app: { handle: (req: Request) => Promise<Response> }) => {
	return async (req: IncomingMessage, res: ServerResponse) => {
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
			const clonedResponse = response.clone();

			const headers: Record<string, string> = {};
			response.headers.forEach((value, key) => {
				headers[key] = value;
			});

			res.writeHead(response.status, headers);

			if (clonedResponse.body) {
				const body = Buffer.from(await clonedResponse.arrayBuffer());
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

export const indexHtml = new Response(Bun.file(`${Path.Public}/index.html`), {
	headers: { "Content-Type": "text/html; charset=utf-8" }
});
