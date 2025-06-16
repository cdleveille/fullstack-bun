import { treaty } from "@elysiajs/eden";
import { useMutation } from "@tanstack/react-query";

import type { TApi } from "@/server/helpers/api";

const api = treaty<TApi>(window.location.origin).api;

// For initial data fetching to be done via TanStack Router loader before React renders
export const loader = async () => {
	const { data, error } = await api.hello.get({ query: {} });
	if (error) throw new Error(error.value.message);
	return data;
};

// For API interactions to be used within React components
export const useApi = () => {
	const useGetHello = () =>
		useMutation({
			mutationFn: () => api.hello.get({ query: {} }),
			onSuccess: ({ data }) => console.log(`get: ${data?.message}`)
		});

	const usePostHello = (name: string) =>
		useMutation({
			mutationFn: () => api.hello.post({ name }),
			onSuccess: ({ data }) => console.log(`post: ${data?.message}`)
		});

	return { useGetHello, usePostHello };
};
