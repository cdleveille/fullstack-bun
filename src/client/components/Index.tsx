import { getRouteApi } from "@tanstack/react-router";
import { toast } from "react-hot-toast";

import BunLogo from "@/client/assets/bun.svg";
import { useApi } from "@/client/hooks/useApi";
import { useCountStore } from "@/client/hooks/useCountStore";

export const Index = () => {
  const { count, minusCount, plusCount } = useCountStore();

  const { useGetHello, usePostHello, useWsHello } = useApi();

  const { mutate: getHello } = useGetHello({
    onSuccess: ({ message }) => toast.success(message),
  });

  const { mutate: postHello } = usePostHello({
    message: "hello from client!",
    onSuccess: ({ message }) => toast.success(message),
  });

  const { send: wsHello } = useWsHello({
    onSuccess: ({ message }) => toast.success(message),
  });

  const { message } = getRouteApi("/").useLoaderData();

  return (
    <main>
      <h1>{message}</h1>
      <BunLogo width={250} height={225} />
      <div className="row" style={{ scale: 1.5 }}>
        <button type="button" onClick={minusCount}>
          -
        </button>
        <div className="count">{count}</div>
        <button type="button" onClick={plusCount}>
          +
        </button>
      </div>
      <div className="row gap">
        <button type="button" onClick={() => getHello()}>
          GET
        </button>
        <button type="button" onClick={() => postHello()}>
          POST
        </button>
        <button type="button" onClick={() => wsHello({ message: "hello from client!" })}>
          WS
        </button>
      </div>
    </main>
  );
};
