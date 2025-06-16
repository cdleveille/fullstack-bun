import { treaty } from "@elysiajs/eden";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";

import { Config } from "@/client/helpers/config";
import type { TApi } from "@/server/helpers/api";

const { protocol, hostname } = window.location;

const createTreaty = (url: string) => treaty<TApi>(url).api;

export const api = createTreaty(`${protocol}//${hostname}:${Config.PORT}`);

const loaderApi = createTreaty(window.location.origin);

// For initial data fetching to be done via TanStack Router loader before React renders
export const loader = async () => {
	const { data, error } = await api.hello.get({ query: {} });
	if (error) throw new Error(error.value.message);
	console.log(data.message);
	return data;
};

// For API interactions to be used within React components
export const useApi = () => {
	useEffect(() => {
		const hello = api.hello.subscribe();
		hello.on("open", () => hello.send({ message: "hello from client!" }));
		hello.on("message", ({ data }) => console.log(data.message));
		return () => {
			hello.close();
		};
	}, []);

	const useHello = (name: string) => useMutation({ mutationFn: () => api.hello.post({ name }) });

	return { useHello };
};
