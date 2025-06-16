import { treaty } from "@elysiajs/eden";
import { useMutation } from "@tanstack/react-query";

import { Config } from "@/client/helpers/config";
import { useWs } from "@/client/hooks/useWs";
import type { TApi } from "@/server/helpers/api";

const { origin, protocol, hostname } = window.location;

const httpApi = treaty<TApi>(origin).api;

const wsApi = treaty<TApi>(`${protocol}//${hostname}:${Config.PORT}`).api;

// For initial data fetching to be done via TanStack Router loader before React renders
export const loader = async () => {
	const { data, error } = await httpApi.hello.get({ query: {} });
	if (error) throw new Error(error.value.message);
	return data;
};

// For API interactions to be used within React components
export const useApi = () => {
	const useGetHello = () =>
		useMutation({
			mutationFn: () => httpApi.hello.get({ query: {} }),
			onSuccess: ({ data }) => console.log(`get: ${data?.message}`)
		});

	const usePostHello = (name: string) =>
		useMutation({
			mutationFn: () => httpApi.hello.post({ name }),
			onSuccess: ({ data }) => console.log(`post: ${data?.message}`)
		});

	const useWsHello = () =>
		useWs({ handler: wsApi.hello, onMessage: ({ message }) => console.log(`ws: ${message}`) });

	return { useGetHello, usePostHello, useWsHello };
};
