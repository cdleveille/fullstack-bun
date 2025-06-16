import { treaty } from "@elysiajs/eden";
import { useEffect } from "react";

import { Config } from "@/client/helpers/config";
import type { TApi } from "@/server/helpers/api";

const { protocol, hostname } = window.location;

export const apiClient = treaty<TApi>(`${protocol}//${hostname}:${Config.PORT}`).api;

// For initial data fetching to be done via TanStack Router loader before React renders
export const loader = async () => {
	const { data, error } = await apiClient.hello.get({ query: {} });
	if (error) throw new Error(error.value.message);
	return data;
};

// For API interactions to be used within React components
export const useApi = () => {
	useEffect(() => {
		const hello = apiClient.hello.subscribe();
		hello.on("open", () => hello.send({ message: "hello from client!" }));
		hello.on("message", ({ data }) => console.log(data.message));

		return () => {
			hello.close();
		};
	}, []);
};
