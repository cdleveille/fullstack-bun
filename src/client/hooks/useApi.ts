import { treaty } from "@elysiajs/eden";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";

import type { TApi } from "@/server/helpers/api";
import { SocketEvent } from "@/shared/constants";

export const apiClient = treaty<TApi>(window.location.origin).api;

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
		hello.on("open", () => {
			console.log("asdf");
			hello.send({ message: "hello from client!" });
		});
		hello.on("message", message => {
			console.log("Received message:", message);
		});

		return () => {
			// hello.close();
		};
	}, []);
};
