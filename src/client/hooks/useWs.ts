import { useEffect, useRef } from "react";

import type { TTreatyHandler } from "@/shared/types";

export const useWs = <TSend, TReceive>({
  handler,
  onSuccess,
}: {
  handler: TTreatyHandler<TSend, TReceive>;
  onSuccess: ({ data }: { data: TReceive | null }) => void;
}) => {
  const wsRef = useRef<ReturnType<typeof handler.subscribe> | null>(null);

  const emit = (data: TSend) => {
    if (!wsRef?.current) return console.error("Send failed: WebSocket not connected");
    wsRef.current.send(data);
  };

  useEffect(() => {
    const connection = handler.subscribe();
    wsRef.current = connection;

    connection.on("message", ({ data }) => onSuccess({ data }));

    return () => {
      connection.close();
      wsRef.current = null;
    };
  }, [handler, onSuccess]);

  return { emit };
};
