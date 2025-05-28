import { treaty } from "@elysiajs/eden";

import type { TApi } from "@server/helpers/api";

export const httpClient = treaty<TApi>(window.location.origin);

export const http = {
	GET: async <T>(url: string, { headers }: { headers?: Headers } = {}) =>
		request<T>({ url, method: "GET", headers }),
	POST: async <T>(url: string, { headers, body }: { headers?: Headers; body?: unknown } = {}) =>
		request<T>({ url, method: "POST", headers, body }),
	PUT: async <T>(url: string, { headers, body }: { headers?: Headers; body?: unknown } = {}) =>
		request<T>({ url, method: "PUT", headers, body }),
	DELETE: async <T>(url: string, { headers, body }: { headers?: Headers; body?: unknown } = {}) =>
		request<T>({ url, method: "DELETE", headers, body })
};

const request = async <T>({
	url,
	method,
	headers,
	body
}: { url: string; method: string; headers?: Headers; body?: unknown }) => {
	const res = await fetch(url, {
		method,
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
			...(headers ?? [])
		},
		body: body ? JSON.stringify(body) : undefined
	});
	const data = (await res.json()) as T;
	if (!res.ok) throw data ?? new Error("Request failed", { cause: res });
	return data;
};
