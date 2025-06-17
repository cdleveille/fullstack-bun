import { useCallback, useEffect, useRef } from "react";

import type { THandler } from "@/shared/types";

export const useWs = <TSend, TReceive>({
  handler,
  onMessage,
}: {
  handler: THandler<TSend, TReceive>;
  onMessage: (data: TReceive) => void;
}) => {
  const wsRef = useRef<ReturnType<typeof handler.subscribe> | null>(null);

  const sendMessage = useCallback((data: TSend) => {
    if (!wsRef?.current) return console.error("Send failed: WebSocket not connected");
    wsRef.current.send(data);
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
