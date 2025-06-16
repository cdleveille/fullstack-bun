import { useCallback, useEffect, useRef } from "react";

export const useWs = <TSend, TReceive>({
	handler,
	onMessage
}: {
	handler: THandler<TSend, TReceive>;
	onMessage: (data: TReceive) => void;
}) => {
	const wsRef = useRef<ReturnType<typeof handler.subscribe> | null>(null);

	const sendMessage = useCallback((data: TSend) => {
		if (wsRef.current) return wsRef.current.send(data);
		console.error("Send failed: WebSocket not connected");
	}, []);

	useEffect(() => {
		const connection = handler.subscribe();
		wsRef.current = connection;

		connection.on("message", ({ data }) => onMessage(data));

		return () => {
			connection.close();
			wsRef.current = null;
		};
	}, [handler, onMessage]);

	return { sendMessage };
};

type THandler<TSend, TReceive> = {
	subscribe: () => {
		send: (sendData: TSend) => void;
		on: (
			event: "message",
			callback: (receiveData: { data: TReceive; isTrusted: boolean }) => void
		) => void;
		close: () => void;
	};
};
