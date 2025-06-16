import { treaty } from "@elysiajs/eden";
import { useEffect } from "react";

import { Config } from "@/client/helpers/config";
import type { TApi } from "@/server/helpers/api";

const { protocol, hostname } = window.location;

const apiWs = treaty<TApi>(`${protocol}//${hostname}:${Config.PORT}`).api;

export const useSocket = () => {
	const useWsHello = (onMessage: ({ message }: { message: string }) => void) => {
		useEffect(() => {
			const hello = apiWs.hello.subscribe();
			hello.on("open", () => hello.send({ message: "hello from client!" }));
			hello.on("message", ({ data }) => onMessage(data));
			return () => {
				hello.close();
			};
		}, [onMessage]);
	};

	return { useWsHello };
};
