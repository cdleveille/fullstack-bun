export const http = {
	GET: async <T>(url: string) => request<T>({ url, method: "GET" }),
	POST: async <T>(url: string, body?: unknown) => request<T>({ url, method: "POST", body }),
	PUT: async <T>(url: string, body?: unknown) => request<T>({ url, method: "PUT", body }),
	DELETE: async <T>(url: string, body?: unknown) => request<T>({ url, method: "DELETE", body })
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
